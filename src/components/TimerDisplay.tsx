import { formatClock } from '../utils/format';

interface TimerDisplayProps {
  seconds: number;
}

export function TimerDisplay({ seconds }: TimerDisplayProps) {
  return (
    <div
      className="font-light tabular-nums tracking-tight text-ink"
      style={{
        fontSize: 'clamp(3.5rem, 18vw, 5.5rem)',
        lineHeight: 1,
        textShadow: '0 1px 18px rgba(255,255,255,0.85)',
      }}
      aria-live="polite"
    >
      {/* Keyed so each value gently fades/scales in instead of snapping */}
      <span key={seconds} className="inline-block animate-tick">
        {formatClock(seconds)}
      </span>
    </div>
  );
}
