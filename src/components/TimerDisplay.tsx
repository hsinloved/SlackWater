import { formatClock } from '../utils/format';

interface TimerDisplayProps {
  seconds: number;
}

export function TimerDisplay({ seconds }: TimerDisplayProps) {
  return (
    <div
      className="font-extralight tabular-nums tracking-tight text-white/85"
      style={{
        fontSize: 'clamp(2.75rem, 13vw, 4rem)',
        lineHeight: 1,
        textShadow: '0 2px 22px rgba(8,40,50,0.45)',
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
