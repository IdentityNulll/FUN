import type { ReactNode } from 'react';
import type { SectionId } from '../../utils/constants';

interface SectionProps {
  id: SectionId;
  children: ReactNode;
  className?: string;
  /** Use full viewport height (default) or let content define height. */
  full?: boolean;
}

/** A depth band of the dive. Each section is a scroll stop in the story. */
export function Section({ id, children, className = '', full = true }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full ${
        full ? 'min-h-screen' : ''
      } flex flex-col items-center justify-center overflow-hidden px-6 py-24 ${className}`}
    >
      {children}
    </section>
  );
}
