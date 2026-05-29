import type { CSSProperties, ReactNode } from 'react';
import type { SessionPhase } from '../features/session/sessionTypes';

interface BreathingCircleProps {
  phase: SessionPhase;
  /** Duration of the current step, used to time the expand/contract animation. */
  durationSeconds: number;
  /** Fraction of the current step elapsed, 0..1, for the progress ring. */
  progress: number;
  children: ReactNode;
}

/** Target scale of the orb per phase: expanded on inhale, soft on empty. */
function targetScale(phase: SessionPhase): number {
  switch (phase) {
    case 'preparation-inhale':
    case 'final-inhale':
    case 'breath-hold':
      return 1;
    case 'preparation-exhale':
    case 'empty-lung-stretch':
      return 0.58;
    case 'recovery':
    case 'rest':
      return 0.78;
    default:
      return 0.78;
  }
}

const SIZE = 280;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BreathingCircle({
  phase,
  durationSeconds,
  progress,
  children,
}: BreathingCircleProps) {
  const scale = targetScale(phase);
  const dashOffset = CIRCUMFERENCE * (1 - Math.min(1, Math.max(0, progress)));

  // Shared transition so every layer breathes together over the step duration.
  const breathe: CSSProperties = {
    transform: `scale(${scale})`,
    transitionProperty: 'transform',
    transitionDuration: `${durationSeconds}s`,
    transitionTimingFunction: 'cubic-bezier(0.45, 0, 0.55, 1)',
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: SIZE, height: SIZE }}
    >
      {/* Diffuse glow that softly pulses to keep the orb feeling alive */}
      <div
        className="absolute rounded-full animate-glow"
        style={{
          ...breathe,
          width: SIZE,
          height: SIZE,
          background:
            'radial-gradient(circle, rgba(127,174,158,0.55) 0%, rgba(127,174,158,0) 70%)',
          filter: 'blur(26px)',
        }}
      />

      {/* Wide translucent halo for depth */}
      <div
        className="absolute rounded-full"
        style={{
          ...breathe,
          width: SIZE - 24,
          height: SIZE - 24,
          background:
            'radial-gradient(circle at 50% 38%, rgba(217,232,226,0.85) 0%, rgba(217,232,226,0.25) 60%, rgba(217,232,226,0) 78%)',
        }}
      />

      {/* The breathing orb */}
      <div
        className="absolute rounded-full"
        style={{
          ...breathe,
          width: SIZE - 96,
          height: SIZE - 96,
          background:
            'radial-gradient(circle at 50% 32%, #ffffff 0%, #eaf3ef 32%, #aacdbf 74%, #7fae9e 100%)',
          boxShadow:
            '0 20px 50px -14px rgba(106,150,134,0.6), inset 0 2px 14px rgba(255,255,255,0.75)',
        }}
      />

      {/* Thin progress ring framing everything */}
      <svg
        width={SIZE}
        height={SIZE}
        className="absolute inset-0 -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="rgba(127,174,158,0.18)"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.2s linear' }}
        />
      </svg>

      <div className="relative flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}
