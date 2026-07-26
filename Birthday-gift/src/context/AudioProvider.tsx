import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { soundEngine } from '../utils/sound';

interface AudioApi {
  muted: boolean;
  started: boolean;
  toggleMute: () => void;
  /** Call once from a user gesture to unlock/start the audio context. */
  begin: () => void;
  play: typeof soundEngine.play;
}

const AudioContextApi = createContext<AudioApi | null>(null);

const STORAGE_KEY = 'dive-muted';

export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    soundEngine.setMuted(muted);
    try {
      localStorage.setItem(STORAGE_KEY, muted ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [muted]);

  const begin = useCallback(() => {
    soundEngine.start();
    soundEngine.setMuted(muted);
    setStarted(true);
  }, [muted]);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  const play = useCallback<typeof soundEngine.play>(
    (sfx) => soundEngine.play(sfx),
    []
  );

  const value = useMemo<AudioApi>(
    () => ({ muted, started, toggleMute, begin, play }),
    [muted, started, toggleMute, begin, play]
  );

  return (
    <AudioContextApi.Provider value={value}>
      {children}
    </AudioContextApi.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAudio(): AudioApi {
  const ctx = useContext(AudioContextApi);
  if (!ctx) throw new Error('useAudio must be used within an AudioProvider');
  return ctx;
}
