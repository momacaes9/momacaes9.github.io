import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { content } from '../data/site';

// Language: saved choice, else the browser language (pt* -> PT, anything else -> EN).
const KEY = 'lang';

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'pt') return saved;
  } catch {
    /* storage blocked: fall back to the browser language */
  }
  const langs = typeof navigator !== 'undefined' ? navigator.languages || [navigator.language] : [];
  return String(langs[0] || 'en').toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    const c = content[lang];
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = c.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.meta.description);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      c: content[lang],
      setLang: (next) => {
        setLangState(next);
        try {
          localStorage.setItem(KEY, next);
        } catch {
          /* storage blocked: the choice still applies for this visit */
        }
      },
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// { lang: 'en' | 'pt', c: content for that language, setLang }
export const useLang = () => useContext(LangContext);
