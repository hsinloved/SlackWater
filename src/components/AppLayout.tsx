import type { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

/** Centered, mobile-first column shared by every screen. */
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="safe-area flex min-h-screen w-full max-w-md flex-col px-5 pb-8 pt-6">
      {children}
    </div>
  );
}
