import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useSessionTimer } from './useSessionTimer';
import type { SessionPhaseStep } from './sessionTypes';

const NOOP_OPTS = { soundEnabled: false, vibrationEnabled: false };

const relaxedPlan: SessionPhaseStep[] = [
  { phase: 'preparation-inhale', durationSeconds: 4, labelKey: 'phase.inhale', cueKey: '' },
  { phase: 'preparation-exhale', durationSeconds: 6, labelKey: 'phase.exhale', cueKey: '' },
  { phase: 'complete', durationSeconds: 0, labelKey: 'phase.complete', cueKey: '' },
];

const holdPlan: SessionPhaseStep[] = [
  {
    phase: 'breath-hold',
    durationSeconds: 30,
    labelKey: 'phase.breathHold',
    cueKey: '',
    allowEarlyExit: true,
    roundNumber: 1,
    totalRounds: 1,
  },
  { phase: 'recovery', durationSeconds: 5, labelKey: 'phase.recovery', cueKey: '' },
  { phase: 'complete', durationSeconds: 0, labelKey: 'phase.complete', cueKey: '' },
];

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useSessionTimer', () => {
  it('starts on the first step', () => {
    const { result } = renderHook(() =>
      useSessionTimer(relaxedPlan, NOOP_OPTS),
    );
    act(() => result.current.start());
    expect(result.current.status).toBe('running');
    expect(result.current.currentStep?.labelKey).toBe('phase.inhale');
    expect(result.current.remainingSeconds).toBe(4);
  });

  it('advances to the next step once a step elapses', () => {
    const { result } = renderHook(() =>
      useSessionTimer(relaxedPlan, NOOP_OPTS),
    );
    act(() => result.current.start());
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(result.current.currentStep?.phase).toBe('preparation-exhale');
  });

  it('reaches complete and reports a summary', () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useSessionTimer(relaxedPlan, { ...NOOP_OPTS, onComplete }),
    );
    act(() => result.current.start());
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(result.current.status).toBe('complete');
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete.mock.calls[0][0].finishedNaturally).toBe(true);
  });

  it('pauses and resumes without losing the current step', () => {
    const { result } = renderHook(() =>
      useSessionTimer(relaxedPlan, NOOP_OPTS),
    );
    act(() => result.current.start());
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    act(() => result.current.pause());
    expect(result.current.status).toBe('paused');
    const remainingWhilePaused = result.current.remainingSeconds;
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    // Time should not progress while paused.
    expect(result.current.remainingSeconds).toBe(remainingWhilePaused);
    act(() => result.current.resume());
    expect(result.current.status).toBe('running');
    expect(result.current.currentStep?.phase).toBe('preparation-inhale');
  });

  it('ends a breath-hold early and moves to recovery', () => {
    const { result } = renderHook(() => useSessionTimer(holdPlan, NOOP_OPTS));
    act(() => result.current.start());
    expect(result.current.currentStep?.phase).toBe('breath-hold');
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    act(() => result.current.endHoldEarly());
    expect(result.current.currentStep?.phase).toBe('recovery');
  });

  it('does not allow early exit on non-hold steps', () => {
    const { result } = renderHook(() =>
      useSessionTimer(relaxedPlan, NOOP_OPTS),
    );
    act(() => result.current.start());
    act(() => result.current.endHoldEarly());
    // Still on the inhale step.
    expect(result.current.currentStep?.phase).toBe('preparation-inhale');
  });
});
