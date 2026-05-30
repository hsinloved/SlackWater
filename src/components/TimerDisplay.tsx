import { formatClock } from '../utils/format';

interface TimerDisplayProps {
  seconds: number;
}

export function TimerDisplay({ seconds }: TimerDisplayProps) {
  return (
    <div
      className="font-thin tabular-nums tracking-tight text-white/75"
      style={{ fontSize: 'clamp(3.25rem, 18vw, 5rem)', lineHeight: 1 }}
      aria-live="polite"
    >
      {/* Gently cross-fades each second instead of snapping */}
      <span key={seconds} className="inline-block animate-fade-slow">
        {formatClock(seconds)}
      </span>
    </div>
  );
}
