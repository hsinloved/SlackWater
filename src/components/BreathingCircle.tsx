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
      return 0.6;
    case 'recovery':
    case 'rest':
      return 0.8;
    default:
      return 0.8;
  }
}

const SIZE = 300;
const ORB = 196;
const SWIRL = 320;
const SWIRL_OFFSET = (ORB - SWIRL) / 2;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const HOLO_CONIC =
  'conic-gradient(from 0deg at 50% 50%, #8be0e6, #7cc0f7, #b9a7f0, #f4a9da, #f7efaa, #9ef0c4, #8be0e6)';

const HOLO_BLOBS =
  'radial-gradient(42% 42% at 28% 30%, #f4a9da 0%, transparent 70%),' +
  'radial-gradient(46% 46% at 72% 34%, #7cc0f7 0%, transparent 70%),' +
  'radial-gradient(46% 46% at 56% 78%, #9ef0c4 0%, transparent 70%),' +
  'radial-gradient(40% 40% at 34% 70%, #b9a7f0 0%, transparent 70%)';

export function BreathingCircle({
  phase,
  durationSeconds,
  progress,
  children,
}: BreathingCircleProps) {
  const scale = targetScale(phase);
  const dashOffset = CIRCUMFERENCE * (1 - Math.min(1, Math.max(0, progress)));

  // Every breathing layer shares this so they expand and settle together.
  const breathe: CSSProperties = {
    transform: `scale(${scale})`,
    transitionProperty: 'transform',
    transitionDuration: `${durationSeconds}s`,
    transitionTimingFunction: 'cubic-bezier(0.37, 0, 0.63, 1)',
  };

  const swirlBase: CSSProperties = {
    position: 'absolute',
    width: SWIRL,
    height: SWIRL,
    left: SWIRL_OFFSET,
    top: SWIRL_OFFSET,
    borderRadius: '50%',
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: SIZE, height: SIZE }}
    >
      {/* Breathing group: glow + iridescent orb scale together */}
      <div
        className="absolute flex items-center justify-center"
        style={{ ...breathe, width: SIZE, height: SIZE }}
      >
        {/* Diffuse glow halo */}
        <div
          className="absolute rounded-full animate-glow"
          style={{
            width: SIZE,
            height: SIZE,
            background:
              'radial-gradient(circle, rgba(140,220,225,0.55) 0%, rgba(180,170,240,0.28) 45%, rgba(180,170,240,0) 70%)',
            filter: 'blur(28px)',
          }}
        />

        {/* The iridescent glass orb */}
        <div
          className="absolute overflow-hidden rounded-full"
          style={{
            width: ORB,
            height: ORB,
            boxShadow:
              'inset 0 0 26px 6px rgba(255,255,255,0.55), inset 0 -12px 34px rgba(120,160,200,0.22), 0 26px 60px -18px rgba(120,150,170,0.55)',
          }}
        >
          {/* Slowly swirling holographic gradient */}
          <div
            className="animate-spin-slow"
            style={{ ...swirlBase, background: HOLO_CONIC, filter: 'blur(16px)' }}
          />
          <div
            className="animate-spin-slower"
            style={{
              ...swirlBase,
              background: HOLO_BLOBS,
              filter: 'blur(20px)',
              opacity: 0.85,
              mixBlendMode: 'screen',
            }}
          />
          {/* Bright light-leak center */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 50% 46%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0) 46%)',
            }}
          />
        </div>
      </div>

      {/* Thin progress ring framing everything (stays fixed while the orb breathes) */}
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
          stroke="rgba(127,174,158,0.16)"
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
          style={{ transition: 'stroke-dashoffset 0.25s linear' }}
        />
      </svg>

      <div className="relative flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}
