import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

/**
 * Initialises Lenis smooth scroll for the whole app.
 * Call once at the root level.
 */
export function useSmoothScroll() {
  useEffect(() => {
    lenisInstance = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);
}

/** Manually scroll to an element */
export function scrollTo(target: HTMLElement | string, offset = 0) {
  lenisInstance?.scrollTo(target as HTMLElement, { offset });
}
