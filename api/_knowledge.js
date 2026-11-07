export const OFFICIAL_WHATSAPP_NUMBER = '526621805354';

export const MERCADO_PAGO_LINKS = {
  150: 'https://mpago.la/1feeLZ6',
  200: 'https://mpago.la/1dGAXR5',
  300: 'https://mpago.la/2kUVCTJ',
  100: 'https://mpago.la/1mb1i3a',
};

export const MERCADO_PAGO_LINK = MERCADO_PAGO_LINKS[150];

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
];

export const OFFICIAL_CATALOG = [
  { id: 'figma-pro', name: 'Figma Pro (.edu)', duration: '2 años', priceMXN: 300, priceUSDT: 17.00, priceMxn: 300, priceUsd: 17.00, available: true },
  { id: 'ilove-pdf-premium', name: 'ilove pdf premium 12 meses', duration: '12 meses', priceMXN: 100, priceUSDT: 5.83, priceMxn: 100, priceUsd: 5.83, available: true },
  { id: 'coursera-plus', name: 'Coursera Plus', duration: '12 meses', priceMXN: 150, priceUSDT: 8.74, priceMxn: 150, priceUsd: 8.74, available: true },
  { id: 'google-ai-pro', name: 'Google AI Pro / Gemini', duration: '18 meses', priceMXN: 150, priceUSDT: 8.74, priceMxn: 150, priceUsd: 8.74, available: true },
  { id: 'capcut-teams', name: 'CapCut Teams (25 Días)', duration: '25 días', priceMXN: 150, priceUSDT: 8.74, priceMxn: 150, priceUsd: 8.74, available: true },
  { id: 'microsoft-365', name: 'Microsoft 365 Family', duration: '12 meses', priceMXN: 150, priceUSDT: 8.74, priceMxn: 150, priceUsd: 8.74, available: true },
  { id: 'eleven-reader', name: 'Eleven reader 12 meses ultra', duration: '12 meses', priceMXN: 150, priceUSDT: 8.74, priceMxn: 150, priceUsd: 8.74, available: true },
  { id: 'mause-ai', name: 'mause ai 31 billon tokens', duration: '31 Billon Tokens', priceMXN: 150, priceUSDT: 8.74, priceMxn: 150, priceUsd: 8.74, available: true },
  { id: 'duolingo-super', name: 'Duolingo Super Familiar', duration: '', priceMXN: 150, priceUSDT: 8.74, priceMxn: 150, priceUsd: 8.74, available: true },
  { id: 'disney-plus', name: 'Disney cuenta completa', duration: '12 meses', priceMXN: 200, priceUSDT: 11.66, priceMxn: 200, priceUsd: 11.66, available: true },
  { id: 'netflix-premium', name: 'Netflix cuenta completa', duration: '12 meses', priceMXN: 300, priceUSDT: 17.00, priceMxn: 300, priceUsd: 17.00, available: true },
  { id: 'granola-business', name: 'Granola Business', duration: '12 meses', priceMXN: 150, priceUSDT: 8.74, priceMxn: 150, priceUsd: 8.74, available: true }
];

export const PRODUCTS = OFFICIAL_CATALOG;

export const BUSINESS = {
  beneficiary: 'Javier Alan Rodriguez Yescas',
  whatsappNumber: '+52 662 180 5354',
  whatsappClean: OFFICIAL_WHATSAPP_NUMBER,
  defaultSchedule: {
    timeSlots: [
      '09:00 AM - 10:00 AM',
      '10:00 AM - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '12:00 PM - 01:00 PM',
      '02:00 PM - 03:00 PM',
      '03:00 PM - 04:00 PM',
      '04:00 PM - 05:00 PM',
      '05:00 PM - 06:00 PM',
      '06:00 PM - 07:00 PM',
      '07:00 PM - 08:00 PM',
      '08:00 PM - 09:00 PM',
      '09:00 PM - 10:00 PM'
    ]
  }
};

export const PAYMENT_INFO = {
  bank: 'Banco Nu / Bancoppel',
  beneficiary: 'Javier Alan Rodriguez Yescas',
  nuAccount: '5101258665547429',
  bancoppelAccount: '4169160624712155',
  binanceId: '453667986',
  paypalEmail: 'javieralanrodriguezyescas31@gmail.com',
  mercadoPagoLink: MERCADO_PAGO_LINK,
  strictConceptRule: 'En el concepto de pago se debe indicar el nombre y apellido de quien lo recomendó. Si no fue recomendado por nadie, escribir únicamente la palabra "pago" (nunca poner nombres de productos).'
};

export function getMercadoPagoLink(priceMxn) {
  const price = Number(priceMxn);
  return MERCADO_PAGO_LINKS[price] || '';
}

