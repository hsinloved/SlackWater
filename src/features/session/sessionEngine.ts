import { clampConfig } from './sessionPresets';
import type {
  RelaxedConfig,
  RvMobilityConfig,
  SessionConfig,
  SessionPhaseStep,
  StaticHoldConfig,
} from './sessionTypes';

/**
 * Calm, body-aware cue copy. We deliberately avoid competitive language
 * ("push", "max", "beat your record") and keep everything soft.
 */
const CUES = {
  inhale: 'Take a comfortable inhale. Let the belly rise first.',
  exhale: 'Slow, relaxed exhale. Let the shoulders drop.',
  holdAfterInhale: 'Hold gently. Stay soft.',
  holdAfterExhale: 'Rest at empty. No tension.',
  finalInhale: 'Take a comfortable 70–80% inhale, not a maximum inhale.',
  breathHold:
    'Hold gently. Relax your jaw. Notice the first urge to breathe — end early if needed.',
  emptyExhale:
    'Gently exhale to a natural, comfortable empty point. Do not force.',
  emptyStretch:
    'Soft empty-lung stretch. Keep it gentle — this is mobility, not a hold.',
  recovery: 'Small inhale, relaxed exhale. Breathe normally.',
  rest: 'Rest and breathe normally. Let everything settle.',
  complete: 'Session complete. Recover slowly and notice how you feel.',
} as const;

function inhaleStep(
  seconds: number,
  roundNumber?: number,
  totalRounds?: number,
): SessionPhaseStep {
  return {
    phase: 'preparation-inhale',
    durationSeconds: seconds,
    label: 'Inhale',
    cueText: CUES.inhale,
    audioCue: 'bell',
    roundNumber,
    totalRounds,
  };
}

function exhaleStep(
  seconds: number,
  roundNumber?: number,
  totalRounds?: number,
): SessionPhaseStep {
  return {
    phase: 'preparation-exhale',
    durationSeconds: seconds,
    label: 'Exhale',
    cueText: CUES.exhale,
    audioCue: 'low',
    roundNumber,
    totalRounds,
  };
}

function relaxedPlan(config: RelaxedConfig): SessionPhaseStep[] {
  const steps: SessionPhaseStep[] = [];
  for (let i = 0; i < config.cycles; i += 1) {
    steps.push(inhaleStep(config.inhaleSeconds));
    if (config.holdAfterInhaleSeconds > 0) {
      steps.push({
        phase: 'breath-hold',
        durationSeconds: config.holdAfterInhaleSeconds,
        label: 'Hold',
        cueText: CUES.holdAfterInhale,
        audioCue: 'chime',
      });
    }
    steps.push(exhaleStep(config.exhaleSeconds));
    if (config.holdAfterExhaleSeconds > 0) {
      steps.push({
        phase: 'breath-hold',
        durationSeconds: config.holdAfterExhaleSeconds,
        label: 'Hold (empty)',
        cueText: CUES.holdAfterExhale,
        audioCue: 'chime',
      });
    }
  }
  steps.push(completeStep());
  return steps;
}

function staticHoldPlan(config: StaticHoldConfig): SessionPhaseStep[] {
  const steps: SessionPhaseStep[] = [];
  const total = config.rounds;
  for (let round = 1; round <= total; round += 1) {
    // Preparation breathing
    for (let c = 0; c < config.prepCycles; c += 1) {
      steps.push(inhaleStep(config.inhaleSeconds, round, total));
      steps.push(exhaleStep(config.exhaleSeconds, round, total));
    }
    // Final comfortable inhale cue
    steps.push({
      phase: 'final-inhale',
      durationSeconds: config.inhaleSeconds,
      label: 'Final inhale',
      cueText: CUES.finalInhale,
      audioCue: 'bell',
      roundNumber: round,
      totalRounds: total,
    });
    // Gentle breath-hold (early exit allowed)
    steps.push({
      phase: 'breath-hold',
      durationSeconds: config.breathHoldSeconds,
      label: 'Breath-hold',
      cueText: CUES.breathHold,
      audioCue: 'chime',
      allowEarlyExit: true,
      roundNumber: round,
      totalRounds: total,
    });
    // Recovery breathing
    for (let r = 0; r < config.recoveryCycles; r += 1) {
      steps.push({
        phase: 'recovery',
        durationSeconds: config.inhaleSeconds + config.exhaleSeconds,
        label: 'Recovery',
        cueText: CUES.recovery,
        audioCue: r === 0 ? 'double-chime' : undefined,
        roundNumber: round,
        totalRounds: total,
      });
    }
    // Short rest between rounds (not after the last round)
    if (round < total) {
      steps.push({
        phase: 'rest',
        durationSeconds: config.exhaleSeconds,
        label: 'Rest',
        cueText: CUES.rest,
        roundNumber: round,
        totalRounds: total,
      });
    }
  }
  steps.push(completeStep());
  return steps;
}

function rvMobilityPlan(config: RvMobilityConfig): SessionPhaseStep[] {
  const steps: SessionPhaseStep[] = [];
  const total = config.rounds;
  for (let round = 1; round <= total; round += 1) {
    for (let c = 0; c < config.prepCycles; c += 1) {
      steps.push(inhaleStep(config.inhaleSeconds, round, total));
      steps.push(exhaleStep(config.exhaleSeconds, round, total));
    }
    // Gentle exhale to a comfortable empty point
    steps.push({
      phase: 'preparation-exhale',
      durationSeconds: config.exhaleSeconds,
      label: 'Gentle exhale',
      cueText: CUES.emptyExhale,
      audioCue: 'low',
      roundNumber: round,
      totalRounds: total,
    });
    // Short empty-lung stretch (mobility, never a max hold — no early-exit needed)
    steps.push({
      phase: 'empty-lung-stretch',
      durationSeconds: config.emptyLungStretchSeconds,
      label: 'Empty-lung stretch',
      cueText: CUES.emptyStretch,
      audioCue: 'chime',
      roundNumber: round,
      totalRounds: total,
    });
    // Recovery
    steps.push({
      phase: 'recovery',
      durationSeconds: config.recoverySeconds,
      label: 'Recovery',
      cueText: CUES.recovery,
      audioCue: 'double-chime',
      roundNumber: round,
      totalRounds: total,
    });
  }
  steps.push(completeStep());
  return steps;
}

function completeStep(): SessionPhaseStep {
  return {
    phase: 'complete',
    durationSeconds: 0,
    label: 'Round complete',
    cueText: CUES.complete,
    audioCue: 'double-chime',
  };
}

/**
 * Expand a session config into an ordered list of timed phase steps. The config
 * is clamped to safe ranges first, so the generated plan is always within
 * beginner-appropriate bounds.
 */
export function generateSessionPlan(
  rawConfig: SessionConfig,
): SessionPhaseStep[] {
  const config = clampConfig(rawConfig);
  switch (config.mode) {
    case 'relaxed':
      return relaxedPlan(config);
    case 'static-hold':
      return staticHoldPlan(config);
    case 'rv-mobility':
      return rvMobilityPlan(config);
  }
}

/** Total planned duration in seconds (excludes the zero-length complete step). */
export function planDurationSeconds(steps: SessionPhaseStep[]): number {
  return steps.reduce((sum, step) => sum + step.durationSeconds, 0);
}
