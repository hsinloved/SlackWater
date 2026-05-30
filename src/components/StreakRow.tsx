import { currentStreak, last7Days } from '../features/history/streakStorage';
import { useLanguage } from '../i18n/LanguageProvider';

/** A calm 7-day dots row with the current practice streak. */
export function StreakRow() {
  const { t } = useLanguage();
  const days = last7Days();
  const streak = currentStreak();

  return (
    <div className="mb-6 flex flex-col items-center gap-2">
      <div className="flex items-center gap-2.5">
        {days.map((d) => (
          <span
            key={d.key}
            className={`h-2.5 w-2.5 rounded-full border transition ${
              d.practised
                ? 'border-accent bg-accent'
                : 'border-white/35 bg-white/5'
            } ${d.isToday ? 'ring-2 ring-accent/60 ring-offset-2 ring-offset-[#0b2832]' : ''}`}
          />
        ))}
      </div>
      <p className="text-xs text-ink-soft">
        {streak > 0 ? t('streak.label', { n: streak }) : t('streak.start')}
      </p>
    </div>
  );
}
