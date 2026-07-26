import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HiArrowDown } from 'react-icons/hi2';
import { GlowButton } from '../components/ui/GlowButton';
import { Bubbles } from '../components/effects/Bubbles';
import { useAudio } from '../context/AudioProvider';
import { useDive } from '../context/DiveProvider';
import { EASE } from '../utils/constants';

/**
 * The opening. Near-black water, a slow breath of copy, then the Dive
 * button. Clicking it unlocks audio and lets the descent begin.
 */
export function Intro() {
  const { begin } = useAudio();
  const { dive, dived } = useDive();
  const [step, setStep] = useState(0);

  // reveal the copy line by line, then the button
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1400),
      setTimeout(() => setStep(2), 4200),
      setTimeout(() => setStep(3), 6600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleDive = () => {
    begin();
    dive();
  };

  return (
    <section
      id="intro"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* the surface starts almost black */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-deepest via-abyss to-deepest" />
      <Bubbles count={14} />

      <AnimatePresence>
        {!dived && (
          <motion.div
            className="flex flex-col items-center gap-8"
            exit={{ opacity: 0, y: -30, filter: 'blur(12px)' }}
            transition={{ duration: 1.2, ease: EASE.water }}
          >
            <div className="min-h-[6rem]">
              <AnimatePresence mode="wait">
                {step >= 1 && step < 2 && (
                  <motion.h1
                    key="breath"
                    className="font-display text-4xl font-light tracking-wide text-surface/90 text-glow-soft sm:text-6xl"
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 1.6, ease: EASE.water }}
                  >
                    Take a deep breath.
                  </motion.h1>
                )}
                {step >= 2 && (
                  <motion.h1
                    key="dive"
                    className="font-display text-4xl font-light tracking-wide text-surface text-glow sm:text-6xl"
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.6, ease: EASE.water }}
                  >
                    Let&apos;s go for a dive.
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.4, ease: EASE.water }}
            >
              {step >= 3 && (
                <GlowButton onClick={handleDive}>
                  Dive
                  <motion.span
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  >
                    <HiArrowDown />
                  </motion.span>
                </GlowButton>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* faint hint of what's below */}
      <motion.div
        className="pointer-events-none absolute bottom-10 text-xs uppercase tracking-[0.3em] text-surface/55"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {dived ? '' : 'sound on for the full experience'}
      </motion.div>
    </section>
  );
}
