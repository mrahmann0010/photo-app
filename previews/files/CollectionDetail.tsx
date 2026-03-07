import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoCarousel from './PhotoCarousel';
import type { Collection } from '../../types/gallery';

interface CollectionDetailProps {
  collection: Collection | null;
  onClose: () => void;
  onLikeToggle: (key: string) => void;
}

const SHEET_VARIANTS = {
  hidden: { y: '102%' },
  visible: {
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 30 },
  },
  exit: {
    y: '102%',
    transition: { type: 'spring', stiffness: 300, damping: 36 },
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? '#e5473d' : 'none'}
      stroke={filled ? '#e5473d' : 'currentColor'} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function SliderIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
      <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
      <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/>
      <line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  );
}

// ─── ActionButton ─────────────────────────────────────────────────────────────

interface ActionButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  active?: boolean;
}

function ActionButton({ onClick, children, active }: ActionButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.86 }}
      onClick={onClick}
      className="flex items-center justify-center border-none cursor-pointer"
      style={{
        width: 54, height: 54, borderRadius: '50%',
        background: active ? 'rgba(229,71,61,0.1)' : 'rgba(0,0,0,0.065)',
        color: '#2a2a30',
      }}
    >
      {children}
    </motion.button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CollectionDetail({ collection, onClose, onLikeToggle }: CollectionDetailProps) {
  const [likeAnimating, setLikeAnimating] = useState(false);

  const handleLike = useCallback(() => {
    if (!collection) return;
    setLikeAnimating(true);
    onLikeToggle(collection.key);
    setTimeout(() => setLikeAnimating(false), 320);
  }, [collection, onLikeToggle]);

  // Back-swipe from left edge
  const swipeStartX = { current: 0 };
  const handleTouchStart = (e: React.TouchEvent) => {
    swipeStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - swipeStartX.current;
    if (dx > 72 && swipeStartX.current < 60) onClose();
  };

  return (
    <AnimatePresence>
      {collection && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.12)' }}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            variants={SHEET_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex flex-col overflow-hidden"
            style={{
              background: '#f0ede8',
              borderRadius: '28px 28px 0 0',
              top: '4vh',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Handle */}
            <div className="flex-shrink-0 flex justify-center pt-[10px] pb-0">
              <div
                className="rounded-full"
                style={{ width: 38, height: 5, background: 'rgba(0,0,0,0.16)' }}
              />
            </div>

            {/* Header */}
            <div className="flex-shrink-0 flex flex-col items-center px-6 pt-[14px] pb-[10px] relative">
              <button
                onClick={onClose}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center border-none cursor-pointer"
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.07)', color: '#2a2a2a',
                }}
              >
                <ChevronLeft />
              </button>

              <h2
                className="text-[17px] font-semibold tracking-[-0.03em]"
                style={{ color: '#18181c' }}
              >
                {collection.title}
              </h2>
              <p
                className="text-[12.5px] mt-[2px] tracking-[-0.01em]"
                style={{ color: 'rgba(0,0,0,0.40)' }}
              >
                {collection.count} photos
              </p>
            </div>

            {/* Carousel — flex-1 so it fills remaining space */}
            <PhotoCarousel photos={collection.photos} />

            {/* Location */}
            <div
              className="flex-shrink-0 text-center text-[13px] tracking-[-0.01em] py-[8px]"
              style={{ color: 'rgba(0,0,0,0.40)' }}
            >
              {collection.location}
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 flex justify-center gap-[18px] px-5 pb-10">
              <motion.div
                animate={{ scale: likeAnimating ? 1.42 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 14 }}
              >
                <ActionButton onClick={handleLike} active={collection.liked}>
                  <HeartIcon filled={collection.liked} />
                </ActionButton>
              </motion.div>

              <ActionButton>
                <SliderIcon />
              </ActionButton>

              <ActionButton>
                <TrashIcon />
              </ActionButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
