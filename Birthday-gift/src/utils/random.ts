/** Deterministic-ish helpers for scattering particles and creatures. */

export const rand = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export const randInt = (min: number, max: number): number =>
  Math.floor(rand(min, max + 1));

export const pick = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

/** Build an array of length `n` mapped through `fn`. */
export const times = <T>(n: number, fn: (i: number) => T): T[] =>
  Array.from({ length: n }, (_, i) => fn(i));

export const clamp = (v: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, v));

/** Linear interpolation. */
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
