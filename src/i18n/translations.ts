import { LanguageCode } from './types';
import { extendedDictionaries } from './extendedDictionaries';

export interface AppDictionary {
  countries: {
    mx: string;
    ve: string;
    co: string;
    other: string;
  };
  days: {
    lunes: string;
    martes: string;
    miercoles: string;
    jueves: string;
    viernes: string;
    sabado: string;
    domingo: string;
    monToSat: string;
    monToFri: string;
    allDays: string;
    noDays: string;
    to: string;
  };
  header: {
    brandSubtitle: string;
    countryLabel: string;
    languageLabel: string;
    roleLabel: string;
    roleClient: string;
    roleVendor: string;
    roleAdmin: string;
    navVideo: string;
    navCatalog: string;
    navPayments: string;
    navAffiliates: string;
    navAppointments: string;
    navSimulation: string;
    sellerPanelBtn: string;
    sellerPanelShort: string;
    shareWebBtn: string;
    adminSessionActive: string;
    adminProtected: string;
    assistantBtn: string;
    assistantBtnTitle: string;
    quoteBtn: string;
    mobileRoleLabel: string;
    mobileCountryLabel: string;
    mobileLanguageLabel: string;
  };
  noticeBanner: {
    officialTimeLabel: string;
    hermosilloNote: string;
    scheduleBtn: string;
    AvailableNow: string;
    ClosedNow: string;
    sundayClosedNote: string;
    conceptWarningTitle: string;
    conceptWarningBody: string;
    activeViewLabel: string;
    topWhatsAppAlertMessage: string;
    topWhatsAppAlertBtn: string;
    topWhatsAppAlertClose: string;
  };
  hero: {
    badgeText: string;
    titlePart1: string;
    titleHighlight: string;
    subtitle: string;
    ctaCatalog: string;
    ctaVideo: string;
    ctaSellerPanel: string;
    ctaAppointments: string;
    ctaAffiliates: string;
    ctaAssistant: string;
    ctaSimulator: string;
    statProductsLabel: string;
    statProductsValue: string;
    statPaymentsLabel: string;
    statPaymentsValue: string;
    statAffiliateLabel: string;
    statAffiliateValue: string;
    statAppointmentsLabel: string;
    statAppointmentsValue: string;
    statSupportLabel: string;
    statSupportValue: string;
    cardHeaderTitle: string;
    cardHeaderBadge: string;
    cardFeaturedSub: string;
    cardBaseAccountsTitle: string;
    cardBaseAccountsSub: string;
    cardPdfTitle: string;
    cardPdfSub: string;
    cardRuleTitle: string;
    cardRuleBody: string;
  };
  video: {
    badge: string;
    title: string;
    subtitle: string;
    playBtn: string;
    pauseBtn: string;
    muteBtn: string;
    unmuteBtn: string;
    restartBtn: string;
    fullscreenBtn: string;
    pipBtn: string;
    speedLabel: string;
    audioNotice: string;
    ctaExplore: string;
    ctaAskBot: string;
    StatusPlaying: string;
    StatusPaused: string;
  };
  catalog: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    clearSearch: string;
    allCategories: string;
    onlyMxn: string;
    onlyUsdt: string;
    resultsCount: string;
    popularBadge: string;
    equivalentLabel: string;
    featuresLabel: string;
    addToQuote: string;
    bookAppointmentForProduct: string;
    emptyTitle: string;
    emptySubtitle: string;
    resetFilters: string;
    categories: {
      Productividad: string;
      Diseño: string;
      Educación: string;
      IA: string;
      Edición: string;
      Lectura: string;
    };
  };
  cart: {
    title: string;
    itemSingular: string;
    itemPlural: string;
    emptyTitle: string;
    emptySubtitle: string;
    viewCatalogBtn: string;
    removeTitle: string;
    subtotalMxn: string;
    equivalentUsdt: string;
    conceptWarningLabel: string;
    conceptWarningText: string;
    sendWhatsAppBtn: string;
    clearQuoteBtn: string;
    waOrderHeader: string;
    waOrderIntro: string;
    waOrderTotal: string;
    waOrderConceptNotice: string;
    waOrderOutro: string;
  };
  payments: {
    badge: string;
    title: string;
    subtitle: string;
    countryTransferTitle: string;
    bankLabel: string;
    beneficiaryLabel: string;
    clabeLabel: string;
    copyClabe: string;
    copiedClabe: string;
    copySuccessMsg: string;
    badgeRecommendedMx: string;
    badgeOxxoTransfer: string;
    typeClabeCard: string;
    typeCard: string;
    internationalTitle: string;
    internationalBadge: string;
    internationalDesc: string;
    badgeCryptoZeroFee: string;
    badgeIntlDigital: string;
    typeEmail: string;
    priceRefFigma: string;
    priceRefGeneral: string;
    priceRefPdf: string;
    requestCryptoLinkBtn: string;
    waCryptoMessage: string;
    strictRuleBadge: string;
    strictRuleTitle: string;
    strictRuleIntro: string;
    strictRuleForbidden: string;
    strictRulePenalty: string;
    strictRuleRefundNote: string;
    validExamplesTitle: string;
    validExamplesList: string[];
    forbiddenExamplesTitle: string;
    forbiddenExamplesList: string[];
    mercadoPagoPayLabel: string;
  };
  affiliates: {
    badge: string;
    title: string;
    subtitle: string;
    cumulativeBannerTitle: string;
    cumulativeBannerDesc: string;
    openSellerPanelBtn: string;
    goalLabel: string;
    rule1Tag: string;
    rule1Title: string;
    rule1Desc: string;
    rule1Reward: string;
    rule2Tag: string;
    rule2Title: string;
    rule2Desc: string;
    rule2Reward: string;
    rule3Tag: string;
    rule3Title: string;
    rule3Desc: string;
    rule3Reward: string;
    simBadge: string;
    simTitle: string;
    simSubtitle: string;
    simResetBtn: string;
    simFigmaInputLabel: string;
    simFigmaInputSub: string;
    simBaseInputLabel: string;
    simBaseInputSub: string;
    simRewardsTitle: string;
    simRule1ResultLabel: string;
    simRule2ResultLabel: string;
    simRule3ResultLabel: string;
    simFreeFigmaUnit: string;
    simFreeBaseUnit: string;
    simCycleProgress: string;
    simTotalValueLabel: string;
    simTotalAccountsFree: string;
    simNoteCumulative: string;
  };
  appointments: {
    badge: string;
    title: string;
    subtitle: string;
    adminManageScheduleBtn: string;
    timezoneCardTitle: string;
    timezoneCardSub: string;
    activeScheduleLabel: string;
    sundayBlockedBadge: string;
    formTitle: string;
    clientNameLabel: string;
    clientNamePlaceholder: string;
    clientPhoneLabel: string;
    clientPhonePlaceholder: string;
    reasonLabel: string;
    reasonDigitalActivation: string;
    reasonAffiliateRegistration: string;
    reasonWholesaleSupport: string;
    reasonBuyPrefix: string;
    reasonGeneralInfo: string;
    reasonAffiliateJoin: string;
    reasonWarrantySupport: string;
    dateLabel: string;
    nextBusinessDayHint: string;
    sundayErrorAlert: string;
    dayDisabledError: string;
    timeSlotLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitWhatsAppBtn: string;
    directWhatsAppLabel: string;
    previewTitle: string;
    previewSubtitle: string;
    copyMessageBtn: string;
    copiedMessageBtn: string;
    waTicketTitle: string;
    waFieldClient: string;
    waFieldPhone: string;
    waFieldReason: string;
    waFieldDate: string;
    waFieldTime: string;
    waFieldCountry: string;
    waFieldNotes: string;
    waFieldNoNotes: string;
    waFooterConfirm: string;
  };
  simulator: {
    badge: string;
    title: string;
    subtitle: string;
    lockBadge: string;
    lockTitle: string;
    lockSubtitle: string;
    scenarioOrderTab: string;
    scenarioAppointmentTab: string;
    scenarioAffiliateTab: string;
    scenarioSupportTab: string;
    sendRealWhatsAppBtn: string;
    openAiAssistantBtn: string;
  };
  sellerPanel: {
    title: string;
    subtitle: string;
    syncBadge: string;
    selectSellerLabel: string;
    addSellerPlaceholder: string;
    addSellerBtn: string;
    directLinkInfoTitle: string;
    directLinkInfoBody: string;
    cloudSyncedFirestore: string;
    syncingStatus: string;
    localCacheStatus: string;
    personalStatsSub: string;
    loadExampleBtn: string;
    clearExampleBtn: string;
    exampleModeActiveTitle: string;
    exampleModeActiveText: string;
    totalSoldLabel: string;
    saleRegisteredSingular: string;
    saleRegisteredPlural: string;
    eachAbbr: string;
    rulesProgressTitle: string;
    cumulativeBadge: string;
    clarificationTitle: string;
    clarificationBody: string;
    clarificationExample: string;
    clarificationFormulas: string;
    rule1ShortTitle: string;
    rule2ShortTitle: string;
    rule3ShortTitle: string;
    soldFemLabel: string;
    soldMascLabel: string;
    rule1ShortDesc: string;
    rule2ShortDesc: string;
    rule3ShortDesc: string;
    currentCycleLabel: string;
    missingLabel: string;
    earnedLabel: string;
    account150Singular: string;
    account150Plural: string;
    claimShortBtn: string;
    noRewardYetLabel: string;
    realSimResultsTitle: string;
    realSalesBadge: string;
    realSimNoteTitle: string;
    realSimNoteDesc: string;
    realRule1Title: string;
    realRule2Title: string;
    realRule3Title: string;
    realCountSuffix: string;
    realRule1Sub: string;
    realRule2Sub: string;
    realRule3Sub: string;
    barLabel: string;
    realRewardLabel: string;
    freeFigmaSingular: string;
    freeFigmaPlural: string;
    freeBaseAccountSingular: string;
    freeBaseAccountPlural: string;
    consolidatedBreakdownLabel: string;
    sameBaseSalesNote: string;
    totalRealEarnedLabel: string;
    referralLinkTitle: string;
    referralLinkDesc: string;
    copyLinkBtn: string;
    copiedLinkBtn: string;
    shareWhatsAppBtn: string;
    base150Tag: string;
    exampleBadge: string;
    clientPrefix: string;
    sendSaleWhatsAppTitle: string;
    deleteSaleTitle: string;
    officialChannelWhatsAppLabel: string;
    tabOverview: string;
    tabRegisterSale: string;
    tabHistory: string;
    tabClaims: string;
    metricFigmaSold: string;
    metricBaseSold: string;
    metricTotalEarned: string;
    rule1CardTitle: string;
    rule2CardTitle: string;
    rule3CardTitle: string;
    availableToClaim: string;
    claimViaWhatsAppBtn: string;
    saleProductLabel: string;
    saleClientNameLabel: string;
    saleClientPhoneLabel: string;
    salePaymentVerifiedLabel: string;
    registerSaleBtn: string;
    closeBtn: string;
  };
  chatbot: {
    headerTitle: string;
    headerOnline: string;
    headerSubtitle: string;
    resetChatTitle: string;
    closeChatTitle: string;
    inactivityBannerTitle: string;
    inactivityBannerDesc: string;
    inactivityBookNowBtn: string;
    quickPromptCatalog: string;
    quickPromptConcept: string;
    quickPromptAffiliates: string;
    quickPromptSchedule: string;
    quickPromptBook: string;
    inputPlaceholder: string;
    sendBtnTitle: string;
    confirmAppointmentWhatsAppBtn: string;
    footerNote: string;
    welcomeMessage: string;
  };
  footer: {
    description: string;
    quickLinksTitle: string;
    officialRulesTitle: string;
    ruleConceptItem: string;
    ruleScheduleItem: string;
    ruleAffiliatesItem: string;
    contactTitle: string;
    whatsappDirectBtn: string;
    rightsReserved: string;
  };
  floating: {
    assistantTooltipOpen: string;
    assistantTooltipClose: string;
    assistantButtonLabel: string;
    whatsappTooltip: string;
    scrollTopTooltip: string;
  };
  pwa: {
    installBtn: string;
    modalTitle: string;
    modalSubtitle: string;
    closeBtn: string;
    deviceDesktop: string;
    deviceMobile: string;
    deviceTablet: string;
    browserWeb: string;
  };
  protectedLock: {
    badge: string;
    title: string;
    description: string;
    unlockBtn: string;
  };
  scheduleModal: {
    title: string;
    subtitle: string;
    closeBtn: string;
    saveBtn: string;
    resetDefaultBtn: string;
  };
  adminModal: {
    title: string;
    subtitle: string;
    closeBtn: string;
    escapeHint: string;
  };
  notifications: {
    addedToQuote: string;
    selectedForAppointment: string;
    scheduleUpdated: string;
    adminUnlocked: string;
    adminLocked: string;
  };
}

