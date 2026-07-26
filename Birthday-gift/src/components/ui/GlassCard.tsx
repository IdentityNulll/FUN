import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}

/** Frosted, glowing glass panel used for all readable content. */
export function GlassCard({ children, className = '', strong }: GlassCardProps) {
  return (
    <div
      className={`${strong ? 'glass-strong' : 'glass'} rounded-3xl ${className}`}
    >
      {children}
    </div>
  );
}
