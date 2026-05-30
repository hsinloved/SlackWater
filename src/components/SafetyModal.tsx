import { Button } from './Button';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../i18n/LanguageProvider';

interface SafetyModalProps {
  onAcknowledge: () => void;
}

export function SafetyModal({ onAcknowledge }: SafetyModalProps) {
  const { t } = useLanguage();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="safety-title"
    >
      <div className="glass-strong w-full max-w-md animate-fade-in rounded-3xl p-7">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h1
            id="safety-title"
            className="font-heading text-3xl font-semibold text-ink"
          >
            {t('safety.title')}
          </h1>
          <LanguageToggle />
        </div>
        <div className="space-y-3 text-base leading-relaxed text-ink-soft">
          <p>{t('safety.p1')}</p>
          <p>{t('safety.p2')}</p>
          <p>{t('safety.p3')}</p>
          <p>{t('safety.p4')}</p>
        </div>
        <div className="mt-7">
          <Button className="w-full" onClick={onAcknowledge}>
            {t('safety.ack')}
          </Button>
        </div>
      </div>
    </div>
  );
}
