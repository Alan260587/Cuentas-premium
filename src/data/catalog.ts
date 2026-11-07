import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { Product, CountryCode } from '../types';
import { db, handleFirestoreError, OperationType, testFirestoreConnection } from '../firebase';

export const OFFICIAL_WHATSAPP_NUMBER = '+52 662 180 5354';
export const OFFICIAL_WHATSAPP_CLEAN = '526621805354';

export const OFFICIAL_BENEFICIARY = 'Javier Alan Rodriguez Yescas';

export const MERCADO_PAGO_LINKS = {
  150: 'https://mpago.la/1feeLZ6',
  200: 'https://mpago.la/1dGAXR5',
  300: 'https://mpago.la/2kUVCTJ',
  100: 'https://mpago.la/1mb1i3a',
} as const;

export const MERCADO_PAGO_LINK = MERCADO_PAGO_LINKS[150];

export function getMercadoPagoLinkByPrice(priceMxn: number, productId?: string): string {
  const price = Number(priceMxn);
  if (price === 300 || (!price && (productId === 'figma-pro-edu' || productId === 'figma-pro'))) {
    return MERCADO_PAGO_LINKS[300];
  }
  if (price === 200) {
    return MERCADO_PAGO_LINKS[200];
  }
  if (price === 150) {
    return MERCADO_PAGO_LINKS[150];
  }
  if (price === 100 || (!price && (productId === 'ilovepdf-premium' || productId === 'ilove-pdf-premium'))) {
    return MERCADO_PAGO_LINKS[100];
  }
  return '';
}

export function getMercadoPagoLink(priceMxn: number, productId?: string): string {
  return getMercadoPagoLinkByPrice(priceMxn, productId);
}

export function getMercadoPagoLinkForProduct(product: { id?: string; priceMxn: number }): string {
  if (!product) return '';
  return getMercadoPagoLinkByPrice(product.priceMxn, product.id);
}

export const MERCADO_PAGO_150_PRODUCT_IDS = [
  'coursera-plus',
  'google-ai-pro-gemini',
  'capcut-teams',
  'microsoft-365-family',
  'eleven-reader-ultra',
  'mause-ai-tokens',
  'duolingo-super-familiar',
  'google-ai-pro',
  'microsoft-365',
  'eleven-reader',
  'mause-ai',
  'duolingo-super',
] as const;

export const MERCADO_PAGO_150_PRODUCT_NAMES = [
  'Coursera Plus',
  'Google AI Pro / Gemini',
  'CapCut Teams',
  'Microsoft 365 Family',
  'Eleven Reader',
  'Mause AI',
  'Duolingo Super Familiar',
] as const;

export function isProductMercadoPago150(product: {
  id?: string;
  name?: string;
  priceMxn: number;
}): boolean {
  if (!product) return false;
  if (
    product.id === 'ilovepdf-premium' ||
    product.id === 'ilove-pdf-premium' ||
    product.id === 'figma-pro-edu' ||
    product.id === 'figma-pro'
  ) {
    return false;
  }
  if (Number(product.priceMxn) !== 150) return false;
  if (product.id && (MERCADO_PAGO_150_PRODUCT_IDS as readonly string[]).includes(product.id)) {
    return true;
  }
  return Number(product.priceMxn) === 150;
}

