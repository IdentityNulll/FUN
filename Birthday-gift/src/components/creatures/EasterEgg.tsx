import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useAchievements } from '../../context/AchievementProvider';

interface EasterEggProps {
  id: string;
  emoji: string;
  /** Position within the nearest positioned ancestor. */
  top: string;
  left?: string;
  right?: string;
  size?: number;
  /** Direction it darts off when found. */
  flee?: 'left' | 'right' | 'up';
}

/**
 * A small, subtle sea creature tucked into a scene. It idles almost
 * invisibly, brightens on hover, and — once clicked — records the discovery
 * and gently swims out of view.
 */
export function EasterEgg({
  id,
  emoji,
  top,
  left,
  right,
  size = 26,
  flee = 'right',
}: EasterEggProps) {
  const { discover, isFound } = useAchievements();
  const [gone, setGone] = useState(false);

  if (isFound(id) || gone) return null;

  const fleeTarget =
    flee === 'left'
      ? { x: -160, opacity: 0 }
      : flee === 'up'
        ? { y: -160, opacity: 0 }
        : { x: 160, opacity: 0 };

  return (
    <AnimatePresence>
      <motion.button
        className="absolute z-30 select-none"
        style={{ top, left, right, fontSize: size, lineHeight: 1 }}
        initial={{ opacity: 0.25 }}
        animate={{
          opacity: [0.22, 0.4, 0.22],
          y: [0, -6, 0],
          rotate: [-4, 4, -4],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ opacity: 1, scale: 1.35 }}
        exit={fleeTarget}
        onClick={() => {
          discover(id);
          setGone(true);
        }}
        aria-label={`Hidden creature: ${emoji}`}
      >
        {emoji}
      </motion.button>
    </AnimatePresence>
  );
}
