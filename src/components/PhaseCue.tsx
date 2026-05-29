interface PhaseCueProps {
  label: string;
  cueText: string;
}

export function PhaseCue({ label, cueText }: PhaseCueProps) {
  return (
    // Keyed by label so each phase change cross-fades in smoothly.
    <div
      key={label}
      className="flex animate-fade-in flex-col items-center gap-3 text-center"
    >
      <h2 className="text-2xl font-medium tracking-wide text-ink">{label}</h2>
      <p className="max-w-xs text-base leading-relaxed text-ink-soft">
        {cueText}
      </p>
    </div>
  );
}