export const es: AppDictionary = {
  countries: {
    mx: 'México (MXN)',
    ve: 'Venezuela (USDT)',
    co: 'Colombia (USDT)',
    other: 'Otro País (USDT)',
  },
  days: {
    lunes: 'Lunes',
    martes: 'Martes',
    miercoles: 'Miércoles',
    jueves: 'Jueves',
    viernes: 'Viernes',
    sabado: 'Sábado',
    domingo: 'Domingo',
    monToSat: 'Lunes a Sábado',
    monToFri: 'Lunes a Viernes',
    allDays: 'Todos los días',
    noDays: 'Sin días activos',
    to: 'a',
  },
  header: {
    brandSubtitle: 'Oficial • Catálogo • Afiliados • Asistente IA',
    countryLabel: 'País:',
    languageLabel: 'Idioma:',
    roleLabel: 'Perfil:',
    roleClient: '👤 Comprador',
    roleVendor: '💼 Vendedor / Afiliado',
    roleAdmin: '🛡️ Administrar',
    navVideo: 'Video',
    navCatalog: 'Catálogo',
    navPayments: 'Pagos',
    navAffiliates: 'Afiliados',
    navAppointments: 'Atención',
    navSimulation: 'Ejemplo WhatsApp',
    sellerPanelBtn: 'Panel del vendedor',
    sellerPanelShort: 'Panel',
    shareWebBtn: 'Compartir Web',
    adminSessionActive: 'Sesión Admin activa (clic para gestionar o cerrar)',
    adminProtected: 'Acceso protegido de Administrador',
    assistantBtn: 'Asistente IA',
    assistantBtnTitle: 'Abrir o cerrar Asistente Inteligente IA',
    quoteBtn: 'Ver mi cotización / pedido',
    mobileRoleLabel: 'Vista:',
    mobileCountryLabel: 'País',
    mobileLanguageLabel: 'Idioma',
  },
  noticeBanner: {
    officialTimeLabel: 'Hora Oficial Hermosillo (GMT-7):',
    hermosilloNote: 'Sin horario de verano',
    scheduleBtn: 'Horario:',
    AvailableNow: 'Atención Activa',
    ClosedNow: 'Fuera de Horario',
    sundayClosedNote: 'Domingos cerrado',
    conceptWarningTitle: 'REGLA DE CONCEPTO DE PAGO:',
    conceptWarningBody: 'En el concepto escribe el NOMBRE Y APELLIDO DE QUIEN RECOMENDÓ; si nadie recomendó, escribe únicamente la palabra "pago".',
    activeViewLabel: 'Vista activa:',
    topWhatsAppAlertMessage: 'Favor de contactar por whatsapp antes de hacer la compra o transacción.',
    topWhatsAppAlertBtn: 'Contactar por WhatsApp',
    topWhatsAppAlertClose: 'Cerrar aviso',
  },
  hero: {
    badgeText: 'Plataforma Oficial Verificada • Entrega Inmediata y Garantía',
    titlePart1: 'Servicios Digitales',
    titleHighlight: 'Premium Oficial',
    subtitle: 'Accede a las 12 herramientas líderes de Inteligencia Artificial, Diseño, Educación y Productividad al mejor precio oficial en MXN o USDT.',
    ctaCatalog: 'Explorar Catálogo y Precios',
    ctaVideo: 'Ver Video Oficial',
    ctaSellerPanel: 'Panel del Vendedor',
    ctaAppointments: 'Espera: 3-5 min',
    ctaAffiliates: 'Simulador de Afiliados',
    ctaAssistant: 'Preguntar al Asistente Virtual',
    ctaSimulator: 'Ver Ejemplo de Mensajes',
    statProductsLabel: 'Catálogo Oficial',
    statProductsValue: 'Desde $150 MXN',
    statPaymentsLabel: 'Cuentas y Pagos',
    statPaymentsValue: 'Nu, Coppel, Binance',
    statAffiliateLabel: 'Programa Afiliados',
    statAffiliateValue: 'Gana Figmas Gratis',
    statAppointmentsLabel: 'Atención / Citas',
    statAppointmentsValue: 'Espera: 3-5 min',
    statSupportLabel: 'Atención Oficial',
    statSupportValue: '+52 662 180 5354',
    cardHeaderTitle: 'Precios Oficiales Verificados',
    cardHeaderBadge: 'MXN / USDT',
    cardFeaturedSub: 'Cuenta Educativa Pro por 12 meses',
    cardBaseAccountsTitle: '7 Cuentas Premium ($150 MXN)',
    cardBaseAccountsSub: 'Eleven Reader, Mause AI, Coursera, Google AI, CapCut, M365, Duolingo',
    cardPdfTitle: 'ilove pdf premium 12 meses',
    cardPdfSub: 'Herramientas PDF completas ilimitadas',
    cardRuleTitle: 'Concepto / Motivo de Pago Obligatorio',
    cardRuleBody: 'En el concepto escribe el NOMBRE Y APELLIDO DE QUIEN RECOMENDÓ; si nadie recomendó, únicamente la palabra "pago".',
  },
  video: {
    badge: 'Presentación Oficial Multimedia',
    title: 'Presentación y Demostración en Video',
    subtitle: 'Revisa los detalles de activación, reglas de pago seguro y cómo acumular recompensas reales con cada venta.',
    playBtn: 'Reproducir',
    pauseBtn: 'Pausar',
    muteBtn: 'Silenciar',
    unmuteBtn: 'Activar Audio',
    restartBtn: 'Reiniciar',
    fullscreenBtn: 'Pantalla Completa',
    pipBtn: 'Mini Reproductor',
    speedLabel: 'Velocidad',
    audioNotice: 'Nota: El audio del video oficial se mantiene en su idioma original en español; los controles e interfaz están traducidos.',
    ctaExplore: 'Ver los 12 Productos',
    ctaAskBot: 'Preguntar al Asistente Virtual',
    StatusPlaying: 'Reproduciendo',
    StatusPaused: 'En pausa',
  },
  catalog: {
    badge: 'Catálogo Oficial Verificado',
    title: 'Herramientas Digitales de Alto Rendimiento',
    subtitle: 'Precios fijos transparentes en Pesos Mexicanos (MXN) y su equivalente exacto en USDT para pagos internacionales.',
    searchPlaceholder: 'Buscar por nombre, categoría o característica (ej. Figma, IA, PDF)...',
    clearSearch: 'Limpiar',
    allCategories: 'Todos',
    onlyMxn: 'Sólo MXN',
    onlyUsdt: 'Sólo USDT',
    resultsCount: 'Mostrando {count} de 12 productos oficiales',
    popularBadge: 'Destacado',
    equivalentLabel: 'INVERSIÓN OFICIAL',
    featuresLabel: 'Incluye:',
    addToQuote: 'Agregar',
    bookAppointmentForProduct: 'Agendar Cita para este Producto',
    emptyTitle: 'No se encontraron productos con ese criterio',
    emptySubtitle: 'Prueba con otro término o restablece los filtros para ver los 12 productos oficiales.',
    resetFilters: 'Ver los 12 productos',
    categories: {
      Productividad: 'Productividad',
      Diseño: 'Diseño',
      Educación: 'Educación',
      IA: 'IA',
      Edición: 'Edición',
      Lectura: 'Lectura',
    },
  },
  cart: {
    title: 'Tu Cotización Oficial',
    itemSingular: 'producto seleccionado',
    itemPlural: 'productos seleccionados',
    emptyTitle: 'Tu cotización está vacía',
    emptySubtitle: 'Agrega cualquiera de los 12 productos del catálogo para calcular tu total en MXN y USDT.',
    viewCatalogBtn: 'Ir al Catálogo',
    removeTitle: 'Quitar producto',
    subtotalMxn: 'Total en México (MXN):',
    equivalentUsdt: 'Total Internacional (USDT):',
    conceptWarningLabel: 'Concepto / Motivo de Pago Obligatorio:',
    conceptWarningText: 'En el concepto de transferencia escribe el NOMBRE Y APELLIDO DE QUIEN RECOMENDÓ; si nadie recomendó, escribe únicamente la palabra "pago".',
    sendWhatsAppBtn: 'Enviar Pedido por WhatsApp Oficial',
    clearQuoteBtn: 'Vaciar Cotización',
    waOrderHeader: '🛒 *NUEVO PEDIDO / COTIZACIÓN OFICIAL*',
    waOrderIntro: 'Hola, deseo adquirir las siguientes suscripciones del catálogo oficial:',
    waOrderTotal: '💰 *Total a pagar:*',
    waOrderConceptNotice: '✅ *Confirmación de Concepto de Pago:* En el concepto colocaré el nombre y apellido de quien me recomendó o únicamente la palabra "pago".',
    waOrderOutro: 'Quedo atento(a) para proceder con el pago y activación.',
  },
  payments: {
    badge: 'Métodos de Pago y Seguridad',
    title: 'Datos Bancarios y Métodos Autorizados',
    subtitle: 'Selecciona tu país para ver las instrucciones exactas. Todos los pagos están sujetos a la regla obligatoria del concepto de pago.',
    countryTransferTitle: 'Cuentas Locales para México',
    bankLabel: 'Banco Receptor',
    beneficiaryLabel: 'Beneficiario Oficial',
    clabeLabel: 'CLABE / Tarjeta',
    copyClabe: 'Copiar',
    copiedClabe: '¡Copiado!',
    copySuccessMsg: 'Copiado al portapapeles',
    badgeRecommendedMx: 'Recomendado México (SPEI)',
    badgeOxxoTransfer: 'Depósitos OXXO / Transferencia',
    typeClabeCard: 'CLABE / Tarjeta',
    typeCard: 'Tarjeta',
    internationalTitle: 'Internacional / Binance & PayPal',
    internationalBadge: 'USDT / PayPal',
    internationalDesc: 'Pagos internacionales sin comisiones por Binance Pay (USDT) o mediante PayPal oficial.',
    badgeCryptoZeroFee: 'Cripto Sin Comisiones (USDT)',
    badgeIntlDigital: 'Internacional / Saldo Digital',
    typeEmail: 'Correo Electrónico',
    priceRefFigma: 'Figma Pro (.edu): 17.00 USDT ($300 MXN)',
    priceRefGeneral: '7 Cuentas Base: 8.74 USDT c/u ($150 MXN)',
    priceRefPdf: 'ilove pdf premium: 5.83 USDT ($100 MXN)',
    requestCryptoLinkBtn: 'Enviar Comprobante por WhatsApp',
    waCryptoMessage: 'Hola, deseo enviar mi comprobante de pago para la activación de mi servicio.',
    strictRuleBadge: 'Regla Oficial de Concepto',
    strictRuleTitle: 'Concepto / Motivo de Pago Obligatorio',
    strictRuleIntro: 'Al realizar tu transferencia o pago electrónico, en el campo de "Concepto" o "Motivo de pago" debes escribir el NOMBRE Y APELLIDO DE QUIEN RECOMENDÓ.',
    strictRuleForbidden: 'Si nadie recomendó, debes escribir únicamente la palabra "pago".',
    strictRulePenalty: 'Esto garantiza la validación inmediata de tu pago y acredita la venta al afiliado correspondiente.',
    strictRuleRefundNote: 'Verifica el concepto exacto antes de confirmar tu transferencia.',
    validExamplesTitle: 'Escribe el Nombre y Apellido de quien te recomendó (o selecciona "pago" si nadie recomendó):',
    validExamplesList: ['Carlos Mendoza', 'pago'],
    forbiddenExamplesTitle: 'Recuerda la regla oficial',
    forbiddenExamplesList: ['Nombre y Apellido del recomendador', 'O únicamente la palabra "pago"'],
    mercadoPagoPayLabel: 'Pagar',
  },
  affiliates: {
    badge: 'Programa Oficial de Vendedores y Afiliados',
    title: 'Gana Cuentas Gratis con Nuestras 3 Reglas Acumulativas',
    subtitle: 'Las 3 reglas se suman entre sí al mismo tiempo. Cada venta de $150 MXN cuenta simultáneamente para la Regla 2 y la Regla 3.',
    cumulativeBannerTitle: 'Sistema 100% Acumulativo y Simultáneo',
    cumulativeBannerDesc: 'Tus ventas no se consumen en una sola regla: al vender cuentas de $150 MXN avanzas al mismo tiempo hacia cuentas Figma Pro gratis (Regla 2) y hacia cuentas de $150 MXN gratis (Regla 3).',
    openSellerPanelBtn: 'Panel del Vendedor',
    goalLabel: 'Meta',
    rule1Tag: 'Regla 1',
    rule1Title: 'Vende 3 Figmas Pro',
    rule1Desc: 'En el caso de vender tres (3) licencias de Figma Pro (.edu), se obtiene de inmediato un producto de Figma Pro completamente gratis (valorado en $300 MXN / 17.00 USDT).',
    rule1Reward: '3 Ventas Figma = 1 Figma Pro Gratis',
    rule2Tag: 'Regla 2',
    rule2Title: 'Vende 6 Servicios de $150 MXN',
    rule2Desc: 'En el caso de vender seis (6) productos equivalentes a $150 MXN u 8.74 USDT (Coursera Plus, Gemini AI, CapCut Teams o Microsoft 365), ¡obtienes un Figma Pro gratis!',
    rule2Reward: '6 Ventas Base = 1 Figma Pro Gratis',
    rule3Tag: 'Regla 3',
    rule3Title: 'Vende 4 Servicios de $150 MXN',
    rule3Desc: 'En el caso de vender cuatro (4) servicios base de $150 MXN / 8.74 USDT (Coursera Plus, Gemini AI, CapCut Teams o Microsoft 365), ¡obtienes una cuenta gratis de $150 (a elegir: Gemini, Coursera o cualquier cuenta de $150 / 8.74 USDT)!',
    rule3Reward: '4 Ventas Base = 1 Cuenta de $150 Gratis',
    simBadge: 'PROYECCIÓN',
    simTitle: 'Simulador Interactivo de Recompensas',
    simSubtitle: 'Ajusta tus ventas proyectadas y comprueba cómo las 3 reglas se acumulan automáticamente.',
    simResetBtn: 'Restaurar Ejemplo Oficial (3 Figma + 12 Base)',
    simFigmaInputLabel: 'Ventas de Figma Pro ($300 MXN / 17.00 USDT)',
    simFigmaInputSub: 'Aplica directamente a la Regla 1 (cada 3 ventas = 1 Figma gratis)',
    simBaseInputLabel: 'Ventas de Productos Base ($150 MXN / 8.74 USDT)',
    simBaseInputSub: 'Aplica SIMULTÁNEAMENTE a Regla 2 (cada 6) y Regla 3 (cada 4)',
    simRewardsTitle: 'DESGLOSE COMPLETO POR REGLA (PROYECCIÓN)',
    simRule1ResultLabel: 'Regla 1 (Cada 3 Figma):',
    simRule2ResultLabel: 'Regla 2 (Cada 6 Base):',
    simRule3ResultLabel: 'Regla 3 (Cada 4 Base):',
    simFreeFigmaUnit: 'Figma Pro Gratis',
    simFreeBaseUnit: 'Cuentas $150 Gratis',
    simCycleProgress: 'Ciclo actual:',
    simTotalValueLabel: 'Valor Total en Premios Gratis:',
    simTotalAccountsFree: 'Total de cuentas gratis obtenidas:',
    simNoteCumulative: 'Cálculo verificado: las reglas 1, 2 y 3 son acumulativas y nunca se restan entre sí.',
  },
  appointments: {
    badge: 'Atención Prioritaria y Agendamiento',
    title: 'Reserva tu Turno de Atención',
    subtitle: 'Selecciona el servicio o producto, elige un día hábil (Lunes a Sábado) y confirma tu turno directamente por WhatsApp',
    adminManageScheduleBtn: 'Configurar Horarios (Admin)',
    timezoneCardTitle: 'Zona Horaria Oficial: Hermosillo, Sonora (GMT-7)',
    timezoneCardSub: 'Atención de Lunes a Sábado • Domingos bloqueados por descanso oficial.',
    activeScheduleLabel: 'Horario de atención vigente:',
    sundayBlockedBadge: 'Domingos Cerrado (Se asigna automáticamente el siguiente día hábil)',
    formTitle: 'Completa los Datos de tu Cita',
    clientNameLabel: 'Tu Nombre Completo *',
    clientNamePlaceholder: 'Ej. Alejandro Ramírez',
    clientPhoneLabel: 'Tu WhatsApp / Teléfono *',
    clientPhonePlaceholder: 'Ej. +52 662 000 0000',
    reasonLabel: 'Motivo de la Cita o Producto de Interés *',
    reasonDigitalActivation: 'Activación de Cuenta Digital',
    reasonAffiliateRegistration: 'Registro en Programa de Afiliados',
    reasonWholesaleSupport: 'Atención Comercial & Mayorista',
    reasonBuyPrefix: '',
    reasonGeneralInfo: 'Activación de Cuenta Digital',
    reasonAffiliateJoin: 'Registro en Programa de Afiliados',
    reasonWarrantySupport: 'Atención Comercial & Mayorista',
    dateLabel: 'Fecha de la Cita (Lunes a Sábado) *',
    nextBusinessDayHint: 'Seleccionar siguiente día hábil disponible',
    sundayErrorAlert: 'Los domingos no hay servicio de citas. Hemos ajustado la fecha al siguiente día hábil disponible.',
    dayDisabledError: 'El día seleccionado no está habilitado en el calendario actual. Selecciona un día hábil activo.',
    timeSlotLabel: 'Selecciona la Hora (Hora Hermosillo) *',
    notesLabel: 'Notas o Comentarios Adicionales (Opcional)',
    notesPlaceholder: 'Ej. Me interesa pagar por transferencia SPEI o resolver dudas sobre afiliados...',
    submitWhatsAppBtn: 'Confirmar y Enviar Cita por WhatsApp',
    directWhatsAppLabel: 'WhatsApp Directo:',
    previewTitle: 'Vista Previa del Ticket de Cita (UTF-8 Verificado)',
    previewSubtitle: 'Este mensaje estructurado se enviará al WhatsApp oficial +52 662 180 5354:',
    copyMessageBtn: 'Copiar Mensaje de Cita',
    copiedMessageBtn: '¡Mensaje Copiado!',
    waTicketTitle: '*SOLICITUD DE CITA OFICIAL*',
    waFieldClient: '*Cliente:*',
    waFieldPhone: '*Teléfono:*',
    waFieldReason: '*Motivo / Producto:*',
    waFieldDate: '*Fecha:*',
    waFieldTime: '*Hora (Hermosillo GMT-7):*',
    waFieldCountry: '*País / Moneda:*',
    waFieldNotes: '*Notas:*',
    waFieldNoNotes: 'Sin notas adicionales',
    waFooterConfirm: 'Por favor confirma mi cita en este horario. ¡Gracias!',
  },
  simulator: {
    badge: 'Centro de Comunicación Directa',
    title: 'Simulador de Mensajes Oficiales de WhatsApp',
    subtitle: 'Previsualiza cómo se estructuran los tickets de compra, citas y reclamos de afiliados hacia el número oficial',
    lockBadge: 'Guías Previas & Simulador Oficial',
    lockTitle: 'Simulador en Vivo y Guía de Auto-Respuesta WhatsApp',
    lockSubtitle: 'Ingresa **** para desbloquear simultáneamente esta guía previa, el simulador interactivo de WhatsApp, la plantilla de ausencia (3 a 5 min) y el panel de horarios.',
    scenarioOrderTab: 'Pedido de Catálogo',
    scenarioAppointmentTab: 'Cita Agendada',
    scenarioAffiliateTab: 'Reclamo de Afiliado',
    scenarioSupportTab: 'Consulta / Enlace USDT',
    sendRealWhatsAppBtn: 'Abrir en WhatsApp Oficial (+52 662 180 5354)',
    openAiAssistantBtn: 'Practicar con el Asistente IA Multilingüe',
  },
  sellerPanel: {
    title: 'Panel del Vendedor y Control de Afiliados',
    subtitle: 'Sincronizado en tiempo real con Firestore • Las 3 reglas acumulativas se calculan automáticamente.',
    syncBadge: 'Sincronizado en Nube',
    selectSellerLabel: 'Vendedor Activo:',
    addSellerPlaceholder: 'Nombre del nuevo vendedor...',
    addSellerBtn: 'Crear Vendedor',
    directLinkInfoTitle: 'Acceso directo con enlace:',
    directLinkInfoBody: 'También puedes compartir o guardar tu enlace con el parámetro ?vendedor=TUCÓDIGO o ?codigo=TUCÓDIGO para abrir tu panel automáticamente sin escribirlo.',
    cloudSyncedFirestore: 'Sincronizado en la nube (Firestore)',
    syncingStatus: 'Sincronizando...',
    localCacheStatus: 'Caché local activa',
    personalStatsSub: 'Viendo exclusivamente tus estadísticas personales en cualquier dispositivo',
    loadExampleBtn: 'Probar con ejemplo: 3 Figma y 12 base',
    clearExampleBtn: 'Borrar ejemplo / empezar de cero',
    exampleModeActiveTitle: 'MODO DATOS DE EJEMPLO ACTIVO:',
    exampleModeActiveText: 'Se cargaron 3 Figma y 12 servicios base para demostración de premios. Usa el botón "Borrar ejemplo / empezar de cero" para reiniciar tu historial real.',
    totalSoldLabel: 'Total Vendido',
    saleRegisteredSingular: 'venta registrada',
    saleRegisteredPlural: 'ventas registradas',
    eachAbbr: 'c/u',
    rulesProgressTitle: 'Reglas de Recompensas & Progreso',
    cumulativeBadge: 'Acumulativo',
    clarificationTitle: 'ACLARACIÓN OBLIGATORIA SOBRE SERVICIOS BASE ($150 MXN):',
    clarificationBody: 'Las reglas 2 y 3 cuentan SOBRE LAS MISMAS ventas base, no son excluyentes.',
    clarificationExample: 'Ejemplo exacto: Con 12 ventas base se ganan 3 cuentas de $150 y 2 Figma gratis.',
    clarificationFormulas: 'Fórmulas: Figma regla 1 = floor(figma/3) | Figma regla 2 = floor(base/6) | Cuentas $150 regla 3 = floor(base/4).',
    rule1ShortTitle: 'Regla 1: Especialidad Figma',
    rule2ShortTitle: 'Regla 2: Base → Figma',
    rule3ShortTitle: 'Regla 3: Base → Cuenta $150',
    soldFemLabel: 'vendidas',
    soldMascLabel: 'vendidos',
    rule1ShortDesc: 'Cada 3 Figma Pro = 1 Figma Pro gratis ($300 MXN / 17.00 USDT)',
    rule2ShortDesc: 'Cada 6 servicios base ($150) = 1 Figma Pro gratis ($300 MXN / 17.00 USDT)',
    rule3ShortDesc: 'Cada 4 servicios base ($150) = 1 cuenta gratis de $150 (Gemini, Coursera, etc.)',
    currentCycleLabel: 'Ciclo actual:',
    missingLabel: 'Falta:',
    earnedLabel: 'Ganados:',
    account150Singular: 'cuenta $150',
    account150Plural: 'cuentas $150',
    claimShortBtn: 'Reclamar',
    noRewardYetLabel: 'Aún sin premio',
    realSimResultsTitle: 'Resultados reales del simulador',
    realSalesBadge: 'VENTAS REALES REGISTRADAS — no es una proyección',
    realSimNoteTitle: 'La proyección con deslizantes está en la sección de Afiliados; aquí solo se calculan tus ventas reales registradas.',
    realSimNoteDesc: 'Cálculos aplicados a tus {figma} ventas de Figma y {base} ventas de servicios base guardadas para el código',
    realRule1Title: 'Regla 1 (Figma Pro)',
    realRule2Title: 'Regla 2 (Base → Figma)',
    realRule3Title: 'Regla 3 (Base → Cuenta $150)',
    realCountSuffix: 'reales',
    realRule1Sub: 'Cada 3 Figma = 1 gratis',
    realRule2Sub: 'Cada 6 base = 1 Figma gratis',
    realRule3Sub: 'Cada 4 base = 1 cuenta $150 gratis',
    barLabel: 'Barra',
    realRewardLabel: 'Premio real:',
    freeFigmaSingular: 'Figma gratis',
    freeFigmaPlural: 'Figmas gratis',
    freeBaseAccountSingular: 'cuenta de $150 gratis',
    freeBaseAccountPlural: 'cuentas de $150 gratis',
    consolidatedBreakdownLabel: 'Desglose consolidado de tus ventas reales:',
    sameBaseSalesNote: '* Las reglas 2 y 3 se otorgan sobre las MISMAS {base} ventas base registradas.',
    totalRealEarnedLabel: 'Total Real Ganado:',
    referralLinkTitle: 'Tu Enlace de Referido Oficial',
    referralLinkDesc: 'Comparte este enlace personal con tus compradores. Al abrirlo, se les identificará que vienen de tu parte:',
    copyLinkBtn: 'Copiar enlace',
    copiedLinkBtn: '¡Copiado!',
    shareWhatsAppBtn: 'Compartir por WhatsApp',
    base150Tag: 'Base $150',
    exampleBadge: 'Ejemplo',
    clientPrefix: 'Cliente',
    sendSaleWhatsAppTitle: 'Enviar esta venta por WhatsApp',
    deleteSaleTitle: 'Eliminar registro',
    officialChannelWhatsAppLabel: 'WhatsApp oficial de canalización:',
    tabOverview: 'Resumen y Reglas',
    tabRegisterSale: 'Registrar Venta',
    tabHistory: 'Historial de Ventas',
    tabClaims: 'Premios Reclamados',
    metricFigmaSold: 'Figma Pro Vendidos',
    metricBaseSold: 'Cuentas $150 Vendidas',
    metricTotalEarned: 'Valor en Premios Gratis',
    rule1CardTitle: 'Regla 1 (Cada 3 Figma → 1 Figma Gratis)',
    rule2CardTitle: 'Regla 2 (Cada 6 de $150 → 1 Figma Gratis)',
    rule3CardTitle: 'Regla 3 (Cada 4 de $150 → 1 Cuenta $150 Gratis)',
    availableToClaim: 'Disponibles para reclamar:',
    claimViaWhatsAppBtn: 'Reclamar por WhatsApp',
    saleProductLabel: 'Producto Vendido',
    saleClientNameLabel: 'Nombre del Cliente',
    saleClientPhoneLabel: 'WhatsApp del Cliente',
    salePaymentVerifiedLabel: 'Confirmo que en el concepto de pago se escribió el nombre y apellido de quien recomendó (o "pago")',
    registerSaleBtn: 'Registrar Venta Oficial',
    closeBtn: 'Cerrar Panel',
  },
  chatbot: {
    headerTitle: 'Asistente Inteligente IA',
    headerOnline: 'Multilingüe Activo',
    headerSubtitle: 'Responde automáticamente en tu idioma • Catálogo, Pagos, Citas y Afiliados',
    resetChatTitle: 'Reiniciar conversación',
    closeChatTitle: 'Cerrar asistente',
    inactivityBannerTitle: '¿Deseas agendar una cita rápida?',
    inactivityBannerDesc: 'Si pasan de 3 a 5 minutos sin respuesta en WhatsApp, puedes agendar tu atención prioritaria en 1 clic',
    inactivityBookNowBtn: 'Generar Cita por Espera de 3-5 min',
    quickPromptCatalog: '📋 Ver catálogo y precios',
    quickPromptConcept: '🏦 Regla del concepto de pago',
    quickPromptAffiliates: '🤝 Explicar las 3 reglas de afiliados',
    quickPromptSchedule: '🕒 Horarios de atención',
    quickPromptBook: '📅 Quiero agendar una cita',
    inputPlaceholder: 'Escribe tu pregunta en cualquier idioma...',
    sendBtnTitle: 'Enviar mensaje',
    confirmAppointmentWhatsAppBtn: 'Confirmar Cita en WhatsApp (+52 662 180 5354)',
    footerNote: 'Detección automática de idioma • WhatsApp Oficial +52 662 180 5354',
    welcomeMessage: '¡Hola! 👋 Soy el **Asistente Inteligente Oficial** de Servicios Digitales Premium.\n\nDetecto automáticamente el idioma en el que me escribas y puedo ayudarte con:\n• 📋 **Catálogo oficial de 12 productos** (precios en MXN y USDT)\n• 🏦 **Métodos de pago** y la regla del concepto (nombre y apellido de quien recomendó, o únicamente la palabra "pago")\n• 🤝 **Las 3 reglas acumulativas de afiliados**\n• 📅 **Agendar una cita** en horario de Hermosillo (Lunes a Sábado)\n\n¿En qué te puedo ayudar hoy?',
  },
  footer: {
    description: 'Plataforma oficial de servicios digitales verificados, sistema de citas en horario de Hermosillo y programa de afiliados con 3 reglas acumulativas.',
    quickLinksTitle: 'Navegación Rápida',
    officialRulesTitle: 'Reglas Oficiales Verificadas',
    ruleConceptItem: 'Concepto de pago: Nombre y apellido de quien recomendó; si nadie recomendó, únicamente la palabra "pago".',
    ruleScheduleItem: 'Citas de Lunes a Sábado en hora de Hermosillo (GMT-7).',
    ruleAffiliatesItem: '3 reglas de afiliados 100% acumulativas y simultáneas.',
    contactTitle: 'Contacto Oficial',
    whatsappDirectBtn: 'WhatsApp Oficial +52 662 180 5354',
    rightsReserved: 'Todos los derechos reservados • Servicios Digitales Premium.',
  },
  floating: {
    assistantTooltipOpen: 'Abrir Asistente IA Multilingüe',
    assistantTooltipClose: 'Cerrar Asistente IA',
    assistantButtonLabel: 'Asistente IA',
    whatsappTooltip: 'Contactar por WhatsApp Oficial (+52 662 180 5354)',
    scrollTopTooltip: 'Volver arriba',
  },
  pwa: {
    installBtn: 'Instalar App',
    modalTitle: 'Instalar Aplicación Oficial',
    modalSubtitle: 'Accede más rápido al catálogo, simulador de afiliados y asistente IA desde tu pantalla de inicio.',
    closeBtn: 'Cerrar',
    deviceDesktop: 'Escritorio',
    deviceMobile: 'Móvil',
    deviceTablet: 'Tablet',
    browserWeb: 'Navegador Web',
  },
  protectedLock: {
    badge: 'Sección Protegida',
    title: 'Acceso Exclusivo para Rol Autorizado',
    description: 'Para visualizar e interactuar con este módulo, inicia sesión como Administrador o cambia al perfil correspondiente.',
    unlockBtn: 'Autenticar Acceso',
  },
  scheduleModal: {
    title: 'Gestor Oficial de Horarios de Citas',
    subtitle: 'Configura las horas de inicio, fin y días hábiles en zona horaria de Hermosillo (GMT-7).',
    closeBtn: 'Cerrar',
    saveBtn: 'Guardar Horario',
    resetDefaultBtn: 'Restaurar Horario Oficial',
  },
  adminModal: {
    title: 'Panel de Control y Seguridad de Administrador',
    subtitle: 'Gestiona la sesión administrativa y el bloqueo de módulos protegidos.',
    closeBtn: 'Cerrar ventana',
    escapeHint: 'Presiona ESC o haz clic fuera para cerrar',
  },
  notifications: {
    addedToQuote: 'Agregado a tu cotización:',
    selectedForAppointment: 'Producto seleccionado para cita:',
    scheduleUpdated: 'Horario de atención actualizado correctamente',
    adminUnlocked: 'Sesión de Administrador iniciada correctamente',
    adminLocked: 'Sesión de Administrador cerrada',
  },
};

