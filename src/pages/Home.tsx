import { Link, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { MODE_META } from '../features/session/sessionPresets';
import type { SessionMode } from '../features/session/sessionTypes';

const MODES: SessionMode[] = ['relaxed', 'static-hold', 'rv-mobility'];

export function Home() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <header className="mb-6 animate-fade-in">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">
          Celeste
        </h1>
        <p className="mt-1 text-ink-soft">
          Calm, dry-land breath awareness. Consistency over intensity.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {MODES.map((mode) => {
          const meta = MODE_META[mode];
          return (
            <button
              key={mode}
              onClick={() => navigate(`/setup/${mode}`)}
              className="animate-fade-in rounded-3xl bg-surface px-5 py-5 text-left shadow-sm transition active:scale-[0.99] hover:brightness-[0.99]"
            >
              <h2 className="text-xl font-medium text-ink">{meta.title}</h2>
              <p className="mt-0.5 text-sm font-medium text-accent">
                {meta.subtitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {meta.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-sand/50 px-5 py-4 text-sm leading-relaxed text-ink">
        Dry-land practice only. Never practise breath-holding alone in water.
        Do not hyperventilate. Stop if dizzy, uncomfortable, or unwell.
      </div>

      <Link
        to="/history"
        className="mt-6 text-center text-base font-medium text-accent underline-offset-4 hover:underline"
      >
        View practice history
      </Link>
    </AppLayout>
  );
}
