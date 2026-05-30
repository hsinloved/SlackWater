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
      return 0.62;
    case 'recovery':
    case 'rest':
      return 0.8;
    default:
      return 0.8;
  }
}

const SIZE = 300;
const ORB = 252;

export function BreathingCircle({
  phase,
  durationSeconds,
  videoSrc,
  children,
}: BreathingCircleProps) {
  const scale = targetScale(phase);

  // Long, soft easing so the orb breathes rather than snaps (diffuse feel).
  // NB: transforms live on each layer (not a shared wrapper) so the video's
  // `screen` blend keeps compositing against the page backdrop — no isolation.
  const transition = {
    transitionProperty: 'transform',
    transitionDuration: `${durationSeconds}s`,
    transitionTimingFunction: 'cubic-bezier(0.37, 0, 0.63, 1)',
  } as const;

  const orbStyle: CSSProperties = {
    width: ORB,
    height: ORB,
    // `screen` turns the video's black background transparent, so the orb melts
    // into the dark backdrop with no hard circular edge.
    mixBlendMode: 'screen',
    // closest-side keeps the fade well inside the square, so the edge is a
    // clean circle that melts away — no square/rounded-square frame, even if
    // the browser ignores `screen` for the video layer.
    maskImage:
      'radial-gradient(circle closest-side, #000 0 48%, rgba(0,0,0,0) 66%)',
    WebkitMaskImage:
      'radial-gradient(circle closest-side, #000 0 48%, rgba(0,0,0,0) 66%)',
    filter: 'saturate(0.85) brightness(1.14) contrast(1.04) hue-rotate(-8deg)',
    transform: `scale(${scale})`,
    ...transition,
  };

  const glowStyle: CSSProperties = {
    width: SIZE,
    height: SIZE,
    background:
      'radial-gradient(circle, rgba(125,220,225,0.6) 0%, rgba(45,155,170,0.28) 42%, rgba(45,155,170,0) 70%)',
    filter: 'blur(32px)',
    transform: `scale(${scale * 1.16})`,
    ...transition,
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: SIZE, height: SIZE }}
    >
      {/* Soft bloom behind the orb for depth (gentle parallax + glow) */}
      <div className="absolute rounded-full animate-glow" style={glowStyle} />

      {/* The breathing orb — your video, black blended away via `screen` */}
      <video
        className="absolute inset-0 m-auto"
        style={orbStyle}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}
