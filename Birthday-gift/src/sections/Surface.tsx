import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { SunRays } from '../components/effects/SunRays';
import { Bubbles } from '../components/effects/Bubbles';
import { Fish } from '../components/creatures/Fish';
import { EasterEgg } from '../components/creatures/EasterEgg';
import { RECIPIENT_NAME } from '../data/content';

/**
 * SECTION 1 — The Surface. Bright, sunlit, peaceful. The first breath
 * underwater and the warm welcome by name.
 */
export function Surface() {
  return (
    <Section id="surface">
      <SunRays count={7} />
      <Bubbles count={20} />

      <Fish top={22} duration={26} color="#BEE9FF" size={40} />
      <Fish top={68} duration={32} delay={6} color="#7FFFF0" size={30} direction="rtl" />
      <Fish top={44} duration={30} delay={12} color="#65C9FF" size={52} />

      {/* Easter egg: a tiny fish near the surface */}
      <EasterEgg id="fish" emoji="🐠" top="80%" left="12%" flee="right" />

      <div className="relative z-10 max-w-2xl text-center">
        <Reveal>
          <p className="mb-4 font-sans text-sm uppercase tracking-[0.35em] text-deep">
            The Surface
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="font-display text-5xl font-light leading-tight text-dark text-glow-soft sm:text-7xl">
            Welcome,
            <br />
            {RECIPIENT_NAME}
          </h2>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mx-auto mt-6 max-w-md font-sans text-lg text-dark/80">
            The water is warm and bright here. Keep scrolling — there is a
            whole world waiting beneath us.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.9} className="absolute bottom-10">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-dark/50">
          scroll to descend ↓
        </span>
      </Reveal>
    </Section>
  );
}
