import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { Button } from '../components/Button';
import { appendSession } from '../features/history/historyStorage';
import { markPracticedToday } from '../features/history/streakStorage';
import {
  FEELINGS,
  SCALES,
  type Feeling,
  type Scale,
} from '../features/history/historyTypes';
import type { SessionMode } from '../features/session/sessionTypes';
import type { SessionSummary } from '../features/session/useSessionTimer';
import { useLanguage } from '../i18n/LanguageProvider';
import { formatDuration } from '../utils/format';

interface LocationState {
  summary?: SessionSummary;
  mode?: SessionMode;
}

export function Complete() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const state = location.state as LocationState | null;

  const [feeling, setFeeling] = useState<Feeling | null>(null);
  const [effort, setEffort] = useState<number | null>(null);
  const [bodyQuieter, setBodyQuieter] = useState<Scale | null>(null);
  const [relaxedAtUrge, setRelaxedAtUrge] = useState<Scale | null>(null);
  const [holdInput, setHoldInput] = useState('');
  const [notes, setNotes] = useState('');

  // Reaching this screen means a session finished — mark today as practised.
  useEffect(() => {
    if (state?.summary && state.mode) markPracticedToday();
  }, []);

  const renderScale = (
    question: string,
    value: Scale | null,
    onSet: (v: Scale | null) => void,
  ) => (
    <div>
      <h2 className="mb-2 font-heading text-lg font-medium text-ink">
        {question}
      </h2>
      <div className="flex gap-2">
        {SCALES.map((s) => (
          <button
            key={s}
            onClick={() => onSet(value === s ? null : s)}
            className={`h-11 flex-1 rounded-2xl text-sm transition ${
              value === s
                ? 'bg-accent font-medium text-[#06212a]'
                : 'glass text-ink'
            }`}
          >
            {t(`scale.${s}`)}
          </button>
        ))}
      </div>
    </div>
  );

  if (!state?.summary || !state.mode) {
    return <Navigate to="/" replace />;
  }

  const { summary, mode } = state;
  const modeTitle = t(`modes.${mode}.title`);

  const save = () => {
    const parsedHold = holdInput.trim() === '' ? null : Number(holdInput);
    appendSession({
      mode,
      modeTitle,
      totalDurationSeconds: summary.elapsedSeconds,
      roundsCompleted: summary.roundsCompleted,
      totalRounds: summary.totalRounds,
      feeling,
      perceivedEffort: effort,
      bodyQuieter,
      relaxedAtUrge,
      breathHoldSeconds:
        parsedHold != null && !Number.isNaN(parsedHold)
          ? parsedHold
          : summary.longestHoldSeconds || null,
      notes: notes.trim(),
    });
    navigate('/history', { replace: true });
  };

  return (
    <AppLayout>
      <header className="mb-5">
        <h1 className="font-heading text-3xl font-semibold text-ink">
          {summary.finishedNaturally
            ? t('complete.titleComplete')
            : t('complete.titleEnded')}
        </h1>
        <p className="mt-1 text-ink-soft">
          {modeTitle} · {formatDuration(summary.elapsedSeconds, lang)} ·{' '}
          {summary.roundsCompleted}/{summary.totalRounds}{' '}
          {t('history.roundsUnit')}
        </p>
        <p className="mt-1 text-sm text-ink-soft">{t('complete.recoverNote')}</p>
      </header>

      <section className="flex flex-col gap-5">
        <div>
          <h2 className="mb-2 font-heading text-lg font-medium text-ink">
            {t('complete.feelingQ')}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {FEELINGS.map((f) => (
              <button
                key={f}
                onClick={() => setFeeling(f)}
                className={`rounded-2xl px-4 py-3 text-sm transition ${
                  feeling === f
                    ? 'bg-accent font-medium text-[#06212a]'
                    : 'glass text-ink'
                }`}
              >
                {t(`feeling.${f}`)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 font-heading text-lg font-medium text-ink">
            {t('complete.effortQ')}
          </h2>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setEffort(effort === n ? null : n)}
                className={`h-11 flex-1 rounded-2xl text-sm transition ${
                  effort === n
                    ? 'bg-accent font-medium text-[#06212a]'
                    : 'glass text-ink'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {renderScale(t('complete.bodyQuieterQ'), bodyQuieter, setBodyQuieter)}
        {renderScale(
          t('complete.relaxedAtUrgeQ'),
          relaxedAtUrge,
          setRelaxedAtUrge,
        )}

        <div>
          <label
            htmlFor="hold"
            className="mb-2 block text-base font-medium text-ink"
          >
            {t('complete.holdLabel')}
          </label>
          <input
            id="hold"
            type="number"
            inputMode="numeric"
            placeholder={
              summary.longestHoldSeconds
                ? `${summary.longestHoldSeconds}`
                : t('complete.holdPlaceholder')
            }
            value={holdInput}
            onChange={(e) => setHoldInput(e.target.value)}
            className="glass w-full rounded-2xl px-4 py-3 text-ink outline-none placeholder:text-ink-soft focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div>
          <label
            htmlFor="notes"
            className="mb-2 block text-base font-medium text-ink"
          >
            {t('complete.notesLabel')}
          </label>
          <textarea
            id="notes"
            rows={4}
            placeholder={t('complete.notesPlaceholder')}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="glass w-full resize-none rounded-2xl px-4 py-3 text-ink outline-none placeholder:text-ink-soft focus:ring-2 focus:ring-accent/40"
          />
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-3">
        <Button className="w-full" onClick={save}>
          {t('complete.save')}
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => navigate('/', { replace: true })}
        >
          {t('complete.skip')}
        </Button>
      </div>
    </AppLayout>
  );
}
