import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { BioParticles } from '../components/effects/BioParticles';
import { Fish } from '../components/creatures/Fish';
import { EasterEgg } from '../components/creatures/EasterEgg';

/**
 * SECTION 6 — The Deep. Almost silent, almost still. Bioluminescent motes
 * and a few glowing fish are the only light. This should feel magical and a
 * little sacred.
 */
export function DeepOcean() {
  return (
    <Section id="deep" className="min-h-[120vh]">
      <BioParticles count={48} />

      {/* rare glowing fish */}
      <Fish top={30} duration={40} color="#7FFFF0" size={22} />
      <Fish top={62} duration={46} delay={10} color="#8A7FFF" size={18} direction="rtl" />

      {/* Easter egg: a clever octopus in the dark */}
      <EasterEgg id="octopus" emoji="🐙" top="70%" left="20%" flee="up" />

      <div className="relative z-10 max-w-xl text-center">
        <Reveal>
          <p className="mb-3 font-sans text-sm uppercase tracking-[0.35em] text-glow-purple/80">
            The Deep
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="font-display text-4xl font-light leading-relaxed text-surface/90 text-glow sm:text-6xl">
            Even here,
            <br />
            there is light.
          </h2>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mx-auto mt-6 max-w-sm font-sans text-surface/50">
            The deepest parts of the ocean glow softest. So do the deepest
            parts of the people we love.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
