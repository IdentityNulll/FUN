import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAchievements } from '../../context/AchievementProvider';
import { useDive } from '../../context/DiveProvider';
import { EASE } from '../../utils/constants';

/** Discovery counter (top-left of controls) + a transient toast on find. */
export function AchievementHUD() {
  const { found, total, last, clearLast } = useAchievements();
  const { dived } = useDive();

  useEffect(() => {
    if (!last) return;
    const t = setTimeout(clearLast, 3800);
    return () => clearTimeout(t);
  }, [last, clearLast]);

  return (
    <>
      <AnimatePresence>
        {dived && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass fixed right-[68px] top-5 z-50 flex h-11 items-center gap-2 rounded-full px-4 text-sm text-surface/90"
          >
            <span className="text-glow-cyan">🐚</span>
            <span className="tabular-nums">
              {found.length}/{total}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {last && (
          <motion.div
            key={last.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.8, ease: EASE.water }}
            className="glass-strong fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-2xl px-6 py-4"
          >
            <span className="text-3xl">{last.emoji}</span>
            <div>
              <div className="font-display text-lg text-glow-cyan text-glow">
                {last.name} found
              </div>
              <div className="font-sans text-sm text-surface/80">
                {last.reward}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
