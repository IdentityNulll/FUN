import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { EASE } from '../../utils/constants';

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before revealing. */
  delay?: number;
  /** How far it drifts up as it fades in (px). */
  y?: number;
  className?: string;
  threshold?: number;
}

/**
 * Drift-and-fade wrapper. Nothing in the experience should "pop" — content
 * rises gently into view like it's floating up from the deep.
 */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  threshold = 0.25,
}: RevealProps) {
  const { ref, inView } = useReveal(threshold);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y, filter: 'blur(8px)' }
      }
      transition={{ duration: 1.4, delay, ease: EASE.water }}
    >
      {children}
    </motion.div>
  );
}
