import React, { useState, useEffect, useRef } from 'react';
import { generateGameResponse } from '../services/geminiService';
import { GameMessage } from '../types';
import { marked } from 'marked';
import { CURRICULUM_DATA } from '../data/curriculum';

const AIVentureGame: React.FC = () => {
    // Game state
    const [messages, setMessages] = useState<GameMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const gameLogRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    // Setup state
    const [gamePhase, setGamePhase] = useState<'setup' | 'playing'>('setup');
    const [selectedTopicId, setSelectedTopicId] = useState<string>(CURRICULUM_DATA[0].id);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Beginner');
    
    // Store settings when game starts
    const [gameSettings, setGameSettings] = useState<{ topicTitle: string; difficulty: string; } | null>(null);


    useEffect(() => {
        if (gameLogRef.current) {
            gameLogRef.current.scrollTop = gameLogRef.current.scrollHeight;
        }
    }, [messages]);
    
    useEffect(() => {
        // Auto-resize textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${scrollHeight}px`;
        }
    }, [userInput]);

    const startGame = async () => {
        const topic = CURRICULUM_DATA.find(t => t.id === selectedTopicId);
        if (!topic) {
            setError('Selected topic not found.');
            return;
        }
        
        const settings = { topicTitle: topic.title, difficulty: selectedDifficulty };
        setGameSettings(settings);
        setGamePhase('playing');
        setIsLoading(true);
        setError('');
        setMessages([]);

        try {
            const firstMessage = await generateGameResponse([], settings.topicTitle, settings.difficulty);
            setMessages([{ role: 'model', content: firstMessage }]);
        } catch (err: any) {
            setError(err.message || 'Failed to start the game.');
            setGamePhase('setup'); // Go back to setup on error
            setGameSettings(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!userInput.trim() || isLoading || !gameSettings) return;

        const newHistory: GameMessage[] = [...messages, { role: 'user', content: userInput }];
        setMessages(newHistory);
        const currentUserInput = userInput;
        setUserInput('');
        setIsLoading(true);
        setError('');

        try {
            const modelResponse = await generateGameResponse(newHistory, gameSettings.topicTitle, gameSettings.difficulty);
            setMessages(prev => [...prev, { role: 'model', content: modelResponse }]);
        } catch (err: any) {
            setError(err.message || 'The AI Game Master is currently unavailable.');
            setMessages(messages); // Revert to previous state on error
            setUserInput(currentUserInput); // Restore user input
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    
    const getHtmlContent = (content: string) => {
        marked.setOptions({ breaks: true, gfm: true });
        return { __html: marked.parse(content) };
    };
    
    const restartGame = () => {
        setGamePhase('setup');
        setGameSettings(null);
        setMessages([]);
        setUserInput('');
        setError('');
    };

    if (gamePhase === 'setup') {
        return (
             <div className="flex flex-col items-center justify-center h-full p-4 md:p-8 animate-fade-in">
                <div className="bg-brand-secondary p-8 rounded-xl border border-slate-700 text-center w-full max-w-2xl">
                    <h1 className="text-4xl font-black tracking-tight text-brand-light sm:text-5xl mb-4">
                        AI <span className="text-brand-accent">Venture</span> Setup
                    </h1>
                    <p className="text-brand-muted mb-8">Choose your topic and difficulty to begin a new adventure.</p>
                    
                    {/* Topic Selection */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-brand-light mb-4">Choose a Topic</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {CURRICULUM_DATA.map(topic => (
                                <button key={topic.id} onClick={() => setSelectedTopicId(topic.id)} className={`p-3 rounded-lg text-center transition-all flex flex-col items-center justify-center aspect-square ${selectedTopicId === topic.id ? 'bg-brand-accent text-brand-primary shadow-lg ring-2 ring-sky-300' : 'bg-brand-primary hover:bg-slate-900 border border-slate-700'}`}>
                                    <topic.icon className="h-8 w-8 mb-2"/>
                                    <span className="font-semibold text-xs">{topic.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Difficulty Selection */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-brand-light mb-4">Choose Difficulty</h3>
                        <div className="flex justify-center space-x-4">
                            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                                <button key={level} onClick={() => setSelectedDifficulty(level)} className={`px-6 py-2 rounded-lg font-bold transition-colors ${selectedDifficulty === level ? 'bg-brand-accent text-brand-primary' : 'bg-brand-primary hover:bg-slate-900 border border-slate-700'}`}>
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={startGame} disabled={isLoading} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-500 transition-colors disabled:bg-gray-500">
                        {isLoading ? 'Starting...' : 'Begin Your Adventure'}
                    </button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 h-full flex flex-col animate-fade-in">
             <div className="flex justify-between items-center mb-4 md:mb-8 flex-shrink-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-brand-light">
                    AI <span className="text-brand-accent">Venture</span>
                </h1>
                <button onClick={restartGame} className="bg-brand-muted text-white font-bold px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors text-sm md:text-base">
                    New Game
                </button>
            </div>
            <div className="bg-brand-secondary p-4 md:p-6 rounded-xl border border-slate-700 flex flex-col flex-grow min-h-0">
                <div ref={gameLogRef} className="flex-grow overflow-y-auto pr-4 -mr-4 mb-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex flex-col animate-fade-in ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-xl lg:max-w-3xl ${msg.role === 'user' ? 'bg-brand-accent text-brand-primary' : 'bg-brand-primary'} p-3 md:p-4 rounded-lg`}>
                                {msg.role === 'model' ? (
                                     <div className="prose prose-sm md:prose-base prose-invert max-w-none prose-p:my-2"
                                        dangerouslySetInnerHTML={getHtmlContent(msg.content)}
                                     />
                                ) : (
                                    <p className="text-sm md:text-base whitespace-pre-wrap">{msg.content}</p>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && messages.length > 0 && (
                         <div className="flex justify-start animate-fade-in">
                            <div className="bg-brand-primary p-4 rounded-lg">
                               <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></div>
                               </div>
                            </div>
                        </div>
                    )}
                </div>
                {error && <p className="text-red-500 mb-2 flex-shrink-0">{error}</p>}
                <form onSubmit={handleSendMessage} className="flex-shrink-0 flex items-end space-x-2">
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="What do you do?"
                        disabled={isLoading}
                        className="flex-grow p-3 bg-brand-primary border border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-accent focus:outline-none disabled:opacity-50 text-sm md:text-base resize-none overflow-y-auto max-h-32"
                        aria-label="Your action"
                    />
                    <button type="submit" disabled={isLoading || !userInput.trim()} className="bg-brand-accent text-brand-primary font-bold px-4 md:px-6 py-3 rounded-lg hover:bg-sky-300 transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed text-sm md:text-base">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIVentureGame;