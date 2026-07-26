import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { Bubbles } from '../components/effects/Bubbles';
import { MemoryCard } from '../components/creatures/MemoryCard';
import { EasterEgg } from '../components/creatures/EasterEgg';
import { MEMORIES } from '../data/content';
import { EASE } from '../utils/constants';

/**
 * SECTION 3 — Memory Reef. Photographs drift on the coral inside glass
 * frames. Tapping one opens it fullscreen.
 */
export function MemoryReef() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open !== null ? MEMORIES[open] : null;
  const [failed, setFailed] = useState(false);

  const openCard = (i: number) => {
    setFailed(false);
    setOpen(i);
  };

  return (
    <Section id="memory">
      <Bubbles count={12} />

      {/* Easter egg: a turtle drifting through */}
      <EasterEgg id="turtle" emoji="🐢" top="16%" left="8%" flee="right" />

      <div className="relative z-10 w-full max-w-5xl text-center">
        <Reveal>
          <p className="mb-3 font-sans text-sm uppercase tracking-[0.35em] text-glow-cyan">
            Memory Reef
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-display text-4xl font-light text-surface text-glow sm:text-6xl">
            Moments, drifting
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-4 max-w-md font-sans text-surface/70">
            Little pieces of us, swaying with the current. Tap one to hold it
            for a while.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {MEMORIES.map((m, i) => (
            <Reveal key={i} delay={0.1 * i} threshold={0.1}>
              <MemoryCard memory={m} index={i} onOpen={() => openCard(i)} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* fullscreen viewer */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <div className="absolute inset-0 bg-deepest/80 backdrop-blur-md" />
            <motion.figure
              className="glass-strong relative z-10 max-h-[85vh] max-w-2xl overflow-hidden rounded-3xl p-3"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE.water }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 z-10 text-surface/80 hover:text-glow-cyan"
                aria-label="Close"
              >
                <HiXMark size={26} />
              </button>
              {!failed ? (
                <img
                  src={active.src}
                  alt={active.caption}
                  onError={() => setFailed(true)}
                  className="max-h-[70vh] w-full rounded-2xl object-contain"
                />
              ) : (
                <div className="flex aspect-[4/3] w-[70vw] max-w-xl items-center justify-center rounded-2xl bg-gradient-to-br from-deep/60 to-abyss text-center text-surface/60">
                  <span className="px-8">
                    Add this photo at{' '}
                    <code className="text-glow-cyan">{active.src}</code>
                  </span>
                </div>
              )}
              <figcaption className="px-3 py-4 text-center font-display text-xl text-surface">
                {active.caption}
                {active.date && (
                  <span className="mt-1 block font-sans text-xs uppercase tracking-widest text-glow-cyan/70">
                    {active.date}
                  </span>
                )}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
