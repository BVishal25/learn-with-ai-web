import React, { useState, useEffect, useCallback } from 'react';
import { useNotesStore } from '../hooks/useNotesStore';
import { useAuth } from '../contexts/AuthContext';
import { generateAIUpdatesSummary } from '../services/geminiService';
import { AIUpdateSource } from '../types';
import { marked } from 'marked';
import { ArrowPathIcon, PencilSquareIcon, XMarkIcon, LinkIcon, SparklesIcon } from '@heroicons/react/24/outline';

// This is a global variable from the highlight.js script
declare const hljs: any;

const LoadingSpinner: React.FC<{text?: string, subtext?: string}> = ({ 
    text = "Fetching the latest AI news...",
    subtext = "The AI is searching the web. This might take a moment."
}) => (
    <div className="flex flex-col justify-center items-center p-8 text-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
       <p className="mt-4 text-brand-light font-semibold">{text}</p>
       <p className="mt-2 text-sm text-brand-muted">{subtext}</p>
    </div>
);

const getHtmlContent = (content: string) => {
    marked.setOptions({ breaks: true, gfm: true });
    return { __html: marked.parse(content) };
};

type DetailLevel = 'short' | 'medium' | 'detailed';

const NotesPanelContent: React.FC<{
    noteContent: string;
    onNoteChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSaveNote: () => void;
}> = ({ noteContent, onNoteChange, onSaveNote }) => (
    <div className="flex flex-col h-full">
        <textarea
            value={noteContent}
            onChange={onNoteChange}
            placeholder="Type your notes about this week's AI updates..."
            className="w-full flex-grow p-3 bg-brand-primary border border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-accent focus:outline-none text-sm resize-none mb-4 min-h-[150px]"
        />
        <button
            onClick={onSaveNote}
            disabled={!noteContent.trim()}
            className="w-full bg-brand-accent text-brand-primary font-bold py-2 rounded-lg hover:bg-emerald-200 transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed flex-shrink-0"
        >
            Save Note
        </button>
    </div>
);


