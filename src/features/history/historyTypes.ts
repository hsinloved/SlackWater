import type { SessionMode } from '../session/sessionTypes';

export type Feeling = 'calm' | 'neutral' | 'tense' | 'uncomfortable';

export const FEELINGS: Feeling[] = [
  'calm',
  'neutral',
  'tense',
  'uncomfortable',
];

/** Body-awareness self-rating (the "real metric", not seconds). */
export type Scale = 'yes' | 'somewhat' | 'no';

export const SCALES: Scale[] = ['yes', 'somewhat', 'no'];

export interface SessionRecord {
  id: string;
  /** ISO timestamp of when the session was saved. */
  date: string;
  mode: SessionMode;
  modeTitle: string;
  totalDurationSeconds: number;
  roundsCompleted: number;
  totalRounds: number;
  feeling: Feeling | null;
  perceivedEffort: number | null; // 1–5
  breathHoldSeconds: number | null;
  notes: string;
  // Body-awareness reflection (optional; absent on older records)
  bodyQuieter?: Scale | null;
  relaxedAtUrge?: Scale | null;
}
