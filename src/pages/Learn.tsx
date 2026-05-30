import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { LESSONS, pickText } from '../features/learn/lessons';
import { useLanguage } from '../i18n/LanguageProvider';

export function Learn() {
  const { t, lang } = useLanguage();

  return (
    <AppLayout>
      <Link to="/" className="mb-4 text-ink-soft hover:text-ink">
        ← {t('common.home')}
      </Link>
      <h1 className="mb-4 font-heading text-3xl font-semibold text-ink">
        {t('learn.title')}
      </h1>

      <div className="flex flex-col gap-3">
        {LESSONS.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/learn/${lesson.id}`}
            className="glass group flex items-center justify-between gap-4 rounded-3xl px-6 py-5 transition active:scale-[0.99] hover:bg-white/[0.09]"
          >
            <span>
              <span className="block font-heading text-xl font-semibold text-ink">
                {pickText(lesson.title, lang)}
              </span>
              <span className="mt-0.5 block text-sm text-ink-soft">
                {pickText(lesson.summary, lang)}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition group-hover:bg-accent group-hover:text-[#06212a]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-ink-soft">
        {t('learn.disclaimer')}
      </p>
    </AppLayout>
  );
}