const en: AppDictionary = {
  countries: {
    mx: 'Mexico (MXN)',
    ve: 'Venezuela (USDT)',
    co: 'Colombia (USDT)',
    other: 'Other Country (USDT)',
  },
  days: {
    lunes: 'Monday',
    martes: 'Tuesday',
    miercoles: 'Wednesday',
    jueves: 'Thursday',
    viernes: 'Friday',
    sabado: 'Saturday',
    domingo: 'Sunday',
    monToSat: 'Monday to Saturday',
    monToFri: 'Monday to Friday',
    allDays: 'Every day',
    noDays: 'No active days',
    to: 'to',
  },
  header: {
    brandSubtitle: 'Official • Catalog • Affiliates • AI Assistant',
    countryLabel: 'Country:',
    languageLabel: 'Language:',
    roleLabel: 'Profile:',
    roleClient: '👤 Buyer',
    roleVendor: '💼 Seller / Affiliate',
    roleAdmin: '🛡️ Manage',
    navVideo: 'Video',
    navCatalog: 'Catalog',
    navPayments: 'Payments',
    navAffiliates: 'Affiliates',
    navAppointments: 'Support',
    navSimulation: 'WhatsApp Example',
    sellerPanelBtn: 'Seller Panel',
    sellerPanelShort: 'Panel',
    shareWebBtn: 'Share Web',
    adminSessionActive: 'Admin Session active (click to manage or logout)',
    adminProtected: 'Protected Administrator Access',
    assistantBtn: 'AI Assistant',
    assistantBtnTitle: 'Open or close Intelligent AI Assistant',
    quoteBtn: 'View my quote / order',
    mobileRoleLabel: 'View:',
    mobileCountryLabel: 'Country',
    mobileLanguageLabel: 'Language',
  },
  noticeBanner: {
    officialTimeLabel: 'Official Hermosillo Time (GMT-7):',
    hermosilloNote: 'No daylight saving time',
    scheduleBtn: 'Hours:',
    AvailableNow: 'Active Support',
    ClosedNow: 'Currently Closed',
    sundayClosedNote: 'Closed on Sundays',
    conceptWarningTitle: 'PAYMENT REFERENCE RULE:',
    conceptWarningBody: 'In the payment reference write the FIRST AND LAST NAME OF THE PERSON WHO RECOMMENDED YOU; if nobody recommended you, write only the word "pago".',
    activeViewLabel: 'Active view:',
    topWhatsAppAlertMessage: 'Please contact us on WhatsApp before making a purchase or transaction.',
    topWhatsAppAlertBtn: 'Contact us on WhatsApp',
    topWhatsAppAlertClose: 'Close notice',
  },
  hero: {
    badgeText: 'Verified Official Platform • Instant Delivery & Warranty',
    titlePart1: 'Official Premium',
    titleHighlight: 'Digital Services',
    subtitle: 'Access the 12 leading Artificial Intelligence, Design, Education, and Productivity tools at the best official price in MXN or USDT.',
    ctaCatalog: 'Explore Catalog & Prices',
    ctaVideo: 'Watch Official Video',
    ctaSellerPanel: 'Seller Panel',
    ctaAppointments: 'Wait: 3-5 min',
    ctaAffiliates: 'Affiliate Simulator',
    ctaAssistant: 'Ask the Virtual Assistant',
    ctaSimulator: 'View Message Examples',
    statProductsLabel: 'Official Catalog',
    statProductsValue: 'From $150 MXN',
    statPaymentsLabel: 'Accounts & Payments',
    statPaymentsValue: 'Nu, Coppel, Binance',
    statAffiliateLabel: 'Affiliate Program',
    statAffiliateValue: 'Earn Free Figmas',
    statAppointmentsLabel: 'Support / Appointments',
    statAppointmentsValue: 'Wait: 3-5 min',
    statSupportLabel: 'Official Support',
    statSupportValue: '+52 662 180 5354',
    cardHeaderTitle: 'Verified Official Prices',
    cardHeaderBadge: 'MXN / USDT',
    cardFeaturedSub: '12-Month Pro Educational Account',
    cardBaseAccountsTitle: '7 Premium Accounts ($150 MXN)',
    cardBaseAccountsSub: 'Eleven Reader, Mause AI, Coursera, Google AI, CapCut, M365, Duolingo',
    cardPdfTitle: 'ilove pdf premium 12 months',
    cardPdfSub: 'Unlimited complete PDF tools',
    cardRuleTitle: 'Mandatory Payment Reference / Concept',
    cardRuleBody: 'In the reference write the FIRST AND LAST NAME OF WHO RECOMMENDED YOU; if nobody recommended you, write only the word "pago".',
  },
  video: {
    badge: 'Official Multimedia Presentation',
    title: 'Video Presentation & Demonstration',
    subtitle: 'Review activation details, secure payment rules, and how to accumulate real rewards with every sale.',
    playBtn: 'Play',
    pauseBtn: 'Pause',
    muteBtn: 'Mute',
    unmuteBtn: 'Unmute',
    restartBtn: 'Restart',
    fullscreenBtn: 'Fullscreen',
    pipBtn: 'Mini Player',
    speedLabel: 'Speed',
    audioNotice: 'Note: The official video audio remains in its original Spanish language; all controls and interface texts are translated.',
    ctaExplore: 'View All 12 Products',
    ctaAskBot: 'Ask the Virtual Assistant',
    StatusPlaying: 'Playing',
    StatusPaused: 'Paused',
  },
  catalog: {
    badge: 'Verified Official Catalog',
    title: 'High-Performance Digital Tools',
    subtitle: 'Transparent fixed prices in Mexican Pesos (MXN) and their exact equivalent in USDT for international payments.',
    searchPlaceholder: 'Search by name, category, or feature (e.g., Figma, AI, PDF)...',
    clearSearch: 'Clear',
    allCategories: 'All',
    onlyMxn: 'MXN Only',
    onlyUsdt: 'USDT Only',
    resultsCount: 'Showing {count} of 12 official products',
    popularBadge: 'Featured',
    equivalentLabel: 'OFFICIAL INVESTMENT',
    featuresLabel: 'Includes:',
    addToQuote: 'Add',
    bookAppointmentForProduct: 'Book Appointment for this Product',
    emptyTitle: 'No products found matching your search',
    emptySubtitle: 'Try another keyword or reset the filters to view all 12 official products.',
    resetFilters: 'Show all 12 products',
    categories: {
      Productividad: 'Productivity',
      Diseño: 'Design',
      Educación: 'Education',
      IA: 'AI',
      Edición: 'Editing',
      Lectura: 'Reading',
    },
  },
  cart: {
    title: 'Your Official Quote',
    itemSingular: 'selected product',
    itemPlural: 'selected products',
    emptyTitle: 'Your quote is empty',
    emptySubtitle: 'Add any of the 12 catalog products to calculate your total in MXN and USDT.',
    viewCatalogBtn: 'Go to Catalog',
    removeTitle: 'Remove product',
    subtotalMxn: 'Total in Mexico (MXN):',
    equivalentUsdt: 'International Total (USDT):',
    conceptWarningLabel: 'Mandatory Payment Reference / Concept:',
    conceptWarningText: 'In the transfer reference write the FIRST AND LAST NAME OF THE PERSON WHO RECOMMENDED YOU; if nobody recommended you, write only the word "pago".',
    sendWhatsAppBtn: 'Send Order via Official WhatsApp',
    clearQuoteBtn: 'Clear Quote',
    waOrderHeader: '🛒 *NEW OFFICIAL ORDER / QUOTE*',
    waOrderIntro: 'Hello, I would like to purchase the following subscriptions from the official catalog:',
    waOrderTotal: '💰 *Total to pay:*',
    waOrderConceptNotice: '✅ *Payment Reference Confirmation:* In the payment reference I will write the first and last name of the person who recommended me, or only the word "pago".',
    waOrderOutro: 'I look forward to proceeding with the payment and activation.',
  },
  payments: {
    badge: 'Payment Methods & Security',
    title: 'Bank Details & Authorized Payment Methods',
    subtitle: 'Select your country to see the exact instructions. All payments follow the mandatory payment reference rule.',
    countryTransferTitle: 'Local Accounts for Mexico',
    bankLabel: 'Receiving Bank',
    beneficiaryLabel: 'Official Beneficiary',
    clabeLabel: 'CLABE / Card',
    copyClabe: 'Copy',
    copiedClabe: 'Copied!',
    copySuccessMsg: 'Copied to clipboard',
    badgeRecommendedMx: 'Recommended Mexico (SPEI)',
    badgeOxxoTransfer: 'OXXO Deposits / Transfer',
    typeClabeCard: 'CLABE / Card',
    typeCard: 'Card',
    internationalTitle: 'International / Binance & PayPal',
    internationalBadge: 'USDT / PayPal',
    internationalDesc: 'Zero-fee international payments via Binance Pay (USDT) or official PayPal.',
    badgeCryptoZeroFee: 'Zero-Fee Crypto (USDT)',
    badgeIntlDigital: 'International / Digital Balance',
    typeEmail: 'Email Address',
    priceRefFigma: 'Figma Pro (.edu): 17.00 USDT ($300 MXN)',
    priceRefGeneral: '7 Base Accounts: 8.74 USDT each ($150 MXN)',
    priceRefPdf: 'ilove pdf premium: 5.83 USDT ($100 MXN)',
    requestCryptoLinkBtn: 'Send Payment Proof via WhatsApp',
    waCryptoMessage: 'Hello, I would like to send my payment proof to activate my service.',
    strictRuleBadge: 'Official Reference Rule',
    strictRuleTitle: 'Mandatory Payment Concept / Reference',
    strictRuleIntro: 'When making your bank transfer or electronic payment, in the "Concept" or "Payment Reference" field you must write the FIRST AND LAST NAME OF THE PERSON WHO RECOMMENDED YOU.',
    strictRuleForbidden: 'If nobody recommended you, you must write only the word "pago".',
    strictRulePenalty: 'This ensures immediate payment validation and credits the sale to the corresponding affiliate.',
    strictRuleRefundNote: 'Verify the exact reference before confirming your transfer.',
    validExamplesTitle: 'Enter the First and Last Name of who recommended you (or select "pago" if nobody recommended you):',
    validExamplesList: ['Carlos Mendoza', 'pago'],
    forbiddenExamplesTitle: 'Official Reference Rule',
    forbiddenExamplesList: ['Recommender First & Last Name', 'Or only the word "pago"'],
    mercadoPagoPayLabel: 'Pay',
  },
  affiliates: {
    badge: 'Official Sellers & Affiliates Program',
    title: 'Earn Free Accounts with Our 3 Cumulative Rules',
    subtitle: 'All 3 rules add up simultaneously. Every $150 MXN sale counts at the same time toward Rule 2 and Rule 3.',
    cumulativeBannerTitle: '100% Cumulative & Simultaneous System',
    cumulativeBannerDesc: 'Your sales are not consumed by a single rule: when selling $150 MXN accounts you advance simultaneously toward free Figma Pro accounts (Rule 2) and free $150 MXN accounts (Rule 3).',
    openSellerPanelBtn: 'Seller Panel',
    goalLabel: 'Goal',
    rule1Tag: 'Rule 1',
    rule1Title: 'Sell 3 Figma Pro',
    rule1Desc: 'When selling three (3) Figma Pro (.edu) licenses, you immediately get one Figma Pro product completely free (valued at $300 MXN / 17.00 USDT).',
    rule1Reward: '3 Figma Sales = 1 Free Figma Pro',
    rule2Tag: 'Rule 2',
    rule2Title: 'Sell 6 Services of $150 MXN',
    rule2Desc: 'When selling six (6) products equivalent to $150 MXN or 8.74 USDT (Coursera Plus, Gemini AI, CapCut Teams, or Microsoft 365), you get one free Figma Pro!',
    rule2Reward: '6 Base Sales = 1 Free Figma Pro',
    rule3Tag: 'Rule 3',
    rule3Title: 'Sell 4 Services of $150 MXN',
    rule3Desc: 'When selling four (4) base services of $150 MXN / 8.74 USDT (Coursera Plus, Gemini AI, CapCut Teams, or Microsoft 365), you get one free $150 account (choose from Gemini, Coursera, or any $150 / 8.74 USDT account)!',
    rule3Reward: '4 Base Sales = 1 Free $150 Account',
    simBadge: 'PROJECTION',
    simTitle: 'Interactive Rewards Simulator',
    simSubtitle: 'Adjust your projected sales and verify how the 3 rules accumulate automatically.',
    simResetBtn: 'Restore Official Example (3 Figma + 12 Base)',
    simFigmaInputLabel: 'Figma Pro Sales ($300 MXN / 17.00 USDT)',
    simFigmaInputSub: 'Applies directly to Rule 1 (every 3 sales = 1 free Figma)',
    simBaseInputLabel: 'Base Product Sales ($150 MXN / 8.74 USDT)',
    simBaseInputSub: 'Applies SIMULTANEOUSLY to Rule 2 (every 6) and Rule 3 (every 4)',
    simRewardsTitle: 'COMPLETE BREAKDOWN BY RULE (PROJECTION)',
    simRule1ResultLabel: 'Rule 1 (Every 3 Figma):',
    simRule2ResultLabel: 'Rule 2 (Every 6 Base):',
    simRule3ResultLabel: 'Rule 3 (Every 4 Base):',
    simFreeFigmaUnit: 'Free Figma Pro',
    simFreeBaseUnit: 'Free $150 Accounts',
    simCycleProgress: 'Current cycle:',
    simTotalValueLabel: 'Total Value in Free Rewards:',
    simTotalAccountsFree: 'Total free accounts earned:',
    simNoteCumulative: 'Verified calculation: rules 1, 2, and 3 are cumulative and never subtract from each other.',
  },
  appointments: {
    badge: 'Priority Support & Scheduling',
    title: 'Reserve Your Support Slot',
    subtitle: 'Select the service or product, choose a business day (Monday to Saturday), and confirm your slot directly via WhatsApp',
    adminManageScheduleBtn: 'Configure Hours (Admin)',
    timezoneCardTitle: 'Official Time Zone: Hermosillo, Sonora (GMT-7)',
    timezoneCardSub: 'Service from Monday to Saturday • Sundays blocked for official rest.',
    activeScheduleLabel: 'Current business hours:',
    sundayBlockedBadge: 'Closed on Sundays (Automatically set to next business day)',
    formTitle: 'Complete Your Appointment Details',
    clientNameLabel: 'Your Full Name *',
    clientNamePlaceholder: 'E.g. Alejandro Ramírez',
    clientPhoneLabel: 'Your WhatsApp / Phone *',
    clientPhonePlaceholder: 'E.g. +52 662 000 0000',
    reasonLabel: 'Appointment Reason or Product of Interest *',
    reasonDigitalActivation: 'Digital Account Activation',
    reasonAffiliateRegistration: 'Affiliate Program Registration',
    reasonWholesaleSupport: 'Commercial & Wholesale Support',
    reasonBuyPrefix: '',
    reasonGeneralInfo: 'Digital Account Activation',
    reasonAffiliateJoin: 'Affiliate Program Registration',
    reasonWarrantySupport: 'Commercial & Wholesale Support',
    dateLabel: 'Appointment Date (Monday to Saturday) *',
    nextBusinessDayHint: 'Select next available business day',
    sundayErrorAlert: 'Appointments are not available on Sundays. We have adjusted the date to the next available business day.',
    dayDisabledError: 'The selected day is not enabled in the current schedule. Please choose an active business day.',
    timeSlotLabel: 'Select Time (Hermosillo Time) *',
    notesLabel: 'Additional Notes or Comments (Optional)',
    notesPlaceholder: 'E.g. I want to pay via SPEI transfer or ask about affiliate rewards...',
    submitWhatsAppBtn: 'Confirm & Send Appointment via WhatsApp',
    directWhatsAppLabel: 'Direct WhatsApp:',
    previewTitle: 'Appointment Ticket Preview (Verified UTF-8)',
    previewSubtitle: 'This structured message will be sent to the official WhatsApp +52 662 180 5354:',
    copyMessageBtn: 'Copy Appointment Message',
    copiedMessageBtn: 'Message Copied!',
    waTicketTitle: '*OFFICIAL APPOINTMENT REQUEST*',
    waFieldClient: '*Client:*',
    waFieldPhone: '*Phone:*',
    waFieldReason: '*Reason / Product:*',
    waFieldDate: '*Date:*',
    waFieldTime: '*Time (Hermosillo GMT-7):*',
    waFieldCountry: '*Country / Currency:*',
    waFieldNotes: '*Notes:*',
    waFieldNoNotes: 'No additional notes',
    waFooterConfirm: 'Please confirm my appointment for this time slot. Thank you!',
  },
  simulator: {
    badge: 'Direct Communication Hub',
    title: 'Official WhatsApp Message Simulator',
    subtitle: 'Preview how purchase tickets, appointments, and affiliate claims are structured for our official number',
    lockBadge: 'Preview Guides & Official Simulator',
    lockTitle: 'Live Simulator & WhatsApp Auto-Reply Guide',
    lockSubtitle: 'Enter **** to simultaneously unlock this preview guide, the interactive WhatsApp simulator, the 3–5 min absence template, and the schedule manager.',
    scenarioOrderTab: 'Catalog Order',
    scenarioAppointmentTab: 'Scheduled Appointment',
    scenarioAffiliateTab: 'Affiliate Claim',
    scenarioSupportTab: 'Inquiry / USDT Link',
    sendRealWhatsAppBtn: 'Open in Official WhatsApp (+52 662 180 5354)',
    openAiAssistantBtn: 'Practice with Multilingual AI Assistant',
  },
  sellerPanel: {
    title: 'Seller Panel & Affiliate Control',
    subtitle: 'Synchronized in real time with Firestore • All 3 cumulative rules are calculated automatically.',
    syncBadge: 'Cloud Synced',
    selectSellerLabel: 'Active Seller:',
    addSellerPlaceholder: 'New seller name...',
    addSellerBtn: 'Create Seller',
    directLinkInfoTitle: 'Direct link access:',
    directLinkInfoBody: 'You can also share or save your link with the parameter ?vendedor=YOURCODE or ?codigo=YOURCODE to open your panel automatically without typing it.',
    cloudSyncedFirestore: 'Synced in the cloud (Firestore)',
    syncingStatus: 'Syncing...',
    localCacheStatus: 'Local cache active',
    personalStatsSub: 'Viewing exclusively your personal statistics on any device',
    loadExampleBtn: 'Test with example: 3 Figma and 12 base',
    clearExampleBtn: 'Clear example / start from zero',
    exampleModeActiveTitle: 'EXAMPLE DATA MODE ACTIVE:',
    exampleModeActiveText: 'Loaded 3 Figma and 12 base services for reward demonstration. Use the "Clear example / start from zero" button to reset your real history.',
    totalSoldLabel: 'Total Sold',
    saleRegisteredSingular: 'registered sale',
    saleRegisteredPlural: 'registered sales',
    eachAbbr: 'each',
    rulesProgressTitle: 'Reward Rules & Progress',
    cumulativeBadge: 'Cumulative',
    clarificationTitle: 'MANDATORY CLARIFICATION ON BASE SERVICES ($150 MXN):',
    clarificationBody: 'Rules 2 and 3 count ON THE SAME base sales; they are not mutually exclusive.',
    clarificationExample: 'Exact example: With 12 base sales you earn 3 free $150 accounts and 2 free Figma.',
    clarificationFormulas: 'Formulas: Figma rule 1 = floor(figma/3) | Figma rule 2 = floor(base/6) | $150 Accounts rule 3 = floor(base/4).',
    rule1ShortTitle: 'Rule 1: Figma Specialty',
    rule2ShortTitle: 'Rule 2: Base → Figma',
    rule3ShortTitle: 'Rule 3: Base → $150 Account',
    soldFemLabel: 'sold',
    soldMascLabel: 'sold',
    rule1ShortDesc: 'Every 3 Figma Pro = 1 free Figma Pro ($300 MXN / 17.00 USDT)',
    rule2ShortDesc: 'Every 6 base services ($150) = 1 free Figma Pro ($300 MXN / 17.00 USDT)',
    rule3ShortDesc: 'Every 4 base services ($150) = 1 free $150 account (Gemini, Coursera, etc.)',
    currentCycleLabel: 'Current cycle:',
    missingLabel: 'Remaining:',
    earnedLabel: 'Earned:',
    account150Singular: '$150 account',
    account150Plural: '$150 accounts',
    claimShortBtn: 'Claim',
    noRewardYetLabel: 'No reward yet',
    realSimResultsTitle: 'Real simulator results',
    realSalesBadge: 'REGISTERED REAL SALES — not a projection',
    realSimNoteTitle: 'The slider projection is in the Affiliates section; here only your registered real sales are calculated.',
    realSimNoteDesc: 'Calculations applied to your {figma} Figma sales and {base} base service sales saved for code',
    realRule1Title: 'Rule 1 (Figma Pro)',
    realRule2Title: 'Rule 2 (Base → Figma)',
    realRule3Title: 'Rule 3 (Base → $150 Account)',
    realCountSuffix: 'real',
    realRule1Sub: 'Every 3 Figma = 1 free',
    realRule2Sub: 'Every 6 base = 1 free Figma',
    realRule3Sub: 'Every 4 base = 1 free $150 account',
    barLabel: 'Bar',
    realRewardLabel: 'Real reward:',
    freeFigmaSingular: 'free Figma',
    freeFigmaPlural: 'free Figmas',
    freeBaseAccountSingular: 'free $150 account',
    freeBaseAccountPlural: 'free $150 accounts',
    consolidatedBreakdownLabel: 'Consolidated breakdown of your real sales:',
    sameBaseSalesNote: '* Rules 2 and 3 are granted on the SAME {base} registered base sales.',
    totalRealEarnedLabel: 'Total Real Earned:',
    referralLinkTitle: 'Your Official Referral Link',
    referralLinkDesc: 'Share this personal link with your buyers. When they open it, they will be identified as referred by you:',
    copyLinkBtn: 'Copy link',
    copiedLinkBtn: 'Copied!',
    shareWhatsAppBtn: 'Share via WhatsApp',
    base150Tag: 'Base $150',
    exampleBadge: 'Example',
    clientPrefix: 'Client',
    sendSaleWhatsAppTitle: 'Send this sale via WhatsApp',
    deleteSaleTitle: 'Delete record',
    officialChannelWhatsAppLabel: 'Official channeling WhatsApp:',
    tabOverview: 'Overview & Rules',
    tabRegisterSale: 'Register Sale',
    tabHistory: 'Sales History',
    tabClaims: 'Claimed Rewards',
    metricFigmaSold: 'Figma Pro Sold',
    metricBaseSold: '$150 Accounts Sold',
    metricTotalEarned: 'Free Rewards Value',
    rule1CardTitle: 'Rule 1 (Every 3 Figma → 1 Free Figma)',
    rule2CardTitle: 'Rule 2 (Every 6 of $150 → 1 Free Figma)',
    rule3CardTitle: 'Rule 3 (Every 4 of $150 → 1 Free $150 Account)',
    availableToClaim: 'Available to claim:',
    claimViaWhatsAppBtn: 'Claim via WhatsApp',
    saleProductLabel: 'Sold Product',
    saleClientNameLabel: 'Client Name',
    saleClientPhoneLabel: 'Client WhatsApp',
    salePaymentVerifiedLabel: 'I confirm the payment reference contains the recommender first and last name (or "pago")',
    registerSaleBtn: 'Register Official Sale',
    closeBtn: 'Close Panel',
  },
  chatbot: {
    headerTitle: 'Intelligent AI Assistant',
    headerOnline: 'Multilingual Active',
    headerSubtitle: 'Automatically replies in your language • Catalog, Payments, Appointments & Affiliates',
    resetChatTitle: 'Reset conversation',
    closeChatTitle: 'Close assistant',
    inactivityBannerTitle: 'Would you like to book a quick appointment?',
    inactivityBannerDesc: 'If 3 to 5 minutes pass without a reply on WhatsApp, you can schedule priority support in 1 click',
    inactivityBookNowBtn: 'Generate 3-5 min Wait Appointment',
    quickPromptCatalog: '📋 View catalog & prices',
    quickPromptConcept: '🏦 Payment reference rule',
    quickPromptAffiliates: '🤝 Explain the 3 affiliate rules',
    quickPromptSchedule: '🕒 Business hours',
    quickPromptBook: '📅 I want to book an appointment',
    inputPlaceholder: 'Type your question in any language...',
    sendBtnTitle: 'Send message',
    confirmAppointmentWhatsAppBtn: 'Confirm Appointment on WhatsApp (+52 662 180 5354)',
    footerNote: 'Automatic language detection • Official WhatsApp +52 662 180 5354',
    welcomeMessage: 'Hello! 👋 I am the **Official Intelligent Assistant** for Official Premium Digital Services.\n\nI automatically detect the language you write in and can help you with:\n• 📋 **Official 12-product catalog** (prices in MXN and USDT)\n• 🏦 **Payment methods** and the payment reference rule (first and last name of the person who recommended you, or only the word "pago")\n• 🤝 **The 3 cumulative affiliate rules**\n• 📅 **Booking an appointment** in Hermosillo time (Monday to Saturday)\n\nHow can I help you today?',
  },
  footer: {
    description: 'Official platform for verified digital services, Hermosillo-time appointment scheduling, and our 3-rule cumulative affiliate program.',
    quickLinksTitle: 'Quick Navigation',
    officialRulesTitle: 'Verified Official Rules',
    ruleConceptItem: 'Payment reference: First and last name of the person who recommended you; if nobody recommended you, only the word "pago".',
    ruleScheduleItem: 'Appointments Monday to Saturday in Hermosillo time (GMT-7).',
    ruleAffiliatesItem: '3 affiliate rules that are 100% cumulative and simultaneous.',
    contactTitle: 'Official Contact',
    whatsappDirectBtn: 'Official WhatsApp +52 662 180 5354',
    rightsReserved: 'All rights reserved • Official Premium Digital Services.',
  },
  floating: {
    assistantTooltipOpen: 'Open Multilingual AI Assistant',
    assistantTooltipClose: 'Close AI Assistant',
    assistantButtonLabel: 'AI Assistant',
    whatsappTooltip: 'Contact via Official WhatsApp (+52 662 180 5354)',
    scrollTopTooltip: 'Back to top',
  },
  pwa: {
    installBtn: 'Install App',
    modalTitle: 'Install Official Application',
    modalSubtitle: 'Access the catalog, affiliate simulator, and AI assistant faster from your home screen.',
    closeBtn: 'Close',
    deviceDesktop: 'Desktop',
    deviceMobile: 'Mobile',
    deviceTablet: 'Tablet',
    browserWeb: 'Web Browser',
  },
  protectedLock: {
    badge: 'Protected Section',
    title: 'Exclusive Access for Authorized Role',
    description: 'To view and interact with this module, log in as Administrator or switch to the corresponding profile.',
    unlockBtn: 'Authenticate Access',
  },
  scheduleModal: {
    title: 'Official Appointment Schedule Manager',
    subtitle: 'Configure start/end hours and business days in Hermosillo time zone (GMT-7).',
    closeBtn: 'Close',
    saveBtn: 'Save Schedule',
    resetDefaultBtn: 'Restore Official Schedule',
  },
  adminModal: {
    title: 'Administrator Security & Control Panel',
    subtitle: 'Manage the administrative session and lock status of protected modules.',
    closeBtn: 'Close window',
    escapeHint: 'Press ESC or click outside to close',
  },
  notifications: {
    addedToQuote: 'Added to your quote:',
    selectedForAppointment: 'Product selected for appointment:',
    scheduleUpdated: 'Business hours updated successfully',
    adminUnlocked: 'Administrator session started successfully',
    adminLocked: 'Administrator session closed',
  },
};

