import { formatClock } from '../utils/format';

interface TimerDisplayProps {
  seconds: number;
}

export function TimerDisplay({ seconds }: TimerDisplayProps) {
  return (
    <div
      className="font-light tabular-nums tracking-tight text-ink"
      style={{ fontSize: 'clamp(3.5rem, 18vw, 6rem)', lineHeight: 1 }}
      aria-live="polite"
    >
      {formatClock(seconds)}
    </div>
  );
}
