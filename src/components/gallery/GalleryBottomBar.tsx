import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { ZoomLevel } from '../../types/gallery';

interface GalleryBottomBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  zoom: ZoomLevel;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ color: 'rgba(0,0,0,0.38)', flexShrink: 0 }}>
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.4" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
      <path d="M8 11h6"/>
    </svg>
  );
}

function ZoomInIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.4" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
      <path d="M11 8v6M8 11h6"/>
    </svg>
  );
}

const GLASS = {
  background: 'rgba(210,228,238,0.82)',
  backdropFilter: 'blur(20px) saturate(1.6)',
  WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
} as const;

export default function GalleryBottomBar({
  query, onQueryChange, zoom, onZoomIn, onZoomOut,
}: GalleryBottomBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-20 flex items-center gap-[10px] px-4"
      style={{
        paddingBottom: 'max(30px, env(safe-area-inset-bottom))',
        paddingTop: 10,
        background: 'linear-gradient(to top, rgba(120,172,200,0.7) 0%, transparent 100%)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
      }}
    >
      {/* Search pill */}
      <div
        className="flex-1 flex items-center gap-2 px-4 rounded-[30px]"
        style={{ ...GLASS, paddingTop: 11, paddingBottom: 11, boxShadow: '0 2px 16px rgba(0,0,0,0.10)' }}
        onClick={() => inputRef.current?.focus()}
      >
        <SearchIcon />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Show me…"
          className="flex-1 border-none bg-transparent outline-none text-[14px] tracking-[-0.01em]"
          style={{
            fontFamily: 'inherit',
            color: '#18181c',
          }}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* Zoom out */}
      <motion.button
        whileTap={{ scale: 0.82 }}
        onClick={onZoomOut}
        disabled={zoom === -1}
        className="flex items-center justify-center border-none cursor-pointer flex-shrink-0"
        style={{
          ...GLASS,
          width: 44, height: 44, borderRadius: '50%',
          color: '#2a2a30',
          boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
          opacity: zoom === -1 ? 0.4 : 1,
        }}
      >
        <ZoomOutIcon />
      </motion.button>

      {/* Zoom in */}
      <motion.button
        whileTap={{ scale: 0.82 }}
        onClick={onZoomIn}
        disabled={zoom === 1}
        className="flex items-center justify-center border-none cursor-pointer flex-shrink-0"
        style={{
          ...GLASS,
          width: 44, height: 44, borderRadius: '50%',
          color: '#2a2a30',
          boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
          opacity: zoom === 1 ? 0.4 : 1,
        }}
      >
        <ZoomInIcon />
      </motion.button>
    </div>
  );
}
