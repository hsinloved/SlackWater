import type { AudioCue } from '../features/session/sessionTypes';

/**
 * Soft, synthesized phase cues using the Web Audio API — no audio asset files.
 * A single AudioContext is created lazily and must be resumed from a user
 * gesture (browser autoplay policy), which we do on session start.
 */
let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtor) return null;
  if (!ctx) ctx = new AudioCtor();
  return ctx;
}

/** Call from a user gesture (e.g. Start) to unlock audio on iOS/Safari. */
export function unlockAudio(): void {
  const context = getContext();
  if (context && context.state === 'suspended') {
    void context.resume();
  }
}

function tone(
  frequency: number,
  startOffset: number,
  duration: number,
  peakGain = 0.18,
): void {
  const context = getContext();
  if (!context) return;
  if (context.state === 'suspended') void context.resume();

  const now = context.currentTime + startOffset;
  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.type = 'sine';
  osc.frequency.value = frequency;

  // Gentle bell-like envelope: quick fade in, slow fade out.
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(context.destination);
  osc.start(now);
  osc.stop(now + duration + 0.05);
}

export function playCue(cue: AudioCue): void {
  switch (cue) {
    case 'bell':
      tone(528, 0, 1.1);
      break;
    case 'low':
      tone(294, 0, 1.3, 0.16);
      break;
    case 'chime':
      tone(660, 0, 0.9);
      break;
    case 'double-chime':
      tone(660, 0, 0.7);
      tone(880, 0.18, 0.9);
      break;
  }
}
