import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'warn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-accent text-white shadow-sm active:scale-[0.98] hover:brightness-105',
  secondary:
    'bg-accent-soft text-ink active:scale-[0.98] hover:brightness-[0.98]',
  ghost: 'bg-transparent text-ink-soft hover:text-ink',
  warn: 'bg-deep text-white active:scale-[0.98] hover:brightness-110',
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
