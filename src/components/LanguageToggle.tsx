import { useLanguage } from '../i18n/LanguageProvider';
import { LANGS } from '../i18n/translations';

/** Compact EN / 中文 segmented toggle. */
export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="inline-flex items-center rounded-full bg-surface p-1 shadow-sm"
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => {
        const active = l.code === lang;
        return (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 text-sm font-medium transition ${
              active ? 'bg-accent text-white' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
