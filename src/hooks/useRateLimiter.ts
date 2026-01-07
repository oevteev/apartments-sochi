import { useCallback, useState, useEffect } from 'react';

const STORAGE_KEY = 'form_submissions';
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export const useRateLimiter = (formType: string) => {
  const [remaining, setRemaining] = useState(MAX_ATTEMPTS);
  
  const getStorageKey = useCallback(() => `${STORAGE_KEY}_${formType}`, [formType]);

  const getCleanedAttempts = useCallback((): number[] => {
    try {
      const key = getStorageKey();
      const stored = localStorage.getItem(key);
      const now = Date.now();
      
      let attempts: number[] = stored ? JSON.parse(stored) : [];
      attempts = attempts.filter(time => now - time < WINDOW_MS);
      
      localStorage.setItem(key, JSON.stringify(attempts));
      return attempts;
    } catch {
      return [];
    }
  }, [getStorageKey]);

  const updateRemaining = useCallback(() => {
    const attempts = getCleanedAttempts();
    setRemaining(Math.max(0, MAX_ATTEMPTS - attempts.length));
  }, [getCleanedAttempts]);

  // Update remaining on mount and periodically
  useEffect(() => {
    updateRemaining();
    const interval = setInterval(updateRemaining, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [updateRemaining]);

  const checkLimit = useCallback((): { allowed: boolean; remaining: number } => {
    const attempts = getCleanedAttempts();
    const currentRemaining = MAX_ATTEMPTS - attempts.length;
    setRemaining(Math.max(0, currentRemaining));
    
    if (attempts.length >= MAX_ATTEMPTS) {
      return { allowed: false, remaining: 0 };
    }
    
    return { allowed: true, remaining: currentRemaining };
  }, [getCleanedAttempts]);

  const recordAttempt = useCallback(() => {
    try {
      const key = getStorageKey();
      const stored = localStorage.getItem(key);
      const now = Date.now();
      
      let attempts: number[] = stored ? JSON.parse(stored) : [];
      attempts = attempts.filter(time => now - time < WINDOW_MS);
      attempts.push(now);
      
      localStorage.setItem(key, JSON.stringify(attempts));
      setRemaining(Math.max(0, MAX_ATTEMPTS - attempts.length));
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }, [getStorageKey]);

  return { checkLimit, recordAttempt, remaining, maxAttempts: MAX_ATTEMPTS };
};

export default useRateLimiter;
