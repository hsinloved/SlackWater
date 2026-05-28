import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { Button } from '../components/Button';
import { appendSession } from '../features/history/historyStorage';
import {
  FEELING_LABELS,
  type Feeling,
} from '../features/history/historyTypes';
import type { SessionMode } from '../features/session/sessionTypes';
import type { SessionSummary } from '../features/session/useSessionTimer';
import { formatDuration } from '../utils/format';

interface LocationState {
  summary?: SessionSummary;
  mode?: SessionMode;
  modeTitle?: string;
}

const FEELINGS: Feeling[] = ['calm', 'neutral', 'tense', 'uncomfortable'];

export function Complete() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const [feeling, setFeeling] = useState<Feeling | null>(null);
  const [effort, setEffort] = useState<number | null>(null);
  const [holdInput, setHoldInput] = useState('');
  const [notes, setNotes] = useState('');

  if (!state?.summary || !state.mode || !state.modeTitle) {
    return <Navigate to="/" replace />;
  }

  const { summary, mode, modeTitle } = state;

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
        <h1 className="text-2xl font-semibold text-ink">
          {summary.finishedNaturally ? 'Session complete' : 'Session ended'}
        </h1>
        <p className="mt-1 text-ink-soft">
          {modeTitle} · {formatDuration(summary.elapsedSeconds)} ·{' '}
          {summary.roundsCompleted}/{summary.totalRounds} rounds
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          Recover slowly and notice how you feel.
        </p>
      </header>

      <section className="flex flex-col gap-5">
        <div>
          <h2 className="mb-2 text-base font-medium text-ink">
            How did the session feel?
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {FEELINGS.map((f) => (
              <button
                key={f}
                onClick={() => setFeeling(f)}
                className={`rounded-2xl px-4 py-3 text-sm transition ${
                  feeling === f
                    ? 'bg-accent text-white'
                    : 'bg-surface text-ink'
                }`}
              >
                {FEELING_LABELS[f]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-base font-medium text-ink">
            Perceived effort (optional)
          </h2>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setEffort(effort === n ? null : n)}
                className={`h-11 flex-1 rounded-2xl text-sm transition ${
                  effort === n ? 'bg-accent text-white' : 'bg-surface text-ink'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="hold"
            className="mb-2 block text-base font-medium text-ink"
          >
            Breath-hold completed (optional)
          </label>
          <input
            id="hold"
            type="number"
            inputMode="numeric"
            placeholder={
              summary.longestHoldSeconds
                ? `${summary.longestHoldSeconds}`
                : 'seconds'
            }
            value={holdInput}
            onChange={(e) => setHoldInput(e.target.value)}
            className="w-full rounded-2xl bg-surface px-4 py-3 text-ink shadow-sm outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div>
          <label
            htmlFor="notes"
            className="mb-2 block text-base font-medium text-ink"
          >
            Notes
          </label>
          <textarea
            id="notes"
            rows={4}
            placeholder="Where did you feel tension first? When did the urge to breathe arrive? How full was your inhale?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full resize-none rounded-2xl bg-surface px-4 py-3 text-ink shadow-sm outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-3">
        <Button className="w-full" onClick={save}>
          Save reflection
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => navigate('/', { replace: true })}
        >
          Skip
        </Button>
      </div>
    </AppLayout>
  );
}
