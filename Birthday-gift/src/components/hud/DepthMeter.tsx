import { AnimatePresence, motion } from 'framer-motion';
import { useDive } from '../../context/DiveProvider';
import { SECTIONS } from '../../utils/constants';

/**
 * A slim vertical HUD on the left: a glowing marker sinks as you scroll,
 * and the current depth / section label float alongside it.
 */
export function DepthMeter() {
  const { progress, sectionIndex, depth, dived } = useDive();

  return (
    <AnimatePresence>
      {dived && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 sm:block"
        >
          <div className="relative flex items-center gap-3">
            <div className="relative h-56 w-[2px] rounded-full bg-gradient-to-b from-glow-cyan/60 via-deep/50 to-deepest">
              <motion.div
                className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-glow-cyan shadow-[0_0_12px_4px_rgba(127,255,240,0.7)]"
                style={{ top: `calc(${progress * 100}% - 6px)` }}
              />
            </div>
            <div
              className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white/90"
              style={{ textShadow: '0 1px 6px rgba(2,11,22,0.85)' }}
            >
              <div className="text-glow-cyan">{depth} m</div>
              <div className="mt-1 max-w-[120px] leading-tight">
                {SECTIONS[sectionIndex]?.label}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
