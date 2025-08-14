

import React, { useState, useEffect, useRef } from 'react';
import { useNotesStore } from '../hooks/useNotesStore';
import { Note } from '../types';
import { TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from './ui/icons';
import { marked } from 'marked';

const getHtmlContent = (content: string) => {
    marked.setOptions({ breaks: true, gfm: true });
    return { __html: marked.parse(content) };
};

interface EditableNoteCardProps {
    note: Note;
    onUpdate: (id: string, content: string) => void;
    onDelete: (id: string) => void;
}

const EditableNoteCard: React.FC<EditableNoteCardProps> = ({ note, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(note.content);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedContent(e.target.value);
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            const ta = textareaRef.current;
            ta.style.height = 'auto';
            ta.style.height = `${ta.scrollHeight}px`;
            ta.focus();
            ta.select();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (editedContent.trim() && editedContent.trim() !== note.content) {
            onUpdate(note.id, editedContent.trim());
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedContent(note.content);
        setIsEditing(false);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
        const card = textareaRef.current?.closest('.note-card-edit');
        if (card && !card.contains(event.target as Node)) {
            handleSave();
        }
    };

    useEffect(() => {
        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing, editedContent]);


    if (isEditing) {
        return (
            <div className="note-card-edit bg-brand-secondary p-4 rounded-xl border-2 border-brand-accent flex flex-col h-full animate-fade-in">
                <textarea
                    ref={textareaRef}
                    value={editedContent}
                    onChange={handleContentChange}
                    className="w-full bg-transparent focus:outline-none text-brand-light/90 resize-none text-sm flex-grow max-h-[60vh]"
                />
                <div className="border-t border-slate-600 pt-3 mt-4 flex justify-between items-center">
                    <p className="text-xs text-brand-muted">
                        {note.updatedAt ? `Edited ${new Date(note.updatedAt).toLocaleDateString()}`: `Created ${new Date(note.createdAt).toLocaleDateString()}`}
                    </p>
                    <div className="flex items-center gap-2">
                         <button onClick={handleCancel} title="Cancel" className="p-1.5 text-brand-muted hover:text-white hover:bg-slate-700 rounded-full">
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                        <button onClick={handleSave} title="Save" className="p-1.5 text-brand-muted hover:text-brand-accent hover:bg-slate-700 rounded-full">
                            <CheckIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="group relative bg-brand-secondary p-4 rounded-xl border border-slate-700 flex flex-col h-full cursor-pointer transition-colors hover:border-slate-500" onClick={() => setIsEditing(true)}>
            <div 
                className="prose prose-sm prose-invert max-w-none prose-p:my-1 flex-grow mb-4 text-brand-light/90 max-h-96 overflow-y-auto"
                dangerouslySetInnerHTML={getHtmlContent(note.content)}
            />
            <div className="border-t border-slate-600 pt-3 mt-auto">
                <p className="text-xs text-brand-muted mb-2 truncate" title={note.sourcePath}>
                    <strong>Taken From:</strong> {note.sourcePath}
                </p>
                <div className="flex justify-between items-center min-h-[28px]">
                     <p className="text-xs text-brand-muted">
                        {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                         <button 
                            onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} 
                            className="p-1.5 text-brand-muted hover:text-white hover:bg-slate-900/50 rounded-full"
                            aria-label="Edit note"
                            title="Edit note"
                        >
                            <PencilIcon className="h-4 w-4" />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onDelete(note.id); }} 
                            className="p-1.5 text-brand-muted hover:text-red-500 hover:bg-slate-900/50 rounded-full"
                            aria-label="Delete note"
                            title="Delete note"
                        >
                            <TrashIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const NotesView: React.FC = () => {
    const { notes, updateNote, deleteNote } = useNotesStore();

    // Sort notes to show the most recently updated/created ones first
    const sortedNotes = [...notes].sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt));

    return (
        <div className="p-4 md:p-8 animate-fade-in">
            <h1 className="text-4xl font-black tracking-tight text-brand-light sm:text-5xl mb-8">
                My <span className="text-brand-accent">Notes</span>
            </h1>
            
            {notes.length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6">
                    {sortedNotes.map(note => (
                        <div key={note.id} className="mb-6 break-inside-avoid">
                            <EditableNoteCard 
                                note={note} 
                                onUpdate={updateNote} 
                                onDelete={deleteNote} 
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-brand-secondary rounded-xl border border-slate-700">
                    <h2 className="text-2xl font-bold text-brand-light">Your Notebook is Empty</h2>
                    <p className="text-brand-muted mt-2 max-w-md mx-auto">
                        Go to the 'Learn' section, open any lesson, and click the 'Notes' button to start saving your thoughts.
                    </p>
                </div>
            )}
        </div>
    );
};

export default NotesView;