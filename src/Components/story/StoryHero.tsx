import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface StoryHeroProps {
  heroImage: string;
  title: string;
  subtitle?: string;
  location?: string;
  readTime?: string;
}

/**
 * Full-bleed hero for a photo story page.
 * Background image has a parallax offset as user scrolls.
 * Title animates in on mount.
 */
export default function StoryHero({ heroImage, title, subtitle, location, readTime }: StoryHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-end">
      {/* Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={!reduceMotion ? { y } : undefined}
      >
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ minHeight: '110%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-16 pb-16 md:pb-24 max-w-[1440px] mx-auto">
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3 max-w-3xl"
        >
          {(location || readTime) && (
            <div className="flex items-center gap-4 text-caption font-inter text-text-secondary uppercase tracking-widest">
              {location && <span>{location}</span>}
              {location && readTime && <span className="opacity-30">·</span>}
              {readTime && <span>{readTime}</span>}
            </div>
          )}
          <h1 className="font-playfair text-display-xl text-text-primary leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-body-lg text-text-secondary">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
