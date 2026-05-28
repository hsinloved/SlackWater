import type { SessionMode } from '../session/sessionTypes';

export type Feeling = 'calm' | 'neutral' | 'tense' | 'uncomfortable';

export const FEELING_LABELS: Record<Feeling, string> = {
  calm: 'Calm',
  neutral: 'Neutral',
  tense: 'Tense',
  uncomfortable: 'Dizzy / uncomfortable',
};

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
}
