import { useState, useEffect, useCallback } from "react";

const MIN_SUBMIT_TIME_MS = 3000; // Minimum 3 seconds to fill form
const HONEYPOT_FIELD_NAME = "website_url"; // Looks like a real field to bots

interface SpamProtectionResult {
  honeypotValue: string;
  setHoneypotValue: (value: string) => void;
  honeypotFieldName: string;
  isSpam: () => boolean;
  resetTimer: () => void;
  getSpamReason: () => string | null;
}

export const useSpamProtection = (): SpamProtectionResult => {
  const [honeypotValue, setHoneypotValue] = useState("");
  const [formLoadTime, setFormLoadTime] = useState<number>(Date.now());

  useEffect(() => {
    setFormLoadTime(Date.now());
  }, []);

  const resetTimer = useCallback(() => {
    setFormLoadTime(Date.now());
    setHoneypotValue("");
  }, []);

  const getSpamReason = useCallback((): string | null => {
    // Check honeypot - bots often fill all fields
    if (honeypotValue.trim() !== "") {
      return "honeypot";
    }

    // Check submission time - bots submit instantly
    const timeSpent = Date.now() - formLoadTime;
    if (timeSpent < MIN_SUBMIT_TIME_MS) {
      return "too_fast";
    }

    return null;
  }, [honeypotValue, formLoadTime]);

  const isSpam = useCallback((): boolean => {
    return getSpamReason() !== null;
  }, [getSpamReason]);

  return {
    honeypotValue,
    setHoneypotValue,
    honeypotFieldName: HONEYPOT_FIELD_NAME,
    isSpam,
    resetTimer,
    getSpamReason,
  };
};

export default useSpamProtection;
