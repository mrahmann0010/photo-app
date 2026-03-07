import { useState } from 'react';
import { motion } from 'framer-motion';
import type { PhotoSrc } from '../../types/gallery';

interface ClusterCardProps {
  photos: PhotoSrc[];   // first 3 are used
  onClick: () => void;
  className?: string;
}

const CARD_CONFIGS = [
  // k1: back-left, smallest
  {
    width: 108, height: 116,
    style: { top: 28, left: 2, zIndex: 1 },
    restRotate: -11,
    hoverRotate: -14, hoverX: -9, hoverY: 7,
  },
  // k2: mid
  {
    width: 116, height: 122,
    style: { top: 12, left: 28, zIndex: 2 },
    restRotate: -3.5,
    hoverRotate: -5, hoverX: -4, hoverY: 1,
  },
  // k3: front-right, largest
  {
    width: 142, height: 158,
    style: { top: 0, left: 58, zIndex: 3 },
    restRotate: 5,
    hoverRotate: 7, hoverX: 5, hoverY: -3,
  },
] as const;

const SPRING = { type: 'spring', stiffness: 260, damping: 22 } as const;

export default function ClusterCard({ photos, onClick, className = '' }: ClusterCardProps) {
  const [hovered, setHovered] = useState(false);
  const preview = photos.slice(0, 3);

  return (
    <motion.div
      className={`relative cursor-pointer select-none ${className}`}
      style={{ width: 214, height: 196 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      transition={SPRING}
    >
      {CARD_CONFIGS.map((cfg, i) => {
        const photo = preview[i];
        if (!photo) return null;
        return (
          <motion.div
            key={i}
            className="absolute overflow-hidden"
            style={{
              width: cfg.width,
              height: cfg.height,
              top: cfg.style.top,
              left: cfg.style.left,
              zIndex: cfg.style.zIndex,
              borderRadius: 18,
              boxShadow: '0 4px 22px rgba(0,0,0,0.18)',
            }}
            animate={
              hovered
                ? {
                    rotate: cfg.hoverRotate,
                    x: cfg.hoverX,
                    y: cfg.hoverY,
                  }
                : {
                    rotate: cfg.restRotate,
                    x: 0,
                    y: 0,
                  }
            }
            transition={SPRING}
          >
            <img
              src={photo.thumbnail}
              alt=""
              loading="lazy"
              draggable={false}
              className="w-full h-full object-cover block pointer-events-none"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
