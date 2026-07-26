import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { pick, rand, times } from '../../utils/random';

const HUES = ['#7FFFF0', '#8A7FFF', '#40E0D0', '#BEE9FF'];

/**
 * Bioluminescent motes: soft glowing dots that pulse and drift slowly, for
 * the near-silent magic of the deep. DOM + Framer, so it layers cleanly over
 * content without a canvas.
 */
export function BioParticles({ count = 40 }: { count?: number }) {
  const dots = useMemo(
    () =>
      times(count, (i) => ({
        id: i,
        left: rand(0, 100),
        top: rand(0, 100),
        size: rand(2, 6),
        color: pick(HUES),
        dur: rand(3, 7),
        delay: rand(0, 5),
        drift: rand(10, 40),
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: d.color,
            boxShadow: `0 0 ${d.size * 3}px ${d.size}px ${d.color}`,
          }}
          animate={{
            opacity: [0.1, 0.9, 0.1],
            y: [0, -d.drift, 0],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: d.dur,
            delay: d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