const AIUpdatesView: React.FC = () => {
    const { user } = useAuth();
    const { addNote } = useNotesStore();
    
    // News Summary State
    const [detailLevel, setDetailLevel] = useState<DetailLevel>('medium');
    const [summary, setSummary] = useState('');
    const [sources, setSources] = useState<AIUpdateSource[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    
    // Side Panel State for Notes
    const [isNotesPanelOpen, setIsNotesPanelOpen] = useState(false);
    const [noteContent, setNoteContent] = useState('');
    
    const getNewsCacheKey = useCallback((level: DetailLevel) => {
        if (!user) return null;
        const today = new Date();
        // Create a weekly key based on year and week number
        const weekNumber = Math.ceil(((today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) / 86400000 + 1) / 7);
        const datePart = `weekly-${today.getFullYear()}-w${weekNumber}`;
        return `ai-updates-news-v4-${user.id}-${datePart}-${level}`;
    }, [user]);
    
    const fetchUpdates = useCallback(async (level: DetailLevel, forceRefresh = false) => {
        setIsLoading(true);
        setError('');
        setSummary('');
        setSources([]);
        
        const cacheKey = getNewsCacheKey(level);

        if (!forceRefresh && cacheKey) {
            const cachedData = localStorage.getItem(cacheKey);
            if (cachedData) {
                try {
                    const { summary: cachedSummary, sources: cachedSources } = JSON.parse(cachedData);
                    setSummary(cachedSummary);
                    setSources(cachedSources);
                    setIsLoading(false);
                    return;
                } catch (e) {
                    localStorage.removeItem(cacheKey); // Clear corrupted cache
                }
            }
        }
        
        try {
            const result = await generateAIUpdatesSummary(level);
            setSummary(result.summary);
            setSources(result.sources);
            if (cacheKey) {
                localStorage.setItem(cacheKey, JSON.stringify(result));
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [getNewsCacheKey]);

    const handleDetailSelect = (level: DetailLevel) => {
        if (isLoading) return;
        setHasSearched(true);
        setDetailLevel(level);
        fetchUpdates(level);
    };

    const handleNoteInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNoteContent(e.target.value);
    };

    const handleSaveNote = () => {
        const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
        const sourcePath = `AI Updates for ${today}`;
        if (!noteContent.trim()) return;
        addNote({
          content: noteContent.trim(),
          sourcePath: sourcePath,
        });
        setNoteContent('');
        setIsNotesPanelOpen(false);
    };
    
    // Auto-highlight code snippets if any exist in the summary
    useEffect(() => {
        if (summary && typeof hljs !== 'undefined') {
            try {
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block as HTMLElement);
                });
            } catch (e) {
                console.error("Highlight.js error:", e)
            }
        }
    }, [summary]);
    
    const levelMap: Record<string, DetailLevel> = {
        'In Short': 'short', 'Summarize': 'medium', 'In Detail': 'detailed'
    };

    return (
         <div className="p-4 md:p-8 h-full flex flex-col">
            <h1 className="text-4xl font-black tracking-tight text-brand-light sm:text-5xl mb-1 flex-shrink-0">
                AI <span className="text-brand-accent">Updates</span>
            </h1>
            <p className="text-brand-muted mb-6 flex-shrink-0">Your weekly brief on what's new in AI, powered by Google Search.</p>

            <div className="flex justify-between items-center mb-6 flex-shrink-0 flex-wrap gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                   {(['In Short', 'Summarize', 'In Detail'] as const).map(label => {
                       const level = levelMap[label];
                       return (
                           <button
                                key={level}
                                onClick={() => handleDetailSelect(level)}
                                disabled={isLoading}
                                className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${detailLevel === level && hasSearched ? 'bg-brand-accent text-brand-primary' : 'bg-brand-secondary text-brand-light hover:bg-slate-700/50'} disabled:opacity-50 disabled:cursor-not-allowed`}
                           >
                               {label}
                           </button>
                       )
                   })}
                </div>
                <div className="flex items-center gap-2">
                     <button
                        onClick={() => setIsNotesPanelOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm transition-all bg-brand-primary border border-slate-600 hover:bg-slate-700"
                        title="Take notes"
                    >
                        <PencilSquareIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Notes</span>
                    </button>
                    <button
                        onClick={() => fetchUpdates(detailLevel, true)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm transition-all bg-brand-primary border border-slate-600 hover:bg-slate-700 disabled:opacity-50"
                        disabled={isLoading || !hasSearched}
                        title="Refresh updates"
                    >
                        <ArrowPathIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                </div>
            </div>

             <div className="flex-grow flex gap-6 min-h-0 items-start">
                {/* Main Content */}
                <div className={`transition-all duration-300 ${isNotesPanelOpen ? 'w-full lg:w-3/4' : 'w-full'} h-full`}>
                    <div className="bg-brand-secondary p-6 md:p-8 rounded-xl border border-slate-700 h-full overflow-y-auto">
                        {isLoading && <LoadingSpinner />}
                        {error && <p className="text-red-500 text-center p-4 bg-red-900/50 rounded-lg">{error}</p>}
                        
                        {!isLoading && !error && !hasSearched && (
                            <div className="flex flex-col justify-center items-center text-center h-full animate-fade-in">
                                <SparklesIcon className="w-16 h-16 text-brand-muted mb-4" />
                                <h2 className="text-xl font-bold text-brand-light">Get The Latest AI News</h2>
                                <p className="text-brand-muted mt-2 max-w-sm mx-auto">
                                    Select a detail level above to generate a summary of what's new in the world of AI this week.
                                </p>
                            </div>
                        )}

                        {!isLoading && !error && hasSearched && summary && (
                            <>
                                <div
                                    className="prose prose-invert max-w-none prose-p:my-2 prose-headings:text-brand-accent prose-strong:text-brand-light animate-fade-in"
                                    dangerouslySetInnerHTML={getHtmlContent(summary)}
                                />
                                {sources.length > 0 && (
                                    <div className="mt-12 border-t border-slate-700 pt-6">
                                        <h3 className="text-lg font-bold text-brand-light mb-3">Sources from the web</h3>
                                        <ul className="space-y-2">
                                            {sources.map((source, index) => (
                                                source.web && (
                                                    <li key={index}>
                                                        <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="flex items-center text-brand-accent hover:text-emerald-300 hover:underline transition-colors text-sm">
                                                            <LinkIcon className="h-4 w-4 mr-2 shrink-0"/>
                                                            <span className="truncate">{source.web.title || source.web.uri}</span>
                                                        </a>
                                                    </li>
                                                )
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        )}
                        {!isLoading && !error && hasSearched && !summary && (
                            <p className="text-center text-brand-muted p-10">
                                No news summary could be generated for this level. Please try refreshing or selecting a different level.
                            </p>
                        )}
                    </div>
                </div>

                {/* Side Panel for Notes - Desktop */}
                 {isNotesPanelOpen && (
                    <div className="w-1/4 hidden lg:flex flex-col animate-slide-in flex-shrink-0 h-full">
                        <div className="bg-brand-secondary p-4 rounded-xl border border-slate-700 flex flex-col h-full">
                            <div className="flex justify-between items-center mb-4 flex-shrink-0">
                                <h3 className="text-xl font-bold text-brand-accent">My Notes</h3>
                                <button onClick={() => setIsNotesPanelOpen(false)} className="p-1 text-brand-muted hover:text-white rounded-full">
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto">
                                <NotesPanelContent noteContent={noteContent} onNoteChange={handleNoteInput} onSaveNote={handleSaveNote} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Side Panel Modal - Mobile/Tablet */}
            {isNotesPanelOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in lg:hidden"
                    onClick={() => setIsNotesPanelOpen(false)}
                >
                    <div 
                        className="bg-brand-secondary rounded-xl border border-slate-700 flex flex-col w-full max-w-lg max-h-[90vh]"
                        onClick={e => e.stopPropagation()}
                    >
                         <div className="flex justify-between items-center mb-4 flex-shrink-0 p-4 border-b border-slate-700">
                                <h3 className="text-xl font-bold text-brand-accent">My Notes</h3>
                                <button onClick={() => setIsNotesPanelOpen(false)} className="p-1 text-brand-muted hover:text-white rounded-full">
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                         </div>
                         <div className="flex-grow overflow-y-auto p-4 pt-0">
                            <NotesPanelContent noteContent={noteContent} onNoteChange={handleNoteInput} onSaveNote={handleSaveNote} />
                         </div>
                    </div>
                </div>
            )}
         </div>
    );
};

export default AIUpdatesView;