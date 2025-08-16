import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PROGRESS_KEY_PREFIX = 'learn-with-ai-progress-v3';

export const useProgress = () => {
  const { user, sessionMode } = useAuth();

  const getStorageKey = useCallback(() => {
    if (sessionMode === 'user' && user) {
        return `${PROGRESS_KEY_PREFIX}-${user.id}`;
    }
    if (sessionMode === 'guest') {
        return `${PROGRESS_KEY_PREFIX}-guest`;
    }
    return null;
  }, [user, sessionMode]);

  const [completedMicroLessons, setCompletedMicroLessons] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const PROGRESS_KEY = getStorageKey();
    if (PROGRESS_KEY) {
      try {
        const storedProgress = localStorage.getItem(PROGRESS_KEY);
        if (storedProgress) {
          setCompletedMicroLessons(new Set(JSON.parse(storedProgress)));
        } else {
          setCompletedMicroLessons(new Set());
        }
      } catch (error) {
        console.error('Failed to load progress from localStorage:', error);
        setCompletedMicroLessons(new Set());
      }
    } else {
      setCompletedMicroLessons(new Set());
    }
    setIsLoaded(true);
  }, [getStorageKey]);

  const toggleMicroLessonComplete = useCallback((microLessonId: string) => {
    const PROGRESS_KEY = getStorageKey();
    if (!PROGRESS_KEY) return;

    setCompletedMicroLessons(prev => {
      const newProgress = new Set(prev);
      if (newProgress.has(microLessonId)) {
        newProgress.delete(microLessonId);
      } else {
        newProgress.add(microLessonId);
      }
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(Array.from(newProgress)));
      } catch (error) {
        console.error('Failed to save progress to localStorage:', error);
      }
      return newProgress;
    });
  }, [getStorageKey]);

  return { completedMicroLessons, toggleMicroLessonComplete, isLoaded };
};
