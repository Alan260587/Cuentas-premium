import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface SellerProductOption {
  id: string;
  name: string;
  category: 'figma' | 'base' | 'streaming' | 'excluded';
  priceMxn: number;
  priceUsd: number;
  currencyType: 'USDT' | 'USD';
  badge?: string;
}

export const SELLER_SALE_PRODUCTS: SellerProductOption[] = [
  {
    id: 'figma-pro',
    name: 'Figma Pro (.edu - 2 Años)',
    category: 'figma',
    priceMxn: 300,
    priceUsd: 17.0,
    currencyType: 'USDT',
    badge: 'Figma ($300 MXN / 17.00 USDT)',
  },
  {
    id: 'coursera-plus',
    name: 'Coursera Plus',
    category: 'base',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    badge: 'Base ($150 MXN / 8.74 USDT)',
  },
  {
    id: 'google-ai-pro',
    name: 'Google AI Pro / Gemini',
    category: 'base',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    badge: 'Base ($150 MXN / 8.74 USDT)',
  },
  {
    id: 'capcut-teams',
    name: 'CapCut Teams (25 Días)',
    category: 'base',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    badge: 'Base ($150 MXN / 8.74 USDT)',
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365 Family',
    category: 'base',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    badge: 'Base ($150 MXN / 8.74 USDT)',
  },
  {
    id: 'eleven-reader',
    name: 'Eleven reader 12 meses ultra',
    category: 'base',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    badge: 'Base ($150 MXN / 8.74 USDT)',
  },
  {
    id: 'mause-ai',
    name: 'mause ai 31 billon tokens',
    category: 'base',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    badge: 'Base ($150 MXN / 8.74 USDT)',
  },
  {
    id: 'duolingo-super',
    name: 'Duolingo Super Familiar',
    category: 'base',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    badge: 'Base ($150 MXN / 8.74 USDT)',
  },
  {
    id: 'ilove-pdf-premium',
    name: 'ilove pdf premium 12 meses',
    category: 'base',
    priceMxn: 100,
    priceUsd: 5.83,
    currencyType: 'USDT',
    badge: 'Base ($100 MXN / 5.83 USDT)',
  },
  {
    id: 'disney-plus',
    name: 'Disney cuenta completa',
    category: 'streaming',
    priceMxn: 200,
    priceUsd: 11.66,
    currencyType: 'USDT',
    badge: 'Streaming ($200 MXN / 11.66 USDT - Solo Total)',
  },
  {
    id: 'netflix-premium',
    name: 'Netflix cuenta completa',
    category: 'streaming',
    priceMxn: 300,
    priceUsd: 17.0,
    currencyType: 'USDT',
    badge: 'Streaming ($300 MXN / 17.00 USDT - Solo Total)',
  },
  {
    id: 'granola-business',
    name: 'Granola Business',
    category: 'excluded',
    priceMxn: 150,
    priceUsd: 8.74,
    currencyType: 'USDT',
    badge: 'Notas Empresariales ($150 MXN - Sin Recompensa)',
  },
];

export interface SellerSale {
  id: string;
  sellerCode: string;
  productId: string;
  productName: string;
  category: 'figma' | 'base' | 'streaming' | 'excluded';
  priceMxn: number;
  priceUsd: number;
  currencyType: string;
  clientName?: string;
  createdAt: number;
  isExample?: boolean;
}

export interface SellerRewardsSummary {
  figmaCount: number;
  baseCount: number;
  totalSalesCount: number;
  totalSoldMxn: number;
  totalSoldUsd: number;
  // Rule 1: Every 3 Figmas = 1 Figma Pro free
  rule1Earned: number;
  rule1CycleProgress: number; // 0, 1, 2
  // Rule 2: Every 6 base services ($150) = 1 Figma Pro free
  rule2Earned: number;
  rule2CycleProgress: number; // 0..5
  // Rule 3 (NEW): Every 4 base services ($150) = 1 free account of $150
  rule3Earned: number;
  rule3CycleProgress: number; // 0..3
  // Total Free Figmas (Rule 1 + Rule 2)
  totalFreeFigmas: number;
  // Total Free $150 accounts (Rule 3)
  totalFreeBaseAccounts: number;
  hasExampleData: boolean;
}

