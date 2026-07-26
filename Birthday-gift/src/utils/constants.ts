/**
 * Central palette + depth map for the dive.
 * Each section owns a depth band; backgrounds interpolate between these.
 */

export const COLORS = {
  surface: '#BEE9FF',
  ocean: '#65C9FF',
  deep: '#1B7FBF',
  dark: '#0C4A6E',
  abyss: '#041C32',
  deepest: '#020B16',
  glowCyan: '#7FFFF0',
  glowTurquoise: '#40E0D0',
  glowPurple: '#8A7FFF',
} as const;

export type SectionId =
  | 'intro'
  | 'surface'
  | 'coral'
  | 'memory'
  | 'jellyfish'
  | 'whale'
  | 'deep'
  | 'treasure'
  | 'final';

export interface SectionMeta {
  id: SectionId;
  /** Human label shown on the depth meter */
  label: string;
  /** Simulated depth in metres, for the HUD */
  depth: number;
  /** Dominant gradient stops top -> bottom for this depth band */
  gradient: [string, string];
}

export const SECTIONS: SectionMeta[] = [
  { id: 'intro', label: 'Above the surface', depth: 0, gradient: ['#020B16', '#041C32'] },
  { id: 'surface', label: 'The Surface', depth: 2, gradient: ['#BEE9FF', '#65C9FF'] },
  { id: 'coral', label: 'Coral Reef', depth: 40, gradient: ['#65C9FF', '#1B7FBF'] },
  { id: 'memory', label: 'Memory Reef', depth: 120, gradient: ['#1B7FBF', '#0C4A6E'] },
  { id: 'jellyfish', label: 'Jellyfish Forest', depth: 380, gradient: ['#0C4A6E', '#083A5A'] },
  { id: 'whale', label: 'Whale Crossing', depth: 900, gradient: ['#083A5A', '#041C32'] },
  { id: 'deep', label: 'The Deep', depth: 2200, gradient: ['#041C32', '#020B16'] },
  { id: 'treasure', label: 'Treasure Chamber', depth: 3800, gradient: ['#020B16', '#03101F'] },
  { id: 'final', label: 'Moonlit Calm', depth: 0, gradient: ['#04121F', '#0C2A44'] },
];

/** Easing curves reused across Framer Motion transitions for an underwater feel. */
export const EASE = {
  water: [0.22, 1, 0.36, 1] as [number, number, number, number],
  drift: [0.45, 0, 0.15, 1] as [number, number, number, number],
  gentle: [0.65, 0, 0.35, 1] as [number, number, number, number],
};
