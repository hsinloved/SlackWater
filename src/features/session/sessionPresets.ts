import type {
  RelaxedConfig,
  RvMobilityConfig,
  SessionConfig,
  SessionMode,
  StaticHoldConfig,
} from './sessionTypes';

export const DEFAULT_RELAXED: RelaxedConfig = {
  mode: 'relaxed',
  inhaleSeconds: 4,
  exhaleSeconds: 6,
  cycles: 10,
  holdAfterInhaleSeconds: 0,
  holdAfterExhaleSeconds: 0,
};

export const DEFAULT_STATIC_HOLD: StaticHoldConfig = {
  mode: 'static-hold',
  prepCycles: 5,
  inhaleSeconds: 4,
  exhaleSeconds: 6,
  breathHoldSeconds: 30,
  recoveryCycles: 3,
  rounds: 3,
};

export const DEFAULT_RV_MOBILITY: RvMobilityConfig = {
  mode: 'rv-mobility',
  prepCycles: 5,
  inhaleSeconds: 4,
  exhaleSeconds: 6,
  emptyLungStretchSeconds: 3,
  recoverySeconds: 30,
  rounds: 3,
};

export function defaultConfigFor(mode: SessionMode): SessionConfig {
  switch (mode) {
    case 'relaxed':
      return { ...DEFAULT_RELAXED };
    case 'static-hold':
      return { ...DEFAULT_STATIC_HOLD };
    case 'rv-mobility':
      return { ...DEFAULT_RV_MOBILITY };
  }
}

/** Threshold above which we warn the user about long breath-holds (seconds). */
export const LONG_HOLD_WARNING_SECONDS = 120;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, Math.round(value)));

/**
 * Clamp a config to the safe ranges defined in the product spec. This is the
 * safety-critical guardrail layer; the UI relies on it so values can never
 * drift outside calm, beginner-appropriate bounds.
 */
export function clampConfig(config: SessionConfig): SessionConfig {
  switch (config.mode) {
    case 'relaxed':
      return {
        ...config,
        inhaleSeconds: clamp(config.inhaleSeconds, 1, 20),
        exhaleSeconds: clamp(config.exhaleSeconds, 1, 20),
        cycles: clamp(config.cycles, 1, 60),
        holdAfterInhaleSeconds: clamp(config.holdAfterInhaleSeconds, 0, 20),
        holdAfterExhaleSeconds: clamp(config.holdAfterExhaleSeconds, 0, 20),
      };
    case 'static-hold':
      return {
        ...config,
        prepCycles: clamp(config.prepCycles, 1, 15),
        inhaleSeconds: clamp(config.inhaleSeconds, 1, 20),
        exhaleSeconds: clamp(config.exhaleSeconds, 1, 20),
        // Allowed up to 5 min, but the UI shows a warning past 2 min.
        breathHoldSeconds: clamp(config.breathHoldSeconds, 5, 300),
        recoveryCycles: clamp(config.recoveryCycles, 1, 10),
        rounds: clamp(config.rounds, 1, 6),
      };
    case 'rv-mobility':
      return {
        ...config,
        prepCycles: clamp(config.prepCycles, 1, 15),
        inhaleSeconds: clamp(config.inhaleSeconds, 1, 20),
        exhaleSeconds: clamp(config.exhaleSeconds, 1, 20),
        emptyLungStretchSeconds: clamp(config.emptyLungStretchSeconds, 2, 10),
        recoverySeconds: clamp(config.recoverySeconds, 10, 120),
        rounds: clamp(config.rounds, 1, 5),
      };
  }
}
