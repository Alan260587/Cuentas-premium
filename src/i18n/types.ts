export type LanguageCode =
  | 'es'
  | 'en'
  | 'pt'
  | 'fr'
  | 'de'
  | 'it'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'ar'
  | 'hi'
  | 'ru'
  | 'tr';

export interface LanguageMeta {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'en', name: 'Inglés', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'pt', name: 'Portugués', nativeName: 'Português', flag: '🇧🇷', dir: 'ltr' },
  { code: 'fr', name: 'Francés', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'Alemán', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'it', name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'zh', name: 'Chino', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ja', name: 'Japonés', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ko', name: 'Coreano', nativeName: '한국어', flag: '🇰🇷', dir: 'ltr' },
  { code: 'ar', name: 'Árabe', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'ru', name: 'Ruso', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'tr', name: 'Turco', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
];

export interface LocalizedProductContent {
  name: string;
  category: string;
  description: string;
  highlights: string[];
  duration: string;
  promoBadge?: string;
  stockNote?: string;
}
