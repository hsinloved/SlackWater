import { Button } from './Button';
import { useLanguage } from '../i18n/LanguageProvider';
import type { TimerStatus } from '../features/session/useSessionTimer';

interface SessionControlsProps {
  status: TimerStatus;
  canEndHoldEarly: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onEndHoldEarly: () => void;
}

export function SessionControls({
  status,
  canEndHoldEarly,
  onStart,
  onPause,
  onResume,
  onStop,
  onEndHoldEarly,
}: SessionControlsProps) {
  const { t } = useLanguage();
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {canEndHoldEarly && (
        <Button variant="light" className="w-full" onClick={onEndHoldEarly}>
          {t('controls.needBreathe')}
        </Button>
      )}

      {status === 'idle' && (
        <Button className="w-full" onClick={onStart}>
          {t('common.begin')}
        </Button>
      )}

      {status === 'running' && (
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onPause}>
            {t('controls.pause')}
          </Button>
          <Button variant="ghost-light" className="flex-1" onClick={onStop}>
            {t('controls.stop')}
          </Button>
        </div>
      )}

      {status === 'paused' && (
        <div className="flex gap-3">
          <Button className="flex-1" onClick={onResume}>
            {t('controls.resume')}
          </Button>
          <Button variant="ghost-light" className="flex-1" onClick={onStop}>
            {t('controls.stop')}
          </Button>
        </div>
      )}
    </div>
  );
}