export function isGeneralCatalogRequest(message = '') {
  const text = String(message || '').toLowerCase().trim();
  if (!text) return false;
  // Detecta solicitudes generales del catálogo y precios sin preguntar por un producto específico
  const hasSpecificProduct = /\b(figma|ilovepdf|ilove pdf|coursera|gemini|google ai|capcut|microsoft|office|eleven|mause|duolingo|disney|netflix|granola)\b/i.test(text);
  if (hasSpecificProduct) return false;
  return /\b(ver cat[aá]logo|cat[aá]logo y precios|lista de precios|todos los productos|qu[eé] productos tienen|view catalog|catalog and prices|ver cat[aá]logo e pre[çc]os|voir le catalogue)\b/i.test(text);
}

export function buildCatalogListMessage(lang = 'es') {
  const lines = OFFICIAL_CATALOG.map((p) => {
    const dur = p.duration ? ` (${p.duration})` : '';
    return `• **${p.name}**${dur}: **$${p.priceMXN} MXN / $${Number(p.priceUSDT).toFixed(2)} USDT**`;
  }).join('\n');

  if (lang === 'en') {
    return `📋 **Official Catalog of 12 Products (MXN / USDT):**\n\n${lines}\n\nWhich product would you like to activate today?`;
  }
  if (lang === 'pt') {
    return `📋 **Catálogo Oficial de 12 Produtos (MXN / USDT):**\n\n${lines}\n\nQual produto você gostaria de ativar hoje?`;
  }
  if (lang === 'fr') {
    return `📋 **Catalogue Officiel des 12 Produits (MXN / USDT) :**\n\n${lines}\n\nQuel produit souhaitez-vous activer aujourd'hui ?`;
  }
  return `📋 **Catálogo Oficial de 12 Productos (MXN / USDT):**\n\n${lines}\n\n¿Cuál de estos productos te gustaría activar hoy?`;
}