export const BANK_DETAILS = {
  mexico: [
    {
      bank: 'Banco Nu',
      type: 'CLABE / Tarjeta',
      accountNumber: '5101258665547429',
      beneficiary: OFFICIAL_BENEFICIARY,
      badge: 'Recomendado México (SPEI)',
    },
    {
      bank: 'Bancoppel',
      type: 'Tarjeta',
      accountNumber: '4169160624712155',
      beneficiary: OFFICIAL_BENEFICIARY,
      badge: 'Depósitos OXXO / Transferencia',
    },
  ],
  international: [
    {
      platform: 'Binance Pay',
      type: 'Binance ID',
      accountNumber: '453667986',
      beneficiary: OFFICIAL_BENEFICIARY,
      badge: 'Cripto Sin Comisiones (USDT)',
    },
    {
      platform: 'Binance / PayPal',
      type: 'Correo Electrónico',
      accountNumber: 'javieralanrodriguezyescas31@gmail.com',
      beneficiary: OFFICIAL_BENEFICIARY,
      badge: 'Internacional / Saldo Digital',
    },
  ],
};

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'eleven-reader',
    name: 'Eleven reader 12 meses ultra',
    category: 'Inteligencia Artificial & Audio',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    description: 'Acceso Ultra de 12 meses para lectura natural de textos con voces de inteligencia artificial de última generación.',
    highlights: [
      'Voces ultra realistas de IA en múltiples idiomas',
      '12 Meses de suscripción activa garantizada',
      'Conversión de libros, PDFs y artículos a voz',
      'Ideal para estudio, productividad y accesibilidad',
    ],
    duration: '12 Meses Ultra',
    iconName: 'Sparkles',
    popular: true,
    available: true,
    promoBadge: 'IA Premium',
    stockNote: 'Entrega Rápida',
  },
  {
    id: 'ilove-pdf-premium',
    name: 'ilove pdf premium 12 meses',
    category: 'Productividad & Documentos',
    priceMxn: 100,
    priceUsd: 5.83,
    currencyType: 'USDT',
    description: 'Herramientas completas para unir, dividir, comprimir, convertir y editar archivos PDF sin límites.',
    highlights: [
      'Conversión y compresión ilimitada de documentos',
      'OCR profesional para reconocimiento óptico de texto',
      'Edición y firmado digital de contratos y PDFs',
      '12 Meses completos de licencia Premium',
    ],
    duration: '12 Meses',
    iconName: 'LayoutGrid',
    popular: false,
    available: true,
    promoBadge: 'Super Precio',
    stockNote: 'Entrega Rápida',
  },
  {
    id: 'mause-ai',
    name: 'mause ai 31 billon tokens',
    category: 'Inteligencia Artificial',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    description: 'Paquete de 31 billones de tokens para procesamiento, análisis y generación avanzada con inteligencia artificial.',
    highlights: [
      '31 Billones de tokens de alta capacidad',
      'Modelos avanzados de razonamiento y texto',
      'Generación rápida para flujos profesionales',
      'Activación directa en tu cuenta',
    ],
    duration: '31 Billon Tokens',
    iconName: 'Bot',
    popular: true,
    available: true,
    promoBadge: 'Tokens Masivos',
    stockNote: 'Entrega Rápida',
  },
  {
    id: 'coursera-plus',
    name: 'Coursera Plus',
    category: 'Educación & Certificaciones',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    description: 'Acceso ilimitado a especializaciones, cursos y certificaciones profesionales universitarias.',
    highlights: [
      'Acceso ilimitado a +7,000 cursos',
      'Certificados oficiales con validez laboral',
      'Especializaciones de universidades top',
      'Aprende a tu propio ritmo',
    ],
    duration: '12 Meses',
    iconName: 'GraduationCap',
    popular: true,
    available: true,
    promoBadge: 'Más Solicitado',
    stockNote: 'Entrega Rápida',
  },
  {
    id: 'google-ai-pro',
    name: 'Google AI Pro / Gemini',
    category: 'Inteligencia Artificial',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    description: 'Inteligencia artificial avanzada con Gemini Pro para redacción, análisis, programación y flujos de trabajo.',
    highlights: [
      'Gemini Pro de máxima capacidad (18 Meses)',
      'Análisis profundo y generación de código',
      'Redacción profesional e investigación',
      'Integración con herramientas Google',
    ],
    duration: '18 Meses',
    iconName: 'Sparkles',
    popular: true,
    available: true,
    promoBadge: 'Más Solicitado',
    stockNote: 'Entrega Rápida',
  },
  {
    id: 'capcut-teams',
    name: 'CapCut Teams (25 Días)',
    category: 'Edición de Video',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    description: 'Editor de video profesional con herramientas avanzadas para creadores de contenido y proyectos audiovisuales.',
    highlights: [
      '25 Días de acceso completo Pro Teams',
      'Efectos, filtros y transiciones VIP',
      'Herramientas avanzadas de IA para video',
      'Exportación en máxima resolución sin marcas',
    ],
    duration: '25 Días Garantizados',
    iconName: 'Video',
    popular: false,
    available: true,
    stockNote: 'Entrega Rápida',
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365 Family',
    category: 'Productividad & Nube',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    description: 'Suscripción familiar por 12 meses para aplicaciones de Office, almacenamiento en la nube y herramientas de productividad avanzadas.',
    highlights: [
      '12 Meses de Word, Excel, PowerPoint y Outlook completos',
      'Almacenamiento seguro en la nube OneDrive',
      'Instalable en PC, Mac, tablets y celulares',
      'Actualizaciones y seguridad continua',
    ],
    duration: '12 Meses',
    iconName: 'LayoutGrid',
    popular: false,
    available: true,
    stockNote: 'Entrega Rápida',
  },
  {
    id: 'figma-pro',
    name: 'Figma Pro (.edu)',
    category: 'Diseño UI/UX & Prototipado',
    priceMxn: 300,
    priceUsd: 17.00,
    currencyType: 'USDT',
    description: 'Licencia educativa Pro por 2 años para diseño de interfaces, prototipado y trabajo colaborativo avanzado.',
    highlights: [
      '2 Años completos de licencia Pro',
      'Historial de versiones ilimitado',
      'Colaboración en tiempo real sin límites',
      'Acceso a FigJam y librerías completas',
    ],
    duration: '2 Años de Licencia (.edu)',
    iconName: 'PenTool',
    popular: true,
    available: true,
    promoBadge: 'Licencia 2 Años',
    stockNote: 'Entrega Rápida',
  },
  {
    id: 'duolingo-super',
    name: 'Duolingo Super Familiar',
    category: 'Educación & Certificaciones',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    description: 'Aprende inglés, francés, alemán o más de 40 idiomas más rápido, sin anuncios y con vidas ilimitadas.',
    highlights: [
      'Vidas ilimitadas para practicar sin interrupciones',
      'Cero anuncios al terminar cada lección',
      'Práctica personalizada de errores y desafíos legendarios',
      'Se activa directamente en tu perfil personal',
    ],
    duration: '',
    iconName: 'Globe',
    popular: false,
    available: true,
    stockNote: 'Entrega Rápida',
  },
  {
    id: 'disney-plus',
    name: 'Disney cuenta completa',
    category: 'Streaming',
    priceMxn: 200,
    priceUsd: 11.66,
    currencyType: 'USDT',
    description: 'Cuenta completa de Disney+ por 12 meses para disfrutar series, películas y deportes en vivo sin interrupciones.',
    highlights: [
      '12 Meses de cuenta completa garantizada',
      'Perfiles simultáneos y reproducción en 4K HDR',
      'Catálogo completo: Disney, Pixar, Marvel, Star Wars y ESPN',
      'Entrega rápida y soporte garantizado',
    ],
    duration: '12 Meses',
    iconName: 'Video',
    popular: true,
    available: true,
    promoBadge: 'Streaming',
    stockNote: 'Entrega Rápida',
  },
  {
    id: 'netflix-premium',
    name: 'Netflix cuenta completa',
    category: 'Streaming',
    priceMxn: 300,
    priceUsd: 17.00,
    currencyType: 'USDT',
    description: 'Suscripción Netflix cuenta completa Ultra HD 4K por 12 meses con acceso al catálogo de series y películas.',
    highlights: [
      '12 Meses de cuenta completa Netflix Ultra HD 4K',
      'Sin anuncios y con descargas disponibles',
      'Compatible con Smart TV, celular, tablet y PC',
      'Activación rápida y soporte garantizado',
    ],
    duration: '12 Meses',
    iconName: 'Video',
    popular: true,
    available: true,
    promoBadge: 'Streaming',
    stockNote: 'Entrega Rápida',
  },
  {
    id: 'granola-business',
    name: 'Granola Business',
    category: 'Notas Empresariales (Sin Recompensa)',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    description: 'Bloc de notas empresarial por 12 meses para transcribir, resumir y organizar reuniones de trabajo automáticamente.',
    highlights: [
      '12 Meses de suscripción activa Granola Business',
      'Transcripción y resúmenes automáticos de reuniones',
      'Plantillas inteligentes para equipos y negocios',
      'Compatible con Mac, Windows y videollamadas',
    ],
    duration: '12 Meses',
    iconName: 'LayoutGrid',
    popular: false,
    available: true,
    stockNote: 'Entrega Rápida',
  },
];

