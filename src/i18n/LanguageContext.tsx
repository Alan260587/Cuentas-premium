import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { LanguageCode, SUPPORTED_LANGUAGES, LanguageMeta } from './types';
import { AppDictionary, getDictionary } from './translations';
import { detectBrowserLanguage, isSupportedLanguage, resolveLanguageFromCountry } from './languageDetector';
import { getLocalizedProduct, PRODUCT_TRANSLATIONS } from './productTranslations';
import { formatLocalizedDaysSummary } from './botTranslations';
import { CountryCode, DayAvailability, Product } from '../types';

const STORAGE_LANG_KEY = 'sdp_app_language';
const STORAGE_MANUAL_KEY = 'sdp_app_language_manual';

interface LanguageContextValue {
  lang: LanguageCode;
  setLang: (code: LanguageCode, isManual?: boolean) => void;
  dir: 'ltr' | 'rtl';
  t: AppDictionary;
  supportedLanguages: LanguageMeta[];
  localizeProduct: (product: Product) => Product;
  localizeCategory: (category: string) => string;
  localizeDayName: (dayId: string, fallbackName?: string) => string;
  localizeDaysSummary: (days: DayAvailability[] | string[]) => string;
  syncLanguageWithCountry: (country: CountryCode) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLanguage(): { lang: LanguageCode; isManual: boolean } {
  if (typeof window === 'undefined') {
    return { lang: 'es', isManual: false };
  }
  try {
    const savedLang = localStorage.getItem(STORAGE_LANG_KEY);
    const savedManual = localStorage.getItem(STORAGE_MANUAL_KEY) === 'true';
    if (savedLang && isSupportedLanguage(savedLang)) {
      return { lang: savedLang, isManual: savedManual };
    }
  } catch {
    // ignore storage errors
  }
  const detected = detectBrowserLanguage();
  return { lang: detected, isManual: false };
}

// Map Spanish category names from default products to representative product IDs for accurate category translation
const CATEGORY_TO_PRODUCT_ID: Record<string, string> = {
  'Inteligencia Artificial & Audio': 'eleven-reader',
  'Productividad & Documentos': 'ilove-pdf-premium',
  'Inteligencia Artificial': 'mause-ai',
  'Educación & Certificaciones': 'coursera-plus',
  'Edición de Video': 'capcut-teams',
  'Productividad & Nube': 'microsoft-365',
  'Diseño UI/UX & Prototipado': 'figma-pro',
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = useMemo(() => getInitialLanguage(), []);
  const [lang, setLangState] = useState<LanguageCode>(initial.lang);
  const [hasManualSelection, setHasManualSelection] = useState<boolean>(initial.isManual);

  const currentMeta = useMemo(
    () => SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES[0],
    [lang]
  );

  const dir = currentMeta.dir;
  const t = useMemo(() => getDictionary(lang), [lang]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang, dir]);

  const setLang = useCallback((code: LanguageCode, isManual = true) => {
    if (!isSupportedLanguage(code)) return;
    setLangState(code);
    if (isManual) {
      setHasManualSelection(true);
    }
    try {
      localStorage.setItem(STORAGE_LANG_KEY, code);
      if (isManual) {
        localStorage.setItem(STORAGE_MANUAL_KEY, 'true');
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const syncLanguageWithCountry = useCallback(
    (country: CountryCode) => {
      const nextLang = resolveLanguageFromCountry(country, hasManualSelection, lang);
      if (nextLang !== lang) {
        setLangState(nextLang);
        try {
          localStorage.setItem(STORAGE_LANG_KEY, nextLang);
        } catch {
          // ignore
        }
      }
    },
    [hasManualSelection, lang]
  );

  const localizeProduct = useCallback(
    (product: Product): Product => {
      return getLocalizedProduct(product, lang);
    },
    [lang]
  );

  const localizeCategory = useCallback(
    (category: string): string => {
      if (category === 'todas' || category === 'Todos' || category === 'All') {
        return t.catalog.allCategories;
      }
      if (lang === 'es') return category;
      const lowerCat = (category || '').toLowerCase();
      if (lowerCat.includes('streaming') || lowerCat.includes('entretenimiento') || lowerCat.includes('entertainment')) {
        if (lang === 'en') return 'Streaming & Entertainment';
        if (lang === 'pt') return 'Streaming & Entretenimento';
        if (lang === 'fr') return 'Streaming & Divertissement';
        if (lang === 'de') return 'Streaming & Unterhaltung';
        if (lang === 'it') return 'Streaming & Intrattenimento';
      }
      const repProductId = CATEGORY_TO_PRODUCT_ID[category];
      if (repProductId) {
        const prodDict = PRODUCT_TRANSLATIONS[lang]?.[repProductId];
        if (prodDict?.category) return prodDict.category;
      }
      const shortCat = (t.catalog.categories as Record<string, string>)[category];
      return shortCat || category;
    },
    [lang, t]
  );

  const localizeDayName = useCallback(
    (dayId: string, fallbackName?: string): string => {
      const dictDays = t.days as Record<string, string>;
      return dictDays[dayId] || fallbackName || dayId;
    },
    [t]
  );

  const localizeDaysSummary = useCallback(
    (days: DayAvailability[] | string[]): string => {
      const enabledIds = Array.isArray(days)
        ? days
            .map(d => (typeof d === 'string' ? d : d.enabled ? d.dayId : ''))
            .filter(Boolean)
        : [];
      return formatLocalizedDaysSummary(enabledIds, lang);
    },
    [lang]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      dir,
      t,
      supportedLanguages: SUPPORTED_LANGUAGES,
      localizeProduct,
      localizeCategory,
      localizeDayName,
      localizeDaysSummary,
      syncLanguageWithCountry,
    }),
    [
      lang,
      setLang,
      dir,
      t,
      localizeProduct,
      localizeCategory,
      localizeDayName,
      localizeDaysSummary,
      syncLanguageWithCountry,
    ]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
