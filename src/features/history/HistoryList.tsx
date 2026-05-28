import { FEELING_LABELS, type SessionRecord } from './historyTypes';
import { formatDate, formatDuration } from '../../utils/format';

interface HistoryListProps {
  records: SessionRecord[];
}

export function HistoryList({ records }: HistoryListProps) {
  if (records.length === 0) {
    return (
      <p className="rounded-2xl bg-surface px-5 py-8 text-center text-ink-soft">
        No sessions yet. Your reflections will appear here after your first
        practice.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {records.map((r) => (
        <li
          key={r.id}
          className="rounded-2xl bg-surface px-5 py-4 shadow-sm"
        >
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-medium text-ink">{r.modeTitle}</span>
            <span className="text-sm text-ink-soft">{formatDate(r.date)}</span>
          </div>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
            <span>{formatDuration(r.totalDurationSeconds)}</span>
            <span>
              {r.roundsCompleted}/{r.totalRounds} rounds
            </span>
            {r.feeling && <span>{FEELING_LABELS[r.feeling]}</span>}
            {r.perceivedEffort != null && (
              <span>effort {r.perceivedEffort}/5</span>
            )}
            {r.breathHoldSeconds != null && (
              <span>hold {r.breathHoldSeconds}s</span>
            )}
          </div>
          {r.notes && (
            <p className="mt-2 text-sm leading-relaxed text-ink">{r.notes}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