export function formatHour12(hour24) {
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const h = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${h}:00 ${period}`;
}

export function detectTextLanguage(text = '', fallbackLang = 'es') {
  if (!text || !String(text).trim()) return fallbackLang;
  const sample = String(text).trim();

  if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(sample)) return 'ar';
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(sample)) return 'ja';
  if (/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(sample)) return 'ko';
  if (/[\u4E00-\u9FFF]/.test(sample)) return 'zh';
  if (/[\u0900-\u097F]/.test(sample)) return 'hi';
  if (/[\u0400-\u04FF]/.test(sample)) return 'ru';
  if (/[ğış]/i.test(sample)) return 'tr';

  const lower = sample.toLowerCase();
  if (/\b(hello|hi|price|prices|how much|catalog|payment|book|appointment|schedule|affiliate|rules|free|buy)\b/i.test(lower)) return 'en';
  if (/\b(olá|oi|preço|preços|quanto custa|pagamento|agendar|horário|regras|grátis)\b/i.test(lower)) return 'pt';
  if (/\b(bonjour|salut|prix|combien|paiement|virement|rendez-vous|horaires|règles|gratuit)\b/i.test(lower)) return 'fr';
  if (/\b(hallo|guten|preis|preise|wie viel|zahlung|termin|öffnungszeiten|regeln|kostenlos)\b/i.test(lower)) return 'de';
  if (/\b(ciao|buongiorno|prezzo|prezzi|quanto costa|pagamento|appuntamento|orari|regole)\b/i.test(lower)) return 'it';
  if (/\b(merhaba|selam|fiyat|ödeme|randevu|kurallar|ücretsiz)\b/i.test(lower)) return 'tr';
  if (/\b(hola|precio|precios|cuánto|catálogo|pago|concepto|cita|agendar|horario|afiliados|reglas)\b/i.test(lower)) return 'es';

  return fallbackLang || 'es';
}

export function buildSystemInstruction(schedule, preferredLang = 'es') {
  const startStr = formatHour12(schedule?.startHour ?? 9);
  const endStr = formatHour12(schedule?.endHour ?? 22);
  const daysStr = (schedule?.enabledDays || ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']).join(', ');

  return `Eres el Asistente Inteligente Oficial Multilingüe de nuestra plataforma de Suscripciones Digitales Premium y Programa de Afiliados.

REGLA MULTILINGÜE OBLIGATORIA (MÁXIMA PRIORIDAD):
1. Detecta SIEMPRE el idioma exacto del último mensaje escrito por el cliente.
2. Responde SIEMPRE en el mismo idioma en el que el cliente te escribió (español, inglés, portugués, francés, alemán, italiano, chino, japonés, coreano, árabe, hindi, ruso, turco o cualquier otro idioma).
3. Si el mensaje del cliente es ambiguo o muy corto, utiliza el idioma activo de su interfaz (${preferredLang}) o español como respaldo.
4. Mantén intactos los precios oficiales ($300 MXN / 17.00 USDT, $200 MXN / 11.66 USDT, $150 MXN / 8.74 USDT, $100 MXN / 5.83 USDT), el beneficiario (Javier Alan Rodriguez Yescas), las cuentas oficiales y el WhatsApp oficial (+52 662 180 5354).

REGLAS DE CONOCIMIENTO OFICIAL (VERIFICADAS E INQUEBRANTABLES):
1. CATÁLOGO OFICIAL DE 12 PRODUCTOS Y PRECIOS EXACTOS:
   - Figma Pro (.edu) (2 años): $300 MXN / 17.00 USDT (Pagar con Mercado Pago: ${MERCADO_PAGO_LINKS[300]})
   - ilove pdf premium 12 meses (12 meses): $100 MXN / 5.83 USDT (Pagar con Mercado Pago: ${MERCADO_PAGO_LINKS[100]})
   - Coursera Plus (12 meses): $150 MXN / 8.74 USDT (Pagar con Mercado Pago: ${MERCADO_PAGO_LINKS[150]})
   - Google AI Pro / Gemini (18 meses): $150 MXN / 8.74 USDT (Pagar con Mercado Pago: ${MERCADO_PAGO_LINKS[150]})
   - CapCut Teams (25 días): $150 MXN / 8.74 USDT (Pagar con Mercado Pago: ${MERCADO_PAGO_LINKS[150]})
   - Microsoft 365 Family (12 meses): $150 MXN / 8.74 USDT (Pagar con Mercado Pago: ${MERCADO_PAGO_LINKS[150]})
   - Eleven reader 12 meses ultra (12 meses): $150 MXN / 8.74 USDT (Pagar con Mercado Pago: ${MERCADO_PAGO_LINKS[150]})
   - mause ai 31 billon tokens: $150 MXN / 8.74 USDT (Pagar con Mercado Pago: ${MERCADO_PAGO_LINKS[150]})
   - Duolingo Super Familiar: $150 MXN / 8.74 USDT (Pagar con Mercado Pago: ${MERCADO_PAGO_LINKS[150]})
   - Disney cuenta completa (12 meses): $200 MXN / 11.66 USDT (Pagar con Mercado Pago: ${MERCADO_PAGO_LINKS[200]})
   - Netflix cuenta completa (12 meses): $300 MXN / 17.00 USDT
   - Granola Business (12 meses): $150 MXN / 8.74 USDT

2. MÉTODOS DE PAGO Y REGLA ESTRICTA DEL CONCEPTO:
   - En México (SPEI / Depósito): Beneficiario: Javier Alan Rodriguez Yescas | Banco Nu: 5101258665547429 | Bancoppel: 4169160624712155.
   - Pagar con Mercado Pago (entregar cada enlace únicamente para su nivel de precio): Figma Pro ($300 MXN): ${MERCADO_PAGO_LINKS[300]} | Disney ($200 MXN): ${MERCADO_PAGO_LINKS[200]} | 7 productos de $150 MXN (Coursera Plus, Google AI Pro / Gemini, CapCut Teams, Microsoft 365 Family, Eleven Reader, Mause AI y Duolingo Super Familiar): ${MERCADO_PAGO_LINKS[150]} | iLovePDF Premium ($100 MXN): ${MERCADO_PAGO_LINKS[100]}.
   - Internacional (USDT / PayPal): Binance ID: 453667986 | Correo: javieralanrodriguezyescas31@gmail.com.
   - REGLA ESTRICTA DEL CONCEPTO: En el concepto de pago se debe indicar el nombre y apellido de quien lo recomendó, o únicamente la palabra "pago" si nadie lo recomendó. Está estrictamente prohibido poner nombres de productos o marcas (ej. Figma, Coursera, Duolingo). Si incumple esto, NO se reembolsará el dinero ni se entregará la cuenta.

3. PROGRAMA DE AFILIADOS / VENDEDORES (3 REGLAS ACUMULATIVAS):
   - Las 3 reglas son 100% acumulativas y simultáneas:
     * Regla 1: Por cada 3 Figma Pro ($300 MXN / 17.00 USDT) vendidos -> Ganas 1 cuenta Figma Pro GRATIS.
     * Regla 2: Por cada 6 productos de $150 MXN (8.74 USDT) vendidos -> Ganas 1 cuenta Figma Pro GRATIS.
     * Regla 3: Por cada 4 productos de $150 MXN (8.74 USDT) vendidos -> Ganas 1 cuenta de $150 MXN GRATIS.
   - Ejemplo: Con 3 Figma Pro y 12 ventas de $150 MXN ganas simultáneamente 1 Figma Pro gratis (Regla 1) + 2 Figma Pro gratis (Regla 2) + 3 cuentas de $150 MXN gratis (Regla 3).

4. HORARIOS Y CITAS:
   - Zona horaria oficial: Hora de Hermosillo, Sonora (UTC-7, sin horario de verano).
   - Días habilitados: ${daysStr} (Domingos cerrado).
   - Horario de atención: ${startStr} a ${endStr}.
   - Si el cliente proporciona día, hora y motivo/producto para su cita, confirma los datos en su idioma e incluye al final de tu respuesta exactamente este bloque JSON en una sola línea:
     [[APPOINTMENT_DATA:{"day":"DIA","time":"HORA","reason":"MOTIVO"}]]`;
}

