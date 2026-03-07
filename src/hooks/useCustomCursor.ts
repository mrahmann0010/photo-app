import { useState, useEffect, useCallback, useRef } from 'react';
import { useUIStore } from '../store/uiStore';

interface Position { x: number; y: number }

/**
 * Tracks cursor position with a lerp-smoothed trailing effect
 * and exposes the current cursor variant from the UI store.
 */
export function useCustomCursor() {
  const [position, setPosition] = useState<Position>({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const targetRef = useRef<Position>({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const cursorVariant = useUIStore((s) => s.cursorVariant);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    setPosition((prev) => ({
      x: lerp(prev.x, targetRef.current.x, 0.12),
      y: lerp(prev.y, targetRef.current.y, 0.12),
    }));
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Disable custom cursor for keyboard users
    const handleKeyDown = () => setIsKeyboardUser(true);
    const handleMouseMove = () => setIsKeyboardUser(false);

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return { position, isVisible: isVisible && !isKeyboardUser, cursorVariant };
}
