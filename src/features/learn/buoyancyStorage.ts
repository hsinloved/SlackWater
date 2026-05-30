import { readJSON, writeJSON } from '../../utils/storage';

export type BuoyancyObs = 'floaty' | 'stable' | 'sinks';
export const BUOYANCY_OBS: BuoyancyObs[] = ['floaty', 'stable', 'sinks'];

export const BUOYANCY_LEVELS = ['70', '80', '90'] as const;
export type BuoyancyLevel = (typeof BUOYANCY_LEVELS)[number];

export interface BuoyancyResult {
  date: string;
  levels: Record<BuoyancyLevel, BuoyancyObs | null>;
  notes: string;
}

const KEY = 'slackwater.buoyancy.v1';

export function loadBuoyancy(): BuoyancyResult | null {
  return readJSON<BuoyancyResult | null>(KEY, null);
}

export function saveBuoyancy(result: BuoyancyResult): void {
  writeJSON(KEY, result);
}

export function emptyLevels(): Record<BuoyancyLevel, BuoyancyObs | null> {
  return { '70': null, '80': null, '90': null };
}
