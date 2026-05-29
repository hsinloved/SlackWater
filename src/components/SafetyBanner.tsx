import { useLanguage } from '../i18n/LanguageProvider';

export function SafetyBanner() {
  const { t } = useLanguage();
  return (
    <div className="rounded-full bg-sand/60 px-4 py-2 text-center text-sm text-ink-soft">
      {t('active.safetyBanner')}
    </div>
  );
}
