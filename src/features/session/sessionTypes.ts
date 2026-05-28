export type SessionMode = 'relaxed' | 'static-hold' | 'rv-mobility';

export type SessionPhase =
  | 'preparation-inhale'
  | 'preparation-exhale'
  | 'final-inhale'
  | 'breath-hold'
  | 'empty-lung-stretch'
  | 'recovery'
  | 'rest'
  | 'complete';

export type AudioCue = 'bell' | 'low' | 'chime' | 'double-chime';

/** A single timed step in a generated session plan. */
export interface SessionPhaseStep {
  phase: SessionPhase;
  durationSeconds: number;
  label: string;
  cueText: string;
  audioCue?: AudioCue;
  /** When true (breath-hold), the user may end this step early via "I need to breathe". */
  allowEarlyExit?: boolean;
  /** 1-based round index for display, when the mode has rounds. */
  roundNumber?: number;
  /** Total rounds for display. */
  totalRounds?: number;
}

export interface RelaxedConfig {
  mode: 'relaxed';
  inhaleSeconds: number;
  exhaleSeconds: number;
  cycles: number;
  holdAfterInhaleSeconds: number;
  holdAfterExhaleSeconds: number;
}

export interface StaticHoldConfig {
  mode: 'static-hold';
  prepCycles: number;
  inhaleSeconds: number;
  exhaleSeconds: number;
  breathHoldSeconds: number;
  recoveryCycles: number;
  rounds: number;
}

export interface RvMobilityConfig {
  mode: 'rv-mobility';
  prepCycles: number;
  inhaleSeconds: number;
  exhaleSeconds: number;
  emptyLungStretchSeconds: number;
  recoverySeconds: number;
  rounds: number;
}

export type SessionConfig =
  | RelaxedConfig
  | StaticHoldConfig
  | RvMobilityConfig;
