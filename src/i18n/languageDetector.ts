import { LanguageCode, SUPPORTED_LANGUAGES } from './types';
import { CountryCode } from '../types';

const SUPPORTED_CODES = new Set<LanguageCode>(SUPPORTED_LANGUAGES.map(l => l.code));

export function isSupportedLanguage(code: string | null | undefined): code is LanguageCode {
  if (!code) return false;
  return SUPPORTED_CODES.has(code as LanguageCode);
}

/**
 * Normalizes a BCP-47 language tag (e.g. "en-US", "pt-BR", "zh-CN") to one of our supported LanguageCode values.
 */
export function normalizeLanguageTag(tag: string | null | undefined): LanguageCode | null {
  if (!tag) return null;
  const clean = tag.trim().toLowerCase();
  const primary = clean.split(/[-_]/)[0];
  if (isSupportedLanguage(primary)) {
    return primary;
  }
  return null;
}

/**
 * Detects the visitor's preferred language from browser settings, falling back to Spanish ('es').
 */
export function detectBrowserLanguage(): LanguageCode {
  if (typeof navigator === 'undefined') return 'es';

  const candidates: string[] = [];
  if (Array.isArray(navigator.languages)) {
    candidates.push(...navigator.languages);
  }
  if (navigator.language) {
    candidates.push(navigator.language);
  }

  for (const tag of candidates) {
    const normalized = normalizeLanguageTag(tag);
    if (normalized) {
      return normalized;
    }
  }

  return 'es';
}

/**
 * Resolves the active language when the visitor changes the Country Selector.
 * - If the user has manually chosen a language via the Language Selector, we respect their manual choice.
 * - Otherwise, México / Venezuela / Colombia map to Spanish ('es'), while 'Otro País' ('other') uses the detected browser language (or 'en' if browser is Spanish so international visitors see localization immediately, or browser language if non-Spanish).
 */
export function resolveLanguageFromCountry(
  country: CountryCode,
  hasManualLanguageSelection: boolean,
  currentLang: LanguageCode
): LanguageCode {
  if (hasManualLanguageSelection) {
    return currentLang;
  }
  if (country === 'mexico' || country === 'venezuela' || country === 'colombia') {
    return 'es';
  }
  // country === 'otro'
  const browserLang = detectBrowserLanguage();
  return browserLang !== 'es' ? browserLang : currentLang;
}

/**
 * Detects the language of an incoming client chat message so the assistant always replies in that exact language.
 * Uses script ranges first (Arabic, CJK, Hangul, Devanagari, Cyrillic), then lexical/stopword scoring for Latin-script languages.
 */
