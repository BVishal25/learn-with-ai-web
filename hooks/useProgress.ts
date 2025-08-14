import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PROGRESS_KEY_PREFIX = 'learn-with-ai-progress-v3';

export const useProgress = () => {
  const { user } = useAuth();
  const PROGRESS_KEY = user ? `${PROGRESS_KEY_PREFIX}-${user.id}` : null;

  const [completedMicroLessons, setCompletedMicroLessons] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false); // Set to loading when user/key changes
    if (PROGRESS_KEY) {
      try {
        const storedProgress = localStorage.getItem(PROGRESS_KEY);
        if (storedProgress) {
          setCompletedMicroLessons(new Set(JSON.parse(storedProgress)));
        } else {
          // If no progress for this user yet, start with a fresh set
          setCompletedMicroLessons(new Set());
        }
      } catch (error) {
        console.error('Failed to load progress from localStorage:', error);
        setCompletedMicroLessons(new Set());
      }
    } else {
      // No user, or user logged out, so clear progress
      setCompletedMicroLessons(new Set());
    }
    setIsLoaded(true);
  }, [PROGRESS_KEY]);

  const toggleMicroLessonComplete = useCallback((microLessonId: string) => {
    if (!PROGRESS_KEY) return; // Cannot save progress if not logged in

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
  }, [PROGRESS_KEY]);

  return { completedMicroLessons, toggleMicroLessonComplete, isLoaded };
};