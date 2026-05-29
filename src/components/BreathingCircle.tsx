import type { CSSProperties, ReactNode } from 'react';
import type { SessionPhase } from '../features/session/sessionTypes';

interface BreathingCircleProps {
  phase: SessionPhase;
  /** Duration of the current step, used to time the expand/contract animation. */
  durationSeconds: number;
  /** Source URL of the looping breathing-orb video. */
  videoSrc: string;
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
const ORB = 220;

export function BreathingCircle({
  phase,
  durationSeconds,
  videoSrc,
  children,
}: BreathingCircleProps) {
  const scale = targetScale(phase);

  // Long, soft easing so the orb breathes rather than snaps (diffuse feel).
  const breathe: CSSProperties = {
    transform: `scale(${scale})`,
    transitionProperty: 'transform',
    transitionDuration: `${durationSeconds}s`,
    transitionTimingFunction: 'cubic-bezier(0.37, 0, 0.63, 1)',
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: SIZE, height: SIZE }}
    >
      {/* Deep parallax glow — scales a touch more than the orb for depth */}
      <div
        className="absolute rounded-full animate-glow"
        style={{
          ...breathe,
          width: SIZE,
          height: SIZE,
          transform: `scale(${scale * 1.12})`,
          background:
            'radial-gradient(circle, rgba(110,205,210,0.5) 0%, rgba(31,128,141,0.22) 45%, rgba(31,128,141,0) 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* The breathing orb — your video, calmed toward the brand teal */}
      <div
        className="absolute flex items-center justify-center"
        style={{ ...breathe, width: SIZE, height: SIZE }}
      >
        <div
          className="absolute overflow-hidden rounded-full"
          style={{
            width: ORB,
            height: ORB,
            boxShadow:
              'inset 0 0 30px 8px rgba(255,255,255,0.45), inset 0 -14px 40px rgba(10,80,95,0.28), 0 30px 70px -20px rgba(10,70,90,0.55)',
          }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'saturate(0.5) brightness(1.05)', transform: 'scale(1.15)' }}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Tint the iridescence toward the brand ocean teal */}
          <div
            className="absolute inset-0"
            style={{ background: '#1f808d', mixBlendMode: 'color', opacity: 0.45 }}
          />
          {/* Soft luminous centre */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 50% 44%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.28) 22%, rgba(255,255,255,0) 50%)',
            }}
          />
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}
