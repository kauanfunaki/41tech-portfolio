import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { translations, Lang, Translations } from "@/lib/translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getStoredLang(): Lang {
  try {
    const s = localStorage.getItem("portfolio_lang");
    return s === "en" ? "en" : "pt";
  } catch {
    return "pt";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getStoredLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("portfolio_lang", l);
    } catch {}
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

/** Convenience hook — returns just the translation object for the current language. */
export function useT(): Translations {
  return useLanguage().t;
}
