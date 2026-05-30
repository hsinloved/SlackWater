import { currentStreak, last7Days } from '../features/history/streakStorage';
import { useLanguage } from '../i18n/LanguageProvider';

/** A calm 7-day dots row with the current practice streak. */
export function StreakRow() {
  const { t } = useLanguage();
  const days = last7Days();
  const streak = currentStreak();

  return (
    <div className="mb-6 flex flex-col items-center gap-2">
      <div className="flex gap-2">
        {days.map((d) => (
          <span
            key={d.key}
            className={`h-2.5 w-2.5 rounded-full transition ${
              d.practised ? 'bg-accent' : 'bg-white/12'
            } ${d.isToday ? 'ring-2 ring-accent/50 ring-offset-2 ring-offset-transparent' : ''}`}
          />
        ))}
      </div>
      {streak > 0 && (
        <p className="text-xs text-ink-soft">{t('streak.label', { n: streak })}</p>
      )}
    </div>
  );
}
