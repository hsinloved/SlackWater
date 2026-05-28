import { Button } from './Button';

interface SafetyModalProps {
  onAcknowledge: () => void;
}

export function SafetyModal({ onAcknowledge }: SafetyModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="safety-title"
    >
      <div className="w-full max-w-md animate-fade-in rounded-3xl bg-surface p-7 shadow-xl">
        <h1
          id="safety-title"
          className="mb-4 text-2xl font-semibold text-ink"
        >
          Before you begin
        </h1>
        <div className="space-y-3 text-base leading-relaxed text-ink-soft">
          <p>
            This tool is for dry-land relaxation and breath-awareness practice
            only.
          </p>
          <p>
            Do not use it in water, in a bath, while driving, or alone during
            any breath-hold practice.
          </p>
          <p>
            Do not hyperventilate. Stop immediately if you feel dizzy, numb,
            anxious, uncomfortable, or unwell.
          </p>
          <p>
            This app is not a substitute for a certified freediving
            instructor.
          </p>
        </div>
        <div className="mt-7">
          <Button className="w-full" onClick={onAcknowledge}>
            I understand
          </Button>
        </div>
      </div>
    </div>
  );
}
