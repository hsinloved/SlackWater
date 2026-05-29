import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { readJSON, writeJSON } from '../utils/storage';
import { dictionaries, LANGS, type Lang } from './translations';

type Translate = (key: string, vars?: Record<string, string | number>) => string;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translate;
}

const STORAGE_KEY = 'slackwater.lang.v1';

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectInitialLang(): Lang {
  const stored = readJSON<Lang | null>(STORAGE_KEY, null);
  if (stored === 'en' || stored === 'zh-TW') return stored;
  if (typeof navigator !== 'undefined' && navigator.language) {
    if (navigator.language.toLowerCase().startsWith('zh')) return 'zh-TW';
  }
  return 'en';
}

function interpolate(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name) =>
    name in vars ? String(vars[name]) : match,
  );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  useEffect(() => {
    const meta = LANGS.find((l) => l.code === lang);
    if (meta) document.documentElement.lang = meta.htmlLang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    writeJSON(STORAGE_KEY, next);
  }, []);

  const t = useCallback<Translate>(
    (key, vars) => {
      const value =
        dictionaries[lang][key] ?? dictionaries.en[key] ?? key;
      return interpolate(value, vars);
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, t }),
    [lang, setLang, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
