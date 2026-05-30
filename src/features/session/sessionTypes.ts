export type SessionMode =
  | 'relaxed'
  | 'three-part'
  | 'static-hold'
  | 'rv-mobility';

export type SessionPhase =
  | 'preparation-inhale'
  | 'preparation-exhale'
  | 'inhale-belly'
  | 'inhale-ribs'
  | 'inhale-chest'
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
  /** Translation key for the phase label (resolved at render time). */
  labelKey: string;
  /** Translation key for the cue text (resolved at render time). */
  cueKey: string;
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

export interface ThreePartConfig {
  mode: 'three-part';
  /** Seconds for each of the belly / ribs / chest inhale stages. */
  stageSeconds: number;
  exhaleSeconds: number;
  cycles: number;
}

export type SessionConfig =
  | RelaxedConfig
  | ThreePartConfig
  | StaticHoldConfig
  | RvMobilityConfig;