export function detectMessageLanguage(text: string, fallbackLang: LanguageCode = 'es'): LanguageCode {
  if (!text || !text.trim()) return fallbackLang;

  const sample = text.trim();

  // 1. Non-Latin script detection
  if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(sample)) return 'ar';
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(sample)) return 'ja';
  if (/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(sample)) return 'ko';
  if (/[\u4E00-\u9FFF]/.test(sample)) return 'zh';
  if (/[\u0900-\u097F]/.test(sample)) return 'hi';
  if (/[\u0400-\u04FF]/.test(sample)) return 'ru';

  const lower = sample.toLowerCase();

  // Turkish-specific characters
  if (/[ğışçöü]/i.test(lower) && /\b(merhaba|fiyat|ödeme|hesap|randevu|ürün|nasıl|teşekkür|evet|hayır|katalog|satış|ortaklık)\b/i.test(lower)) {
    return 'tr';
  }
  if (/[ğış]/i.test(lower)) {
    return 'tr';
  }

  // Tokenize words for Latin-script language scoring
  const words = lower
    .replace(/[.,!?¿¡;:()"'«»[\]{}/\\|+*=<>~`@#$%^&_-]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return fallbackLang;

  const scores: Record<LanguageCode, number> = {
    es: 0,
    en: 0,
    pt: 0,
    fr: 0,
    de: 0,
    it: 0,
    tr: 0,
    zh: 0,
    ja: 0,
    ko: 0,
    ar: 0,
    hi: 0,
    ru: 0,
  };

  const lexicons: Record<'es' | 'en' | 'pt' | 'fr' | 'de' | 'it' | 'tr', string[]> = {
    es: [
      'hola', 'buenos', 'buenas', 'días', 'dias', 'tardes', 'noches', 'precio', 'precios', 'cuánto', 'cuanto',
      'cuesta', 'catálogo', 'catalogo', 'quiero', 'comprar', 'pago', 'pagos', 'transferencia', 'concepto',
      'cita', 'agendar', 'horario', 'horarios', 'afiliado', 'afiliados', 'vendedor', 'cuenta', 'cuentas',
      'disponible', 'gracias', 'por', 'para', 'con', 'cómo', 'como', 'qué', 'que', 'cuál', 'cual', 'son',
      'los', 'las', 'una', 'uno', 'del', 'al', 'sí', 'si', 'claro', 'favor', 'información', 'informacion',
      'métodos', 'metodos', 'reglas', 'ganar', 'gratis', 'meses', 'días', 'familiar', 'recomiendas',
      'recomendar', 'recomendación', 'recomendacion', 'mejor', 'sugieres', 'opción', 'opcion', 'ver'
    ],
    en: [
      'hello', 'hi', 'hey', 'good', 'morning', 'afternoon', 'evening', 'price', 'prices', 'how', 'much',
      'cost', 'costs', 'catalog', 'products', 'want', 'buy', 'purchase', 'payment', 'payments', 'pay',
      'transfer', 'appointment', 'schedule', 'book', 'booking', 'hours', 'time', 'affiliate', 'affiliates',
      'seller', 'account', 'accounts', 'available', 'thanks', 'thank', 'you', 'what', 'are', 'the', 'for',
      'with', 'can', 'please', 'info', 'information', 'methods', 'rules', 'free', 'months', 'days', 'yes',
      'sure', 'confirm', 'recommend', 'recommendation', 'best', 'suggest', 'which', 'do', 'does', 'view'
    ],
    pt: [
      'olá', 'ola', 'oi', 'bom', 'boa', 'dia', 'tarde', 'noite', 'preço', 'preco', 'preços', 'precos',
      'quanto', 'custa', 'catálogo', 'catalogo', 'produtos', 'quero', 'comprar', 'pagamento', 'pagamentos',
      'pagar', 'transferência', 'transferencia', 'agendar', 'horário', 'horario', 'horários', 'afiliado',
      'afiliados', 'vendedor', 'conta', 'contas', 'disponível', 'obrigado', 'obrigada', 'como', 'quais',
      'são', 'sao', 'para', 'com', 'uma', 'não', 'nao', 'sim', 'informações', 'regras', 'grátis', 'meses',
      'recomenda', 'recomendar', 'recomendação', 'melhor', 'qual', 'você', 'voce'
    ],
    fr: [
      'bonjour', 'salut', 'bonsoir', 'prix', 'combien', 'coûte', 'coute', 'catalogue', 'produits', 'veux',
      'acheter', 'paiement', 'paiements', 'payer', 'virement', 'rendez', 'vous', 'rdv', 'horaire', 'horaires',
      'affilié', 'affiliés', 'affiliation', 'vendeur', 'compte', 'comptes', 'disponible', 'merci', 'comment',
      'quels', 'quelles', 'quel', 'quelle', 'sont', 'les', 'des', 'une', 'pour', 'avec', 'oui', 'gratuit',
      'mois', 'jours', 'règles', 'regles', 'recommandez', 'recommander', 'recommandation', 'meilleur', 'conseillez'
    ],
    de: [
      'hallo', 'guten', 'morgen', 'tag', 'abend', 'preis', 'preise', 'wie', 'viel', 'kostet', 'katalog',
      'produkte', 'möchte', 'kaufen', 'zahlung', 'zahlungsmethoden', 'bezahlen', 'überweisung', 'termin',
      'buchen', 'uhrzeit', 'öffnungszeiten', 'partner', 'partnerprogramm', 'verkäufer', 'konto', 'konten',
      'verfügbar', 'danke', 'was', 'sind', 'die', 'der', 'das', 'für', 'mit', 'ja', 'bitte', 'kostenlos',
      'monate', 'regeln', 'empfehlen', 'empfehlung', 'beste'
    ],
    it: [
      'ciao', 'buongiorno', 'buonasera', 'salve', 'prezzo', 'prezzi', 'quanto', 'costa', 'catalogo',
      'prodotti', 'vorrei', 'comprare', 'acquistare', 'pagamento', 'pagamenti', 'pagare', 'bonifico',
      'appuntamento', 'prenotare', 'orario', 'orari', 'affiliato', 'affiliati', 'venditore', 'account',
      'disponibile', 'grazie', 'come', 'quali', 'sono', 'per', 'con', 'una', 'sì', 'perché', 'regole',
      'gratis', 'mesi', 'giorni', 'consigli', 'consiglia', 'migliore'
    ],
    tr: [
      'merhaba', 'selam', 'iyi', 'günler', 'akşamlar', 'fiyat', 'fiyatlar', 'ne', 'kadar', 'katalog',
      'ürünler', 'ürün', 'satın', 'almak', 'istiyorum', 'ödeme', 'yöntemleri', 'havale', 'randevu',
      'saatler', 'müsait', 'ortaklık', 'satıcı', 'hesap', 'teşekkürler', 'teşekkür', 'nasıl', 'nedir',
      'evet', 'lütfen', 'ücretsiz', 'ay', 'kurallar', 'öneri', 'tavsiye'
    ]
  };

  for (const word of words) {
    (Object.keys(lexicons) as Array<keyof typeof lexicons>).forEach(lang => {
      if (lexicons[lang].includes(word)) {
        scores[lang] += 2;
      }
    });
  }

  // Character / bigrams hints
  if (/[¿¡ñ]/.test(lower)) scores.es += 3;
  if (/[ãõç]/.test(lower)) scores.pt += 3;
  if (/[œæ]/.test(lower) || /\b(qu'est|c'est|j'ai|d'un)\b/.test(lower)) scores.fr += 3;
  if (/[äöüß]/.test(lower)) scores.de += 3;
  if (/\b(what's|how's|i'd|i'm|can't|don't)\b/.test(lower)) scores.en += 3;

  let bestLang: LanguageCode = fallbackLang;
  let bestScore = 0;

  (Object.keys(scores) as LanguageCode[]).forEach(lang => {
    if (scores[lang] > bestScore) {
      bestScore = scores[lang];
      bestLang = lang;
    }
  });

  // If the current UI fallback language has a tie with Spanish or another language, prefer fallbackLang
  if (bestScore > 0 && scores[fallbackLang] === bestScore) {
    return fallbackLang;
  }

  return bestScore > 0 ? bestLang : fallbackLang;
}
