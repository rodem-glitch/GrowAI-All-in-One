"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Translations } from "@/i18n/en";
import en from "@/i18n/en";
import ko from "@/i18n/ko";

export type Locale = "en" | "ko";

const STORAGE_KEY = "learnform-locale";

const translations: Record<Locale, Translations> = { en, ko };

function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "ko";
}

function getSavedLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem(STORAGE_KEY);
  return isLocale(saved) ? saved : "en";
}

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getSavedLocale);

  // Sync document.lang and localStorage whenever locale changes
  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
  }, []);

  return (
    <LanguageContext value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
