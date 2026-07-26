import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { Jellyfish } from '../components/creatures/Jellyfish';
import { EasterEgg } from '../components/creatures/EasterEgg';
import { MessageModal } from '../components/ui/MessageModal';
import { JELLY_MESSAGES } from '../data/content';
import { rand, times } from '../utils/random';

const GLOWS = ['#7FFFF0', '#8A7FFF', '#40E0D0', '#65C9FF'];
const COLORS = ['#8A7FFF', '#1B7FBF', '#40E0D0', '#5A8AFF'];

/**
 * SECTION 4 — Jellyfish Forest. Glowing jellies drift in the dim water.
 * Clicking one reveals a compliment or inside joke, then it gently swims
 * away, dimming the forest as its secrets are found.
 */
export function JellyfishForest() {
  const [active, setActive] = useState<number | null>(null);
  const [gone, setGone] = useState<number[]>([]);

  const jellies = useMemo(
    () =>
      times(JELLY_MESSAGES.length, (i) => ({
        i,
        left: 8 + (i * 82) / Math.max(1, JELLY_MESSAGES.length - 1) + rand(-4, 4),
        top: rand(18, 62),
        size: rand(70, 120),
        color: COLORS[i % COLORS.length],
        glow: GLOWS[i % GLOWS.length],
        driftDur: rand(7, 12),
        driftX: rand(-30, 30),
      })),
    []
  );

  const msg = active !== null ? JELLY_MESSAGES[active] : null;

  const handleClick = (i: number) => {
    setActive(i);
    setGone((g) => (g.includes(i) ? g : [...g, i]));
  };

  return (
    <Section id="jellyfish" className="min-h-[130vh]">
      {/* Easter egg: shy squid hiding low */}
      <EasterEgg id="squid" emoji="🦑" top="84%" left="46%" flee="up" />

      <div className="relative z-10 max-w-2xl text-center">
        <Reveal>
          <p className="mb-3 font-sans text-sm uppercase tracking-[0.35em] text-glow-purple">
            Jellyfish Forest
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-display text-4xl font-light text-surface text-glow sm:text-6xl">
            Touch the light
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-4 max-w-md font-sans text-surface/90">
            Each glowing jelly carries a thought meant for you. Reach out —
            they don&apos;t mind.
          </p>
        </Reveal>
      </div>

      {/* the drifting jellies */}
      {jellies.map((j) => (
        <AnimatePresence key={j.i}>
          {!gone.includes(j.i) && (
            <motion.div
              className="absolute"
              style={{ left: `${j.left}%`, top: `${j.top}%` }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                x: [0, j.driftX, 0],
                y: [0, -20, 0],
              }}
              exit={{ opacity: 0, y: -220, transition: { duration: 2.4, ease: 'easeInOut' } }}
              transition={{
                opacity: { duration: 1.5 },
                x: { duration: j.driftDur, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: j.driftDur * 0.8, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <Jellyfish
                size={j.size}
                color={j.color}
                glow={j.glow}
                interactive
                onClick={() => handleClick(j.i)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      <MessageModal
        open={msg !== null}
        onClose={() => setActive(null)}
        emoji="🪼"
        title={msg?.title ?? ''}
      >
        {msg?.body}
      </MessageModal>
    </Section>
  );
}
