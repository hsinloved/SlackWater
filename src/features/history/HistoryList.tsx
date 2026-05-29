import type { SessionRecord } from './historyTypes';
import { useLanguage } from '../../i18n/LanguageProvider';
import { formatDate, formatDuration } from '../../utils/format';

interface HistoryListProps {
  records: SessionRecord[];
}

export function HistoryList({ records }: HistoryListProps) {
  const { t, lang } = useLanguage();

  if (records.length === 0) {
    return (
      <p className="rounded-2xl bg-surface px-5 py-8 text-center text-ink-soft">
        {t('history.empty')}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {records.map((r) => (
        <li key={r.id} className="rounded-2xl bg-surface px-5 py-4 shadow-sm">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-medium text-ink">
              {t(`modes.${r.mode}.title`)}
            </span>
            <span className="text-sm text-ink-soft">
              {formatDate(r.date, lang)}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
            <span>{formatDuration(r.totalDurationSeconds, lang)}</span>
            <span>
              {r.roundsCompleted}/{r.totalRounds} {t('history.roundsUnit')}
            </span>
            {r.feeling && <span>{t(`feeling.${r.feeling}`)}</span>}
            {r.perceivedEffort != null && (
              <span>{t('history.effortUnit', { n: r.perceivedEffort })}</span>
            )}
            {r.breathHoldSeconds != null && (
              <span>{t('history.holdUnit', { n: r.breathHoldSeconds })}</span>
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
