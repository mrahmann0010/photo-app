import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import ZigzagRow from '../components/gallery/ZigzagRow';
import CollectionDetail from '../components/gallery/CollectionDetail';
import GalleryBottomBar from '../components/gallery/GalleryBottomBar';
import { usePinchZoom } from '../hooks/usePinchZoom';

import { collections as initialCollections } from '../data/gallery-collections';
import type { Collection, ZoomLevel } from '../types/gallery';

const ZOOM_SCALE: Record<ZoomLevel, number> = { '-1': 0.70, '0': 1, '1': 1.32 };

function TopBar() {
  return (
    <div
      className="flex items-center justify-between px-[22px] relative flex-shrink-0"
      style={{ paddingTop: 'max(52px, env(safe-area-inset-top, 52px))', paddingBottom: 10 }}
    >
      <div className="flex items-center gap-[9px]">
        <div
          className="overflow-hidden flex-shrink-0"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
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
    </div>
  );
}

export default function GalleryPage() {

  const [collections, setCollections] = useState(initialCollections);
  const [activeKey, setActiveKey] = useState(null);
  const [zoom, setZoom] = useState(0);
  const [query, setQuery] = useState('');

  const activeCollection = useMemo(
    () => collections.find((c) => c.key === activeKey) ?? null,
    [collections, activeKey]
  );

  const filteredKeys = useMemo(() => {

    if (!query.trim()) return new Set();

    const q = query.toLowerCase();
    const excluded = new Set();

    collections.forEach((c) => {
      if (!c.title.toLowerCase().includes(q) && !c.location.toLowerCase().includes(q)) {
        excluded.add(c.key);
      }
    });

    return excluded;

  }, [collections, query]);

  const openCollection = useCallback((key) => setActiveKey(key), []);
  const closeCollection = useCallback(() => setActiveKey(null), []);

  const handleLikeToggle = useCallback((key) => {
    setCollections((prev) =>
      prev.map((c) => (c.key === key ? { ...c, liked: !c.liked } : c))
    );
  }, []);

  const handleZoomIn = useCallback(() => setZoom((z) => Math.min(1, z + 1)), []);
  const handleZoomOut = useCallback(() => setZoom((z) => Math.max(-1, z - 1)), []);

  const { pinchHandlers } = usePinchZoom({ zoom, setZoom });
  const zoomScale = ZOOM_SCALE[zoom];

  return (
    <>
      <Helmet>
        <title>Gallery — Memories</title>
        <meta name="description" content="Your personal photography collections." />
      </Helmet>

      <div
        className="w-full min-h-screen flex flex-col overflow-hidden relative"
        style={{
          background: `
            radial-gradient(ellipse at 75% 5%, rgba(255,255,255,0.38) 0%, transparent 38%),
            radial-gradient(ellipse at 15% 55%, rgba(255,255,255,0.22) 0%, transparent 32%),
            radial-gradient(ellipse at 85% 80%, rgba(255,255,255,0.18) 0%, transparent 28%),
            linear-gradient(160deg, #8dbdd4 0%, #a8cedf 35%, #bcd9e8 65%, #cce2ef 100%)
          `,
        }}
      >

        <TopBar />

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

        <AnimatePresence>
          {!activeKey && (
            <GalleryBottomBar
              query={query}
              onQueryChange={setQuery}
              zoom={zoom}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
            />
          )}
        </AnimatePresence>

      </div>

      <CollectionDetail
        collection={activeCollection}
        onClose={closeCollection}
        onLikeToggle={handleLikeToggle}
      />
    </>
  );
}