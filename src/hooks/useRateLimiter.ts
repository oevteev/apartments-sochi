import { useCallback } from 'react';

const STORAGE_KEY = 'form_submissions';
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export const useRateLimiter = (formType: string) => {
  const getStorageKey = useCallback(() => `${STORAGE_KEY}_${formType}`, [formType]);

  const checkLimit = useCallback((): { allowed: boolean; remaining: number } => {
    try {
      const key = getStorageKey();
      const stored = localStorage.getItem(key);
      const now = Date.now();
      
      let attempts: number[] = stored ? JSON.parse(stored) : [];
      
      // Filter old attempts outside the window
      attempts = attempts.filter(time => now - time < WINDOW_MS);
      
      // Update storage with cleaned attempts
      localStorage.setItem(key, JSON.stringify(attempts));
      
      if (attempts.length >= MAX_ATTEMPTS) {
        return { allowed: false, remaining: 0 };
      }
      
      return { allowed: true, remaining: MAX_ATTEMPTS - attempts.length };
    } catch {
      // If localStorage fails, allow the attempt
      return { allowed: true, remaining: MAX_ATTEMPTS };
    }
  }, [getStorageKey]);

  const recordAttempt = useCallback(() => {
    try {
      const key = getStorageKey();
      const stored = localStorage.getItem(key);
      const now = Date.now();
      
      let attempts: number[] = stored ? JSON.parse(stored) : [];
      
      // Filter old attempts and add new one
      attempts = attempts.filter(time => now - time < WINDOW_MS);
      attempts.push(now);
      
      localStorage.setItem(key, JSON.stringify(attempts));
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }, [getStorageKey]);

  return { checkLimit, recordAttempt };
};

export default useRateLimiter;
