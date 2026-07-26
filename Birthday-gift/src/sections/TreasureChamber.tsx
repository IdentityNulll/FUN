import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { BioParticles } from '../components/effects/BioParticles';
import { EasterEgg } from '../components/creatures/EasterEgg';
import { useAudio } from '../context/AudioProvider';
import { useDive } from '../context/DiveProvider';
import { EASE } from '../utils/constants';

type Stage = 'closed' | 'open' | 'rising' | 'moon' | 'done';

/**
 * SECTION 7 — Treasure Chamber. An ancient chest glows in the dark. Opening
 * it releases a pearl that rises, expands, and becomes the moon — carrying
 * the diver up into the final, calm scene.
 */
export function TreasureChamber() {
  const [stage, setStage] = useState<Stage>('closed');
  const { play } = useAudio();
  const { scrollTo } = useDive();

  const open = () => {
    if (stage !== 'closed') return;
    play('open');
    setStage('open');
    setTimeout(() => {
      play('chime');
      setStage('rising');
    }, 1400);
    setTimeout(() => {
      play('sparkle');
      setStage('moon');
    }, 3600);
    // carry them up to the final scene while the white flash covers the screen…
    setTimeout(() => scrollTo('final'), 4900);
    // …then the flash fades out and the overlay unmounts, revealing the message
    setTimeout(() => setStage('done'), 8200);
  };

  return (
    <Section id="treasure" className="min-h-screen">
      <BioParticles count={30} />
      <EasterEgg id="shell" emoji="🐚" top="78%" right="22%" flee="left" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <p className="mb-3 font-sans text-sm uppercase tracking-[0.35em] text-glow-cyan">
            Treasure Chamber
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mb-12 font-display text-4xl font-light text-surface text-glow sm:text-6xl">
            {stage === 'closed' ? 'One last thing' : ' '}
          </h2>
        </Reveal>

        {/* the chest */}
        <motion.button
          onClick={open}
          className="relative outline-none"
          whileHover={stage === 'closed' ? { scale: 1.05 } : undefined}
          whileTap={stage === 'closed' ? { scale: 0.97 } : undefined}
          aria-label="Open the treasure chest"
        >
          {/* glow beneath the chest */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-cyan/40 blur-3xl animate-pulseGlow" />

          {/* the pearl */}
          <AnimatePresence>
            {(stage === 'open' || stage === 'rising') && (
              <motion.div
                className="absolute left-1/2 top-6 z-20 h-14 w-14 -translate-x-1/2 rounded-full bg-gradient-to-br from-white via-surface to-glow-cyan"
                style={{ boxShadow: '0 0 40px 12px rgba(190,233,255,0.8)' }}
                initial={{ y: 30, opacity: 0, scale: 0.4 }}
                animate={
                  stage === 'rising'
                    ? { y: -120, opacity: 1, scale: 1.1 }
                    : { y: -10, opacity: 1, scale: 1 }
                }
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: EASE.water }}
              />
            )}
          </AnimatePresence>

          <svg width={220} height={180} viewBox="0 0 220 180" fill="none">
            <defs>
              <linearGradient id="chest-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1B7FBF" />
                <stop offset="1" stopColor="#0C4A6E" />
              </linearGradient>
              <linearGradient id="chest-gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#BEE9FF" />
                <stop offset="1" stopColor="#65C9FF" />
              </linearGradient>
            </defs>

            {/* base */}
            <rect x="30" y="86" width="160" height="80" rx="10" fill="url(#chest-body)" />
            <rect x="30" y="86" width="160" height="18" fill="#083A5A" opacity="0.6" />
            <rect x="98" y="104" width="24" height="30" rx="4" fill="url(#chest-gold)" />
            <circle cx="110" cy="118" r="4" fill="#041C32" />

            {/* lid (rotates open) */}
            <motion.g
              style={{ transformOrigin: '110px 88px' }}
              initial={false}
              animate={{ rotate: stage === 'closed' ? 0 : -105 }}
              transition={{ type: 'spring', stiffness: 60, damping: 12 }}
            >
              <path
                d="M30 88 C30 50 190 50 190 88 Z"
                fill="url(#chest-body)"
              />
              <path
                d="M30 88 C30 52 190 52 190 88"
                stroke="url(#chest-gold)"
                strokeWidth="6"
                fill="none"
              />
              <rect x="98" y="70" width="24" height="18" rx="3" fill="url(#chest-gold)" />
            </motion.g>
          </svg>
        </motion.button>

        <AnimatePresence mode="wait">
          {stage === 'closed' && (
            <motion.p
              key="hint"
              className="mt-10 font-sans text-sm uppercase tracking-[0.3em] text-surface/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              tap to open
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* the pearl blooms into the moon and whites everything out */}
      <AnimatePresence>
        {stage === 'moon' && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-full bg-gradient-to-br from-white via-surface to-glow-cyan"
              initial={{ width: 56, height: 56, opacity: 1 }}
              animate={{
                width: ['56px', '250vmax', '250vmax', '250vmax'],
                height: ['56px', '250vmax', '250vmax', '250vmax'],
                opacity: [1, 1, 1, 0],
              }}
              transition={{
                duration: 4.4,
                ease: EASE.water,
                times: [0, 0.3, 0.62, 1],
              }}
              style={{ boxShadow: '0 0 120px 60px rgba(190,233,255,0.9)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
