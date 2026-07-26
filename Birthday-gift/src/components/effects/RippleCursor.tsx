import { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
}

/**
 * A full-screen canvas that replaces the cursor with a soft glowing dot and
 * spawns expanding ripples as the pointer moves — like a fingertip on water.
 * Pointer coordinates are read directly from events (no React re-renders).
 */
export function RippleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Skip on touch devices — no hover cursor there.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const ripples: Ripple[] = [];
    const dot = { x: -100, y: -100 };
    let lastSpawn = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const spawn = (x: number, y: number, big = false) => {
      ripples.push({
        x,
        y,
        r: big ? 4 : 2,
        maxR: big ? 60 : 28,
        alpha: big ? 0.5 : 0.28,
      });
    };

    const onMove = (e: PointerEvent) => {
      dot.x = e.clientX;
      dot.y = e.clientY;
      const now = performance.now();
      if (now - lastSpawn > 90) {
        spawn(e.clientX, e.clientY);
        lastSpawn = now;
      }
    };
    const onDown = (e: PointerEvent) => spawn(e.clientX, e.clientY, true);

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += (rp.maxR - rp.r) * 0.06;
        rp.alpha *= 0.94;
        if (rp.alpha < 0.01) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(127, 255, 240, ${rp.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // glowing cursor dot
      const grd = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, 14);
      grd.addColorStop(0, 'rgba(190, 233, 255, 0.9)');
      grd.addColorStop(0.4, 'rgba(127, 255, 240, 0.5)');
      grd.addColorStop(1, 'rgba(127, 255, 240, 0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 14, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(render);
    };
    render();

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      aria-hidden
    />
  );
}
