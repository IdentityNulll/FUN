import { useMemo } from 'react';
import { rand, times } from '../../utils/random';

interface BubblesProps {
  count?: number;
  className?: string;
}

/**
 * Tiny bubbles rising and gently scaling up. Pure CSS animation (the `rise`
 * keyframe) so it costs almost nothing and loops forever.
 */
export function Bubbles({ count = 24, className = '' }: BubblesProps) {
  const bubbles = useMemo(
    () =>
      times(count, (i) => ({
        id: i,
        left: rand(0, 100),
        size: rand(4, 14),
        duration: rand(9, 20),
        delay: rand(0, 14),
        opacity: rand(0.15, 0.5),
      })),
    [count]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="absolute bottom-0 rounded-full bg-surface/60 animate-rise"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            boxShadow: '0 0 8px rgba(190,233,255,0.6)',
          }}
        />
      ))}
    </div>
  );
}
