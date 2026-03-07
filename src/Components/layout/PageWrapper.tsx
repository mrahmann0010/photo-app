import React from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface PageWrapperProps {
  children: React.ReactNode;
}

/**
 * Wraps each page route with a curtain-wipe entrance/exit animation.
 * Renders as a simple div inside AnimatePresence.
 */
export default function PageWrapper({ children }: PageWrapperProps) {
  const reduceMotion = usePrefersReducedMotion();

  const variants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit:    { opacity: 0 },
      }
    : {
        initial: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        animate: {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
        },
        exit: {
          clipPath: 'inset(0 0 0 100%)',
          opacity: 1,
          transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
        },
      };

  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}
