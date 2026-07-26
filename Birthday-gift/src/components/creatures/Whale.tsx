import { motion } from 'framer-motion';

interface WhaleProps {
  /** Seconds to cross — deliberately long. */
  duration?: number;
  className?: string;
}

/**
 * A massive whale silhouette that drifts slowly across the screen. Its
 * fluke sways and the whole body rises and falls almost imperceptibly, so
 * the crossing feels weightless and majestic — never rushed.
 */
export function Whale({ duration = 46, className = '' }: WhaleProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute left-0 top-1/2 ${className}`}
      initial={{ x: '-45vw', y: '-40%' }}
      animate={{ x: '115vw', y: ['-40%', '-30%', '-46%', '-38%'] }}
      transition={{
        x: { duration, ease: [0.4, 0, 0.6, 1] },
        y: { duration: duration / 2, repeat: Infinity, ease: 'easeInOut' },
      }}
      aria-hidden
    >
      <svg width={520} height={260} viewBox="0 0 520 260" fill="none">
        <defs>
          <linearGradient id="whale-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0C4A6E" stopOpacity="0.9" />
            <stop offset="1" stopColor="#020B16" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* body */}
        <path
          d="M40 150 C90 90 220 70 320 92 C380 104 430 118 470 108 C452 128 452 150 470 168 C420 160 370 176 310 186 C210 202 90 196 40 150 Z"
          fill="url(#whale-body)"
        />
        {/* pectoral fin */}
        <path
          d="M210 160 C240 190 280 200 300 196 C270 182 250 168 240 152 Z"
          fill="#041C32"
          opacity="0.85"
        />
        {/* fluke, gently swaying */}
        <motion.path
          d="M470 108 C500 84 520 78 516 96 C512 110 496 122 470 130 C496 138 512 150 516 164 C520 182 500 176 470 152 Z"
          fill="#041C32"
          style={{ transformOrigin: '470px 130px' }}
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* eye */}
        <circle cx="95" cy="140" r="4" fill="#BEE9FF" opacity="0.8" />
        {/* soft belly grooves */}
        <path
          d="M70 168 C130 188 210 192 300 182"
          stroke="#0C4A6E"
          strokeWidth="2"
          opacity="0.4"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}
