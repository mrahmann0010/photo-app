import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface HeroSectionProps {
  /** Background image URL */
  backgroundImage?: string;
  /** Background gradient / fallback */
  backgroundClass?: string;
  minHeight?: string;
  children: React.ReactNode;
  className?: string;
  /** Enable Ken Burns (slow zoom) effect on the background image */
  kenBurns?: boolean;
  /** Enable parallax offset as user scrolls */
  parallax?: boolean;
}

/**
 * Full-viewport hero section with an optional Ken Burns effect
 * on the background image and a slight parallax scroll offset.
 */
export default function HeroSection({
  backgroundImage,
  backgroundClass = '',
  minHeight = '100vh',
  children,
  className = '',
  kenBurns = true,
  parallax = true,
}: HeroSectionProps) {
  const reduceMotion = usePrefersReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden flex items-end ${className}`}
      style={{ minHeight }}
    >
      {/* Background layer */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={parallax && !reduceMotion ? { y } : undefined}
        animate={kenBurns && !reduceMotion ? { scale: [1, 1.06] } : undefined}
        transition={kenBurns ? { duration: 18, ease: 'linear', repeat: Infinity, repeatType: 'reverse' } : undefined}
      >
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ minHeight: '110%' }}
          />
        ) : (
          <div className={`w-full h-full ${backgroundClass}`} />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