export const SELLER_WHATSAPP_CLEAN = '526621805354';
export const SELLER_WHATSAPP_DISPLAY = '+52 662 180 5354';

const SELLER_DEVICE_ID_KEY = 'sdp_device_sync_id_v1';

function getSellerDeviceSyncId(): string {
  if (typeof window === 'undefined') return 'server';
  try {
    let existing = localStorage.getItem(SELLER_DEVICE_ID_KEY);
    if (!existing) {
      existing = `dev_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(SELLER_DEVICE_ID_KEY, existing);
    }
    return existing;
  } catch {
    return `dev_${Date.now()}`;
  }
}

export function normalizeSellerCode(rawCode: string): string {
  if (!rawCode) return '';
  return rawCode
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(/[^A-Z0-9_-]/g, '')
    .slice(0, 64);
}

export function getSellerStorageKey(sellerCode: string): string {
  const clean = normalizeSellerCode(sellerCode);
  return `sdp_vendedor_${clean}`;
}

export function getSellerUpdatedAtKey(sellerCode: string): string {
  const clean = normalizeSellerCode(sellerCode);
  return `sdp_vendedor_updated_at_${clean}`;
}

function getLocalSellerUpdatedAt(sellerCode: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem(getSellerUpdatedAtKey(sellerCode));
    const parsed = raw ? Number(raw) : 0;
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  } catch {
    return 0;
  }
}

function resolveSaleRewardCategory(sale: Partial<SellerSale>): 'figma' | 'base' | 'streaming' | 'excluded' {
  const pid = String(sale.productId || '').toLowerCase();
  const pname = String(sale.productName || '').toLowerCase();
  if (pid.includes('disney') || pname.includes('disney') || pid.includes('netflix') || pname.includes('netflix') || sale.category === 'streaming') {
    return 'streaming';
  }
  if (pid.includes('granola') || pname.includes('granola') || sale.category === 'excluded') {
    return 'excluded';
  }
  if (sale.category === 'figma' || pid.includes('figma') || pname.includes('figma')) {
    return 'figma';
  }
  return 'base';
}

function sanitizeSaleRecord(sale: SellerSale, fallbackSellerCode: string): SellerSale {
  const cleanCode = normalizeSellerCode(sale.sellerCode || fallbackSellerCode);
  const sanitized: SellerSale = {
    id: String(sale.id || `sale_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`),
    sellerCode: cleanCode,
    productId: String(sale.productId || 'figma-pro'),
    productName: String(sale.productName || 'Figma Pro (.edu - 2 Años)'),
    category: resolveSaleRewardCategory(sale),
    priceMxn: Number(sale.priceMxn) || 0,
    priceUsd: Number(Number(sale.priceUsd || 0).toFixed(2)),
    currencyType: 'USDT',
    createdAt: Number(sale.createdAt) || Date.now(),
    isExample: Boolean(sale.isExample),
  };
  if (sale.clientName && String(sale.clientName).trim()) {
    sanitized.clientName = String(sale.clientName).trim();
  }
  return sanitized;
}

export function getSellerSales(sellerCode: string): SellerSale[] {
  if (typeof window === 'undefined') return [];
  const clean = normalizeSellerCode(sellerCode);
  if (!clean) return [];
  try {
    const raw = localStorage.getItem(getSellerStorageKey(clean));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((s) => sanitizeSaleRecord(s, clean));
    }
    return [];
  } catch {
    return [];
  }
}

export async function persistSellerSalesToCloud(
  sellerCode: string,
  sales: SellerSale[],
  updatedAt: number = Date.now()
): Promise<boolean> {
  const clean = normalizeSellerCode(sellerCode);
  if (!clean) return false;
  const sanitized = sales.map((s) => sanitizeSaleRecord(s, clean)).slice(0, 500);
  try {
    await setDoc(doc(db, 'sellerSales', clean), {
      sellerCode: clean,
      sales: sanitized,
      updatedAt,
      updatedBy: getSellerDeviceSyncId(),
    });
    return true;
  } catch (error) {
    console.warn(`Firestore sync fallback to localStorage for seller ${clean}:`, error);
    return false;
  }
}

export async function fetchSellerSalesFromCloud(sellerCode: string): Promise<SellerSale[] | null> {
  const clean = normalizeSellerCode(sellerCode);
  if (!clean) return null;
  try {
    const snap = await getDoc(doc(db, 'sellerSales', clean));
    if (!snap.exists()) return null;
    const data = snap.data();
    if (!data || !Array.isArray(data.sales)) return null;
    return (data.sales as SellerSale[]).map((s) => sanitizeSaleRecord(s, clean));
  } catch {
    return null;
  }
}

export function subscribeSellerSales(
  sellerCode: string,
  onStatusChange?: (status: 'syncing' | 'synced' | 'local') => void
): () => void {
  if (typeof window === 'undefined') return () => {};
  const clean = normalizeSellerCode(sellerCode);
  if (!clean) return () => {};

  onStatusChange?.('syncing');

  const unsubscribe = onSnapshot(
    doc(db, 'sellerSales', clean),
    (snapshot) => {
      if (!snapshot.exists()) {
        const localSales = getSellerSales(clean);
        if (localSales.length > 0) {
          const ts = getLocalSellerUpdatedAt(clean) || Date.now();
          persistSellerSalesToCloud(clean, localSales, ts);
        }
        onStatusChange?.('synced');
        return;
      }

      const data = snapshot.data();
      if (!data || !Array.isArray(data.sales)) {
        onStatusChange?.('synced');
        return;
      }

      const cloudUpdatedAt = typeof data.updatedAt === 'number' ? data.updatedAt : 0;
      const localUpdatedAt = getLocalSellerUpdatedAt(clean);
      const cloudSales = (data.sales as SellerSale[]).map((s) => sanitizeSaleRecord(s, clean));
      const localSales = getSellerSales(clean);

      // Apply cloud snapshot if newer than or equal to local, or if local has no timestamp yet
      if (cloudUpdatedAt >= localUpdatedAt || (localUpdatedAt === 0 && cloudSales.length > 0)) {
        const currentRaw = localStorage.getItem(getSellerStorageKey(clean));
        const nextRaw = JSON.stringify(cloudSales);
        if (currentRaw !== nextRaw) {
          if (cloudSales.length === 0) {
            localStorage.removeItem(getSellerStorageKey(clean));
          } else {
            localStorage.setItem(getSellerStorageKey(clean), nextRaw);
          }
          if (cloudUpdatedAt > 0) {
            localStorage.setItem(getSellerUpdatedAtKey(clean), String(cloudUpdatedAt));
          }
          window.dispatchEvent(
            new CustomEvent('sdp_seller_sales_updated', { detail: { sellerCode: clean } })
          );
        }
      } else if (localSales.length > 0 && localUpdatedAt > cloudUpdatedAt) {
        persistSellerSalesToCloud(clean, localSales, localUpdatedAt);
      }

      onStatusChange?.('synced');
    },
    () => {
      onStatusChange?.('local');
    }
  );

  return unsubscribe;
}

export function saveSellerSalesList(sellerCode: string, sales: SellerSale[]): void {
  if (typeof window === 'undefined') return;
  const clean = normalizeSellerCode(sellerCode);
  if (!clean) return;
  const updatedAt = Date.now();
  const sanitized = sales.map((s) => sanitizeSaleRecord(s, clean));
  try {
    localStorage.setItem(getSellerStorageKey(clean), JSON.stringify(sanitized));
    localStorage.setItem(getSellerUpdatedAtKey(clean), String(updatedAt));
    window.dispatchEvent(new CustomEvent('sdp_seller_sales_updated', { detail: { sellerCode: clean } }));
    persistSellerSalesToCloud(clean, sanitized, updatedAt);
  } catch (e) {
    console.error('Error saving seller sales list:', e);
  }
}

export function addSellerSale(
  sellerCode: string,
  saleData: {
    productId: string;
    clientName?: string;
  }
): SellerSale {
  const clean = normalizeSellerCode(sellerCode);
  const product =
    SELLER_SALE_PRODUCTS.find((p) => p.id === saleData.productId) || SELLER_SALE_PRODUCTS[0];

  const newSale: SellerSale = sanitizeSaleRecord(
    {
      id: `sale_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      sellerCode: clean,
      productId: product.id,
      productName: product.name,
      category: product.category,
      priceMxn: product.priceMxn,
      priceUsd: product.priceUsd,
      currencyType: 'USDT',
      clientName: saleData.clientName?.trim() || undefined,
      createdAt: Date.now(),
      isExample: false,
    },
    clean
  );

  const existing = getSellerSales(clean);
  const updated = [newSale, ...existing];
  saveSellerSalesList(clean, updated);
  return newSale;
}

