import { useRef, useCallback } from 'react';
import type { ZoomLevel } from '../types/gallery';

interface UsePinchZoomOptions {
  zoom: ZoomLevel;
  setZoom: (z: ZoomLevel) => void;
}

export function usePinchZoom({ zoom, setZoom }: UsePinchZoomOptions) {
  const pinch0 = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 2) return;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    pinch0.current = Math.hypot(dx, dy);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 2) return;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const dist = Math.hypot(dx, dy);
    const ratio = dist / pinch0.current;

    if (ratio > 1.28 && zoom < 1)  { setZoom(1);  pinch0.current = dist; }
    if (ratio < 0.72 && zoom > -1) { setZoom(-1); pinch0.current = dist; }
    if (ratio > 0.88 && ratio < 1.12 && zoom !== 0) { setZoom(0); }
  }, [zoom, setZoom]);

  return { pinchHandlers: { onTouchStart, onTouchMove } };
}
