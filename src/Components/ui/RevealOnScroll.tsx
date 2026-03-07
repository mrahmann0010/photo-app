import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  /** How far from the bottom of the viewport to trigger reveal */
  margin?: string;
  className?: string;
}

/**
 * Wraps children in a Framer Motion div that fades + slides up
 * as it enters the viewport.  Respects prefers-reduced-motion.
 */
export default function RevealOnScroll({
  children,
  delay = 0,
  margin = '0px 0px -80px 0px',
  className = '',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
