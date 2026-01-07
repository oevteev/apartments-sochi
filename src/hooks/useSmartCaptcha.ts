import { useEffect, useRef, useCallback, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Check if running on Lovable preview domain
const isPreviewDomain = (): boolean => {
  const hostname = window.location.hostname;
  return hostname.includes('preview--') && hostname.endsWith('.lovable.app');
};

declare global {
  interface Window {
    smartCaptcha?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          invisible?: boolean;
          hl?: string;
          callback?: (token: string) => void;
        }
      ) => number;
      execute: (widgetId: number) => void;
      reset: (widgetId: number) => void;
      destroy: (widgetId: number) => void;
    };
    smartCaptchaOnload?: () => void;
  }
}

interface UseSmartCaptchaOptions {
  onSuccess?: (token: string) => void;
  onError?: () => void;
}

export const useSmartCaptcha = (options: UseSmartCaptchaOptions = {}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const callbackRef = useRef<((token: string) => void) | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientKey, setClientKey] = useState<string | null>(null);
  const initAttemptedRef = useRef(false);

  // Fetch client key from edge function (skip for preview domains)
  useEffect(() => {
    // Skip captcha for preview domains
    if (isPreviewDomain()) {
      console.log("Preview domain detected, skipping SmartCaptcha");
      setIsReady(true);
      return;
    }

    const fetchClientKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("get-captcha-key");
        if (error) {
          console.error("Failed to fetch captcha key:", error);
          return;
        }
        if (data?.clientKey) {
          setClientKey(data.clientKey);
        }
      } catch (e) {
        console.error("Error fetching captcha key:", e);
      }
    };

    fetchClientKey();
  }, []);

  // Load SmartCaptcha script
  useEffect(() => {
    if (!clientKey) return;

    if (document.getElementById("smartcaptcha-script")) {
      if (window.smartCaptcha) {
        setIsReady(true);
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "smartcaptcha-script";
    script.src = "https://smartcaptcha.yandexcloud.net/captcha.js?render=onload&onload=smartCaptchaOnload";
    script.async = true;
    script.defer = true;

    window.smartCaptchaOnload = () => {
      setIsReady(true);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (widgetIdRef.current !== null && window.smartCaptcha) {
        try {
          window.smartCaptcha.destroy(widgetIdRef.current);
        } catch (e) {
          // Widget might already be destroyed
        }
      }
    };
  }, [clientKey]);

  // Initialize widget when ready
  useEffect(() => {
    if (!isReady || !containerRef.current || !window.smartCaptcha || !clientKey) {
      return;
    }

    if (initAttemptedRef.current) {
      return; // Already attempted initialization
    }

    initAttemptedRef.current = true;

    try {
      widgetIdRef.current = window.smartCaptcha.render(containerRef.current, {
        sitekey: clientKey,
        invisible: true,
        hl: "ru",
        callback: (token: string) => {
          setIsLoading(false);
          if (callbackRef.current) {
            callbackRef.current(token);
            callbackRef.current = null;
          }
          options.onSuccess?.(token);
        },
      });
    } catch (e) {
      console.error("SmartCaptcha render error:", e);
      options.onError?.();
    }
  }, [isReady, clientKey, options]);

  const execute = useCallback((): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Bypass for preview domains
      if (isPreviewDomain()) {
        console.log("Preview domain: bypassing captcha with preview token");
        resolve("preview-bypass");
        return;
      }

      if (!window.smartCaptcha || widgetIdRef.current === null) {
        reject(new Error("SmartCaptcha not initialized"));
        return;
      }

      setIsLoading(true);
      callbackRef.current = resolve;

      try {
        window.smartCaptcha.execute(widgetIdRef.current);
      } catch (e) {
        setIsLoading(false);
        callbackRef.current = null;
        reject(e);
      }
    });
  }, []);

  const reset = useCallback(() => {
    if (window.smartCaptcha && widgetIdRef.current !== null) {
      try {
        window.smartCaptcha.reset(widgetIdRef.current);
      } catch (e) {
        // Widget might be in an invalid state
      }
    }
    setIsLoading(false);
    callbackRef.current = null;
  }, []);

  return {
    containerRef,
    execute,
    reset,
    isReady: isPreviewDomain() || (isReady && clientKey !== null && widgetIdRef.current !== null),
    isLoading,
  };
};

export default useSmartCaptcha;
