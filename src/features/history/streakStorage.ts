import { readJSON, writeJSON } from '../../utils/storage';

const KEY = 'slackwater.practiceDays.v1';

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

export function loadPracticeDays(): string[] {
  return readJSON<string[]>(KEY, []);
}

/** Mark today as practised (idempotent). Call when a session ends. */
export function markPracticedToday(): void {
  const days = loadPracticeDays();
  const key = dayKey(new Date());
  if (!days.includes(key)) {
    days.push(key);
    writeJSON(KEY, days);
  }
}

/** Consecutive days practised, ending today (or yesterday if not yet today). */
export function currentStreak(): number {
  const set = new Set(loadPracticeDays());
  const d = new Date();
  if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1);
  let streak = 0;
  while (set.has(dayKey(d))) {
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export interface DayDot {
  key: string;
  practised: boolean;
  isToday: boolean;
  /** Day of week, 0 = Sunday … 6 = Saturday. */
  weekday: number;
}

/** The last 7 days, oldest → today, for a dots row. */
export function last7Days(): DayDot[] {
  const set = new Set(loadPracticeDays());
  const today = dayKey(new Date());
  const out: DayDot[] = [];
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = dayKey(d);
    out.push({
      key,
      practised: set.has(key),
      isToday: key === today,
      weekday: d.getDay(),
    });
  }
  return out;
}
