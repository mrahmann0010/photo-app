import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCarousel } from '../../hooks/useCarousel';
import ScrubberBar from '../../../detail/ScrubberBar';
import type { PhotoSrc } from '../../types/gallery';

interface PhotoCarouselProps {
  photos: PhotoSrc[];
}

const SPRING = { type: 'spring', stiffness: 280, damping: 28 } as const;

export default function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const { index, setIndex, dragHandlers } = useCarousel({ total: photos.length });

  // Responsive card dimensions
  const { cardW, cardH } = useMemo(() => {
    if (typeof window === 'undefined') return { cardW: 280, cardH: 400 };
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      cardW: Math.min(vw - 88, 310),
      cardH: Math.min(Math.floor(vh * 0.50), 490),
    };
  }, []);

  const gap = 14;
  const step = cardW + gap;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Carousel track */}
      <div
        className="flex-1 overflow-hidden flex items-center select-none cursor-grab active:cursor-grabbing"
        {...dragHandlers}
        style={{ touchAction: 'pan-y' }}
      >
        <motion.div
          className="flex items-center"
          style={{ gap, paddingLeft: `calc(50% - ${cardW / 2}px)`, paddingRight: `calc(50% - ${cardW / 2}px)` }}
          animate={{ x: -(index * step) }}
          transition={SPRING}
        >
          {photos.map((photo, i) => {
            const isCurrent = i === index;
            return (
              <motion.div
                key={i}
                className="flex-shrink-0 overflow-hidden"
                style={{
                  width: cardW,
                  height: cardH,
                  borderRadius: 22,
                  boxShadow: isCurrent
                    ? '0 8px 36px rgba(0,0,0,0.16)'
                    : '0 4px 16px rgba(0,0,0,0.08)',
                  background: '#bbb',
                }}
                animate={{
                  scale:   isCurrent ? 1 : 0.86,
                  opacity: isCurrent ? 1 : 0.52,
                }}
                transition={SPRING}
              >
                <img
                  src={photo.full}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover block pointer-events-none"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Scrubber */}
      <ScrubberBar total={photos.length} index={index} onSeek={setIndex} />
    </div>
  );
}
