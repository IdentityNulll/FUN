import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { BioParticles } from '../components/effects/BioParticles';
import { FINAL, FROM, RECIPIENT_NAME } from '../data/content';
import { EASE } from '../utils/constants';

/**
 * FINAL SCENE — the ocean settles into moonlit calm. Fireflies of light
 * drift up, the moon reflects on the water, and the birthday message
 * surfaces line by line. No confetti — only glow.
 */
export function FinalScene() {
  return (
    <Section id="final" className="min-h-screen">
      {/* the moon, high and soft */}
      <motion.div
        className="absolute left-1/2 top-16 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-br from-white via-surface to-glow-cyan"
        style={{ boxShadow: '0 0 120px 40px rgba(190,233,255,0.5)' }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 2 },
          scale: { duration: 2, ease: EASE.water },
          y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* fireflies of light */}
      <BioParticles count={44} />

      {/* moonlit water line + shimmering reflection */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3">
        <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 to-transparent" />
        <motion.div
          className="absolute inset-x-0 top-0 mx-auto h-40 w-40 -translate-y-1/2 rounded-[100%] bg-surface/20 blur-2xl"
          animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [1, 1.4, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ left: 0, right: 0 }}
        />
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <Reveal delay={0.3}>
          <motion.h2
            className="font-display text-5xl font-light text-surface text-glow sm:text-8xl"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            {FINAL.greeting}
          </motion.h2>
        </Reveal>

        <Reveal delay={0.7}>
          <p className="mt-3 font-display text-2xl italic text-glow-cyan text-glow-soft sm:text-3xl">
            {RECIPIENT_NAME}
          </p>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FINAL.poem.map((line, i) => (
            <Reveal key={i} delay={1 + i * 0.6}>
              <p className="font-display text-xl font-light leading-relaxed text-surface/85 sm:text-2xl">
                {line}
              </p>
            </Reveal>
          ))}
        </div>

        {FROM && (
          <Reveal delay={1 + FINAL.poem.length * 0.6 + 0.5}>
            <p className="mt-12 font-sans text-sm uppercase tracking-[0.3em] text-surface/40">
              with love, {FROM}
            </p>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
