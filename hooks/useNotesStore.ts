

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Note } from '../types';

const NOTES_KEY_PREFIX = 'learn-with-ai-notes-v1';
const NOTES_UPDATED_EVENT = 'learn-with-ai-notes-updated';

// A utility function to get notes directly from storage
const getNotesFromStorage = (storageKey: string | null): Note[] => {
    if (!storageKey) return [];
    try {
        const storedNotes = localStorage.getItem(storageKey);
        const parsedNotes = storedNotes ? JSON.parse(storedNotes) : [];
        return Array.isArray(parsedNotes) ? parsedNotes : [];
    } catch (error) {
        console.error('Failed to load notes from localStorage:', error);
        return [];
    }
};

// Custom hook for managing notes
export const useNotesStore = () => {
    const { user, sessionMode } = useAuth();
    
    const getStorageKey = useCallback(() => {
        if (sessionMode === 'user' && user) {
            return `${NOTES_KEY_PREFIX}-${user.id}`;
        }
        if (sessionMode === 'guest') {
            return `${NOTES_KEY_PREFIX}-guest`;
        }
        return null;
    }, [user, sessionMode]);

    const [notes, setNotes] = useState<Note[]>(() => getNotesFromStorage(getStorageKey()));

    useEffect(() => {
        const updateStateFromStorage = () => {
            setNotes(getNotesFromStorage(getStorageKey()));
        };

        updateStateFromStorage();
        
        window.addEventListener(NOTES_UPDATED_EVENT, updateStateFromStorage);
        
        return () => {
            window.removeEventListener(NOTES_UPDATED_EVENT, updateStateFromStorage);
        };
    }, [getStorageKey]);
  
    const addNote = useCallback((noteData: { content: string, sourcePath: string }) => {
        const storageKey = getStorageKey();
        if (!storageKey) return;

        const newNote: Note = {
            id: Date.now().toString(),
            content: noteData.content,
            sourcePath: noteData.sourcePath,
            createdAt: Date.now(),
        };

        const currentNotes = getNotesFromStorage(storageKey);
        const updatedNotes = [newNote, ...currentNotes];

        try {
            localStorage.setItem(storageKey, JSON.stringify(updatedNotes));
            window.dispatchEvent(new CustomEvent(NOTES_UPDATED_EVENT)); // Notify all components using the hook
        } catch (error) {
            console.error('Failed to save note to localStorage:', error);
        }
    }, [getStorageKey]);

    const updateNote = useCallback((noteId: string, content: string) => {
        const storageKey = getStorageKey();
        if (!storageKey) return;
        
        const currentNotes = getNotesFromStorage(storageKey);
        const updatedNotes = currentNotes.map(n => 
            n.id === noteId ? { ...n, content, updatedAt: Date.now() } : n
        );

        try {
            localStorage.setItem(storageKey, JSON.stringify(updatedNotes));
            window.dispatchEvent(new CustomEvent(NOTES_UPDATED_EVENT));
        } catch (error) {
            console.error('Failed to update note in localStorage:', error);
        }
    }, [getStorageKey]);

    const deleteNote = useCallback((noteId: string) => {
        const storageKey = getStorageKey();
        if (!storageKey) return;
        
        const currentNotes = getNotesFromStorage(storageKey);
        const updatedNotes = currentNotes.filter(n => n.id !== noteId);

        try {
            localStorage.setItem(storageKey, JSON.stringify(updatedNotes));
            window.dispatchEvent(new CustomEvent(NOTES_UPDATED_EVENT)); // Notify all components
        } catch (error) {
            console.error('Failed to delete note from localStorage:', error);
        }
    }, [getStorageKey]);

    return { notes, addNote, updateNote, deleteNote };
};
