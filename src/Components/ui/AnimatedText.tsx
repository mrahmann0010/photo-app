import React from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface AnimatedTextProps {
  text: string;
  /** 'words' splits by word, 'chars' splits by character */
  splitBy?: 'words' | 'chars';
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

/**
 * Staggered word/character entrance animation for headlines.
 * Each unit slides up from 100% clip and fades in.
 */
export default function AnimatedText({
  text,
  splitBy = 'words',
  className = '',
  delay = 0,
  as: Tag = 'span',
}: AnimatedTextProps) {
  const reduceMotion = usePrefersReducedMotion();
  const units = splitBy === 'words' ? text.split(' ') : text.split('');

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: splitBy === 'words' ? 0.06 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const unit = {
    hidden: { opacity: 0, y: '60%' },
    visible: {
      opacity: 1,
      y: '0%',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <Tag className={`overflow-hidden ${className}`} aria-label={text}>
      <motion.span
        className="inline-flex flex-wrap gap-[0.25em]"
        variants={container}
        initial="hidden"
        animate="visible"
        aria-hidden
      >
        {units.map((u, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={unit}
          >
            {u}
            {splitBy === 'words' && i < units.length - 1 ? '' : ''}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
