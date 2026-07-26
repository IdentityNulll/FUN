import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiOutlinePhoto } from 'react-icons/hi2';
import type { Memory } from '../../data/content';

interface MemoryCardProps {
  memory: Memory;
  index: number;
  onOpen: () => void;
}

/**
 * A photograph tethered to the reef inside a glass frame. It drifts with the
 * current and lifts on hover. If the image is missing (none added yet), a
 * soft gradient placeholder is shown instead so nothing ever looks broken.
 */
export function MemoryCard({ memory, index, onOpen }: MemoryCardProps) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.button
      onClick={onOpen}
      className="glass group relative block overflow-hidden rounded-2xl p-2 text-left"
      style={{ width: 'min(78vw, 260px)' }}
      whileHover={{ scale: 1.04, y: -8 }}
      animate={{ y: [0, index % 2 ? 10 : -10, 0], rotate: [index % 2 ? -1.5 : 1.5, index % 2 ? 1.5 : -1.5, index % 2 ? -1.5 : 1.5] }}
      transition={{
        y: { duration: 6 + index, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 8 + index, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: 0.4 },
      }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
        {!failed ? (
          <img
            src={memory.src}
            alt={memory.caption}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-deep/60 via-dark/60 to-abyss text-surface/50">
            <HiOutlinePhoto size={34} />
            <span className="px-4 text-center text-xs">
              add your photo at
              <br />
              <code className="text-glow-cyan">{memory.src}</code>
            </span>
          </div>
        )}
        {/* watery sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/60 via-transparent to-transparent" />
      </div>
      <div className="px-2 pb-1 pt-3">
        <p className="font-display text-lg leading-snug text-surface">
          {memory.caption}
        </p>
        {memory.date && (
          <p className="mt-1 font-sans text-xs uppercase tracking-widest text-glow-cyan/70">
            {memory.date}
          </p>
        )}
      </div>
    </motion.button>
  );
}
