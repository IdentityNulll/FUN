/**
 * A tiny, self-contained Web Audio engine.
 *
 * Everything is synthesised at runtime — there are NO audio files to ship
 * or that can 404. Ambient ocean, a low drone, and a handful of gentle
 * sound effects are generated procedurally. Browsers require a user
 * gesture before audio can start, so `start()` is called from the Dive
 * button click.
 */

type Sfx = 'bubble' | 'sparkle' | 'open' | 'whale' | 'chime';

export class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private started = false;
  private _muted = false;

  get muted() {
    return this._muted;
  }

  /** Lazily create the context (must be called from a user gesture). */
  start() {
    if (this.started) {
      void this.ctx?.resume();
      return;
    }
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return;

    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this._muted ? 0 : 0.9;
    this.master.connect(this.ctx.destination);

    this.buildAmbient();
    this.started = true;
  }

  setMuted(muted: boolean) {
    this._muted = muted;
    if (this.master && this.ctx) {
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.linearRampToValueAtTime(muted ? 0 : 0.9, now + 0.4);
    }
  }

  /** Filtered noise = surf, plus two detuned low sines = deep drone. */
  private buildAmbient() {
    if (!this.ctx || !this.master) return;
    const ctx = this.ctx;

    this.ambientGain = ctx.createGain();
    this.ambientGain.gain.value = 0.0;
    this.ambientGain.connect(this.master);
    // fade the ambience in slowly
    this.ambientGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 4);

    // --- surf: looping noise buffer through a slowly sweeping lowpass ---
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
      // brown-ish noise: integrate white noise for a softer, deeper hiss
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 500;
    lp.Q.value = 0.6;

    // slow LFO on the filter for a breathing, wave-like swell
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 300;
    lfo.connect(lfoGain).connect(lp.frequency);

    noise.connect(lp).connect(this.ambientGain);
    noise.start();
    lfo.start();

    // --- deep drone: two very low, slightly detuned sines ---
    [55, 55.4].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = 0.06 + i * 0.01;
      osc.connect(g).connect(this.ambientGain!);
      osc.start();
    });
  }

  /** One-shot effects. Safe to call before start() (they simply no-op). */
  play(sfx: Sfx) {
    if (!this.ctx || !this.master || this._muted) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    switch (sfx) {
      case 'bubble': {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(760, now + 0.12);
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
        osc.connect(g).connect(this.master);
        osc.start(now);
        osc.stop(now + 0.24);
        break;
      }
      case 'sparkle': {
        [880, 1320, 1760].forEach((f, i) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = f;
          const t = now + i * 0.05;
          g.gain.setValueAtTime(0.0001, t);
          g.gain.exponentialRampToValueAtTime(0.14, t + 0.01);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
          osc.connect(g).connect(this.master!);
          osc.start(t);
          osc.stop(t + 0.32);
        });
        break;
      }
      case 'chime': {
        [523.25, 659.25, 783.99].forEach((f) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = f;
          g.gain.setValueAtTime(0.0001, now);
          g.gain.exponentialRampToValueAtTime(0.12, now + 0.03);
          g.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
          osc.connect(g).connect(this.master!);
          osc.start(now);
          osc.stop(now + 1.2);
        });
        break;
      }
      case 'open': {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.5);
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(0.18, now + 0.1);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        osc.connect(g).connect(this.master);
        osc.start(now);
        osc.stop(now + 0.85);
        break;
      }
      case 'whale': {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 1.4);
        osc.frequency.exponentialRampToValueAtTime(70, now + 3.2);
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(0.22, now + 0.6);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);
        osc.connect(g).connect(this.master);
        osc.start(now);
        osc.stop(now + 3.5);
        break;
      }
    }
  }
}

export const soundEngine = new SoundEngine();
