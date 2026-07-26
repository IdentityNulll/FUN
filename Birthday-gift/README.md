# 🌊 Dive Into the Ocean

A cinematic, interactive birthday experience. The visitor takes a breath at the
surface and slowly descends through the ocean — coral reefs, jellyfish forests,
a whale crossing, the glowing deep — discovering messages, memories and hidden
creatures, before a pearl becomes the moon and surfaces into a heartfelt
birthday message.

Built to feel less like a webpage and more like a peaceful underwater journey.

## ✨ The journey

| Depth | Section | What happens |
| --- | --- | --- |
| 0 m | **Intro** | Near-black water, a slow breath, a glowing **Dive ↓** button |
| 2 m | **Surface** | Sunlit water, god rays, bubbles, a warm welcome by name |
| 40 m | **Coral Reef** | Shells that spring open to reveal wishes, jokes & memories |
| 120 m | **Memory Reef** | Photographs drifting in glass frames — tap for fullscreen |
| 380 m | **Jellyfish Forest** | Glowing jellies reveal a message, then swim away |
| 900 m | **Whale Crossing** | A whale drifts across, unhurried, with a low call |
| 2200 m | **The Deep** | Bioluminescent motes, near silence, magic |
| 3800 m | **Treasure Chamber** | A chest opens → a pearl rises → becomes the moon |
| — | **Final Scene** | Moonlit calm, fireflies, *Happy Birthday* |

Plus **7 hidden creatures** (🐠 🦀 🐢 🦑 🐙 🐳 🐚) tucked into the scenes —
find them all. Progress shows top-right.

## 🚀 Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. Build for sharing with `npm run build`
(output in `dist/`), preview with `npm run preview`.

## 💝 Make it personal

Everything the recipient reads lives in **one file**:
[`src/data/content.ts`](src/data/content.ts).

- `RECIPIENT_NAME` / `FROM` — who it's for and from
- `SHELL_MESSAGES` — the coral-reef wishes, jokes and memories
- `MEMORIES` — captions + photo paths for the Memory Reef
- `JELLY_MESSAGES` — the jellyfish compliments and inside jokes
- `FINAL` — the closing birthday message

**Photos:** drop images into `public/memories/` named `1.jpg`, `2.jpg`, …
(or edit the paths in `content.ts`). Missing images fall back to a soft
placeholder — nothing ever looks broken.

## 🔊 Sound

All audio (ocean ambience, drone, bubbles, sparkles, whale call, chimes) is
**synthesised in the browser** with the Web Audio API — there are no audio
files to ship or that can 404. It starts on the **Dive** click (browsers
require a gesture) and there's a mute toggle top-right.

## 🛠 Tech

React + TypeScript · Vite · Tailwind CSS · Framer Motion ·
React Three Fiber + Drei (drifting 3D particle field) · Lenis (smooth scroll) ·
React Icons · react-intersection-observer.

```
src/
  components/   creatures/ · effects/ · hud/ · three/ · ui/
  context/      AudioProvider · AchievementProvider · DiveProvider
  hooks/        useReveal · useMousePosition
  sections/     the nine acts of the dive
  utils/        colors · constants (palette & depth map) · sound engine
  data/         content.ts  ← edit this to personalise
```

## ♿ Notes

- Respects `prefers-reduced-motion`.
- Touch devices keep the native cursor (the ripple cursor is desktop-only).
- Tuned to stay smooth: the 3D layer is a single light points cloud, effects
  are CSS/Framer where possible, and every section is lazy-loaded.

Made with love. 🐚
