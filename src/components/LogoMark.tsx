interface LogoMarkProps {
  className?: string;
}

/**
 * Slackwater brand mark: a falling droplet breaking into dots, settling into a
 * still-water ripple. Drawn with `currentColor` so it inherits the text colour.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 120 150"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {/* Falling droplet: stream, then breaking into growing dots */}
      <line
        x1="60"
        y1="20"
        x2="60"
        y2="33"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="60" cy="43" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="60" cy="55" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="60" cy="68" r="1.8" fill="currentColor" stroke="none" />

      {/* Still-water ripple */}
      <ellipse cx="60" cy="104" rx="48" ry="17" strokeWidth="1.6" />
      <ellipse cx="60" cy="104" rx="31" ry="11" strokeWidth="1.6" />
      <ellipse cx="60" cy="104" rx="16" ry="6" strokeWidth="1.6" />
      <circle cx="60" cy="104" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
