import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { Button } from '../components/Button';
import { NumberField } from '../components/NumberField';
import {
  LONG_HOLD_WARNING_SECONDS,
  MODE_META,
  defaultConfigFor,
} from '../features/session/sessionPresets';
import {
  generateSessionPlan,
  planDurationSeconds,
} from '../features/session/sessionEngine';
import type {
  SessionConfig,
  SessionMode,
} from '../features/session/sessionTypes';
import { formatDuration } from '../utils/format';

const VALID_MODES: SessionMode[] = ['relaxed', 'static-hold', 'rv-mobility'];

function isValidMode(mode: string | undefined): mode is SessionMode {
  return !!mode && VALID_MODES.includes(mode as SessionMode);
}

export function Setup() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const [config, setConfig] = useState<SessionConfig>(() =>
    defaultConfigFor(isValidMode(mode) ? mode : 'relaxed'),
  );

  if (!isValidMode(mode)) {
    navigate('/', { replace: true });
    return null;
  }

  const meta = MODE_META[config.mode];
  const update = (patch: Partial<SessionConfig>) =>
    setConfig((c) => ({ ...c, ...patch }) as SessionConfig);

  const estimate = formatDuration(
    planDurationSeconds(generateSessionPlan(config)),
  );

  const startSession = () => {
    navigate('/session', { state: { config } });
  };

  return (
    <AppLayout>
      <Link to="/" className="mb-4 text-ink-soft hover:text-ink">
        ← Home
      </Link>
      <h1 className="text-2xl font-semibold text-ink">{meta.title}</h1>
      <p className="mt-1 mb-5 text-sm text-ink-soft">{meta.description}</p>

      <div className="flex flex-col gap-3">
        {config.mode === 'relaxed' && (
          <>
            <NumberField
              label="Inhale"
              unit="s"
              value={config.inhaleSeconds}
              min={1}
              max={20}
              onChange={(v) => update({ inhaleSeconds: v })}
            />
            <NumberField
              label="Exhale"
              unit="s"
              value={config.exhaleSeconds}
              min={1}
              max={20}
              onChange={(v) => update({ exhaleSeconds: v })}
            />
            <NumberField
              label="Hold after inhale"
              unit="s"
              value={config.holdAfterInhaleSeconds}
              min={0}
              max={20}
              onChange={(v) => update({ holdAfterInhaleSeconds: v })}
            />
            <NumberField
              label="Hold after exhale"
              unit="s"
              value={config.holdAfterExhaleSeconds}
              min={0}
              max={20}
              onChange={(v) => update({ holdAfterExhaleSeconds: v })}
            />
            <NumberField
              label="Cycles"
              value={config.cycles}
              min={1}
              max={60}
              onChange={(v) => update({ cycles: v })}
            />
          </>
        )}

        {config.mode === 'static-hold' && (
          <>
            <NumberField
              label="Preparation cycles"
              value={config.prepCycles}
              min={1}
              max={15}
              onChange={(v) => update({ prepCycles: v })}
            />
            <NumberField
              label="Inhale"
              unit="s"
              value={config.inhaleSeconds}
              min={1}
              max={20}
              onChange={(v) => update({ inhaleSeconds: v })}
            />
            <NumberField
              label="Exhale"
              unit="s"
              value={config.exhaleSeconds}
              min={1}
              max={20}
              onChange={(v) => update({ exhaleSeconds: v })}
            />
            <NumberField
              label="Breath-hold target"
              unit="s"
              value={config.breathHoldSeconds}
              min={5}
              max={300}
              step={5}
              onChange={(v) => update({ breathHoldSeconds: v })}
            />
            {config.breathHoldSeconds > LONG_HOLD_WARNING_SECONDS && (
              <p className="rounded-2xl bg-sand/60 px-4 py-3 text-sm text-ink">
                That's a long hold. There's no need to chase a big number —
                consistency and comfort matter more than duration. You can end
                any hold early.
              </p>
            )}
            <NumberField
              label="Recovery cycles"
              value={config.recoveryCycles}
              min={1}
              max={10}
              onChange={(v) => update({ recoveryCycles: v })}
            />
            <NumberField
              label="Rounds"
              value={config.rounds}
              min={1}
              max={6}
              onChange={(v) => update({ rounds: v })}
            />
            <p className="px-1 text-sm text-ink-soft">
              Final inhale cue: “Take a comfortable 70–80% inhale.”
            </p>
          </>
        )}

        {config.mode === 'rv-mobility' && (
          <>
            <p className="rounded-2xl bg-sand/60 px-4 py-3 text-sm text-ink">
              Dry-land only. This is gentle mobility, not a max-hold exercise.
              Never force the exhale.
            </p>
            <NumberField
              label="Preparation cycles"
              value={config.prepCycles}
              min={1}
              max={15}
              onChange={(v) => update({ prepCycles: v })}
            />
            <NumberField
              label="Inhale"
              unit="s"
              value={config.inhaleSeconds}
              min={1}
              max={20}
              onChange={(v) => update({ inhaleSeconds: v })}
            />
            <NumberField
              label="Exhale"
              unit="s"
              value={config.exhaleSeconds}
              min={1}
              max={20}
              onChange={(v) => update({ exhaleSeconds: v })}
            />
            <NumberField
              label="Empty-lung stretch"
              unit="s"
              value={config.emptyLungStretchSeconds}
              min={2}
              max={10}
              onChange={(v) => update({ emptyLungStretchSeconds: v })}
            />
            <NumberField
              label="Recovery"
              unit="s"
              value={config.recoverySeconds}
              min={10}
              max={120}
              step={5}
              onChange={(v) => update({ recoverySeconds: v })}
            />
            <NumberField
              label="Rounds"
              value={config.rounds}
              min={1}
              max={5}
              onChange={(v) => update({ rounds: v })}
            />
          </>
        )}
      </div>

      <p className="mt-5 text-center text-sm text-ink-soft">
        Estimated duration: {estimate}
      </p>

      <div className="mt-3">
        <Button className="w-full" onClick={startSession}>
          Begin
        </Button>
      </div>
    </AppLayout>
  );
}
