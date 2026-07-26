import { motion } from 'framer-motion';
import { times } from '../../utils/random';

/**
 * A silhouetted bed of coral and swaying seagrass along the bottom of a
 * section. Purely decorative; the grass sways softly for life.
 */
export function CoralBed() {
  const grass = times(26, (i) => i);
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 overflow-hidden" aria-hidden>
      {/* seagrass */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-around">
        {grass.map((i) => (
          <motion.div
            key={i}
            className="w-1.5 origin-bottom rounded-full"
            style={{
              height: 40 + (i % 5) * 22,
              background:
                'linear-gradient(to top, rgba(12,74,110,0.9), rgba(27,127,191,0.2))',
            }}
            animate={{ rotate: [-6, 6, -6] }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* coral clumps */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0 160 L0 110 C60 90 90 120 120 96 C150 72 180 110 220 92 C260 74 300 120 340 100 L340 160 Z"
          fill="#0C4A6E"
          opacity="0.85"
        />
        <path
          d="M900 160 L900 104 C950 80 980 118 1020 92 C1060 68 1100 116 1150 96 C1175 86 1190 110 1200 100 L1200 160 Z"
          fill="#0C4A6E"
          opacity="0.85"
        />
        <g fill="#1B7FBF" opacity="0.6">
          <circle cx="180" cy="120" r="10" />
          <circle cx="205" cy="110" r="8" />
          <circle cx="1010" cy="118" r="9" />
          <circle cx="1040" cy="108" r="7" />
        </g>
      </svg>
    </div>
  );
}
