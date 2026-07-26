import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useAudio } from '../../context/AudioProvider';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

/** The glowing, breathing call-to-action button (e.g. "Dive ↓"). */
export function GlowButton({ children, onClick, className = '' }: GlowButtonProps) {
  const { play } = useAudio();
  return (
    <motion.button
      onClick={() => {
        play('bubble');
        onClick?.();
      }}
      onHoverStart={() => play('bubble')}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className={`group relative rounded-full px-10 py-4 font-sans text-lg tracking-wide text-white ${className}`}
    >
      {/* pulsing halo */}
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-glow-cyan/30 blur-xl animate-pulseGlow" />
      <span className="absolute inset-0 rounded-full border border-glow-cyan/50 bg-white/5 backdrop-blur-md transition-colors group-hover:bg-white/10" />
      <span className="relative z-10 flex items-center gap-2 text-glow">
        {children}
      </span>
    </motion.button>
  );
}