// Keep PRODUCTS export for compatibility; live components use getSavedProducts()
export const PRODUCTS: Product[] = DEFAULT_PRODUCTS;

const CATALOG_STORAGE_KEY = 'sdp_catalog_products_v2';
const EXCHANGE_RATE_STORAGE_KEY = 'sdp_exchange_rate_mxn_usd';
const CATALOG_UPDATED_AT_KEY = 'sdp_catalog_updated_at_v2';
const DEVICE_ID_STORAGE_KEY = 'sdp_device_sync_id_v1';
export const DEFAULT_EXCHANGE_RATE = 17.16;

let catalogRealtimeUnsubscribe: (() => void) | null = null;

function getDeviceSyncId(): string {
  if (typeof window === 'undefined') return 'server';
  try {
    let existing = localStorage.getItem(DEVICE_ID_STORAGE_KEY);
    if (!existing) {
      existing = `dev_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(DEVICE_ID_STORAGE_KEY, existing);
    }
    return existing;
  } catch {
    return `dev_${Date.now()}`;
  }
}

export function getCatalogLastUpdatedAt(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem(CATALOG_UPDATED_AT_KEY);
    const parsed = raw ? Number(raw) : 0;
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  } catch {
    return 0;
  }
}

export function resolveExplicitDurationEs(p: { id?: string; name?: string; duration?: string }): string {
  const id = (p.id || '').toLowerCase();
  const name = (p.name || '').toLowerCase();
  const rawDur = (p.duration || '').trim();

  // Duolingo Super Familiar has NO declared duration
  if (id.includes('duolingo') || name.includes('duolingo')) {
    return '';
  }

  const isGeneric =
    !rawDur ||
    /^(suscripci[oó]n\s+activa|acceso\s+premium|suscripci[oó]n\s+oficial|active\s+subscription|premium\s+access|official\s+subscription)$/i.test(
      rawDur
    );

  if (id.includes('google-ai') || name.includes('google ai') || name.includes('gemini')) {
    return isGeneric ? '18 Meses' : rawDur;
  }
  if (id.includes('coursera') || name.includes('coursera')) {
    return isGeneric ? '12 Meses' : rawDur;
  }
  if (id.includes('microsoft') || name.includes('microsoft') || name.includes('365')) {
    return isGeneric ? '12 Meses' : rawDur;
  }
  if (id.includes('figma') || name.includes('figma')) {
    return isGeneric ? '2 Años de Licencia (.edu)' : rawDur;
  }
  if (id.includes('ilove') || name.includes('ilove') || name.includes('pdf')) {
    return isGeneric ? '12 Meses' : rawDur;
  }
  if (id.includes('eleven') || name.includes('eleven')) {
    return isGeneric ? '12 Meses Ultra' : rawDur;
  }
  if (id.includes('mause') || name.includes('mause')) {
    return isGeneric ? '31 Billon Tokens' : rawDur;
  }
  if (id.includes('capcut') || name.includes('capcut')) {
    return isGeneric ? '25 Días Garantizados' : rawDur;
  }
  if (id.includes('disney') || name.includes('disney') || id.includes('netflix') || name.includes('netflix') || id.includes('granola') || name.includes('granola')) {
    return '12 Meses';
  }
  return isGeneric ? '12 Meses' : rawDur;
}

function normalizeProductsList(products: Product[]): Product[] {
  return products.map((p) => ({
    id: String(p.id || `prod-${Date.now()}`),
    name: String(p.name || 'Servicio Digital'),
    category: String(p.category || 'Servicios Digitales'),
    priceMxn: Number(p.priceMxn) || 0,
    priceUsd: Number(Number(p.priceUsd || 0).toFixed(2)),
    currencyType: 'USDT',
    description: String(p.description || ''),
    highlights: Array.isArray(p.highlights) ? p.highlights.map((h) => String(h)) : [],
    duration: resolveExplicitDurationEs(p),
    iconName: String(p.iconName || 'Sparkles'),
    popular: Boolean(p.popular),
    available: p.available !== false,
    promoBadge: p.promoBadge ? String(p.promoBadge) : '',
    stockNote: String(p.stockNote || 'Entrega Rápida'),
  }));
}

async function persistCatalogToCloud(
  products: Product[],
  exchangeRate: number,
  updatedAt: number
): Promise<void> {
  if (typeof window === 'undefined') return;
  const path = 'appConfig/catalog';
  try {
    await setDoc(doc(db, 'appConfig', 'catalog'), {
      products: normalizeProductsList(products).slice(0, 200),
      exchangeRate: Math.min(1000, Math.max(1, Number(exchangeRate.toFixed(2)))),
      updatedAt,
      updatedBy: getDeviceSyncId(),
      authCode: '1987',
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function getSavedExchangeRate(): number {
  if (typeof window === 'undefined') return DEFAULT_EXCHANGE_RATE;
  try {
    const raw = localStorage.getItem(EXCHANGE_RATE_STORAGE_KEY);
    if (!raw) return DEFAULT_EXCHANGE_RATE;
    const val = parseFloat(raw);
    return !isNaN(val) && val > 0 ? val : DEFAULT_EXCHANGE_RATE;
  } catch {
    return DEFAULT_EXCHANGE_RATE;
  }
}

export function saveExchangeRate(rate: number): void {
  if (typeof window === 'undefined') return;
  try {
    const cleanRate = Math.min(1000, Math.max(1, Number(rate.toFixed(2))));
    const updatedAt = Date.now();
    const currentProducts = getSavedProducts();
    localStorage.setItem(EXCHANGE_RATE_STORAGE_KEY, String(cleanRate));
    localStorage.setItem(CATALOG_UPDATED_AT_KEY, String(updatedAt));
    window.dispatchEvent(new Event('catalog_products_updated'));

    persistCatalogToCloud(currentProducts, cleanRate, updatedAt);

    fetch('/api/catalog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        products: currentProducts,
        exchangeRate: cleanRate,
        updatedAt,
      }),
    }).catch(() => {});
  } catch {
    // Ignore storage errors
  }
}

const OBSOLETE_PRODUCT_IDS = new Set([
  'canva-pro',
  'chatgpt-plus',
  'perplexity-pro',
  'adobe-creative-cloud',
  'youtube-music-premium',
  'combo-streaming-4k',
]);

export function normalizeProductNameKey(name: string): string {
  const raw = (name || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
  if (raw.includes('disney')) return 'disneycuentacompleta';
  if (raw.includes('netflix')) return 'netflixcuentacompleta';
  if (raw.includes('granola')) return 'granolabusiness';
  return raw;
}

const OBSOLETE_NAME_KEYS = new Set([
  'canvapro',
  'canvapro12meses',
  'chatgptplus',
  'perplexitypro',
  'adobecreativecloud',
  'youtubemusicpremium',
  'combostreaming4k',
]);

export function deduplicateProductsList(products: Product[]): Product[] {
  const seenKeys = new Set<string>();
  const deduplicated: Product[] = [];

  for (const p of products) {
    if (!p || typeof p.name !== 'string') continue;
    if (OBSOLETE_PRODUCT_IDS.has(p.id)) continue;
    const key = normalizeProductNameKey(p.name);
    if (!key || OBSOLETE_NAME_KEYS.has(key)) continue;

    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      if (p.id === 'duolingo-super' || key === 'duolingosuperfamiliar') {
        deduplicated.push({
          ...p,
          id: 'duolingo-super',
          name: 'Duolingo Super Familiar',
          priceMxn: 150,
          priceUsd: 8.74,
          currencyType: 'USDT',
          duration: '',
          available: p.available !== false,
          stockNote: p.stockNote || 'Entrega Rápida',
        });
      } else if (key === 'disneycuentacompleta') {
        deduplicated.push({
          ...DEFAULT_PRODUCTS.find((d) => d.id === 'disney-plus')!,
          available: p.available !== false,
        });
      } else if (key === 'netflixcuentacompleta') {
        deduplicated.push({
          ...DEFAULT_PRODUCTS.find((d) => d.id === 'netflix-premium')!,
          available: p.available !== false,
        });
      } else if (key === 'granolabusiness') {
        deduplicated.push({
          ...DEFAULT_PRODUCTS.find((d) => d.id === 'granola-business')!,
          available: p.available !== false,
        });
      } else {
        deduplicated.push({
          ...p,
          currencyType: 'USDT',
          duration: resolveExplicitDurationEs(p),
          available: p.available !== false,
          stockNote: p.stockNote || 'Entrega Rápida',
        });
      }
    }
  }

  // Ensure all 12 official products are included if not yet present in seenKeys
  for (const defProd of DEFAULT_PRODUCTS) {
    const defKey = normalizeProductNameKey(defProd.name);
    if (!seenKeys.has(defKey)) {
      seenKeys.add(defKey);
      deduplicated.push(defProd);
    }
  }

  return deduplicated;
}

export function getSavedProducts(): Product[] {
  if (typeof window === 'undefined') return DEFAULT_PRODUCTS;
  try {
    const raw = localStorage.getItem(CATALOG_STORAGE_KEY);
    if (!raw) return DEFAULT_PRODUCTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const deduplicated = deduplicateProductsList(parsed);
      // Clean up cached storage if duplicates were found
      if (deduplicated.length !== parsed.length) {
        try {
          localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(deduplicated));
        } catch {
          // ignore storage error
        }
      }
      return deduplicated;
    }
    return DEFAULT_PRODUCTS;
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export function syncCatalogFromServer(
  serverProducts: Product[],
  serverExchangeRate?: number,
  serverUpdatedAt?: number
): void {
  if (typeof window === 'undefined' || !Array.isArray(serverProducts) || serverProducts.length === 0) {
    return;
  }
  try {
    const localUpdatedAt = getCatalogLastUpdatedAt();
    // Only apply server snapshot if it has a valid timestamp newer than or equal to local
    if (typeof serverUpdatedAt === 'number' && serverUpdatedAt > 0) {
      if (localUpdatedAt > 0 && serverUpdatedAt < localUpdatedAt) {
        return;
      }
    } else if (localUpdatedAt > 0) {
      // Do not let an unversioned default server state overwrite customized local state
      return;
    }

    const deduplicated = deduplicateProductsList(serverProducts);
    const normalized = normalizeProductsList(deduplicated);
    const currentRaw = localStorage.getItem(CATALOG_STORAGE_KEY);
    const nextRaw = JSON.stringify(normalized);
    let changed = false;

    if (currentRaw !== nextRaw) {
      localStorage.setItem(CATALOG_STORAGE_KEY, nextRaw);
      changed = true;
    }

    if (typeof serverExchangeRate === 'number' && serverExchangeRate >= 1) {
      const cleanRate = String(Number(serverExchangeRate.toFixed(2)));
      if (localStorage.getItem(EXCHANGE_RATE_STORAGE_KEY) !== cleanRate) {
        localStorage.setItem(EXCHANGE_RATE_STORAGE_KEY, cleanRate);
        changed = true;
      }
    }

    if (typeof serverUpdatedAt === 'number' && serverUpdatedAt > 0) {
      localStorage.setItem(CATALOG_UPDATED_AT_KEY, String(serverUpdatedAt));
    }

    if (changed) {
      window.dispatchEvent(new Event('catalog_products_updated'));
    }
  } catch {
    // Ignore storage errors
  }
}

export function saveProductsCatalog(products: Product[]): void {
  if (typeof window === 'undefined') return;
  try {
    const deduplicated = deduplicateProductsList(products);
    const normalized = normalizeProductsList(deduplicated);
    const currentRate = getSavedExchangeRate();
    const updatedAt = Date.now();

    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(normalized));
    localStorage.setItem(CATALOG_UPDATED_AT_KEY, String(updatedAt));
    window.dispatchEvent(new Event('catalog_products_updated'));

    persistCatalogToCloud(normalized, currentRate, updatedAt);

    fetch('/api/catalog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        products: normalized,
        exchangeRate: currentRate,
        updatedAt,
      }),
    }).catch(() => {});
  } catch (e) {
    console.error('Error saving products catalog:', e);
  }
}

export function resetProductsToDefault(): Product[] {
  saveProductsCatalog(DEFAULT_PRODUCTS);
  return DEFAULT_PRODUCTS;
}

export function initCatalogRealtimeSync(): void {
  if (typeof window === 'undefined' || catalogRealtimeUnsubscribe) return;

  testFirestoreConnection();

  const path = 'appConfig/catalog';
  catalogRealtimeUnsubscribe = onSnapshot(
    doc(db, 'appConfig', 'catalog'),
    (snapshot) => {
      if (!snapshot.exists()) {
        // Seed initial cloud catalog from current device state so all devices share the same state
        const initialProducts = getSavedProducts();
        const initialRate = getSavedExchangeRate();
        const initialUpdatedAt = getCatalogLastUpdatedAt() || Date.now();
        persistCatalogToCloud(initialProducts, initialRate, initialUpdatedAt);
        return;
      }

      const data = snapshot.data();
      if (!data || !Array.isArray(data.products) || data.products.length === 0) return;

      const cloudUpdatedAt = typeof data.updatedAt === 'number' ? data.updatedAt : Date.now();
      const cloudRate =
        typeof data.exchangeRate === 'number' && data.exchangeRate >= 1
          ? data.exchangeRate
          : DEFAULT_EXCHANGE_RATE;
      const cloudProducts = normalizeProductsList(deduplicateProductsList(data.products as Product[]));

      const currentRaw = localStorage.getItem(CATALOG_STORAGE_KEY);
      const nextRaw = JSON.stringify(cloudProducts);
      const currentRateRaw = localStorage.getItem(EXCHANGE_RATE_STORAGE_KEY);
      const nextRateRaw = String(Number(cloudRate.toFixed(2)));

      let changed = false;
      if (currentRaw !== nextRaw) {
        localStorage.setItem(CATALOG_STORAGE_KEY, nextRaw);
        changed = true;
      }
      if (currentRateRaw !== nextRateRaw) {
        localStorage.setItem(EXCHANGE_RATE_STORAGE_KEY, nextRateRaw);
        changed = true;
      }
      localStorage.setItem(CATALOG_UPDATED_AT_KEY, String(cloudUpdatedAt));

      if (changed) {
        window.dispatchEvent(new Event('catalog_products_updated'));
      }

      // Keep local/serverless backend in sync for AI chatbot queries
      fetch('/api/catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: cloudProducts,
          exchangeRate: cloudRate,
          updatedAt: cloudUpdatedAt,
        }),
      }).catch(() => {});
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export const COUNTRIES: { code: CountryCode; name: string; flag: string; currency: string }[] = [
  { code: 'mexico', name: 'México', flag: '🇲🇽', currency: 'MXN' },
  { code: 'venezuela', name: 'Venezuela', flag: '🇻🇪', currency: 'USDT / Binance' },
  { code: 'colombia', name: 'Colombia', flag: '🇨🇴', currency: 'USDT' },
  { code: 'otro', name: 'Otro País', flag: '🌎', currency: 'USDT' },
];

export function buildWhatsAppLink(message: string): string {
  // Normalize string to NFC and strip variation selectors (\uFE0E, \uFE0F) and any replacement characters (\uFFFD)
  const cleanMessage = (message || '')
    .normalize('NFC')
    .replace(/[\uFE0E\uFE0F\uFFFD]/g, '');
  return `https://api.whatsapp.com/send?phone=${OFFICIAL_WHATSAPP_CLEAN}&text=${encodeURIComponent(cleanMessage)}`;
}

export function formatWhatsAppOrderMessage(
  products: {
    id?: string;
    name: string;
    qty: number;
    priceMxn: number;
    priceUsd: number;
    currencyType: string;
  }[],
  totalMxn: number,
  totalUsd: number,
  paymentMethod: string,
  concept: string,
  userCountry: string,
  userProfile: string
): string {
  const productLines = products
    .map((p) => {
      const mpLink = getMercadoPagoLinkByPrice(p.priceMxn, p.id);
      const mpLine = mpLink ? `\n  💳 Pagar con Mercado Pago ($${p.priceMxn} MXN): ${mpLink}` : '';
      return `• ${p.qty}x ${p.name} ($${p.priceMxn * p.qty} MXN / $${(p.priceUsd * p.qty).toFixed(2)} USDT)${mpLine}`;
    })
    .join('\n');

  return `¡Hola! Me comunico desde la plataforma oficial de Servicios Digitales Premium.

⚠️ *Confirmación previa a compra por WhatsApp*
📍 País: ${userCountry}
👤 Perfil: ${userProfile}

📦 *Servicios solicitados:*
${productLines}

💰 *Total estimado:* $${totalMxn.toLocaleString()} MXN / $${totalUsd.toFixed(2)} USDT
💳 *Método de pago de preferencia:* ${paymentMethod}
📝 *Concepto a colocar:* "${concept}"

Por favor, confirmen disponibilidad inmediata y datos para proceder. ¡Muchas gracias!`;
}


