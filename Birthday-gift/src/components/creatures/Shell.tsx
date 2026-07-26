import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAudio } from '../../context/AudioProvider';

interface ShellProps {
  size?: number;
  hint?: string;
  onOpen?: () => void;
}

/**
 * A scallop shell that swings open on click, revealing a glowing pearl and
 * triggering `onOpen` (the reef section shows the message). It stays open
 * once discovered so the reef feels progressively unlocked.
 */
export function Shell({ size = 84, hint, onOpen }: ShellProps) {
  const [open, setOpen] = useState(false);
  const { play } = useAudio();

  const handle = () => {
    if (!open) {
      play('open');
      setOpen(true);
    }
    onOpen?.();
  };

  return (
    <motion.button
      onClick={handle}
      className="group relative flex flex-col items-center outline-none"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      style={{ width: size }}
      aria-label="Open shell"
    >
      {/* pearl glow revealed inside */}
      <motion.span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-cyan blur-md"
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          width: open ? size * 0.28 : 0,
          height: open ? size * 0.28 : 0,
        }}
        transition={{ duration: 0.6 }}
      />

      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="shell-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#BEE9FF" />
            <stop offset="1" stopColor="#65C9FF" />
          </linearGradient>
        </defs>
        {/* top half */}
        <motion.g
          style={{ transformOrigin: '50px 62px' }}
          initial={false}
          animate={{ rotate: open ? -32 : 0, y: open ? -4 : 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 12 }}
        >
          <path
            d="M50 62 C20 62 8 40 20 24 C28 14 40 20 50 22 C60 20 72 14 80 24 C92 40 80 62 50 62 Z"
            fill="url(#shell-grad)"
            opacity="0.95"
          />
          <path d="M50 60 L34 26 M50 60 L50 22 M50 60 L66 26" stroke="#1B7FBF" strokeWidth="1.5" opacity="0.5" />
        </motion.g>
        {/* bottom half */}
        <motion.g
          style={{ transformOrigin: '50px 62px' }}
          initial={false}
          animate={{ rotate: open ? 20 : 0, y: open ? 4 : 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 12 }}
        >
          <path
            d="M50 62 C24 62 16 74 22 84 C34 92 66 92 78 84 C84 74 76 62 50 62 Z"
            fill="url(#shell-grad)"
            opacity="0.8"
          />
        </motion.g>
      </svg>

      {hint && (
        <span className="pointer-events-none mt-1 text-[11px] uppercase tracking-widest text-surface/50 opacity-0 transition-opacity group-hover:opacity-100">
          {hint}
        </span>
      )}
    </motion.button>
  );
}
