import { useEffect, useRef } from 'react';

export interface Vec2 {
  x: number;
  y: number;
}

/**
 * Tracks the pointer without triggering React re-renders (values live in a
 * ref). Ideal for canvas/RAF-driven effects like the ripple cursor.
 */
export function useMousePosition() {
  const pos = useRef<Vec2>({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return pos;
}
