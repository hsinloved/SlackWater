interface PhaseCueProps {
  label: string;
  cueText: string;
}

export function PhaseCue({ label, cueText }: PhaseCueProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <h2 className="text-2xl font-medium tracking-wide text-ink">{label}</h2>
      <p className="max-w-xs text-base leading-relaxed text-ink-soft">
        {cueText}
      </p>
    </div>
  );
}
