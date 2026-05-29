import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'warn' | 'light' | 'ghost-light';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-accent text-[#06212a] font-semibold shadow-[0_10px_26px_-8px_rgba(70,185,202,0.65)] active:scale-[0.98] hover:brightness-105',
  secondary:
    'bg-accent-soft text-ink active:scale-[0.98] hover:brightness-110',
  ghost: 'bg-transparent text-ink-soft hover:text-ink',
  warn: 'bg-deep text-white active:scale-[0.98] hover:brightness-110',
  // White button that pops on the dark backdrop (e.g. "I need to breathe")
  light: 'bg-white text-deep shadow active:scale-[0.98] hover:brightness-95',
  'ghost-light': 'bg-transparent text-white/75 hover:text-white',
};

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-6 py-4 text-lg font-medium transition disabled:opacity-40 disabled:active:scale-100 ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