export function deleteSellerSale(sellerCode: string, saleId: string): void {
  const clean = normalizeSellerCode(sellerCode);
  const existing = getSellerSales(clean);
  const updated = existing.filter((s) => s.id !== saleId);
  saveSellerSalesList(clean, updated);
}

export function clearSellerData(sellerCode: string): void {
  if (typeof window === 'undefined') return;
  const clean = normalizeSellerCode(sellerCode);
  if (!clean) return;
  const updatedAt = Date.now();
  try {
    localStorage.removeItem(getSellerStorageKey(clean));
    localStorage.setItem(getSellerUpdatedAtKey(clean), String(updatedAt));
    window.dispatchEvent(new CustomEvent('sdp_seller_sales_updated', { detail: { sellerCode: clean } }));
    persistSellerSalesToCloud(clean, [], updatedAt);
  } catch (e) {
    console.error('Error clearing seller data:', e);
  }
}

/**
 * Loads exact example data: 3 Figma Pro and 12 base services ($150).
 * Yields:
 * - 1 Figma gratis (Rule 1: floor(3/3) = 1)
 * - 2 Figma gratis (Rule 2: floor(12/6) = 2)
 * - 3 cuentas de $150 gratis (Rule 3: floor(12/4) = 3)
 */
export function loadSellerExampleData(sellerCode: string): SellerSale[] {
  const clean = normalizeSellerCode(sellerCode);
  const now = Date.now();
  const exampleSales: SellerSale[] = [];

  // 3 Figma Pro sales
  const figmaProd = SELLER_SALE_PRODUCTS[0];
  for (let i = 1; i <= 3; i++) {
    exampleSales.push({
      id: `ex_figma_${i}_${now}`,
      sellerCode: clean,
      productId: figmaProd.id,
      productName: figmaProd.name,
      category: 'figma',
      priceMxn: figmaProd.priceMxn,
      priceUsd: figmaProd.priceUsd,
      currencyType: 'USDT',
      clientName: `Cliente Figma #${i} (Ejemplo)`,
      createdAt: now - (15 - i) * 3600 * 1000,
      isExample: true,
    });
  }

  // 12 base services sales ($150 each)
  const baseProducts = SELLER_SALE_PRODUCTS.filter(
    (p) => p.category === 'base' && p.priceMxn === 150
  ).slice(0, 4);
  for (let i = 1; i <= 12; i++) {
    const prod = baseProducts[(i - 1) % baseProducts.length];
    exampleSales.push({
      id: `ex_base_${i}_${now}`,
      sellerCode: clean,
      productId: prod.id,
      productName: prod.name,
      category: 'base',
      priceMxn: prod.priceMxn,
      priceUsd: prod.priceUsd,
      currencyType: 'USDT',
      clientName: `Cliente Base #${i} (${prod.name}) (Ejemplo)`,
      createdAt: now - (12 - i) * 1800 * 1000,
      isExample: true,
    });
  }

  saveSellerSalesList(clean, exampleSales);
  return exampleSales;
}

