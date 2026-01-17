import { useState, useEffect, useRef, RefObject } from "react";

interface UseLazySectionOptions {
  rootMargin?: string;
  threshold?: number;
}

interface UseLazySectionReturn {
  ref: RefObject<HTMLElement>;
  isVisible: boolean;
}

/**
 * Hook for lazy loading sections using Intersection Observer
 * Improves INP and reduces initial JS execution
 */
export const useLazySection = (
  options: UseLazySectionOptions = {}
): UseLazySectionReturn => {
  const { rootMargin = "100px", threshold = 0 } = options;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { ref, isVisible };
};

export default useLazySection;
