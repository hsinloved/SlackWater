import { formatClock } from '../utils/format';

interface TimerDisplayProps {
  seconds: number;
}

export function TimerDisplay({ seconds }: TimerDisplayProps) {
  return (
    <div
      className="font-thin tabular-nums tracking-tight text-white/25"
      style={{ fontSize: 'clamp(5rem, 28vw, 9rem)', lineHeight: 1 }}
      aria-live="polite"
    >
      {/* Large, faint watermark number that gently cross-fades each second */}
      <span key={seconds} className="inline-block animate-fade-slow">
        {formatClock(seconds)}
      </span>
    </div>
  );
}