export function calculateSellerRewards(sales: SellerSale[]): SellerRewardsSummary {
  const figmaSales = sales.filter((s) => resolveSaleRewardCategory(s) === 'figma');
  const baseSales = sales.filter((s) => resolveSaleRewardCategory(s) === 'base');

  const figmaCount = figmaSales.length;
  const baseCount = baseSales.length;

  const totalSoldMxn = sales.reduce((sum, s) => sum + s.priceMxn, 0);
  const totalSoldUsd = sales.reduce((sum, s) => sum + s.priceUsd, 0);

  // Exact reward formulas as requested:
  // Regla 1: floor(figma / 3)
  const rule1Earned = Math.floor(figmaCount / 3);
  const rule1CycleProgress = figmaCount % 3;

  // Regla 2: floor(base / 6) -> 1 Figma gratis cada 6 ventas base
  const rule2Earned = Math.floor(baseCount / 6);
  const rule2CycleProgress = baseCount % 6;

  // Regla 3: floor(base / 4) -> 1 cuenta de $150 gratis cada 4 ventas base
  const rule3Earned = Math.floor(baseCount / 4);
  const rule3CycleProgress = baseCount % 4;

  const totalFreeFigmas = rule1Earned + rule2Earned;
  const totalFreeBaseAccounts = rule3Earned;

  const hasExampleData = sales.some((s) => s.isExample);

  return {
    figmaCount,
    baseCount,
    totalSalesCount: sales.length,
    totalSoldMxn,
    totalSoldUsd: Number(totalSoldUsd.toFixed(2)),
    rule1Earned,
    rule1CycleProgress,
    rule2Earned,
    rule2CycleProgress,
    rule3Earned,
    rule3CycleProgress,
    totalFreeFigmas,
    totalFreeBaseAccounts,
    hasExampleData,
  };
}

