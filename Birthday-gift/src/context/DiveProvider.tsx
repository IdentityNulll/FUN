import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Lenis from 'lenis';
import { SECTIONS } from '../utils/constants';

interface DiveApi {
  /** Global scroll progress, 0 (top) → 1 (bottom). */
  progress: number;
  /** Index into SECTIONS of the section currently in view. */
  sectionIndex: number;
  /** Simulated current depth in metres for the HUD. */
  depth: number;
  /** Has the user pressed "Dive"? */
  dived: boolean;
  dive: () => void;
  /** Smoothly scroll to an element id. */
  scrollTo: (id: string) => void;
}

const Ctx = createContext<DiveApi | null>(null);

export function DiveProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [dived, setDived] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onScroll = ({
      scroll,
      limit,
    }: {
      scroll: number;
      limit: number;
    }) => {
      const p = limit > 0 ? scroll / limit : 0;
      setProgress(p);
      // section index from the nearest fractional band
      const idx = Math.round(p * (SECTIONS.length - 1));
      setSectionIndex(Math.max(0, Math.min(SECTIONS.length - 1, idx)));
    };
    lenis.on('scroll', onScroll);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Prevent scrolling until the user dives.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (dived) lenis.start();
    else lenis.stop();
  }, [dived]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 2.2 });
    }
  }, []);

  const dive = useCallback(() => {
    setDived(true);
    // let Lenis start, then glide to the first underwater section
    setTimeout(() => {
      const el = document.getElementById('surface');
      if (el && lenisRef.current) {
        lenisRef.current.scrollTo(el, { duration: 3 });
      }
    }, 80);
  }, []);

  // depth interpolates smoothly between section depths
  const depth = useMemo(() => {
    const scaled = progress * (SECTIONS.length - 1);
    const i = Math.floor(scaled);
    const frac = scaled - i;
    const a = SECTIONS[Math.min(i, SECTIONS.length - 1)].depth;
    const b = SECTIONS[Math.min(i + 1, SECTIONS.length - 1)].depth;
    return Math.round(a + (b - a) * frac);
  }, [progress]);

  const value = useMemo<DiveApi>(
    () => ({ progress, sectionIndex, depth, dived, dive, scrollTo }),
    [progress, sectionIndex, depth, dived, dive, scrollTo]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDive(): DiveApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useDive must be used within a DiveProvider');
  return ctx;
}
