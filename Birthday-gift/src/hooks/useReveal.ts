import { useInView } from 'react-intersection-observer';

/**
 * Convenience wrapper around react-intersection-observer for the
 * "nothing suddenly appears" fade/drift-in behaviour. Elements reveal
 * once when they enter the viewport.
 */
export function useReveal(threshold = 0.25) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
    rootMargin: '0px 0px -10% 0px',
  });
  return { ref, inView };
}
