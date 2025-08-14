import React, { useState, useEffect, useCallback } from 'react';
import { MicroLesson, StructuredLessonContent } from '../types';
import { generateLessonContent, generateSimplifiedExplanation } from '../services/geminiService';
import { LinkIcon, ArrowLeftIcon, ArrowRightIcon, ArrowPathIcon, PencilSquareIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { marked } from 'marked';
import { useNotesStore } from '../hooks/useNotesStore';

// This is a global variable from the highlight.js script
declare const hljs: any;

interface LessonViewProps {
  lesson: MicroLesson;
  topicTitle: string;
  lessonPath: string;
  isCompleted: boolean;
  onToggleComplete: (microLessonId: string) => void;
  onBack: () => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const LoadingSpinner: React.FC<{text?: string, subtext?: string}> = ({
    text = "Generating Lesson with AI...",
    subtext = "This may take a moment. The AI is researching and structuring the content for you."
}) => (
    <div className="flex flex-col justify-center items-center p-8 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
       <p className="mt-4 text-brand-light font-semibold">{text}</p>
       <p className="mt-2 text-sm text-brand-muted">{subtext}</p>
    </div>
);

const getHtmlContent = (content: string) => {
    marked.setOptions({ breaks: true, gfm: true });
    return { __html: marked.parse(content) };
};

const SidePanelContent: React.FC<{
    view: 'notes' | 'simplified';
    noteContent: string;
    onNoteChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSaveNote: () => void;
    isSimplifying: boolean;
    simplifyError: string;
    simplifiedContent: string;
}> = ({ view, noteContent, onNoteChange, onSaveNote, isSimplifying, simplifyError, simplifiedContent }) => {
    if (view === 'notes') {
        return (
            <div className="flex flex-col h-full">
                <textarea 
                    value={noteContent}
                    onChange={onNoteChange}
                    placeholder="Type your notes for this lesson here... You can copy-paste content from the left."
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
    }

    if (view === 'simplified') {
        return (
            <>
                {isSimplifying && <LoadingSpinner text="Simplifying..." subtext="The AI is rephrasing this content for a beginner."/>}
                {simplifyError && <p className="text-red-500 text-center p-4 bg-red-900/50 rounded-lg">{simplifyError}</p>}
                {!isSimplifying && simplifiedContent && (
                    <div 
                        className="prose prose-invert max-w-none prose-p:my-2 leading-relaxed"
                        dangerouslySetInnerHTML={getHtmlContent(simplifiedContent)}
                    />
                )}
            </>
        );
    }
    return null;
};

const LessonView: React.FC<LessonViewProps> = ({ 
    lesson, 
    topicTitle, 
    lessonPath,
    isCompleted, 
    onToggleComplete, 
    onBack,
    onNext,
    onPrevious,
    hasNext,
    hasPrevious
}) => {
  const [content, setContent] = useState<StructuredLessonContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Side Panel State
  const [sidePanelView, setSidePanelView] = useState<'notes' | 'simplified' | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [simplifiedContent, setSimplifiedContent] = useState<string>('');
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [simplifyError, setSimplifyError] = useState('');
  
  const { addNote } = useNotesStore();
  
  const loadLessonContent = useCallback(async (forceRefresh = false) => {
    setIsLoading(true);
    setError('');
    const cacheKey = `lesson-content-v6-${lesson.id}`;
    
    if (forceRefresh) {
        setContent(null); // Clear content immediately to show loading spinner
        localStorage.removeItem(cacheKey);
    }

    try {
        const cachedContent = localStorage.getItem(cacheKey);
        if (cachedContent && !forceRefresh) {
            setContent(JSON.parse(cachedContent));
        } else {
            const generatedContent = await generateLessonContent(lesson.title, topicTitle);
            localStorage.setItem(cacheKey, JSON.stringify(generatedContent));
            setContent(generatedContent);
        }
    } catch (err: any) {
        setError(err.message || 'Failed to load lesson content. Please try again later.');
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  }, [lesson.id, lesson.title, topicTitle]);

  const handleSimplify = async () => {
    if (!content) return;
    setIsSimplifying(true);
    setSimplifyError('');
    setSimplifiedContent('');
    setSidePanelView('simplified');
    try {
        const result = await generateSimplifiedExplanation(lesson.title, topicTitle, content.explanation);
        setSimplifiedContent(result);
    } catch (err: any) {
        setSimplifyError(err.message || "Failed to simplify content.");
    } finally {
        setIsSimplifying(false);
    }
  };

  useEffect(() => {
    loadLessonContent();
  }, [loadLessonContent]);

  useEffect(() => {
      if (content && typeof hljs !== 'undefined') {
          try {
            hljs.highlightAll();
          } catch (e) {
            console.error("Highlight.js error:", e)
          }
      }
  }, [content]);

  const handleNoteInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };

  const handleSaveNote = () => {
    if (!noteContent.trim() || !lessonPath) return;
    addNote({
      content: noteContent.trim(),
      sourcePath: lessonPath,
    });
    setNoteContent('');
    setSidePanelView(null);
    // Maybe show a toast notification here in the future
  };

  return (
    <div className="animate-fade-in p-4 md:p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <button onClick={onBack} className="text-brand-accent hover:text-emerald-300 transition-colors">
            &larr; Back to Curriculum
        </button>
        <div className="flex items-center gap-2">
            <button 
              onClick={() => setSidePanelView(prev => prev === 'notes' ? null : 'notes')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm transition-all bg-brand-primary border border-slate-600 hover:bg-slate-700"
              title="Take notes on this lesson"
            >
              <PencilSquareIcon className="h-4 w-4" />
              Notes
            </button>
            <button 
              onClick={handleSimplify}
              disabled={isLoading || isSimplifying || !content}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm transition-all bg-brand-primary border border-slate-600 hover:bg-slate-700 disabled:opacity-50"
              title="Explain this lesson in simple terms"
            >
              <SparklesIcon className={`h-4 w-4 ${isSimplifying ? 'animate-pulse text-brand-accent' : ''}`} />
              Make it Simple
            </button>
            <button 
              onClick={() => loadLessonContent(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm transition-all bg-brand-primary border border-slate-600 hover:bg-slate-700 disabled:opacity-50"
              disabled={isLoading}
              title="Regenerate lesson content with AI"
            >
              <ArrowPathIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
        </div>
      </div>
      
      <div className="flex-grow flex gap-6 min-h-0 items-start">
        {/* Main Lesson Content */}
        <div className={`transition-all duration-300 ${sidePanelView ? 'w-full lg:w-3/4' : 'w-full'} h-full`}>
          <div className="bg-brand-secondary p-6 md:p-8 rounded-xl border border-slate-700 h-full overflow-y-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{lesson.title}</h1>
            
            {isLoading && <LoadingSpinner />}
            {error && <p className="text-red-500 text-center p-4 bg-red-900/50 rounded-lg">{error}</p>}
            
            {!isLoading && content && (
                <div className="space-y-8 text-brand-light/90">
                    <div>
                        <h3 className="text-xl font-bold underline decoration-brand-accent/50 underline-offset-4 mb-3">Explanation</h3>
                        <ul className="list-disc pl-6 space-y-3">
                            {content.explanation.map((point, index) => 
                                <li 
                                    key={index}
                                    className="prose prose-invert max-w-none prose-p:my-0 prose-strong:text-brand-light leading-relaxed"
                                    dangerouslySetInnerHTML={getHtmlContent(point)}
                                 />
                            )}
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold underline decoration-brand-accent/50 underline-offset-4 mb-3">Real-Life Scenarios</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            {content.realLifeScenarios.map((scenario, index) => 
                                <li 
                                    key={index}
                                    className="prose prose-invert max-w-none prose-p:my-0 prose-strong:text-brand-light"
                                    dangerouslySetInnerHTML={getHtmlContent(scenario)}
                                 />
                            )}
                        </ul>
                    </div>
                    
                    {content.codeSnippet && content.codeSnippet.code && (
                         <div>
                            <h3 className="text-xl font-bold underline decoration-brand-accent/50 underline-offset-4 mb-3">Python Code Example</h3>
                            <div className="bg-slate-900 p-4 rounded-md border border-slate-700 overflow-x-auto text-sm">
                                <pre><code className={`language-${content.codeSnippet.language}`}>{content.codeSnippet.code}</code></pre>
                            </div>
                        </div>
                    )}

                    <div>
                        <h3 className="text-xl font-bold underline decoration-brand-accent/50 underline-offset-4 mb-3">Exercises</h3>
                        <ol className="list-decimal pl-6 space-y-2">
                            {content.exercises.map((exercise, index) => 
                                <li 
                                    key={index}
                                    className="prose prose-invert max-w-none prose-p:my-0 prose-strong:text-brand-light"
                                    dangerouslySetInnerHTML={getHtmlContent(exercise)}
                                />
                            )}
                        </ol>
                    </div>

                    {content.sources && content.sources.length > 0 && (
                         <div>
                            <h3 className="text-xl font-bold underline decoration-brand-accent/50 underline-offset-4 mb-3">Sources</h3>
                            <ul className="space-y-2">
                                {content.sources.map((source, index) => (
                                    <li key={index}>
                                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center text-brand-accent hover:text-emerald-300 hover:underline transition-colors">
                                            <LinkIcon className="h-4 w-4 mr-2 shrink-0"/>
                                            <span className="truncate">{source.title || source.uri}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            
            {!isLoading && content && (
                <div className="mt-12 border-t border-slate-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                        onClick={onPrevious}
                        disabled={!hasPrevious}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all bg-brand-primary border border-slate-600 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                        Previous
                    </button>
                <button
                    onClick={() => onToggleComplete(lesson.id)}
                    className={`w-full sm:w-auto px-8 py-3 rounded-lg font-bold transition-all ${
                    isCompleted
                        ? 'bg-green-600 text-white hover:bg-green-500'
                        : 'bg-brand-accent text-brand-primary hover:bg-emerald-200'
                    }`}
                >
                    {isCompleted ? '✓ Completed' : 'Mark as Complete'}
                </button>
                <button
                        onClick={onNext}
                        disabled={!hasNext}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all bg-brand-primary border border-slate-600 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                        <ArrowRightIcon className="h-5 w-5" />
                    </button>
                </div>
            )}
          </div>
        </div>

        {/* Side Panel - Desktop */}
        {sidePanelView && (
            <div className="w-1/4 hidden lg:flex flex-col animate-slide-in flex-shrink-0 h-full">
                <div className="bg-brand-secondary p-4 rounded-xl border border-slate-700 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4 flex-shrink-0">
                        <h3 className="text-xl font-bold text-brand-accent">
                          {sidePanelView === 'notes' ? 'My Notes' : 'Simplified Explanation'}
                        </h3>
                        <button onClick={() => setSidePanelView(null)} className="p-1 text-brand-muted hover:text-white rounded-full">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto">
                      <SidePanelContent 
                          view={sidePanelView}
                          noteContent={noteContent}
                          onNoteChange={handleNoteInput}
                          onSaveNote={handleSaveNote}
                          isSimplifying={isSimplifying}
                          simplifyError={simplifyError}
                          simplifiedContent={simplifiedContent}
                      />
                    </div>
                </div>
            </div>
        )}
      </div>
      
      {/* Side Panel Modal - Mobile/Tablet */}
      {sidePanelView && (
          <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in lg:hidden"
              onClick={() => setSidePanelView(null)}
              role="dialog"
              aria-modal="true"
          >
              <div
                  className="bg-brand-secondary rounded-xl border border-slate-700 flex flex-col w-full max-w-lg max-h-[90vh]"
                  onClick={e => e.stopPropagation()}
              >
                  <div className="flex justify-between items-center mb-4 flex-shrink-0 p-4 border-b border-slate-700">
                      <h3 className="text-xl font-bold text-brand-accent">
                          {sidePanelView === 'notes' ? 'My Notes' : 'Simplified Explanation'}
                      </h3>
                      <button onClick={() => setSidePanelView(null)} className="p-1 text-brand-muted hover:text-white rounded-full">
                          <XMarkIcon className="h-6 w-6" />
                      </button>
                  </div>
                  <div className="flex-grow overflow-y-auto p-4">
                      <SidePanelContent
                          view={sidePanelView}
                          noteContent={noteContent}
                          onNoteChange={handleNoteInput}
                          onSaveNote={handleSaveNote}
                          isSimplifying={isSimplifying}
                          simplifyError={simplifyError}
                          simplifiedContent={simplifiedContent}
                      />
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default LessonView;