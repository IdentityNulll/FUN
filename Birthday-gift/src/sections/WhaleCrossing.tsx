import { useEffect } from 'react';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { Whale } from '../components/creatures/Whale';
import { EasterEgg } from '../components/creatures/EasterEgg';
import { useReveal } from '../hooks/useReveal';
import { useAudio } from '../context/AudioProvider';

/**
 * SECTION 5 — Whale Crossing. The water darkens and a whale drifts across,
 * unhurried. A low whale call sounds as it enters. Nothing here should be
 * rushed — the section is tall so the crossing has room to breathe.
 */
export function WhaleCrossing() {
  const { ref, inView } = useReveal(0.3);
  const { play } = useAudio();

  useEffect(() => {
    if (inView) {
      play('whale');
      const t = setTimeout(() => play('whale'), 16000);
      return () => clearTimeout(t);
    }
  }, [inView, play]);

  return (
    <Section id="whale" className="min-h-[130vh]">
      <div ref={ref} className="absolute inset-0" aria-hidden />

      {/* faint marine snow drifting down here */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(12,74,110,0.4),transparent_60%)]" />

      <Whale duration={48} />

      {/* Easter egg: a little whale companion */}
      <EasterEgg id="whale" emoji="🐳" top="24%" right="10%" flee="left" />

      <div className="relative z-10 max-w-xl text-center">
        <Reveal>
          <p className="mb-3 font-sans text-sm uppercase tracking-[0.35em] text-glow-cyan/80">
            Whale Crossing
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="font-display text-4xl font-light leading-tight text-surface/90 text-glow-soft sm:text-6xl">
            Some things are worth
            <br />
            slowing down for.
          </h2>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mx-auto mt-6 max-w-sm font-sans text-surface/85">
            Stay a moment. Watch it pass. There is no hurry down here.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
