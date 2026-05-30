import { Link, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { LanguageToggle } from '../components/LanguageToggle';
import { LogoMark } from '../components/LogoMark';
import { StreakRow } from '../components/StreakRow';
import { useLanguage } from '../i18n/LanguageProvider';
import type { SessionMode } from '../features/session/sessionTypes';

const MODES: SessionMode[] = [
  'relaxed',
  'three-part',
  'static-hold',
  'rv-mobility',
];

export function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <AppLayout>
      <header className="mb-7 mt-2 flex animate-fade-in flex-col items-center text-center">
        <LogoMark className="h-11 w-auto text-accent" />
        <h1 className="mt-3 pl-[0.3em] text-2xl font-light tracking-[0.3em] text-ink">
          SLACKWATER
        </h1>
        <p className="mt-1 text-sm tracking-wide text-accent">
          {t('home.tagline')}
        </p>
      </header>

      <StreakRow />

      <div className="flex flex-col gap-3">
        {MODES.map((mode) => (
          <button
            key={mode}
            onClick={() => navigate(`/setup/${mode}`)}
            className="glass group flex animate-fade-in items-center justify-between gap-4 rounded-3xl px-6 py-5 text-left transition active:scale-[0.99] hover:bg-white/[0.09]"
          >
            <span>
              <span className="block font-heading text-xl font-semibold text-ink">
                {t(`modes.${mode}.title`)}
              </span>
              <span className="mt-0.5 block text-sm text-ink-soft">
                {t(`modes.${mode}.subtitle`)}
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
          </button>
        ))}
      </div>

      <Link
        to="/learn"
        className="glass group mt-3 flex items-center justify-between gap-4 rounded-3xl px-6 py-5 transition active:scale-[0.99] hover:bg-white/[0.09]"
      >
        <span>
          <span className="block font-heading text-xl font-semibold text-ink">
            {t('home.learnTitle')}
          </span>
          <span className="mt-0.5 block text-sm text-ink-soft">
            {t('home.learnDesc')}
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

      <div className="mt-auto flex flex-col items-center gap-4 pt-10">
        <div className="glass flex w-full items-center justify-between gap-2 rounded-full p-1.5">
          <Link
            to="/history"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink transition active:scale-[0.98] hover:bg-white/[0.06]"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M12 7.5V12l3 1.8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t('home.history')}
          </Link>
          <LanguageToggle />
        </div>
        <p className="text-center text-xs leading-relaxed text-ink-soft">
          {t('home.safety')}
        </p>
      </div>
    </AppLayout>
  );
}