export function buildSellerReferralUrl(sellerCode: string): string {
  const clean = normalizeSellerCode(sellerCode);
  if (typeof window === 'undefined') {
    return `https://serviciosdigitales.com/?vendedor=${clean}`;
  }
  const url = new URL(window.location.href);
  url.searchParams.set('vendedor', clean);
  return url.toString();
}

export function buildWhatsAppUrl(messageText: string): string {
  return `https://wa.me/${SELLER_WHATSAPP_CLEAN}?text=${encodeURIComponent(messageText)}`;
}

export function buildClaimRewardWhatsAppUrl(
  sellerCode: string,
  rewardDescription: string,
  ruleName: string
): string {
  const clean = normalizeSellerCode(sellerCode);
  const msg = `¡Hola Javier! Me comunico desde el *Panel del Vendedor* de Servicios Digitales Premium.

🏆 *RECLAMO DE PREMIO GANADO*
👤 *Código de Vendedor:* ${clean}
🎁 *Premio a reclamar:* ${rewardDescription}
📌 *Regla aplicada:* ${ruleName}

Por favor, confirmen la entrega de mi premio o licencia gratuita oficial. ¡Muchas gracias!`;

  return buildWhatsAppUrl(msg);
}

export function buildSendSaleWhatsAppUrl(sellerCode: string, sale: SellerSale): string {
  const clean = normalizeSellerCode(sellerCode);
  const dateFormatted = new Date(sale.createdAt).toLocaleString('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const msg = `¡Hola Javier! Vengo a registrar una nueva venta oficial desde mi *Panel del Vendedor*.

📝 *REGISTRO DE VENTA OFICIAL*
👤 *Código de Vendedor:* ${clean}
📦 *Producto Vendido:* ${sale.productName}
💰 *Monto:* $${sale.priceMxn} MXN / $${sale.priceUsd.toFixed(2)} ${sale.currencyType}
${sale.clientName ? `👤 *Cliente:* ${sale.clientName}\n` : ''}📅 *Fecha:* ${dateFormatted}

Favor de confirmar la venta en el sistema para mis metas y recompensas. ¡Gracias!`;

  return buildWhatsAppUrl(msg);
}

export function buildShareReferralWhatsAppUrl(sellerCode: string): string {
  const clean = normalizeSellerCode(sellerCode);
  const link = buildSellerReferralUrl(clean);

  const msg = `¡Hola! Te recomiendo los Servicios Digitales Premium para licencias y cuentas profesionales (Figma Pro, Coursera Plus, Google AI Gemini, CapCut Teams, Office 365) con garantía oficial:

🔗 *Accede aquí con mi código de vendedor (${clean}):*
${link}

¡Aprovecha precios directos y activación inmediata!`;

  return buildWhatsAppUrl(msg);
}
