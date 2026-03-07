import { useState, useRef, useCallback, useEffect } from 'react';

interface UseCarouselOptions {
  total: number;
  onIndexChange?: (index: number) => void;
}

interface UseCarouselReturn {
  index: number;
  setIndex: (i: number) => void;
  goNext: () => void;
  goPrev: () => void;
  dragHandlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
}

export function useCarousel({ total, onIndexChange }: UseCarouselOptions): UseCarouselReturn {
  const [index, setIndexState] = useState(0);
  const dragRef = useRef({ active: false, x0: 0, xCurrent: 0 });

  const setIndex = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(total - 1, i));
    setIndexState(clamped);
    onIndexChange?.(clamped);
  }, [total, onIndexChange]);

  const goNext = useCallback(() => setIndex(index + 1), [index, setIndex]);
  const goPrev = useCallback(() => setIndex(index - 1), [index, setIndex]);

  // Mouse drag
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragRef.current = { active: true, x0: e.clientX, xCurrent: e.clientX };
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dragRef.current.active) dragRef.current.xCurrent = e.clientX;
    };
    const onMouseUp = () => {
      if (!dragRef.current.active) return;
      const diff = dragRef.current.xCurrent - dragRef.current.x0;
      if (Math.abs(diff) > 40) diff < 0 ? goNext() : goPrev();
      dragRef.current.active = false;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [goNext, goPrev]);

  // Touch swipe
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragRef.current = { active: true, x0: e.touches[0].clientX, xCurrent: e.touches[0].clientX };
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - dragRef.current.x0;
    if (Math.abs(diff) > 40) diff < 0 ? goNext() : goPrev();
    dragRef.current.active = false;
  }, [goNext, goPrev]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft')  goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  return { index, setIndex, goNext, goPrev, dragHandlers: { onMouseDown, onTouchStart, onTouchEnd } };
}