const pt: Partial<AppDictionary> = {
  countries: { mx: 'México (MXN)', ve: 'Venezuela (USDT)', co: 'Colômbia (USDT)', other: 'Outro País (USDT)' },
  days: { lunes: 'Segunda-feira', martes: 'Terça-feira', miercoles: 'Quarta-feira', jueves: 'Quinta-feira', viernes: 'Sexta-feira', sabado: 'Sábado', domingo: 'Domingo', monToSat: 'Segunda a Sábado', monToFri: 'Segunda a Sexta', allDays: 'Todos os dias', noDays: 'Sem dias ativos', to: 'a' },
  header: {
    brandSubtitle: 'Oficial • Catálogo • Afiliados • Assistente IA',
    countryLabel: 'País:', languageLabel: 'Idioma:', roleLabel: 'Perfil:',
    roleClient: '👤 Comprador', roleVendor: '💼 Vendedor / Afiliado', roleAdmin: '🛡️ Administrar',
    navVideo: 'Vídeo', navCatalog: 'Catálogo', navPayments: 'Pagamentos', navAffiliates: 'Afiliados', navAppointments: 'Atendimento', navSimulation: 'Exemplo WhatsApp',
    sellerPanelBtn: 'Painel do vendedor', sellerPanelShort: 'Painel',
    shareWebBtn: 'Compartilhar Web',
    adminSessionActive: 'Sessão Admin ativa (clique para gerir ou sair)', adminProtected: 'Acesso protegido de Administrador',
    assistantBtn: 'Assistente IA', assistantBtnTitle: 'Abrir ou fechar Assistente Inteligente IA', quoteBtn: 'Ver minha cotação / pedido',
    mobileRoleLabel: 'Visão:', mobileCountryLabel: 'País', mobileLanguageLabel: 'Idioma',
  },
  noticeBanner: {
    officialTimeLabel: 'Hora Oficial Hermosillo (GMT-7):', hermosilloNote: 'Sem horário de verão', scheduleBtn: 'Horário:',
    AvailableNow: 'Atendimento Ativo', ClosedNow: 'Fora de Horário', sundayClosedNote: 'Fechado aos domingos',
    conceptWarningTitle: 'REGRA DE CONCEITO DE PAGAMENTO:',
    conceptWarningBody: 'No conceito de pagamento escreva o NOME E SOBRENOME DE QUEM RECOMENDOU; se ninguém recomendou, escreva apenas a palavra "pago".',
    activeViewLabel: 'Visão ativa:',
    topWhatsAppAlertMessage: 'Por favor, entre em contato pelo WhatsApp antes de fazer a compra ou transação.',
    topWhatsAppAlertBtn: 'Contactar pelo WhatsApp',
    topWhatsAppAlertClose: 'Fechar aviso',
  },
  hero: {
    badgeText: 'Plataforma Oficial Verificada • Entrega Imediata e Garantia',
    titlePart1: 'Serviços Digitais', titleHighlight: 'Premium Oficial',
    subtitle: 'Acesse as 12 ferramentas líderes de Inteligência Artificial, Design, Educação e Produtividade pelo melhor preço oficial em MXN ou USDT.',
    ctaCatalog: 'Explorar Catálogo e Preços',
    ctaVideo: 'Ver Vídeo Oficial',
    ctaSellerPanel: 'Painel do Vendedor',
    ctaAppointments: 'Espera: 3-5 min',
    ctaAffiliates: 'Simulador de Afiliados',
    ctaAssistant: 'Perguntar ao Assistente Virtual',
    ctaSimulator: 'Ver Exemplo de Mensagens',
    statProductsLabel: 'Catálogo Oficial', statProductsValue: 'Desde $150 MXN',
    statPaymentsLabel: 'Contas e Pagamentos', statPaymentsValue: 'Nu, Coppel, Binance',
    statAffiliateLabel: 'Programa Afiliados', statAffiliateValue: 'Ganhe Figmas Grátis',
    statAppointmentsLabel: 'Atendimento / Agendamentos', statAppointmentsValue: 'Espera: 3-5 min',
    statSupportLabel: 'Suporte Oficial', statSupportValue: '+52 662 180 5354',
    cardHeaderTitle: 'Preços Oficiais Verificados', cardHeaderBadge: 'MXN / USDT', cardFeaturedSub: 'Conta Educacional Pro por 12 meses',
    cardBaseAccountsTitle: '7 Contas Premium ($150 MXN)', cardBaseAccountsSub: 'Eleven Reader, Mause AI, Coursera, Google AI, CapCut, M365, Duolingo',
    cardPdfTitle: 'ilove pdf premium 12 meses', cardPdfSub: 'Ferramentas PDF completas ilimitadas',
    cardRuleTitle: 'Conceito / Motivo de Pagamento Obrigatório',
    cardRuleBody: 'No conceito escreva o NOME E SOBRENOME DE QUEM RECOMENDOU; se ninguém recomendou, apenas a palavra "pago".',
  },
  video: {
    badge: 'Apresentação Oficial Multimídia', title: 'Apresentação e Demonstração em Vídeo',
    subtitle: 'Veja os detalhes de ativação, regras de pagamento seguro e como acumular recompensas reais em cada venda.',
    playBtn: 'Reproduzir', pauseBtn: 'Pausar', muteBtn: 'Silenciar', unmuteBtn: 'Ativar Áudio', restartBtn: 'Reiniciar', fullscreenBtn: 'Tela Cheia', pipBtn: 'Mini Reprodutor', speedLabel: 'Velocidade',
    audioNotice: 'Nota: O áudio do vídeo oficial permanece no idioma original em espanhol; os controles e a interface estão traduzidos.',
    ctaExplore: 'Ver os 12 Produtos', ctaAskBot: 'Perguntar ao Assistente Virtual', StatusPlaying: 'Reproduzindo', StatusPaused: 'Pausado',
  },
  catalog: {
    badge: 'Catálogo Oficial Verificado', title: 'Ferramentas Digitais de Alto Desempenho',
    subtitle: 'Preços fixos transparentes em Pesos Mexicanos (MXN) e seu equivalente exato em USDT para pagamentos internacionais.',
    searchPlaceholder: 'Buscar por nome, categoria ou recurso (ex. Figma, IA, PDF)...', clearSearch: 'Limpar', allCategories: 'Todos',
    onlyMxn: 'Apenas MXN', onlyUsdt: 'Apenas USDT',
    resultsCount: 'Mostrando {count} de 12 produtos oficiais', popularBadge: 'Destaque', equivalentLabel: 'INVESTIMENTO OFICIAL', featuresLabel: 'Inclui:',
    addToQuote: 'Adicionar', bookAppointmentForProduct: 'Agendar Horário para este Produto',
    emptyTitle: 'Nenhum produto encontrado', emptySubtitle: 'Tente outro termo ou redefina os filtros para ver os 12 produtos oficiais.', resetFilters: 'Ver os 12 produtos',
    categories: { Productividad: 'Produtividade', Diseño: 'Design', Educación: 'Educação', IA: 'IA', Edición: 'Edição', Lectura: 'Leitura' },
  },
  cart: {
    title: 'Sua Cotação Oficial', itemSingular: 'produto selecionado', itemPlural: 'produtos selecionados',
    emptyTitle: 'Sua cotação está vazia', emptySubtitle: 'Adicione qualquer um dos 12 produtos do catálogo para calcular seu total em MXN e USDT.',
    viewCatalogBtn: 'Ir para o Catálogo', removeTitle: 'Remover produto', subtotalMxn: 'Total no México (MXN):', equivalentUsdt: 'Total Internacional (USDT):',
    conceptWarningLabel: 'Conceito / Motivo de Pagamento Obrigatório:',
    conceptWarningText: 'No conceito da transferência escreva o NOME E SOBRENOME DE QUEM RECOMENDOU; se ninguém recomendou, escreva apenas a palavra "pago".',
    sendWhatsAppBtn: 'Enviar Pedido pelo WhatsApp Oficial', clearQuoteBtn: 'Limpar Cotação',
    waOrderHeader: '🛒 *NOVO PEDIDO / COTAÇÃO OFICIAL*', waOrderIntro: 'Olá, desejo adquirir as seguintes assinaturas do catálogo oficial:',
    waOrderTotal: '💰 *Total a pagar:*',
    waOrderConceptNotice: '✅ *Confirmação do Conceito de Pagamento:* No conceito colocarei o nome e sobrenome de quem me recomendou ou apenas a palavra "pago".',
    waOrderOutro: 'Fico no aguardo para prosseguir com o pagamento e ativação.',
  },
  payments: {
    badge: 'Métodos de Pagamento e Segurança', title: 'Dados Bancários e Métodos Autorizados',
    subtitle: 'Selecione seu país para ver as instruções exatas. Todos os pagamentos seguem a regra obrigatória do conceito de pagamento.',
    countryTransferTitle: 'Contas Locais para o México', bankLabel: 'Banco Recebedor', beneficiaryLabel: 'Beneficiário Oficial', clabeLabel: 'CLABE / Cartão',
    copyClabe: 'Copiar', copiedClabe: 'Copiado!', copySuccessMsg: 'Copiado para a área de transferência',
    badgeRecommendedMx: 'Recomendado México (SPEI)', badgeOxxoTransfer: 'Depósitos OXXO / Transferência',
    typeClabeCard: 'CLABE / Cartão', typeCard: 'Cartão',
    internationalTitle: 'Internacional / Binance & PayPal', internationalBadge: 'USDT / PayPal',
    internationalDesc: 'Pagamentos internacionais sem taxas via Binance Pay (USDT) ou pelo PayPal oficial.',
    badgeCryptoZeroFee: 'Cripto Sem Taxas (USDT)', badgeIntlDigital: 'Internacional / Saldo Digital', typeEmail: 'E-mail',
    priceRefFigma: 'Figma Pro (.edu): 17.00 USDT ($300 MXN)', priceRefGeneral: '7 Contas Base: 8.74 USDT cada ($150 MXN)', priceRefPdf: 'ilove pdf premium: 5.83 USDT ($100 MXN)',
    requestCryptoLinkBtn: 'Enviar Comprovante pelo WhatsApp', waCryptoMessage: 'Olá, desejo enviar meu comprovante de pagamento para ativar meu serviço.',
    strictRuleBadge: 'Regra Oficial de Conceito', strictRuleTitle: 'Conceito / Motivo de Pagamento Obrigatório',
    strictRuleIntro: 'Ao realizar sua transferência ou pagamento eletrônico, no campo "Conceito" ou "Motivo de pagamento" você deve escrever o NOME E SOBRENOME DE QUEM RECOMENDOU.',
    strictRuleForbidden: 'Se ninguém recomendou, você deve escrever apenas a palavra "pago".',
    strictRulePenalty: 'Isso garante a validação imediata do pagamento e credita a venda ao afiliado correspondente.',
    strictRuleRefundNote: 'Verifique o conceito exato antes de confirmar sua transferência.',
    validExamplesTitle: 'Digite o Nome e Sobrenome de quem recomendou você (ou selecione "pago" se ninguém recomendou):',
    validExamplesList: ['Carlos Mendoza', 'pago'],
    forbiddenExamplesTitle: 'Regra Oficial do Conceito',
    forbiddenExamplesList: ['Nome e Sobrenome do recomendador', 'Ou apenas a palavra "pago"'],
    mercadoPagoPayLabel: 'Pagar',
  },
  affiliates: {
    badge: 'Programa Oficial de Vendedores e Afiliados', title: 'Ganhe Contas Grátis com Nossas 3 Regras Cumulativas',
    subtitle: 'As 3 regras somam-se simultaneamente. Cada venda de $150 MXN conta ao mesmo tempo para a Regra 2 e para a Regra 3.',
    cumulativeBannerTitle: 'Sistema 100% Cumulativo e Simultâneo',
    cumulativeBannerDesc: 'Suas vendas não são consumidas em uma única regra: ao vender contas de $150 MXN você avança ao mesmo tempo para contas Figma Pro grátis (Regra 2) e contas de $150 MXN grátis (Regra 3).',
    openSellerPanelBtn: 'Painel do Vendedor',
    goalLabel: 'Meta',
    rule1Tag: 'Regra 1', rule1Title: 'Venda 3 Figmas Pro',
    rule1Desc: 'No caso de vender três (3) licenças do Figma Pro (.edu), obtém-se imediatamente um produto Figma Pro completamente grátis (avaliado em $300 MXN / 17.00 USDT).',
    rule1Reward: '3 Vendas Figma = 1 Figma Pro Grátis',
    rule2Tag: 'Regra 2', rule2Title: 'Venda 6 Serviços de $150 MXN',
    rule2Desc: 'No caso de vender seis (6) produtos equivalentes a $150 MXN ou 8.74 USDT (Coursera Plus, Gemini AI, CapCut Teams ou Microsoft 365), você ganha um Figma Pro grátis!',
    rule2Reward: '6 Vendas Base = 1 Figma Pro Grátis',
    rule3Tag: 'Regra 3', rule3Title: 'Venda 4 Serviços de $150 MXN',
    rule3Desc: 'No caso de vender quatro (4) serviços base de $150 MXN / 8.74 USDT (Coursera Plus, Gemini AI, CapCut Teams ou Microsoft 365), você ganha uma conta grátis de $150 (à escolha: Gemini, Coursera ou qualquer conta de $150 / 8.74 USDT)!',
    rule3Reward: '4 Vendas Base = 1 Conta de $150 Grátis',
    simBadge: 'PROJEÇÃO', simTitle: 'Simulador Interativo de Recompensas', simSubtitle: 'Ajuste suas vendas projetadas e comprove como as 3 regras se acumulam automaticamente.',
    simResetBtn: 'Restaurar Exemplo Oficial (3 Figma + 12 Base)', simFigmaInputLabel: 'Vendas de Figma Pro ($300 MXN / 17.00 USDT)', simFigmaInputSub: 'Aplica-se diretamente à Regra 1 (a cada 3 vendas = 1 Figma grátis)',
    simBaseInputLabel: 'Vendas de Produtos Base ($150 MXN / 8.74 USDT)', simBaseInputSub: 'Aplica-se SIMULTANEAMENTE à Regra 2 (a cada 6) e Regra 3 (a cada 4)',
    simRewardsTitle: 'DETALHAMENTO COMPLETO POR REGRA (PROJEÇÃO)', simRule1ResultLabel: 'Regra 1 (Cada 3 Figma):', simRule2ResultLabel: 'Regra 2 (Cada 6 Base):', simRule3ResultLabel: 'Regra 3 (Cada 4 Base):',
    simFreeFigmaUnit: 'Figma Pro Grátis', simFreeBaseUnit: 'Contas $150 Grátis', simCycleProgress: 'Ciclo atual:', simTotalValueLabel: 'Valor Total em Prêmios Grátis:', simTotalAccountsFree: 'Total de contas grátis obtidas:',
    simNoteCumulative: 'Cálculo verificado: as regras 1, 2 e 3 são cumulativas e nunca se subtraem entre si.',
  },
  appointments: {
    badge: 'Atendimento Prioritário e Agendamento', title: 'Reserve seu Turno de Atendimento',
    subtitle: 'Selecione o serviço ou produto, escolha um dia útil (Segunda a Sábado) e confirme seu turno diretamente pelo WhatsApp',
    adminManageScheduleBtn: 'Configurar Horários (Admin)', timezoneCardTitle: 'Fuso Horário Oficial: Hermosillo, Sonora (GMT-7)', timezoneCardSub: 'Atendimento de Segunda a Sábado • Domingos bloqueados para descanso oficial.',
    activeScheduleLabel: 'Horário de atendimento vigente:', sundayBlockedBadge: 'Fechado aos Domingos (Ajustado automaticamente para o próximo dia útil)',
    formTitle: 'Preencha os Dados do seu Agendamento', clientNameLabel: 'Seu Nome Completo *', clientNamePlaceholder: 'Ex. Alejandro Ramírez',
    clientPhoneLabel: 'Seu WhatsApp / Telefone *', clientPhonePlaceholder: 'Ex. +52 662 000 0000', reasonLabel: 'Motivo do Agendamento ou Produto de Interesse *',
    reasonDigitalActivation: 'Ativação de Conta Digital',
    reasonAffiliateRegistration: 'Registro no Programa de Afiliados',
    reasonWholesaleSupport: 'Atendimento Comercial e Atacado',
    reasonBuyPrefix: '', reasonGeneralInfo: 'Ativação de Conta Digital', reasonAffiliateJoin: 'Registro no Programa de Afiliados', reasonWarrantySupport: 'Atendimento Comercial e Atacado',
    dateLabel: 'Data do Agendamento (Segunda a Sábado) *', nextBusinessDayHint: 'Selecionar próximo dia útil disponível',
    sundayErrorAlert: 'Não há atendimento aos domingos. Ajustamos a data para o próximo dia útil disponível.', dayDisabledError: 'O dia selecionado não está habilitado no calendário atual. Selecione um dia útil ativo.',
    timeSlotLabel: 'Selecione a Hora (Hora Hermosillo) *', notesLabel: 'Notas ou Comentários Adicionais (Opcional)', notesPlaceholder: 'Ex. Quero pagar via transferência ou tirar dúvidas sobre afiliados...',
    submitWhatsAppBtn: 'Confirmar e Enviar Agendamento pelo WhatsApp',
    directWhatsAppLabel: 'WhatsApp Direto:',
    previewTitle: 'Prévia do Ticket de Agendamento (UTF-8 Verificado)', previewSubtitle: 'Esta mensagem estruturada será enviada para o WhatsApp oficial +52 662 180 5354:',
    copyMessageBtn: 'Copiar Mensagem de Agendamento', copiedMessageBtn: 'Mensagem Copiada!',
    waTicketTitle: '*SOLICITAÇÃO DE AGENDAMENTO OFICIAL*', waFieldClient: '*Cliente:*', waFieldPhone: '*Telefone:*', waFieldReason: '*Motivo / Produto:*', waFieldDate: '*Data:*', waFieldTime: '*Hora (Hermosillo GMT-7):*', waFieldCountry: '*País / Moeda:*', waFieldNotes: '*Notas:*', waFieldNoNotes: 'Sem notas adicionais', waFooterConfirm: 'Por favor, confirme meu agendamento neste horário. Obrigado!',
  },
  simulator: {
    badge: 'Centro de Comunicação Direta', title: 'Simulador de Mensagens Oficiais do WhatsApp',
    subtitle: 'Visualize como os tickets de compra, agendamentos e resgates de afiliados são estruturados para o número oficial',
    lockBadge: 'Guias Prévios e Simulador Oficial',
    lockTitle: 'Simulador ao Vivo e Guia de Auto-Resposta WhatsApp',
    lockSubtitle: 'Digite **** para desbloquear simultaneamente este guia prévio, o simulador interativo do WhatsApp, o modelo de ausência (3 a 5 min) e o painel de horários.',
    scenarioOrderTab: 'Pedido do Catálogo', scenarioAppointmentTab: 'Horário Agendado', scenarioAffiliateTab: 'Resgate de Afiliado', scenarioSupportTab: 'Dúvida / Link USDT',
    sendRealWhatsAppBtn: 'Abrir no WhatsApp Oficial (+52 662 180 5354)', openAiAssistantBtn: 'Praticar com Assistente IA Multilíngue',
  },
  sellerPanel: {
    title: 'Painel do Vendedor e Controle de Afiliados', subtitle: 'Sincronizado em tempo real com o Firestore • As 3 regras cumulativas são calculadas automaticamente.',
    syncBadge: 'Sincronizado na Nuvem', selectSellerLabel: 'Vendedor Ativo:', addSellerPlaceholder: 'Nome do novo vendedor...', addSellerBtn: 'Criar Vendedor',
    directLinkInfoTitle: 'Acesso direto com link:',
    directLinkInfoBody: 'Você também pode compartilhar ou salvar seu link com o parâmetro ?vendedor=SEUCODIGO ou ?codigo=SEUCODIGO para abrir seu painel automaticamente sem digitá-lo.',
    cloudSyncedFirestore: 'Sincronizado na nuvem (Firestore)',
    syncingStatus: 'Sincronizando...',
    localCacheStatus: 'Cache local ativo',
    personalStatsSub: 'Visualizando exclusivamente suas estatísticas pessoais em qualquer dispositivo',
    loadExampleBtn: 'Testar com exemplo: 3 Figma e 12 base',
    clearExampleBtn: 'Apagar exemplo / começar do zero',
    exampleModeActiveTitle: 'MODO DE DADOS DE EXEMPLO ATIVO:',
    exampleModeActiveText: 'Foram carregados 3 Figma e 12 serviços base para demonstração de prêmios. Use o botão "Apagar exemplo / começar do zero" para reiniciar seu histórico real.',
    totalSoldLabel: 'Total Vendido',
    saleRegisteredSingular: 'venda registrada',
    saleRegisteredPlural: 'vendas registradas',
    eachAbbr: 'cada',
    rulesProgressTitle: 'Regras de Recompensas e Progresso',
    cumulativeBadge: 'Cumulativo',
    clarificationTitle: 'ESCLARECIMENTO OBRIGATÓRIO SOBRE SERVIÇOS BASE ($150 MXN):',
    clarificationBody: 'As regras 2 e 3 contam SOBRE AS MESMAS vendas base, não são excludentes.',
    clarificationExample: 'Exemplo exato: Com 12 vendas base ganham-se 3 contas de $150 e 2 Figma grátis.',
    clarificationFormulas: 'Fórmulas: Figma regra 1 = floor(figma/3) | Figma regra 2 = floor(base/6) | Contas $150 regra 3 = floor(base/4).',
    rule1ShortTitle: 'Regra 1: Especialidade Figma',
    rule2ShortTitle: 'Regra 2: Base → Figma',
    rule3ShortTitle: 'Regra 3: Base → Conta $150',
    soldFemLabel: 'vendidas',
    soldMascLabel: 'vendidos',
    rule1ShortDesc: 'A cada 3 Figma Pro = 1 Figma Pro grátis ($300 MXN / 17.00 USDT)',
    rule2ShortDesc: 'A cada 6 serviços base ($150) = 1 Figma Pro grátis ($300 MXN / 17.00 USDT)',
    rule3ShortDesc: 'A cada 4 serviços base ($150) = 1 conta grátis de $150 (Gemini, Coursera, etc.)',
    currentCycleLabel: 'Ciclo atual:',
    missingLabel: 'Falta:',
    earnedLabel: 'Ganhos:',
    account150Singular: 'conta $150',
    account150Plural: 'contas $150',
    claimShortBtn: 'Resgatar',
    noRewardYetLabel: 'Ainda sem prêmio',
    realSimResultsTitle: 'Resultados reais do simulador',
    realSalesBadge: 'VENDAS REAIS REGISTRADAS — não é uma projeção',
    realSimNoteTitle: 'A projeção com controles deslizantes está na seção de Afiliados; aqui são calculadas apenas suas vendas reais registradas.',
    realSimNoteDesc: 'Cálculos aplicados às suas {figma} vendas de Figma e {base} vendas de serviços base salvas para o código',
    realRule1Title: 'Regra 1 (Figma Pro)',
    realRule2Title: 'Regra 2 (Base → Figma)',
    realRule3Title: 'Regra 3 (Base → Conta $150)',
    realCountSuffix: 'reais',
    realRule1Sub: 'A cada 3 Figma = 1 grátis',
    realRule2Sub: 'A cada 6 base = 1 Figma grátis',
    realRule3Sub: 'A cada 4 base = 1 conta $150 grátis',
    barLabel: 'Barra',
    realRewardLabel: 'Prêmio real:',
    freeFigmaSingular: 'Figma grátis',
    freeFigmaPlural: 'Figmas grátis',
    freeBaseAccountSingular: 'conta de $150 grátis',
    freeBaseAccountPlural: 'contas de $150 grátis',
    consolidatedBreakdownLabel: 'Detalhamento consolidado das suas vendas reais:',
    sameBaseSalesNote: '* As regras 2 e 3 são concedidas sobre as MESMAS {base} vendas base registradas.',
    totalRealEarnedLabel: 'Total Real Ganho:',
    referralLinkTitle: 'Seu Link de Indicação Oficial',
    referralLinkDesc: 'Compartilhe este link pessoal com seus compradores. Ao abri-lo, será identificado que vêm por sua indicação:',
    copyLinkBtn: 'Copiar link',
    copiedLinkBtn: 'Copiado!',
    shareWhatsAppBtn: 'Compartilhar pelo WhatsApp',
    base150Tag: 'Base $150',
    exampleBadge: 'Exemplo',
    clientPrefix: 'Cliente',
    sendSaleWhatsAppTitle: 'Enviar esta venda pelo WhatsApp',
    deleteSaleTitle: 'Excluir registro',
    officialChannelWhatsAppLabel: 'WhatsApp oficial de atendimento:',
    tabOverview: 'Resumo e Regras', tabRegisterSale: 'Registrar Venda', tabHistory: 'Histórico de Vendas', tabClaims: 'Prêmios Resgatados',
    metricFigmaSold: 'Figma Pro Vendidos', metricBaseSold: 'Contas $150 Vendidas', metricTotalEarned: 'Valor em Prêmios Grátis',
    rule1CardTitle: 'Regra 1 (Cada 3 Figma → 1 Figma Grátis)', rule2CardTitle: 'Regra 2 (Cada 6 de $150 → 1 Figma Grátis)', rule3CardTitle: 'Regra 3 (Cada 4 de $150 → 1 Conta $150 Grátis)',
    availableToClaim: 'Disponíveis para resgatar:', claimViaWhatsAppBtn: 'Resgatar pelo WhatsApp',
    saleProductLabel: 'Produto Vendido', saleClientNameLabel: 'Nome do Cliente', saleClientPhoneLabel: 'WhatsApp do Cliente',
    salePaymentVerifiedLabel: 'Confirmo que no conceito de pagamento foi escrito o nome e sobrenome de quem recomendou (ou "pago")', registerSaleBtn: 'Registrar Venda Oficial', closeBtn: 'Fechar Painel',
  },
  chatbot: {
    headerTitle: 'Assistente Inteligente IA', headerOnline: 'Multilíngue Ativo',
    headerSubtitle: 'Responde automaticamente no seu idioma • Catálogo, Pagamentos, Agendamentos e Afiliados',
    resetChatTitle: 'Reiniciar conversa', closeChatTitle: 'Fechar assistente',
    inactivityBannerTitle: 'Deseja agendar um atendimento rápido?', inactivityBannerDesc: 'Se passarem de 3 a 5 minutos sem resposta no WhatsApp, agende seu atendimento prioritário em 1 clique', inactivityBookNowBtn: 'Gerar Agendamento por Espera (3-5 min)',
    quickPromptCatalog: '📋 Ver catálogo e preços', quickPromptConcept: '🏦 Regra do conceito de pagamento', quickPromptAffiliates: '🤝 Explicar as 3 regras de afiliados', quickPromptSchedule: '🕒 Horários de atendimento', quickPromptBook: '📅 Quero agendar um horário',
    inputPlaceholder: 'Escreva sua pergunta em qualquer idioma...', sendBtnTitle: 'Enviar mensagem',
    confirmAppointmentWhatsAppBtn: 'Confirmar Agendamento no WhatsApp (+52 662 180 5354)', footerNote: 'Detecção automática de idioma • WhatsApp Oficial +52 662 180 5354',
    welcomeMessage: 'Olá! 👋 Sou o **Assistente Inteligente Oficial** de Serviços Digitais Premium.\n\nDetecto automaticamente o idioma em que você escreve e posso ajudar com:\n• 📋 **Catálogo oficial de 12 produtos** (preços em MXN e USDT)\n• 🏦 **Métodos de pagamento** e a regra do conceito (nome e sobrenome de quem recomendou, ou apenas a palavra "pago")\n• 🤝 **As 3 regras cumulativas de afiliados**\n• 📅 **Agendar um horário** no fuso de Hermosillo (Segunda a Sábado)\n\nComo posso ajudar você hoje?',
  },
  footer: {
    description: 'Plataforma oficial de serviços digitais verificados, agendamentos no horário de Hermosillo e programa de afiliados com 3 regras cumulativas.',
    quickLinksTitle: 'Navegação Rápida', officialRulesTitle: 'Regras Oficiais Verificadas',
    ruleConceptItem: 'Conceito de pagamento: Nome e sobrenome de quem recomendou; se ninguém recomendou, apenas a palavra "pago".',
    ruleScheduleItem: 'Agendamentos de Segunda a Sábado no horário de Hermosillo (GMT-7).',
    ruleAffiliatesItem: '3 regras de afiliados 100% cumulativas e simultâneas.',
    contactTitle: 'Contato Oficial', whatsappDirectBtn: 'WhatsApp Oficial +52 662 180 5354',
    rightsReserved: 'Todos os direitos reservados • Serviços Digitais Premium.',
  },
  floating: {
    assistantTooltipOpen: 'Abrir Assistente IA Multilíngue', assistantTooltipClose: 'Fechar Assistente IA', assistantButtonLabel: 'Assistente IA',
    whatsappTooltip: 'Contatar pelo WhatsApp Oficial (+52 662 180 5354)', scrollTopTooltip: 'Voltar ao topo',
  },
  pwa: {
    installBtn: 'Instalar App', modalTitle: 'Instalar Aplicativo Oficial', modalSubtitle: 'Acesse mais rápido o catálogo, simulador de afiliados e assistente IA na sua tela inicial.', closeBtn: 'Fechar',
    deviceDesktop: 'Computador', deviceMobile: 'Celular', deviceTablet: 'Tablet', browserWeb: 'Navegador Web',
  },
  protectedLock: { badge: 'Seção Protegida', title: 'Acesso Exclusivo para Perfil Autorizado', description: 'Para visualizar e interagir com este módulo, inicie sessão como Administrador ou mude para o perfil correspondente.', unlockBtn: 'Autenticar Acesso' },
  scheduleModal: { title: 'Gerenciador Oficial de Horários', subtitle: 'Configure os horários de início, fim e dias úteis no fuso de Hermosillo (GMT-7).', closeBtn: 'Fechar', saveBtn: 'Salvar Horário', resetDefaultBtn: 'Restaurar Horário Oficial' },
  adminModal: { title: 'Painel de Controle e Segurança do Administrador', subtitle: 'Gerencie a sessão administrativa e o bloqueio de módulos protegidos.', closeBtn: 'Fechar janela', escapeHint: 'Pressione ESC ou clique fora para fechar' },
  notifications: { addedToQuote: 'Adicionado à sua cotação:', selectedForAppointment: 'Produto selecionado para agendamento:', scheduleUpdated: 'Horário de atendimento atualizado com sucesso', adminUnlocked: 'Sessão de Administrador iniciada', adminLocked: 'Sessão de Administrador encerrada' },
};

