import { useState } from 'react';
import { Button } from './Button';
import { LanguageToggle } from './LanguageToggle';
import { SafetyModal } from './SafetyModal';
import { useLanguage } from '../i18n/LanguageProvider';

interface OnboardingProps {
  onDone: () => void;
}

/** First-run flow: a short philosophy intro, then the safety acknowledgement. */
export function Onboarding({ onDone }: OnboardingProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<'intro' | 'safety'>('intro');

  if (step === 'safety') {
    return <SafetyModal onAcknowledge={onDone} />;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
    >
      <div className="glass-strong w-full max-w-md animate-fade-in rounded-3xl p-7">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h1
            id="intro-title"
            className="font-heading text-3xl font-semibold leading-tight text-ink"
          >
            {t('intro.title')}
          </h1>
          <LanguageToggle />
        </div>
        <div className="space-y-3 text-base leading-relaxed text-ink-soft">
          <p>{t('intro.p1')}</p>
          <p>{t('intro.p2')}</p>
        </div>
        <div className="mt-7">
          <Button className="w-full" onClick={() => setStep('safety')}>
            {t('intro.continue')}
          </Button>
        </div>
      </div>
    </div>
  );
}
