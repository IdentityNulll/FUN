import { useState } from 'react';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { Bubbles } from '../components/effects/Bubbles';
import { CoralBed } from '../components/effects/CoralBed';
import { Fish } from '../components/creatures/Fish';
import { Shell } from '../components/creatures/Shell';
import { EasterEgg } from '../components/creatures/EasterEgg';
import { MessageModal } from '../components/ui/MessageModal';
import { SHELL_MESSAGES } from '../data/content';

/**
 * SECTION 2 — Coral Reef. Fish drift by and a row of shells rest on the
 * coral. Each shell opens with a spring and reveals a wish, joke or memory.
 */
export function CoralReef() {
  const [active, setActive] = useState<number | null>(null);
  const msg = active !== null ? SHELL_MESSAGES[active] : null;

  return (
    <Section id="coral">
      <Bubbles count={16} />
      <Fish top={18} duration={30} color="#7FFFF0" size={34} />
      <Fish top={30} duration={24} delay={4} color="#BEE9FF" size={26} direction="rtl" />

      {/* Easter egg: crab scuttling on the reef */}
      <EasterEgg id="crab" emoji="🦀" top="72%" right="16%" flee="left" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <p className="mb-3 font-sans text-sm uppercase tracking-[0.35em] text-glow-cyan">
            Coral Reef
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-display text-4xl font-light text-surface text-glow sm:text-6xl">
            Open a shell
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-4 max-w-md font-sans text-surface/70">
            Each one holds something just for you — a wish, a laugh, a little
            memory. Tap to open.
          </p>
        </Reveal>

        <Reveal delay={0.5} className="mt-14 w-full">
          <div className="flex flex-wrap items-end justify-center gap-8 sm:gap-12">
            {SHELL_MESSAGES.map((m, i) => (
              <Shell
                key={i}
                size={78 + (i % 3) * 10}
                hint={m.kind}
                onOpen={() => setActive(i)}
              />
            ))}
          </div>
        </Reveal>
      </div>

      <CoralBed />

      <MessageModal
        open={msg !== null}
        onClose={() => setActive(null)}
        emoji={msg?.emoji}
        title={msg?.title ?? ''}
      >
        {msg?.body}
      </MessageModal>
    </Section>
  );
}