/**
 * Merges any language dictionary with Spanish ('es') as the official base and fallback
 * as required by the specification ("con español como idioma base y como respaldo si alguna traducción no está disponible").
 */
function mergeWithSpanishFallback(
  baseEs: AppDictionary,
  partial: { [K in keyof AppDictionary]?: Partial<AppDictionary[K]> },
  lang: LanguageCode
): AppDictionary {
  if (lang === 'es') return baseEs;

  const extra = extendedDictionaries[lang] || {};
  const result: Record<string, any> = {};
  const keys = Object.keys(baseEs) as Array<keyof AppDictionary>;

  for (const sectionKey of keys) {
    const esSection = baseEs[sectionKey];
    const targetSection = partial[sectionKey];
    const extraSection = extra[sectionKey];

    if (typeof esSection === 'object' && esSection !== null && !Array.isArray(esSection)) {
      result[sectionKey] = {
        ...esSection,
        ...(extraSection || {}),
        ...(targetSection || {}),
      };
    } else {
      result[sectionKey] =
        targetSection !== undefined
          ? targetSection
          : extraSection !== undefined
          ? extraSection
          : esSection;
    }
  }

  return result as AppDictionary;
}

const compiledDictionaries: Record<LanguageCode, AppDictionary> = {
  es,
  en: mergeWithSpanishFallback(es, en, 'en'),
  pt: mergeWithSpanishFallback(es, pt, 'pt'),
  fr: mergeWithSpanishFallback(es, extendedDictionaries.fr || {}, 'fr'),
  de: mergeWithSpanishFallback(es, extendedDictionaries.de || {}, 'de'),
  it: mergeWithSpanishFallback(es, extendedDictionaries.it || {}, 'it'),
  zh: mergeWithSpanishFallback(es, extendedDictionaries.zh || {}, 'zh'),
  ja: mergeWithSpanishFallback(es, extendedDictionaries.ja || {}, 'ja'),
  ko: mergeWithSpanishFallback(es, extendedDictionaries.ko || {}, 'ko'),
  ar: mergeWithSpanishFallback(es, extendedDictionaries.ar || {}, 'ar'),
  hi: mergeWithSpanishFallback(es, extendedDictionaries.hi || {}, 'hi'),
  ru: mergeWithSpanishFallback(es, extendedDictionaries.ru || {}, 'ru'),
  tr: mergeWithSpanishFallback(es, extendedDictionaries.tr || {}, 'tr'),
};

/**
 * Returns the complete dictionary for the requested language, with automatic fallback to Spanish ('es').
 */
export function getDictionary(lang: LanguageCode): AppDictionary {
  return compiledDictionaries[lang] || compiledDictionaries.es;
}
