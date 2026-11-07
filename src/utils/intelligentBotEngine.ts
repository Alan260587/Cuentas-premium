import { ScheduleConfig, Product } from '../types';
import {
  PRODUCTS,
  getSavedProducts,
  OFFICIAL_WHATSAPP_NUMBER,
  OFFICIAL_BENEFICIARY,
} from '../data/catalog';
import { DEFAULT_SCHEDULE_CONFIG } from '../data/scheduleConfig';
import { LanguageCode } from '../i18n/types';
import { detectMessageLanguage } from '../i18n/languageDetector';
import { getBotTemplates, formatLocalizedDaysSummary } from '../i18n/botTranslations';
import { getLocalizedProduct } from '../i18n/productTranslations';
import { getDictionary } from '../i18n/translations';

export interface BotConversationContext {
  state?: 'idle' | 'awaiting_service' | 'awaiting_day' | 'awaiting_time' | 'awaiting_name' | 'confirmed' | string;
  clientName?: string;
  preferredService?: string;
  selectedServiceName?: string;
  preferredDay?: string;
  selectedDay?: string;
  preferredTimeSlot?: string;
  selectedTimeSlot?: string;
  ticketId?: string;
  offeredAppointmentDueToWait?: boolean;
  lastDetectedLang?: LanguageCode;
  preferredLang?: LanguageCode;
}

export interface ConfirmedBotTicket {
  ticketId: string;
  clientName: string;
  serviceName: string;
  dayOrDate: string;
  timeSlot: string;
  whatsAppLink: string;
}

export interface BotTurnResult {
  replyText: string;
  isAppointmentConfirmed?: boolean;
  confirmedTicket?: ConfirmedBotTicket;
  updatedContext: BotConversationContext;
  detectedLang: LanguageCode;
}

const PRODUCT_KEYWORDS: Array<{ id: string; terms: string[] }> = [
  { id: 'figma-pro', terms: ['figma', 'figma pro', '.edu', 'ui/ux', 'prototip'] },
  { id: 'ilove-pdf-premium', terms: ['ilovepdf', 'ilove pdf', 'pdf', 'ocr'] },
  { id: 'eleven-reader', terms: ['eleven', 'eleven reader', 'reader', 'lectura', 'voz', 'audio'] },
  { id: 'mause-ai', terms: ['mause', 'mause ai', '31 billon', '31 billion', 'tokens', 'token'] },
  { id: 'coursera-plus', terms: ['coursera', 'cursos', 'courses', 'certificad'] },
  { id: 'google-ai-pro', terms: ['google ai', 'gemini', 'gemini pro'] },
  { id: 'capcut-teams', terms: ['capcut', 'cap cut', '25 dias', '25 days'] },
  { id: 'microsoft-365', terms: ['microsoft', 'office', '365', 'word', 'excel', 'onedrive'] },
  { id: 'duolingo-super', terms: ['duolingo', 'super duolingo'] },
  { id: 'disney-plus', terms: ['disney', 'disney+'] },
  { id: 'netflix-premium', terms: ['netflix'] },
  { id: 'granola-business', terms: ['granola', 'granola business'] },
];

const DAY_PATTERNS: Array<{ dayId: string; regex: RegExp }> = [
  { dayId: 'lunes', regex: /\b(lunes|monday|segunda|lundi|montag|lunedì|lunedi|周一|星期一|月曜|월요일|الاثنين|सोमवार|понедельник|pazartesi)\b/i },
  { dayId: 'martes', regex: /\b(martes|tuesday|terça|terca|mardi|dienstag|martedì|martedi|周二|星期二|火曜|화요일|الثلاثاء|मंगलवार|вторник|salı|sali)\b/i },
  { dayId: 'miercoles', regex: /\b(miércoles|miercoles|wednesday|quarta|mercredi|mittwoch|mercoledì|mercoledi|周三|星期三|水曜|수요일|الأربعاء|बुधवार|среда|çarşamba|carsamba)\b/i },
  { dayId: 'jueves', regex: /\b(jueves|thursday|quinta|jeudi|donnerstag|giovedì|giovedi|周四|星期四|木曜|목요일|الخميس|गुरुवार|четверг|perşembe|persembe)\b/i },
  { dayId: 'viernes', regex: /\b(viernes|friday|sexta|vendredi|freitag|venerdì|venerdi|周五|星期五|金曜|금요일|الجمعة|शुक्रवार|пятница|cuma)\b/i },
  { dayId: 'sabado', regex: /\b(sábado|sabado|saturday|samedi|samstag|sabato|周六|星期六|土曜|토요일|السبت|शनिवार|суббота|cumartesi)\b/i },
];

