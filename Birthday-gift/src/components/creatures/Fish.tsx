import { motion } from 'framer-motion';

interface FishProps {
  /** Vertical position as a % of the container. */
  top: number;
  /** Seconds to cross the screen. */
  duration?: number;
  delay?: number;
  size?: number;
  color?: string;
  /** 'ltr' swims left→right, 'rtl' the other way. */
  direction?: 'ltr' | 'rtl';
}

/**
 * A single fish that swims all the way across its container, bobbing gently
 * and flapping its tail. Reused to populate the reef and surface with life.
 */
export function Fish({
  top,
  duration = 22,
  delay = 0,
  size = 46,
  color = '#BEE9FF',
  direction = 'ltr',
}: FishProps) {
  const rtl = direction === 'rtl';
  // unique, DOM-safe gradient id (no '#', no collisions between fish)
  const gid = `fish-${Math.round(top)}-${color.replace('#', '')}-${size}`;
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ top: `${top}%` }}
      initial={{ x: rtl ? '110vw' : '-15vw' }}
      animate={{
        x: rtl ? '-15vw' : '110vw',
        y: [0, -14, 6, -8, 0],
      }}
      transition={{
        x: { duration, delay, repeat: Infinity, ease: 'linear' },
        y: {
          duration: duration / 4,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      aria-hidden
    >
      <svg
        width={size}
        height={size * 0.6}
        viewBox="0 0 100 60"
        style={{ transform: rtl ? 'scaleX(-1)' : undefined }}
        fill="none"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.95" />
            <stop offset="1" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <ellipse cx="45" cy="30" rx="34" ry="18" fill={`url(#${gid})`} />
        <motion.path
          d="M12 30 L-8 14 L-4 30 L-8 46 Z"
          fill={color}
          fillOpacity="0.7"
          style={{ transformOrigin: '12px 30px' }}
          animate={{ rotate: [0, 18, 0, -18, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="66" cy="25" r="3.4" fill="#041C32" />
        <circle cx="67" cy="24" r="1.1" fill="#fff" />
      </svg>
    </motion.div>
  );
}
