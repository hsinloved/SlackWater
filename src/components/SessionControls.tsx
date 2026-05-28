import { Button } from './Button';
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
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {canEndHoldEarly && (
        <Button variant="warn" className="w-full" onClick={onEndHoldEarly}>
          I need to breathe
        </Button>
      )}

      {status === 'idle' && (
        <Button className="w-full" onClick={onStart}>
          Begin
        </Button>
      )}

      {status === 'running' && (
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onPause}>
            Pause
          </Button>
          <Button variant="ghost" className="flex-1" onClick={onStop}>
            Stop
          </Button>
        </div>
      )}

      {status === 'paused' && (
        <div className="flex gap-3">
          <Button className="flex-1" onClick={onResume}>
            Resume
          </Button>
          <Button variant="ghost" className="flex-1" onClick={onStop}>
            Stop
          </Button>
        </div>
      )}
    </div>
  );
}
