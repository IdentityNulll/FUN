/** Hex colour helpers for interpolating the background as you descend. */

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '');
  const n = parseInt(
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h,
    16
  );
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/** Interpolate two hex colours; returns an `rgb(...)` string. */
export const mixHex = (a: string, b: string, t: number): string => {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const k = clamp01(t);
  const r = Math.round(ca[0] + (cb[0] - ca[0]) * k);
  const g = Math.round(ca[1] + (cb[1] - ca[1]) * k);
  const bl = Math.round(ca[2] + (cb[2] - ca[2]) * k);
  return `rgb(${r}, ${g}, ${bl})`;
};
