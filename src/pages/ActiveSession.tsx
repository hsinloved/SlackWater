import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { BreathingCircle } from '../components/BreathingCircle';
import { PhaseCue } from '../components/PhaseCue';
import { SafetyBanner } from '../components/SafetyBanner';
import { SessionControls } from '../components/SessionControls';
import { TimerDisplay } from '../components/TimerDisplay';
import { generateSessionPlan } from '../features/session/sessionEngine';
import {
  useSessionTimer,
  type SessionSummary,
} from '../features/session/useSessionTimer';
import type {
  SessionConfig,
  SessionPhase,
} from '../features/session/sessionTypes';
import { useLanguage } from '../i18n/LanguageProvider';
import { vibrationSupported } from '../utils/vibration';
import { readFlagWithDefault, writeFlag } from '../utils/storage';

interface LocationState {
  config?: SessionConfig;
}

const SOUND_KEY = 'celeste.soundEnabled.v1';
const VIBRATION_KEY = 'celeste.vibrationEnabled.v1';

const VIDEO_SRC = `${import.meta.env.BASE_URL}breathing-orb.mp4`;

/**
 * Ambient "light" of the scene per phase. The central glow brightens on the
 * inhale (like opening a window) and slowly fades to dark across a breath-hold
 * — the gentle dimming is the time cue, in place of a progress ring.
 */
function targetBrightness(phase: SessionPhase | undefined): number {
  switch (phase) {
    case 'preparation-inhale':
    case 'final-inhale':
      return 1;
    case 'preparation-exhale':
    case 'empty-lung-stretch':
      return 0.45;
    case 'breath-hold':
      return 0.06;
    case 'recovery':
      return 0.7;
    case 'rest':
      return 0.5;
    default:
      return 0.85;
  }
}

export function ActiveSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const config = (location.state as LocationState | null)?.config;

  const [soundEnabled, setSoundEnabled] = useState(() =>
    readFlagWithDefault(SOUND_KEY, true),
  );
  const [vibrationEnabled, setVibrationEnabled] = useState(() =>
    readFlagWithDefault(VIBRATION_KEY, true),
  );

  const plan = useMemo(
    () => (config ? generateSessionPlan(config) : []),
    [config],
  );

  const goToComplete = useCallback(
    (summary: SessionSummary) => {
      if (!config) return;
      navigate('/complete', {
        replace: true,
        state: { summary, mode: config.mode },
      });
    },
    [config, navigate],
  );

  const timer = useSessionTimer(plan, {
    soundEnabled,
    vibrationEnabled,
    onComplete: goToComplete,
  });

  // When the user manually stops, still offer a reflection screen.
  useEffect(() => {
    if (timer.status === 'stopped') {
      goToComplete(timer.buildSummary());
    }
  }, [timer.status, timer.buildSummary, goToComplete]);

  if (!config) {
    return <Navigate to="/" replace />;
  }

  const step = timer.currentStep;
  const brightness = targetBrightness(step?.phase);
  // The ambient light eases over the phase duration — slow, diffuse, calm.
  const ambientDuration = Math.max(1.2, step?.durationSeconds ?? 1.2);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    writeFlag(SOUND_KEY, next);
  };
  const toggleVibration = () => {
    const next = !vibrationEnabled;
    setVibrationEnabled(next);
    writeFlag(VIBRATION_KEY, next);
  };

  return (
    <>
      {/* Immersive ambient backdrop: deep ocean with a breathing central glow */}
      <div
        className="fixed inset-0"
        style={{
          zIndex: -1,
          background:
            'linear-gradient(180deg, #0c333d 0%, #061d26 60%, #03141a 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: brightness,
            transitionProperty: 'opacity',
            transitionDuration: `${ambientDuration}s`,
            transitionTimingFunction: 'cubic-bezier(0.37, 0, 0.63, 1)',
            background:
              'radial-gradient(circle at 50% 44%, rgba(150,228,230,0.5) 0%, rgba(40,140,155,0.16) 34%, rgba(40,140,155,0) 62%)',
          }}
        />
      </div>

      <AppLayout>
        <div className="flex items-center justify-between">
          <SafetyBanner />
          {step?.roundNumber && (
            <span className="ml-3 shrink-0 text-sm text-white/70">
              {t('active.round', {
                n: step.roundNumber,
                total: step.totalRounds ?? 1,
              })}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-10 py-6">
          <BreathingCircle
            phase={step?.phase ?? 'rest'}
            durationSeconds={step?.durationSeconds ?? 0}
            videoSrc={VIDEO_SRC}
          >
            <TimerDisplay seconds={timer.remainingSeconds} />
          </BreathingCircle>

          {step && (
            <PhaseCue label={t(step.labelKey)} cueText={t(step.cueKey)} />
          )}
        </div>

        <SessionControls
          status={timer.status}
          canEndHoldEarly={timer.status === 'running' && !!step?.allowEarlyExit}
          onStart={timer.start}
          onPause={timer.pause}
          onResume={timer.resume}
          onStop={timer.stop}
          onEndHoldEarly={timer.endHoldEarly}
        />

        <div className="mt-5 flex justify-center gap-6 text-sm">
          <button
            onClick={toggleSound}
            className="text-white/55 transition hover:text-white/90"
            aria-pressed={soundEnabled}
          >
            {soundEnabled
              ? `🔔 ${t('active.soundOn')}`
              : `🔕 ${t('active.soundOff')}`}
          </button>
          {vibrationSupported() && (
            <button
              onClick={toggleVibration}
              className="text-white/55 transition hover:text-white/90"
              aria-pressed={vibrationEnabled}
            >
              {vibrationEnabled
                ? `📳 ${t('active.vibrationOn')}`
                : `📴 ${t('active.vibrationOff')}`}
            </button>
          )}
        </div>
      </AppLayout>
    </>
  );
}
