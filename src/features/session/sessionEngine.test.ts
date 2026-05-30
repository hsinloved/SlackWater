import { describe, expect, it } from 'vitest';
import {
  generateSessionPlan,
  planDurationSeconds,
} from './sessionEngine';
import { clampConfig } from './sessionPresets';
import type {
  RelaxedConfig,
  RvMobilityConfig,
  StaticHoldConfig,
  ThreePartConfig,
} from './sessionTypes';

const relaxed = (over: Partial<RelaxedConfig> = {}): RelaxedConfig => ({
  mode: 'relaxed',
  inhaleSeconds: 4,
  exhaleSeconds: 6,
  cycles: 10,
  holdAfterInhaleSeconds: 0,
  holdAfterExhaleSeconds: 0,
  ...over,
});

const staticHold = (over: Partial<StaticHoldConfig> = {}): StaticHoldConfig => ({
  mode: 'static-hold',
  prepCycles: 5,
  inhaleSeconds: 4,
  exhaleSeconds: 6,
  breathHoldSeconds: 30,
  recoveryCycles: 3,
  rounds: 3,
  ...over,
});

const rv = (over: Partial<RvMobilityConfig> = {}): RvMobilityConfig => ({
  mode: 'rv-mobility',
  prepCycles: 5,
  inhaleSeconds: 4,
  exhaleSeconds: 6,
  emptyLungStretchSeconds: 3,
  recoverySeconds: 30,
  rounds: 3,
  ...over,
});

describe('generateSessionPlan — relaxed', () => {
  it('produces inhale/exhale pairs per cycle with no breath-hold by default', () => {
    const plan = generateSessionPlan(relaxed({ cycles: 3 }));
    const holds = plan.filter((s) => s.phase === 'breath-hold');
    expect(holds).toHaveLength(0);
    // 3 cycles * (inhale + exhale) + complete
    expect(plan).toHaveLength(3 * 2 + 1);
    expect(plan[plan.length - 1]?.phase).toBe('complete');
  });

  it('inserts holds when configured', () => {
    const plan = generateSessionPlan(
      relaxed({ cycles: 2, holdAfterInhaleSeconds: 3, holdAfterExhaleSeconds: 2 }),
    );
    expect(plan.filter((s) => s.phase === 'breath-hold')).toHaveLength(4);
  });
});

const threePart = (over: Partial<ThreePartConfig> = {}): ThreePartConfig => ({
  mode: 'three-part',
  stageSeconds: 2,
  exhaleSeconds: 6,
  cycles: 8,
  ...over,
});

describe('generateSessionPlan — three-part', () => {
  it('produces belly/ribs/chest/exhale per cycle and no breath-hold', () => {
    const plan = generateSessionPlan(threePart({ cycles: 3 }));
    expect(plan).toHaveLength(3 * 4 + 1);
    expect(plan.some((s) => s.allowEarlyExit)).toBe(false);
    expect(plan.filter((s) => s.phase === 'inhale-belly')).toHaveLength(3);
    expect(plan.filter((s) => s.phase === 'inhale-ribs')).toHaveLength(3);
    expect(plan.filter((s) => s.phase === 'inhale-chest')).toHaveLength(3);
    expect(plan[plan.length - 1]?.phase).toBe('complete');
  });
});

describe('generateSessionPlan — static hold', () => {
  it('creates one early-exit breath-hold per round', () => {
    const plan = generateSessionPlan(staticHold({ rounds: 3 }));
    const holds = plan.filter((s) => s.phase === 'breath-hold');
    expect(holds).toHaveLength(3);
    expect(holds.every((h) => h.allowEarlyExit)).toBe(true);
  });

  it('has a final-inhale cue before each hold', () => {
    const plan = generateSessionPlan(staticHold({ rounds: 2 }));
    expect(plan.filter((s) => s.phase === 'final-inhale')).toHaveLength(2);
  });

  it('does not add a rest after the final round', () => {
    const plan = generateSessionPlan(staticHold({ rounds: 2 }));
    expect(plan.filter((s) => s.phase === 'rest')).toHaveLength(1);
  });

  it('tags steps with round numbers', () => {
    const plan = generateSessionPlan(staticHold({ rounds: 2 }));
    const rounds = new Set(
      plan.filter((s) => s.roundNumber).map((s) => s.roundNumber),
    );
    expect([...rounds].sort()).toEqual([1, 2]);
  });
});

describe('generateSessionPlan — rv mobility', () => {
  it('uses a short empty-lung stretch and no early-exit breath-hold', () => {
    const plan = generateSessionPlan(rv({ rounds: 2, emptyLungStretchSeconds: 4 }));
    const stretches = plan.filter((s) => s.phase === 'empty-lung-stretch');
    expect(stretches).toHaveLength(2);
    expect(stretches.every((s) => s.durationSeconds === 4)).toBe(true);
    expect(plan.some((s) => s.allowEarlyExit)).toBe(false);
  });
});

describe('clampConfig — safety guardrails', () => {
  it('caps static-hold rounds at 6 and rv rounds at 5', () => {
    expect((clampConfig(staticHold({ rounds: 99 })) as StaticHoldConfig).rounds).toBe(6);
    expect((clampConfig(rv({ rounds: 99 })) as RvMobilityConfig).rounds).toBe(5);
  });

  it('keeps the empty-lung stretch within 2–10 seconds', () => {
    expect(
      (clampConfig(rv({ emptyLungStretchSeconds: 1 })) as RvMobilityConfig)
        .emptyLungStretchSeconds,
    ).toBe(2);
    expect(
      (clampConfig(rv({ emptyLungStretchSeconds: 50 })) as RvMobilityConfig)
        .emptyLungStretchSeconds,
    ).toBe(10);
  });

  it('caps breath-hold at 5 minutes', () => {
    expect(
      (clampConfig(staticHold({ breathHoldSeconds: 9999 })) as StaticHoldConfig)
        .breathHoldSeconds,
    ).toBe(300);
  });
});

describe('planDurationSeconds', () => {
  it('sums step durations', () => {
    const plan = generateSessionPlan(relaxed({ cycles: 2 }));
    // 2 * (4 + 6) = 20
    expect(planDurationSeconds(plan)).toBe(20);
  });
});
