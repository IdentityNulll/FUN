import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { EASE } from '../../utils/constants';

interface MessageModalProps {
  open: boolean;
  onClose: () => void;
  emoji?: string;
  title: string;
  children: ReactNode;
}

/** A softly surfacing glass modal for revealed messages. */
export function MessageModal({
  open,
  onClose,
  emoji,
  title,
  children,
}: MessageModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-deepest/60 backdrop-blur-sm" />
          <motion.div
            className="glass-strong relative z-10 w-full max-w-md rounded-3xl p-8 text-center"
            initial={{ opacity: 0, y: 40, scale: 0.92, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.7, ease: EASE.water }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-surface/60 transition-colors hover:text-glow-cyan"
              aria-label="Close"
            >
              <HiXMark size={22} />
            </button>
            {emoji && <div className="mb-3 text-5xl">{emoji}</div>}
            <h3 className="mb-4 font-display text-2xl text-glow-cyan text-glow">
              {title}
            </h3>
            <div className="font-sans text-lg leading-relaxed text-surface/90">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
