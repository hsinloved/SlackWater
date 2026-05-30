interface NumberFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export function NumberField({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: NumberFieldProps) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  return (
    <div className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
      <span className="text-base text-ink">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(clamp(value - step))}
          className="h-9 w-9 rounded-full bg-accent-soft text-xl leading-none text-ink active:scale-95"
        >
          −
        </button>
        <span className="min-w-[3.5rem] text-center text-lg font-medium tabular-nums text-ink">
          {value}
          {unit ? <span className="text-sm text-ink-soft"> {unit}</span> : null}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(clamp(value + step))}
          className="h-9 w-9 rounded-full bg-accent-soft text-xl leading-none text-ink active:scale-95"
        >
          +
        </button>
      </div>
    </div>
  );
}
