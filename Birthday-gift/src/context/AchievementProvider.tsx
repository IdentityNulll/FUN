import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { EASTER_EGGS } from '../data/content';
import { useAudio } from './AudioProvider';

interface AchievementApi {
  found: string[];
  total: number;
  isFound: (id: string) => boolean;
  /** Returns true if this was a new discovery. */
  discover: (id: string) => boolean;
  /** The most recent discovery, for toast rendering. */
  last: { id: string; name: string; reward: string; emoji: string } | null;
  clearLast: () => void;
}

const Ctx = createContext<AchievementApi | null>(null);

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [found, setFound] = useState<string[]>([]);
  const [last, setLast] = useState<AchievementApi['last']>(null);
  const { play } = useAudio();

  const isFound = useCallback((id: string) => found.includes(id), [found]);

  const discover = useCallback(
    (id: string) => {
      let isNew = false;
      setFound((prev) => {
        if (prev.includes(id)) return prev;
        isNew = true;
        return [...prev, id];
      });
      if (isNew) {
        const egg = EASTER_EGGS.find((e) => e.id === id);
        if (egg) {
          setLast({ id, name: egg.name, reward: egg.reward, emoji: egg.emoji });
          play('sparkle');
        }
      }
      return isNew;
    },
    [play]
  );

  const clearLast = useCallback(() => setLast(null), []);

  const value = useMemo<AchievementApi>(
    () => ({
      found,
      total: EASTER_EGGS.length,
      isFound,
      discover,
      last,
      clearLast,
    }),
    [found, isFound, discover, last, clearLast]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAchievements(): AchievementApi {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error('useAchievements must be used within an AchievementProvider');
  return ctx;
}
