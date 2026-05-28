import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { playCue, unlockAudio } from '../../utils/audioCues';
import { vibratePhaseChange } from '../../utils/vibration';
import type { SessionPhaseStep } from './sessionTypes';

export type TimerStatus =
  | 'idle'
  | 'running'
  | 'paused'
  | 'stopped'
  | 'complete';

export interface SessionSummary {
  /** Number of rounds the user reached the end of. */
  roundsCompleted: number;
  totalRounds: number;
  /** Whole seconds of elapsed practice time. */
  elapsedSeconds: number;
  /** Longest breath-hold actually held this session, in seconds. */
  longestHoldSeconds: number;
  /** Whether the user reached the natural end of the plan. */
  finishedNaturally: boolean;
}

interface TimerOptions {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  onComplete?: (summary: SessionSummary) => void;
}

const TICK_MS = 200;

/**
 * Drives a generated session plan as a timer state machine. Timing uses
 * wall-clock deltas (not tick counting) so it stays accurate even if the
 * interval fires irregularly when the tab is backgrounded.
 */
export function useSessionTimer(
  plan: SessionPhaseStep[],
  options: TimerOptions,
) {
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [stepIndex, setStepIndex] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(
    plan[0]?.durationSeconds ?? 0,
  );

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepIndexRef = useRef(0);
  // Timestamp (ms) when the current step is scheduled to finish.
  const stepEndsAtRef = useRef<number>(0);
  const elapsedMsRef = useRef<number>(0);
  const longestHoldRef = useRef<number>(0);

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const currentStep: SessionPhaseStep | undefined = plan[stepIndex];

  const totalRounds = useMemo(
    () => plan.reduce((max, s) => Math.max(max, s.totalRounds ?? 0), 0) || 1,
    [plan],
  );

  const clearTimer = useCallback(() => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const announce = useCallback((step: SessionPhaseStep) => {
    if (optionsRef.current.soundEnabled && step.audioCue) {
      playCue(step.audioCue);
    }
    if (optionsRef.current.vibrationEnabled) {
      vibratePhaseChange(step.phase);
    }
  }, []);

  /** Move into a step by index, scheduling its end time and firing cues. */
  const enterStep = useCallback(
    (index: number) => {
      const step = plan[index];
      if (!step) return;
      stepIndexRef.current = index;
      setStepIndex(index);

      if (step.phase === 'complete') {
        clearTimer();
        setRemainingSeconds(0);
        setStatus('complete');
        announce(step);
        optionsRef.current.onComplete?.({
          roundsCompleted: totalRounds,
          totalRounds,
          elapsedSeconds: Math.round(elapsedMsRef.current / 1000),
          longestHoldSeconds: longestHoldRef.current,
          finishedNaturally: true,
        });
        return;
      }

      setRemainingSeconds(step.durationSeconds);
      stepEndsAtRef.current = Date.now() + step.durationSeconds * 1000;
      announce(step);
    },
    [plan, totalRounds, clearTimer, announce],
  );

  /** Advance to the next step, crediting any breath-hold we just finished. */
  const advance = useCallback(() => {
    const finished = plan[stepIndexRef.current];
    if (finished && finished.phase === 'breath-hold') {
      longestHoldRef.current = Math.max(
        longestHoldRef.current,
        finished.durationSeconds,
      );
    }
    enterStep(stepIndexRef.current + 1);
  }, [plan, enterStep]);

  // The ticking loop. Re-armed whenever status or step changes.
  useEffect(() => {
    if (status !== 'running') return;
    clearTimer();
    intervalRef.current = setInterval(() => {
      const msLeft = stepEndsAtRef.current - Date.now();
      elapsedMsRef.current += TICK_MS;
      if (msLeft <= 0) {
        advance();
      } else {
        setRemainingSeconds(Math.ceil(msLeft / 1000));
      }
    }, TICK_MS);
    return clearTimer;
  }, [status, stepIndex, advance, clearTimer]);

  const start = useCallback(() => {
    unlockAudio();
    elapsedMsRef.current = 0;
    longestHoldRef.current = 0;
    setStatus('running');
    enterStep(0);
  }, [enterStep]);

  const pause = useCallback(() => {
    setStatus((s) => {
      if (s !== 'running') return s;
      clearTimer();
      return 'paused';
    });
  }, [clearTimer]);

  const resume = useCallback(() => {
    setStatus((s) => {
      if (s !== 'paused') return s;
      // Re-anchor the end time to "now + whatever was left".
      stepEndsAtRef.current = Date.now() + remainingSeconds * 1000;
      return 'running';
    });
  }, [remainingSeconds]);

  const stop = useCallback(() => {
    clearTimer();
    setStatus('stopped');
  }, [clearTimer]);

  /** End an early-exit breath-hold immediately and move on to recovery. */
  const endHoldEarly = useCallback(() => {
    const step = plan[stepIndexRef.current];
    if (!step?.allowEarlyExit) return;
    const held = step.durationSeconds - remainingSeconds;
    longestHoldRef.current = Math.max(longestHoldRef.current, held);
    enterStep(stepIndexRef.current + 1);
  }, [plan, remainingSeconds, enterStep]);

  /** Snapshot the current progress as a summary (used on manual stop). */
  const buildSummary = useCallback((): SessionSummary => {
    const step = plan[stepIndexRef.current];
    let longest = longestHoldRef.current;
    if (step?.phase === 'breath-hold') {
      longest = Math.max(longest, step.durationSeconds - remainingSeconds);
    }
    const roundsCompleted = step?.roundNumber
      ? Math.max(0, step.roundNumber - 1)
      : totalRounds;
    return {
      roundsCompleted,
      totalRounds,
      elapsedSeconds: Math.round(elapsedMsRef.current / 1000),
      longestHoldSeconds: longest,
      finishedNaturally: false,
    };
  }, [plan, remainingSeconds, totalRounds]);

  useEffect(() => clearTimer, [clearTimer]);

  return {
    status,
    stepIndex,
    currentStep,
    remainingSeconds,
    totalSteps: plan.length,
    totalRounds,
    start,
    pause,
    resume,
    stop,
    endHoldEarly,
    buildSummary,
  };
}
