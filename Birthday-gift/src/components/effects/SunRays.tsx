import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { rand, times } from '../../utils/random';

/**
 * God rays filtering down from the surface. A handful of soft, tilted light
 * beams that slowly shift opacity to feel like sunlight through moving water.
 */
export function SunRays({ count = 6 }: { count?: number }) {
  const rays = useMemo(
    () =>
      times(count, (i) => ({
        id: i,
        left: rand(0, 100),
        width: rand(40, 120),
        delay: rand(0, 6),
        duration: rand(7, 12),
        tilt: rand(-12, 12),
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {rays.map((r) => (
        <motion.div
          key={r.id}
          className="absolute -top-1/4 h-[150%] origin-top"
          style={{
            left: `${r.left}%`,
            width: r.width,
            transform: `rotate(${r.tilt}deg)`,
            background:
              'linear-gradient(to bottom, rgba(190,233,255,0.35), rgba(190,233,255,0))',
            filter: 'blur(14px)',
          }}
          animate={{ opacity: [0.15, 0.5, 0.15] }}
          transition={{
            duration: r.duration,
            delay: r.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