function extractDay(text: string, lang: LanguageCode): string | undefined {
  const dict = getDictionary(lang);
  for (const item of DAY_PATTERNS) {
    if (item.regex.test(text)) {
      return (dict.days as Record<string, string>)[item.dayId] || item.dayId;
    }
  }
  return undefined;
}

function extractTimeSlot(text: string, timeSlots: string[]): string | undefined {
  const lower = text.toLowerCase();
  for (const slot of timeSlots) {
    const startPart = slot.split('-')[0]?.trim().toLowerCase();
    if (startPart && lower.includes(startPart)) {
      return slot;
    }
  }
  const match = text.match(/\b(1[0-2]|0?[1-9])(?::([0-5][0-9]))?\s*(am|pm|a\.m\.|p\.m\.)?\b/i);
  if (!match) return undefined;
  const hourNum = parseInt(match[1], 10);
  const mins = match[2] || '00';
  let period = (match[3] || '').toUpperCase().replace(/\./g, '');
  if (!period) {
    if (hourNum >= 9 && hourNum <= 11) period = 'AM';
    else period = 'PM';
  }
  const candidatePrefix = `${hourNum.toString().padStart(2, '0')}:${mins} ${period}`;
  const matchedSlot = timeSlots.find(s => s.toUpperCase().startsWith(candidatePrefix));
  return matchedSlot || `${hourNum}:${mins} ${period}`;
}

function extractMatchedProduct(text: string): Product | undefined {
  const lower = text.toLowerCase();
  const liveProducts = getSavedProducts();

  // Check if the user mentions any live product from the catalog
  for (const prod of liveProducts) {
    const prodLower = prod.name.toLowerCase();
    if (lower.includes(prodLower)) {
      return prod;
    }
    if (prodLower.includes('disney') && lower.includes('disney')) {
      return prod;
    }
    if (prodLower.includes('netflix') && lower.includes('netflix')) {
      return prod;
    }
    if (prodLower.includes('granola') && lower.includes('granola')) {
      return prod;
    }
  }

  for (const entry of PRODUCT_KEYWORDS) {
    if (entry.terms.some((term) => lower.includes(term))) {
      return (
        liveProducts.find((p) => p.id === entry.id || p.name.toLowerCase().includes(entry.terms[0])) ||
        PRODUCTS.find((p) => p.id === entry.id)
      );
    }
  }
  return undefined;
}

function extractClientName(text: string): string | undefined {
  const namePatterns = [
    /(?:me llamo|mi nombre es|soy|my name is|i am|i'm|me chamo|meu nome é|je m'appelle|ich heiße|mi chiamo|我叫|私の名前は|제 이름은|اسمي|मेरा नाम|меня зовут|benim adım)\s+([A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑa-záéíóúñ]+){0,2})/i,
  ];
  for (const regex of namePatterns) {
    const m = text.match(regex);
    if (m && m[1]) {
      return m[1].trim();
    }
  }
  return undefined;
}

