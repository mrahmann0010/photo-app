import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUIStore } from '../../store/uiStore';

/**
 * Cinematic first-load intro sequence:
 * 1. Dark screen with a counter 0 → 100
 * 2. Counter fades out
 * 3. Screen curtain wipes away
 * 4. Sets loadingComplete in the global store
 *
 * Total duration: ~2s
 */
export default function LoadingScreen() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'reveal' | 'done'>('counting');
  const setLoadingComplete = useUIStore((s) => s.setLoadingComplete);

  /* Count 0 → 100 over ~1.2s */
  useEffect(() => {
    const duration = 1200;
    const interval = duration / 100;
    let current = 0;

    const id = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 100) {
        clearInterval(id);
        setPhase('reveal');
        setTimeout(() => {
          setPhase('done');
          setLoadingComplete();
        }, 700);
      }
    }, interval);

    return () => clearInterval(id);
  }, [setLoadingComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        className="fixed inset-0 z-[99999] bg-[#0A0A0A] flex items-end justify-end p-10"
        animate={
          phase === 'reveal'
            ? { clipPath: 'inset(0 0 100% 0)' }
            : { clipPath: 'inset(0 0 0% 0)' }
        }
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.span
          className="font-playfair text-[clamp(2rem,6vw,5rem)] text-[#F2F0EB] tabular-nums"
          animate={phase === 'reveal' ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(count).padStart(3, '0')}
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
}
