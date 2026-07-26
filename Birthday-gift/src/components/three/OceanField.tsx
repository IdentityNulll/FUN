import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { times } from '../../utils/random';

/**
 * A slowly drifting 3D field of glowing motes rendered with React Three
 * Fiber. It sits behind the DOM content as a fixed layer to give the whole
 * page real parallax depth. Kept deliberately light (a single Points cloud)
 * so it stays smooth on modest hardware.
 */
function Motes({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    times(count, (i) => {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      speeds[i] = 0.05 + Math.random() * 0.15;
      return null;
    });
    return { positions, speeds };
  }, [count]);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      // gentle upward drift; wrap around when off the top
      arr[i * 3 + 1] += speeds[i] * delta * 0.6;
      if (arr[i * 3 + 1] > 10) arr[i * 3 + 1] = -10;
    }
    pts.geometry.attributes.position.needsUpdate = true;
    // whole field breathes with a slow rotation + mouse parallax
    pts.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.15;
    pts.rotation.x = state.pointer.y * 0.08;
    pts.rotation.z = state.pointer.x * 0.05;
  });

  const texture = useMemo(() => makeGlowTexture(), []);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        map={texture}
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={new THREE.Color('#9ff7ec')}
      />
    </points>
  );
}

/** Soft radial glow sprite so each mote looks like a bioluminescent speck. */
function makeGlowTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const grd = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.3, 'rgba(159,247,236,0.7)');
  grd.addColorStop(1, 'rgba(159,247,236,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export function OceanField() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Motes />
      </Canvas>
    </div>
  );
}
