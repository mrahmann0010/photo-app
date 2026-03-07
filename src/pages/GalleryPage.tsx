import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import ZigzagRow from '../components/gallery/ZigzagRow';
import CollectionDetail from '../components/gallery/CollectionDetail';
import GalleryBottomBar from '../components/gallery/GalleryBottomBar';
import { usePinchZoom } from '../hooks/usePinchZoom';

import { collections as initialCollections } from '../data/gallery-collections';
import type { Collection, ZoomLevel } from '../types/gallery';

// ─── Zoom scale map ───────────────────────────────────────────────────────────
const ZOOM_SCALE: Record<ZoomLevel, number> = { '-1': 0.70, '0': 1, '1': 1.32 };

// ─── Profile avatar (replace src with your own) ───────────────────────────────
function TopBar() {
  return (
    <div
      className="flex items-center justify-between px-[22px] relative z-10 flex-shrink-0"
      style={{ paddingTop: 'max(52px, env(safe-area-inset-top, 52px))', paddingBottom: 10 }}
    >
      <div className="flex items-center gap-[9px]">
        <div
          className="overflow-hidden flex-shrink-0"
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.75)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.13)',
            background: '#ccc',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80"
            alt="Profile"
            className="w-full h-full object-cover block"
          />
        </div>
        <div
          className="px-[13px] py-[5px] text-[12.5px] font-medium tracking-[-0.015em]"
          style={{
            background: 'rgba(255,255,255,0.64)',
            backdropFilter: 'blur(18px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(18px) saturate(1.5)',
            borderRadius: 24,
            color: '#18181c',
          }}
        >
          My Gallery
        </div>
      </div>

      <button
        className="flex items-center justify-center border-none cursor-pointer flex-shrink-0"
        style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.64)',
          backdropFilter: 'blur(18px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.5)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.13)',
          color: '#333',
        }}
        aria-label="Favourites"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>
  );
}

// ─── GalleryPage ──────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [zoom, setZoom] = useState<ZoomLevel>(0);
  const [query, setQuery] = useState('');

  // Derived state
  const activeCollection = useMemo(
    () => collections.find((c) => c.key === activeKey) ?? null,
    [collections, activeKey],
  );

  const filteredKeys = useMemo(() => {
    if (!query.trim()) return new Set<string>();
    const q = query.toLowerCase();
    const excluded = new Set<string>();
    collections.forEach((c) => {
      if (!c.title.toLowerCase().includes(q) && !c.location.toLowerCase().includes(q)) {
        excluded.add(c.key);
      }
    });
    return excluded;
  }, [collections, query]);

  // Handlers
  const openCollection = useCallback((key: string) => setActiveKey(key), []);
  const closeCollection = useCallback(() => setActiveKey(null), []);

  const handleLikeToggle = useCallback((key: string) => {
    setCollections((prev) =>
      prev.map((c) => (c.key === key ? { ...c, liked: !c.liked } : c)),
    );
  }, []);

  const handleZoomIn  = useCallback(() => setZoom((z) => Math.min(1,  z + 1) as ZoomLevel), []);
  const handleZoomOut = useCallback(() => setZoom((z) => Math.max(-1, z - 1) as ZoomLevel), []);

  // Pinch-to-zoom on the gallery scroll area
  const { pinchHandlers } = usePinchZoom({ zoom, setZoom });

  const zoomScale = ZOOM_SCALE[zoom];

  return (
    <>
      <Helmet>
        <title>Gallery — Memories</title>
        <meta name="description" content="Your personal photography collections." />
      </Helmet>

      {/*
        Full-screen container with sky gradient.
        Swap this background for your own if needed — it's all inline CSS
        so it won't bleed into your design system.
      */}
      <div
        className="fixed inset-0 flex flex-col overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at 75%  5%,  rgba(255,255,255,0.38) 0%, transparent 38%),
            radial-gradient(ellipse at 15% 55%,  rgba(255,255,255,0.22) 0%, transparent 32%),
            radial-gradient(ellipse at 85% 80%,  rgba(255,255,255,0.18) 0%, transparent 28%),
            linear-gradient(160deg, #8dbdd4 0%, #a8cedf 35%, #bcd9e8 65%, #cce2ef 100%)
          `,
        }}
      >
        {/* Top bar — always on top, never zooms */}
        <TopBar />

        {/* Scrollable, zoomable gallery area */}
        <motion.div
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{
            paddingBottom: 120,
            WebkitOverflowScrolling: 'touch',
            transformOrigin: 'top center',
            scrollbarWidth: 'none',
          }}
          animate={{ scale: zoomScale }}
          transition={{ type: 'spring', stiffness: 200, damping: 26 }}
          {...pinchHandlers}
        >
          {/* Hides scrollbar in Webkit */}
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          {/* Gallery is not visible when detail sheet is open */}
          <AnimatePresence>
            {!activeKey && (
              <motion.div
                key="gallery"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.36, ease: 'easeInOut' }}
              >
                {collections.map((col, i) => (
                  <ZigzagRow
                    key={col.key}
                    collection={col}
                    align={i % 2 === 0 ? 'left' : 'right'}
                    index={i}
                    onOpen={openCollection}
                    dimmed={filteredKeys.has(col.key)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom bar — always visible over the gallery */}
        <AnimatePresence>
          {!activeKey && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            >
              <GalleryBottomBar
                query={query}
                onQueryChange={setQuery}
                zoom={zoom}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collection detail — mounts above everything */}
      <CollectionDetail
        collection={activeCollection}
        onClose={closeCollection}
        onLikeToggle={handleLikeToggle}
      />
    </>
  );
}