function buildWhatsAppTicketLink(
  clientName: string,
  serviceName: string,
  dayOrDate: string,
  timeSlot: string,
  lang: LanguageCode
): string {
  const dict = getDictionary(lang);
  const lines = [
    `📅 ${dict.appointments.waTicketTitle}`,
    '',
    `👤 ${dict.appointments.waFieldClient} ${clientName}`,
    `🎯 ${dict.appointments.waFieldReason} ${serviceName}`,
    `📆 ${dict.appointments.waFieldDate} ${dayOrDate}`,
    `⏰ ${dict.appointments.waFieldTime} ${timeSlot}`,
    `💼 Titular: ${OFFICIAL_BENEFICIARY}`,
    '',
    dict.appointments.waFooterConfirm,
  ];
  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function processClientMessageIntelligently(
  userText: string,
  context: BotConversationContext = {},
  scheduleConfig: ScheduleConfig = DEFAULT_SCHEDULE_CONFIG,
  preferredLang: LanguageCode = 'es'
): BotTurnResult {
  const cleanText = (userText || '').trim();
  const baseFallback = context.lastDetectedLang || preferredLang || 'es';
  const detectedLang = detectMessageLanguage(cleanText, baseFallback);
  const templates = getBotTemplates(detectedLang);

  const enabledDayIds = (scheduleConfig?.availableDays || DEFAULT_SCHEDULE_CONFIG.availableDays)
    .filter((d) => d.enabled)
    .map((d) => d.dayId);
  const daysSummary = formatLocalizedDaysSummary(enabledDayIds, detectedLang);
  const slots =
    scheduleConfig?.timeSlots && scheduleConfig.timeSlots.length > 0
      ? scheduleConfig.timeSlots
      : DEFAULT_SCHEDULE_CONFIG.timeSlots;
  const startHour = slots[0]?.split('-')[0]?.trim() || '10:00 AM';
  const endHour = slots[slots.length - 1]?.split('-')[1]?.trim() || '08:00 PM';

  const updatedContext: BotConversationContext = {
    ...context,
    lastDetectedLang: detectedLang,
  };

  const foundName = extractClientName(cleanText);
  if (foundName) updatedContext.clientName = foundName;

  const foundDay = extractDay(cleanText, detectedLang);
  if (foundDay) updatedContext.preferredDay = foundDay;

  const foundTime = extractTimeSlot(cleanText, slots);
  if (foundTime) updatedContext.preferredTimeSlot = foundTime;

  const matchedProduct = extractMatchedProduct(cleanText);
  if (matchedProduct) {
    updatedContext.preferredService = getLocalizedProduct(matchedProduct, detectedLang).name;
  }

  const lower = cleanText.toLowerCase();
  const norm = lower.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Check if appointment intent or slot selection is active
  const isAppointmentIntent =
    /\b(cita|agendar|turno|reservar|programar|appointment|schedule|book|booking|agendamento|marcar|rendez-vous|rdv|termin|buchen|appuntamento|prenotare|预约|予約|예약|موعد|حجز|अपॉइंटमेंट|запись|встреч|randevu)\b/i.test(
      norm
    );

  // If user provides day & time (or completes missing fields) for an appointment
  if (
    (isAppointmentIntent || context.offeredAppointmentDueToWait || (foundDay && foundTime)) &&
    updatedContext.preferredDay &&
    updatedContext.preferredTimeSlot
  ) {
    const clientName = updatedContext.clientName || 'Cliente Verificado';
    const serviceName = updatedContext.preferredService || 'Suscripción Digital Premium';
    const dayOrDate = updatedContext.preferredDay;
    const timeSlot = updatedContext.preferredTimeSlot;
    const ticketId = `CITA-${Math.floor(1000 + Math.random() * 9000)}`;
    const whatsAppLink = buildWhatsAppTicketLink(
      clientName,
      serviceName,
      dayOrDate,
      timeSlot,
      detectedLang
    );

    return {
      replyText: templates.appointmentConfirmed(dayOrDate, timeSlot, serviceName),
      isAppointmentConfirmed: true,
      confirmedTicket: {
        ticketId,
        clientName,
        serviceName,
        dayOrDate,
        timeSlot,
        whatsAppLink,
      },
      updatedContext,
      detectedLang,
    };
  }

  if (isAppointmentIntent) {
    updatedContext.offeredAppointmentDueToWait = true;
    return {
      replyText: templates.appointmentAskDetails(
        updatedContext.preferredDay || null,
        updatedContext.preferredTimeSlot || null,
        updatedContext.preferredService || null,
        daysSummary,
        startHour,
        endHour
      ),
      updatedContext,
      detectedLang,
    };
  }

  // Explicit Recommendation intent (e.g., "Recomiéndame un producto para estudiar diseño", "What do you recommend for video?")
  const isExplicitRecommendation =
    /(recomiend|recomend|sugier|suger|aconsej|cual\s+me\s+conviene|que\s+me\s+conviene|cual\s+comprar|que\s+comprar|producto\s+para|cuenta\s+para|sirve\s+para|recommend|suggestion|suggest|which\s+one|what\s+should\s+i|best\s+product|product\s+for|recomenda|sugere|melhor\s+produto|recommand|conseill|meilleur\s+produit|empfehl|consigli)/i.test(
      norm
    );

  if (isExplicitRecommendation && templates.recommendationResponse) {
    return {
      replyText: templates.recommendationResponse(cleanText),
      updatedContext,
      detectedLang,
    };
  }

  // Specific product matched (checked before generic payment response so "pagar Figma Pro" or "¿Cuánto cuesta Figma Pro?" returns ONLY Figma Pro's exact details and Mercado Pago link)
  if (matchedProduct) {
    return {
      replyText: templates.singleProductInfo(matchedProduct, detectedLang),
      updatedContext,
      detectedLang,
    };
  }

  // Implicit use-case recommendation (when user asks about design, languages, video, study/courses, AI, PDF, or entertainment without naming a specific product brand)
  const isUseCaseQuery =
    /(disen|design|ui\b|ux\b|prototip|idioma|idiomas|language|languages|langue|langues|ingles|english|editar\s*video|edicion|video\s*editing|estudiar|estudio|cursos|courses|certificado|universidad|inteligencia\s*artificial|\bia\b|\bai\b|\bpdf\b|entretenimiento|entertainment|divertissement|streaming|pelicula|peliculas|serie|series)/i.test(
      norm
    );

  if (isUseCaseQuery && templates.recommendationResponse) {
    return {
      replyText: templates.recommendationResponse(cleanText),
      updatedContext,
      detectedLang,
    };
  }

  // Payment / Bank / Mercado Pago / Concept Rule intent
  if (
    /\b(pago|pagos|pagar|mercado\s*pago|mercadopago|mpago|transferencia|spei|clabe|banco|nu|bancoppel|binance|concepto|referencia|motivo|payment|pay|bank|transfer|reference|pagamento|pix|paiement|virement|zahlung|überweisung|bonifico|causale|支付|付款|转账|备注|支払い|振込|결제|이체|입금|دفع|تحويل|भुगतान|оплата|перевод|ödeme|havale)\b/i.test(
      lower
    )
  ) {
    return {
      replyText: templates.paymentConceptRuleResponse(),
      updatedContext,
      detectedLang,
    };
  }

  // Affiliate / Seller rules intent
  if (
    /\b(afiliado|afiliados|vendedor|vendedores|comisi|regla|reglas|ganar|gratis|revend|affiliate|affiliates|seller|rules|earn|free|parceiro|regras|affiliation|affilié|règles|partner|regeln|affiliati|regole|联盟|代理|规则|免费|アフィリエイト|ルール|제휴|판매자|규칙|عمولة|مسوق|قواعد|एफिलिएट|नियम|партнер|правил|ortaklık|satıcı|kural)\b/i.test(
      lower
    )
  ) {
    return {
      replyText: templates.affiliateRulesResponse(),
      updatedContext,
      detectedLang,
    };
  }

  // Catalog / Prices intent
  if (
    /\b(catalogo|catálogo|precio|precios|cuanto|cuánto|cuesta|productos|cuentas|disponible|catalog|price|prices|cost|products|accounts|preço|preços|produtos|catalogue|prix|produits|katalog|preis|preise|produkte|prezzi|prodotti|目录|价格|产品|多少钱|カタログ|価格|商品|카탈로그|가격|제품|كتالوج|سعر|أسعار|منتجات|कैटलॉग|कीमत|उत्पाद|каталог|цена|цены|продукт|fiyat|fiyatlar|ürünler)\b/i.test(
      lower
    )
  ) {
    return {
      replyText: templates.catalogResponse(getSavedProducts(), detectedLang),
      updatedContext,
      detectedLang,
    };
  }

  // Schedule / Hours intent
  if (
    /\b(horario|horarios|hora|horas|abierto|domingo|hermosillo|hours|schedule|open|sunday|horário|horários|horaire|horaires|öffnungszeiten|uhrzeit|orario|orari|时间|营业|営業時間|운영 시간|ساعات العمل|समय|часы работы|график|çalışma saatleri|saat)\b/i.test(
      lower
    )
  ) {
    return {
      replyText: templates.scheduleResponse(daysSummary, startHour, endHour),
      updatedContext,
      detectedLang,
    };
  }

  // Greeting intent
  if (
    /\b(hola|buenos|buenas|saludos|hello|hi|hey|good morning|good afternoon|olá|ola|oi|bom dia|boa tarde|bonjour|salut|bonsoir|hallo|guten|ciao|buongiorno|你好|您好|こんにちは|はじめまして|안녕하세요|مرحبا|السلام عليكم|أهلا|नमस्ते|привет|здравствуйте|merhaba|selam)\b/i.test(
      lower
    )
  ) {
    return {
      replyText: templates.greetingResponse(daysSummary, startHour, endHour),
      updatedContext,
      detectedLang,
    };
  }

  return {
    replyText: templates.defaultHelpResponse(),
    updatedContext,
    detectedLang,
  };
}

export async function processClientMessageWithGemini(
  userText: string,
  context: BotConversationContext = { state: 'idle' },
  scheduleConfig: ScheduleConfig = DEFAULT_SCHEDULE_CONFIG,
  _history: Array<{ sender?: 'client' | 'assistant'; role?: 'client' | 'bot'; text: string }> = [],
  preferredLang: LanguageCode = 'es'
): Promise<BotTurnResult> {
  // Always respond deterministically and immediately with the local multilingual engine and live catalog data
  return processClientMessageIntelligently(
    userText,
    context,
    scheduleConfig,
    preferredLang
  );
}
