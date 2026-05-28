import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { BreathingCircle } from '../components/BreathingCircle';
import { PhaseCue } from '../components/PhaseCue';
import { SafetyBanner } from '../components/SafetyBanner';
import { SessionControls } from '../components/SessionControls';
import { TimerDisplay } from '../components/TimerDisplay';
import { generateSessionPlan } from '../features/session/sessionEngine';
import { MODE_META } from '../features/session/sessionPresets';
import {
  useSessionTimer,
  type SessionSummary,
} from '../features/session/useSessionTimer';
import type { SessionConfig } from '../features/session/sessionTypes';
import { vibrationSupported } from '../utils/vibration';
import { readFlagWithDefault, writeFlag } from '../utils/storage';

interface LocationState {
  config?: SessionConfig;
}

const SOUND_KEY = 'celeste.soundEnabled.v1';
const VIBRATION_KEY = 'celeste.vibrationEnabled.v1';

export function ActiveSession() {
  const location = useLocation();
  const navigate = useNavigate();
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
        state: {
          summary,
          mode: config.mode,
          modeTitle: MODE_META[config.mode].title,
        },
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
  const progress = step && step.durationSeconds > 0
    ? (step.durationSeconds - timer.remainingSeconds) / step.durationSeconds
    : 0;

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
    <AppLayout>
      <div className="flex items-center justify-between">
        <SafetyBanner />
        {step?.roundNumber && (
          <span className="ml-3 shrink-0 text-sm text-ink-soft">
            Round {step.roundNumber}/{step.totalRounds}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 py-6">
        <BreathingCircle
          phase={step?.phase ?? 'rest'}
          durationSeconds={step?.durationSeconds ?? 0}
          progress={progress}
        >
          <TimerDisplay seconds={timer.remainingSeconds} />
        </BreathingCircle>

        {step && <PhaseCue label={step.label} cueText={step.cueText} />}
      </div>

      <SessionControls
        status={timer.status}
        canEndHoldEarly={
          timer.status === 'running' && !!step?.allowEarlyExit
        }
        onStart={timer.start}
        onPause={timer.pause}
        onResume={timer.resume}
        onStop={timer.stop}
        onEndHoldEarly={timer.endHoldEarly}
      />

      <div className="mt-5 flex justify-center gap-6 text-sm">
        <button
          onClick={toggleSound}
          className="text-ink-soft hover:text-ink"
          aria-pressed={soundEnabled}
        >
          {soundEnabled ? '🔔 Sound on' : '🔕 Sound off'}
        </button>
        {vibrationSupported() && (
          <button
            onClick={toggleVibration}
            className="text-ink-soft hover:text-ink"
            aria-pressed={vibrationEnabled}
          >
            {vibrationEnabled ? '📳 Vibration on' : '📴 Vibration off'}
          </button>
        )}
      </div>
    </AppLayout>
  );
}
