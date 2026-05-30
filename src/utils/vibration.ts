import type { SessionPhase } from '../features/session/sessionTypes';

/** Vibration is best-effort: a silent no-op when unsupported (e.g. iOS Safari). */
export function vibrationSupported(): boolean {
  return typeof navigator !== 'undefined' && 'vibrate' in navigator;
}

function vibrate(pattern: number | number[]): void {
  if (vibrationSupported()) {
    try {
      navigator.vibrate(pattern);
    } catch {
      /* ignore */
    }
  }
}

/** Short pulse when a new phase begins. */
export function vibratePhaseChange(phase: SessionPhase): void {
  // A longer pulse marks the end of a breath-hold (entering recovery).
  if (phase === 'recovery') {
    vibrate([220]);
  } else {
    vibrate(60);
  }
}
