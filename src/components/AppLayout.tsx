import type { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

/** Centered, mobile-first column shared by every screen. */
export function AppLayout({ children }: AppLayoutProps) {
  return (
    // `animate-fade` (opacity only) — must NOT leave a transform behind, or it
    // would create a stacking context that breaks the orb's `screen` blend.
    <div className="safe-area flex min-h-screen w-full max-w-md animate-fade flex-col px-5 pb-8 pt-6">
      {children}
    </div>
  );
}
