import { motion } from 'framer-motion';
import { times } from '../../utils/random';

interface JellyfishProps {
  size?: number;
  color?: string;
  glow?: string;
  onClick?: () => void;
  className?: string;
  /** When true the jelly is interactive (hover/tap feedback). */
  interactive?: boolean;
}

/**
 * A glowing jellyfish with a pulsing bell and drifting tentacles. Drifts
 * gently on its own; when `interactive`, it lifts and brightens on hover.
 */
export function Jellyfish({
  size = 90,
  color = '#8A7FFF',
  glow = '#7FFFF0',
  onClick,
  className = '',
  interactive = false,
}: JellyfishProps) {
  const tentacles = times(6, (i) => i);
  const gid = `bell-${color.replace('#', '')}-${glow.replace('#', '')}`;

  return (
    <motion.div
      className={`relative ${interactive ? 'cursor-pointer' : 'pointer-events-none'} ${className}`}
      style={{ width: size, height: size * 1.6 }}
      whileHover={interactive ? { scale: 1.08, y: -6 } : undefined}
      whileTap={interactive ? { scale: 0.95 } : undefined}
      onClick={onClick}
      aria-hidden={!interactive}
      role={interactive ? 'button' : undefined}
    >
      {/* halo */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          width: size * 1.3,
          height: size * 1.3,
          background: glow,
          opacity: 0.35,
        }}
      />
      <svg
        width={size}
        height={size * 1.6}
        viewBox="0 0 100 160"
        fill="none"
        className="relative"
      >
        <defs>
          <radialGradient id={gid} cx="50%" cy="35%" r="65%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="0.5" stopColor={glow} stopOpacity="0.55" />
            <stop offset="1" stopColor={color} stopOpacity="0.65" />
          </radialGradient>
        </defs>

        {/* pulsing bell */}
        <motion.path
          d="M12 55 C12 20 88 20 88 55 C88 66 78 70 72 66 C66 78 34 78 28 66 C22 70 12 66 12 55 Z"
          fill={`url(#${gid})`}
          style={{ transformOrigin: '50px 50px' }}
          animate={{ scaleY: [1, 0.9, 1], scaleX: [1, 1.06, 1] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* tentacles */}
        {tentacles.map((i) => {
          const x = 26 + i * 10;
          return (
            <motion.path
              key={i}
              d={`M${x} 66 q -4 24 2 44 q 5 20 -2 40`}
              stroke={glow}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity={0.7}
              style={{ transformOrigin: `${x}px 66px` }}
              animate={{ rotate: [-4, 4, -4] }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15,
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
}
