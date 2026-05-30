import { currentStreak, last7Days } from '../features/history/streakStorage';
import { useLanguage } from '../i18n/LanguageProvider';

/** Single-character weekday labels, indexed by Date.getDay() (0 = Sunday). */
const WEEKDAY_LABELS: Record<string, string[]> = {
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  'zh-TW': ['日', '一', '二', '三', '四', '五', '六'],
};

/** A calm weekly practice tracker: 7 days with weekday labels and a streak. */
export function StreakRow() {
  const { t, lang } = useLanguage();
  const days = last7Days();
  const streak = currentStreak();
  const labels = WEEKDAY_LABELS[lang] ?? WEEKDAY_LABELS.en;

  return (
    <section className="mb-6 flex flex-col items-center gap-1.5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-ink-soft/80">
        {t('streak.heading')}
      </p>
      <div className="flex items-start gap-2.5">
        {days.map((d) => (
          <div key={d.key} className="flex flex-col items-center gap-1.5">
            <span
              className={`h-3 w-3 rounded-full border transition ${
                d.practised
                  ? 'border-accent bg-accent'
                  : 'border-white/30 bg-white/5'
              } ${d.isToday ? 'ring-2 ring-accent/60 ring-offset-2 ring-offset-[#0b2832]' : ''}`}
            />
            <span
              className={`text-[10px] ${
                d.isToday ? 'font-semibold text-accent' : 'text-ink-soft/70'
              }`}
            >
              {labels[d.weekday]}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-1 text-xs text-ink-soft">
        {streak > 0 ? t('streak.label', { n: streak }) : t('streak.start')}
      </p>
    </section>
  );
}
