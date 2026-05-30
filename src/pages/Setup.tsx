import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { Button } from '../components/Button';
import { NumberField } from '../components/NumberField';
import {
  LONG_HOLD_WARNING_SECONDS,
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
import { useLanguage } from '../i18n/LanguageProvider';
import { formatDuration } from '../utils/format';

const VALID_MODES: SessionMode[] = [
  'relaxed',
  'three-part',
  'static-hold',
  'rv-mobility',
];

/** Primary lesson to deep-link from each mode's setup screen. */
const LEARN_FOR: Record<SessionMode, string> = {
  relaxed: 'comfortable-breath',
  'three-part': 'belly-vs-chest',
  'static-hold': 'co2-tolerance',
  'rv-mobility': 'rv-explained',
};

function isValidMode(mode: string | undefined): mode is SessionMode {
  return !!mode && VALID_MODES.includes(mode as SessionMode);
}

export function Setup() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [config, setConfig] = useState<SessionConfig>(() =>
    defaultConfigFor(isValidMode(mode) ? mode : 'relaxed'),
  );

  if (!isValidMode(mode)) {
    navigate('/', { replace: true });
    return null;
  }

  const update = (patch: Partial<SessionConfig>) =>
    setConfig((c) => ({ ...c, ...patch }) as SessionConfig);

  const estimate = formatDuration(
    planDurationSeconds(generateSessionPlan(config)),
    lang,
  );

  const startSession = () => {
    navigate('/session', { state: { config } });
  };

  const sec = t('unit.s');

  return (
    <AppLayout>
      <Link to="/" className="mb-4 text-ink-soft hover:text-ink">
        ← {t('common.home')}
      </Link>
      <h1 className="font-heading text-3xl font-semibold text-ink">
        {t(`modes.${config.mode}.title`)}
      </h1>
      <p className="mt-1 text-sm text-ink-soft">
        {t(`modes.${config.mode}.desc`)}
      </p>
      <Link
        to={`/learn/${LEARN_FOR[config.mode]}`}
        className="mb-5 mt-2 inline-block text-sm font-medium text-accent hover:underline"
      >
        {t('setup.learnMore')}
      </Link>

      <div className="flex flex-col gap-3">
        {config.mode === 'relaxed' && (
          <>
            <NumberField
              label={t('setup.inhale')}
              unit={sec}
              value={config.inhaleSeconds}
              min={1}
              max={20}
              onChange={(v) => update({ inhaleSeconds: v })}
            />
            <NumberField
              label={t('setup.exhale')}
              unit={sec}
              value={config.exhaleSeconds}
              min={1}
              max={20}
              onChange={(v) => update({ exhaleSeconds: v })}
            />
            <NumberField
              label={t('setup.holdAfterInhale')}
              unit={sec}
              value={config.holdAfterInhaleSeconds}
              min={0}
              max={20}
              onChange={(v) => update({ holdAfterInhaleSeconds: v })}
            />
            <NumberField
              label={t('setup.holdAfterExhale')}
              unit={sec}
              value={config.holdAfterExhaleSeconds}
              min={0}
              max={20}
              onChange={(v) => update({ holdAfterExhaleSeconds: v })}
            />
            <NumberField
              label={t('setup.cycles')}
              value={config.cycles}
              min={1}
              max={60}
              onChange={(v) => update({ cycles: v })}
            />
          </>
        )}

        {config.mode === 'three-part' && (
          <>
            <NumberField
              label={t('setup.stageDuration')}
              unit={sec}
              value={config.stageSeconds}
              min={1}
              max={8}
              onChange={(v) => update({ stageSeconds: v })}
            />
            <NumberField
              label={t('setup.exhale')}
              unit={sec}
              value={config.exhaleSeconds}
              min={2}
              max={20}
              onChange={(v) => update({ exhaleSeconds: v })}
            />
            <NumberField
              label={t('setup.cycles')}
              value={config.cycles}
              min={1}
              max={30}
              onChange={(v) => update({ cycles: v })}
            />
          </>
        )}

        {config.mode === 'static-hold' && (
          <>
            <NumberField
              label={t('setup.prepCycles')}
              value={config.prepCycles}
              min={1}
              max={15}
              onChange={(v) => update({ prepCycles: v })}
            />
            <NumberField
              label={t('setup.inhale')}
              unit={sec}
              value={config.inhaleSeconds}
              min={1}
              max={20}
              onChange={(v) => update({ inhaleSeconds: v })}
            />
            <NumberField
              label={t('setup.exhale')}
              unit={sec}
              value={config.exhaleSeconds}
              min={1}
              max={20}
              onChange={(v) => update({ exhaleSeconds: v })}
            />
            <NumberField
              label={t('setup.breathHoldTarget')}
              unit={sec}
              value={config.breathHoldSeconds}
              min={5}
              max={300}
              step={5}
              onChange={(v) => update({ breathHoldSeconds: v })}
            />
            {config.breathHoldSeconds > LONG_HOLD_WARNING_SECONDS && (
              <p className="glass rounded-2xl px-4 py-3 text-sm text-ink">
                {t('setup.longHoldWarning')}
              </p>
            )}
            <NumberField
              label={t('setup.recoveryCycles')}
              value={config.recoveryCycles}
              min={1}
              max={10}
              onChange={(v) => update({ recoveryCycles: v })}
            />
            <NumberField
              label={t('setup.rounds')}
              value={config.rounds}
              min={1}
              max={6}
              onChange={(v) => update({ rounds: v })}
            />
            <p className="px-1 text-sm text-ink-soft">
              {t('setup.finalInhaleNote')}
            </p>
          </>
        )}

        {config.mode === 'rv-mobility' && (
          <>
            <p className="glass rounded-2xl px-4 py-3 text-sm text-ink">
              {t('setup.rvWarning')}
            </p>
            <NumberField
              label={t('setup.prepCycles')}
              value={config.prepCycles}
              min={1}
              max={15}
              onChange={(v) => update({ prepCycles: v })}
            />
            <NumberField
              label={t('setup.inhale')}
              unit={sec}
              value={config.inhaleSeconds}
              min={1}
              max={20}
              onChange={(v) => update({ inhaleSeconds: v })}
            />
            <NumberField
              label={t('setup.exhale')}
              unit={sec}
              value={config.exhaleSeconds}
              min={1}
              max={20}
              onChange={(v) => update({ exhaleSeconds: v })}
            />
            <NumberField
              label={t('setup.emptyStretch')}
              unit={sec}
              value={config.emptyLungStretchSeconds}
              min={2}
              max={10}
              onChange={(v) => update({ emptyLungStretchSeconds: v })}
            />
            <NumberField
              label={t('setup.recovery')}
              unit={sec}
              value={config.recoverySeconds}
              min={10}
              max={120}
              step={5}
              onChange={(v) => update({ recoverySeconds: v })}
            />
            <NumberField
              label={t('setup.rounds')}
              value={config.rounds}
              min={1}
              max={5}
              onChange={(v) => update({ rounds: v })}
            />
          </>
        )}
      </div>

      <p className="mt-5 text-center text-sm text-ink-soft">
        {t('setup.estimate', { duration: estimate })}
      </p>

      <div className="mt-3">
        <Button className="w-full" onClick={startSession}>
          {t('common.begin')}
        </Button>
      </div>
    </AppLayout>
  );
}
