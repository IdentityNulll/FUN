/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE TO PERSONALISE THE GIFT.
 *  This is a birthday gift for a BEST FRIEND — warm, funny, and
 *  full of inside jokes. Everything she reads lives here.
 * ─────────────────────────────────────────────────────────────
 */

/** Your bestie's name (used across the experience). */
export const RECIPIENT_NAME = 'Nihola';

/** Who it's from — shown small in the final scene. Leave '' to hide. */
export const FROM = 'Abubakr.';

/** SECTION 2 — Coral Reef. Each shell opens to reveal one of these. */
export interface ShellMessage {
  emoji: string;
  title: string;
  body: string;
  kind: 'wish' | 'joke' | 'memory';
}

export const SHELL_MESSAGES: ShellMessage[] = [
  {
    emoji: '🎉',
    title: 'Happy Birthday, bestie',
    body: 'I know that we don`t know each other that well, but still I wish you all the good luck',
    kind: 'wish',
  },
  {
    emoji: '😏',
    title: 'A tiny warning',
    body: 'Somewhere in this ocean there is a shell with your celebrity crush in it. Keep going. You know you want to.',
    kind: 'joke',
  },
  {
    emoji: '💜',
    title: 'Because they are yours',
    body: 'I filled this whole ocean with lilacs — your favourite flower',
    kind: 'memory',
  },
  {
    emoji: '✨',
    title: 'For you',
    body: 'You deserve every good thing this year: longer height :), your dream IELTS score',
    kind: 'wish',
  },
  {
    emoji: '🤣',
    title: 'Remember when…',
    body: 'uhm... I don`t really remember the time we laughed hard so my bad',
    kind: 'joke',
  },
];

/** SECTION 3 — Memory Reef. Photographs drifting on the coral.
 *  Save your images in /public/memories/ using the filenames below
 *  (see /public/memories/README.txt). If an image is missing, a soft
 *  placeholder is shown instead — nothing ever looks broken. */
export interface Memory {
  src: string;
  caption: string;
  date?: string;
}

export const MEMORIES: Memory[] = [
  { src: '/memories/lilac-1.jpg', caption: 'Your favourite flower 🌸', date: 'Lilac season' },
  { src: '/memories/crush.jpg', caption: 'Your probable crush 😏', date: 'Certified.' },
  { src: '/memories/lilac-2.jpg', caption: 'More lilacs ', date: "Lilac season" },
  { src: '/memories/crush-2.jpg', caption: 'Okay fine… he IS adorable, i guess', date: 'CRUSHIE' },
];

/** SECTION 4 — Jellyfish Forest. Each glowing jelly hides a message. */
export interface JellyMessage {
  title: string;
  body: string;
}

export const JELLY_MESSAGES: JellyMessage[] = [
  { title: 'Something true', body: 'You are the kind of friend everyone wishes they had — Short, tells something and never does it' },
  { title: 'On your crush', body: 'Yes, he is cute. Nah when are you gonna visit him tho' },
  { title: 'A compliment', body: 'You are so short and cute :)' },
  { title: 'Thank you', body: 'For every "Muslima" reel you sent me thank you, that really hurt' },
  { title: 'A promise', body: 'I just hope that you can finally get your IELTS score and we can hang out as you promised' },
];

/** FINAL SCENE — the closing message. */
export const FINAL = {
  greeting: 'Happy Birthday',
  poem: [
    'Oceanni yaxshi ko`rishingi bilamanu, nu uni tagini yaxshi ko`rishini bilmadim',
    "Lekin yoqdi deb umid qilaman",
    "Happy Birthday — Shortie with a korean crush",
  ],
};

/** EASTER EGGS — hidden creatures to find. Order defines discovery list. */
export interface EasterEgg {
  id: string;
  emoji: string;
  name: string;
  reward: string;
}

export const EASTER_EGGS: EasterEgg[] = [
  { id: 'fish', emoji: '🐠', name: 'Curious Fish', reward: 'You have a good eye.' },
  { id: 'crab', emoji: '🦀', name: 'Sideways Crab', reward: 'Skittering secret found!' },
  { id: 'turtle', emoji: '🐢', name: 'Ancient Turtle', reward: 'Patience rewarded.' },
  { id: 'squid', emoji: '🦑', name: 'Shy Squid', reward: 'Ink-redible.' },
  { id: 'octopus', emoji: '🐙', name: 'Clever Octopus', reward: 'Eight arms, one fan of yours.' },
  { id: 'whale', emoji: '🐳', name: 'Little Whale', reward: 'A whale of a find.' },
  { id: 'shell', emoji: '🐚', name: 'Hidden Shell', reward: 'Listen — it sounds like the sea.' },
];
