import { useMemo } from 'react';
import { useDive } from '../../context/DiveProvider';
import { SECTIONS } from '../../utils/constants';
import { mixHex } from '../../utils/color';

/**
 * A fixed, full-viewport gradient that smoothly interpolates between each
 * section's colour band as the user descends. This is the "water" that
 * everything else floats within — so the whole page reads as one continuous
 * body of ocean rather than stacked panels.
 */
export function DepthBackground() {
  const { progress } = useDive();

  const { top, bottom } = useMemo(() => {
    const scaled = progress * (SECTIONS.length - 1);
    const i = Math.min(Math.floor(scaled), SECTIONS.length - 2);
    const frac = scaled - i;
    const a = SECTIONS[i].gradient;
    const b = SECTIONS[i + 1].gradient;
    return {
      top: mixHex(a[0], b[0], frac),
      bottom: mixHex(a[1], b[1], frac),
    };
  }, [progress]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-20 transition-colors duration-300"
      style={{
        background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`,
      }}
    >
      {/* subtle vignette to deepen the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,11,22,0.55)_100%)]" />
    </div>
  );
}
