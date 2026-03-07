import { motion, AnimatePresence } from 'motion/react';
import { useCustomCursor } from '../../hooks/useCustomCursor';
import { useIsDesktop } from '../../hooks/useMediaQuery';

/**
 * Custom cursor dot that follows the mouse with a lerp-smoothed trail.
 * Expands on hover over images, shows "VIEW" text over CollectionCards.
 * Only rendered on desktop (hover-capable devices).
 */
export default function CustomCursor() {
  const isDesktop = useIsDesktop();
  const { position, isVisible, cursorVariant } = useCustomCursor();

  if (!isDesktop) return null;

  const sizeMap = {
    default: 8,
    expand: 48,
    text: 64,
  };

  const size = sizeMap[cursorVariant];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{
            x: position.x,
            y: position.y,
            width: size,
            height: size,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.5 }}
          initial={{ opacity: 0, scale: 0 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div
            className="w-full h-full rounded-full border border-[#F2F0EB] mix-blend-difference
              flex items-center justify-center"
            style={{
              backgroundColor:
                cursorVariant === 'expand' ? 'rgba(242,240,235,0.08)' : 'transparent',
            }}
          >
            {cursorVariant === 'text' && (
              <span className="text-[#F2F0EB] text-[9px] font-inter font-semibold uppercase tracking-widest leading-none">
                VIEW
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
