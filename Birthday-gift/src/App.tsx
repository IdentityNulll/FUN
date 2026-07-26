import { Suspense, lazy } from 'react';
import { AudioProvider } from './context/AudioProvider';
import { AchievementProvider } from './context/AchievementProvider';
import { DiveProvider } from './context/DiveProvider';

import { DepthBackground } from './components/effects/DepthBackground';
import { RippleCursor } from './components/effects/RippleCursor';
import { MuteButton } from './components/hud/MuteButton';
import { DepthMeter } from './components/hud/DepthMeter';
import { AchievementHUD } from './components/hud/AchievementHUD';

import { Intro } from './sections/Intro';

// Heavier / below-the-fold pieces are code-split so the intro paints fast.
const OceanField = lazy(() =>
  import('./components/three/OceanField').then((m) => ({ default: m.OceanField }))
);
const Surface = lazy(() =>
  import('./sections/Surface').then((m) => ({ default: m.Surface }))
);
const CoralReef = lazy(() =>
  import('./sections/CoralReef').then((m) => ({ default: m.CoralReef }))
);
const MemoryReef = lazy(() =>
  import('./sections/MemoryReef').then((m) => ({ default: m.MemoryReef }))
);
const JellyfishForest = lazy(() =>
  import('./sections/JellyfishForest').then((m) => ({ default: m.JellyfishForest }))
);
const WhaleCrossing = lazy(() =>
  import('./sections/WhaleCrossing').then((m) => ({ default: m.WhaleCrossing }))
);
const DeepOcean = lazy(() =>
  import('./sections/DeepOcean').then((m) => ({ default: m.DeepOcean }))
);
const TreasureChamber = lazy(() =>
  import('./sections/TreasureChamber').then((m) => ({ default: m.TreasureChamber }))
);
const FinalScene = lazy(() =>
  import('./sections/FinalScene').then((m) => ({ default: m.FinalScene }))
);

export default function App() {
  return (
    <AudioProvider>
      <AchievementProvider>
        <DiveProvider>
          {/* ambient layers */}
          <DepthBackground />
          <Suspense fallback={null}>
            <OceanField />
          </Suspense>

          {/* HUD + cursor */}
          <RippleCursor />
          <MuteButton />
          <AchievementHUD />
          <DepthMeter />

          {/* the journey */}
          <main className="relative">
            <Intro />
            <Suspense fallback={<div className="h-screen w-full" />}>
              <Surface />
              <CoralReef />
              <MemoryReef />
              <JellyfishForest />
              <WhaleCrossing />
              <DeepOcean />
              <TreasureChamber />
              <FinalScene />
            </Suspense>
          </main>
        </DiveProvider>
      </AchievementProvider>
    </AudioProvider>
  );
}
