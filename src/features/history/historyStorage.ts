import { readJSON, writeJSON } from '../../utils/storage';
import type { SessionRecord } from './historyTypes';

const HISTORY_KEY = 'celeste.history.v1';

export function loadHistory(): SessionRecord[] {
  return readJSON<SessionRecord[]>(HISTORY_KEY, []);
}

export function appendSession(
  record: Omit<SessionRecord, 'id' | 'date'> & {
    id?: string;
    date?: string;
  },
): SessionRecord {
  const full: SessionRecord = {
    id: record.id ?? crypto.randomUUID(),
    date: record.date ?? new Date().toISOString(),
    ...record,
  };
  const history = loadHistory();
  history.unshift(full);
  writeJSON(HISTORY_KEY, history);
  return full;
}

export function clearHistory(): void {
  writeJSON<SessionRecord[]>(HISTORY_KEY, []);
}
