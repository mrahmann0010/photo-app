import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ClusterCard from './ClusterCard';
import type { Collection } from '../../types/gallery';

interface ZigzagRowProps {
  collection: Collection;
  align: 'left' | 'right';
  index: number;
  onOpen: (key: string) => void;
  dimmed: boolean;
}

const rowVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
};

export default function ZigzagRow({
  collection, align, index, onOpen, dimmed,
}: ZigzagRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px -8% 0px' });
  const delay = index * 0.1;

  return (
    <motion.div
      ref={ref}
      custom={delay}
      variants={rowVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="flex flex-col px-6 my-[14px]"
      style={{
        alignItems: align === 'left' ? 'flex-start' : 'flex-end',
        opacity: dimmed ? 0.18 : 1,
        transform: dimmed ? 'scale(0.94)' : 'scale(1)',
        transition: 'opacity 0.28s ease, transform 0.28s ease',
      }}
    >
      {/* Label pill */}
      <div
        className="mb-2 px-[14px] py-[5px] text-[13px] font-medium tracking-[-0.02em]"
        style={{
          background: 'rgba(255,255,255,0.64)',
          backdropFilter: 'blur(14px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.4)',
          borderRadius: 22,
          color: '#18181c',
          boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
        }}
      >
        {collection.title}
      </div>

      {/* Card cluster */}
      <ClusterCard
        photos={collection.photos}
        onClick={() => onOpen(collection.key)}
      />

      {/* Photo count */}
      <span
        className="mt-[7px] text-[11px] tracking-[-0.01em]"
        style={{ color: 'rgba(0,0,0,0.40)' }}
      >
        {collection.count} photos
      </span>
    </motion.div>
  );
}
