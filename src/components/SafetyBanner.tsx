import { useLanguage } from '../i18n/LanguageProvider';

export function SafetyBanner() {
  const { t } = useLanguage();
  return (
    <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-center text-sm text-ink-soft">
      {t('active.safetyBanner')}
    </div>
  );
}
