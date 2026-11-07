import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  AlertTriangle,
  MessageCircle,
  CheckCircle2,
  Send,
  User,
  ShieldCheck,
  Headphones,
  Zap,
  Settings,
  Bot,
  Lock,
  Copy,
  ExternalLink,
  Sparkles,
  Check,
} from 'lucide-react';
import { CountryCode, DayAvailability } from '../types';
import {
  COUNTRIES,
  OFFICIAL_WHATSAPP_NUMBER,
  buildWhatsAppLink,
  OFFICIAL_BENEFICIARY,
  getSavedProducts,
} from '../data/catalog';
import {
  getSavedScheduleConfig,
  formatEnabledDaysSummary,
} from '../data/scheduleConfig';
import { ScheduleManagerModal } from './ScheduleManagerModal';
import { ProtectedSectionLock } from './ProtectedSectionLock';
import { useLanguage } from '../i18n/LanguageContext';

interface AppointmentSectionProps {
  country: CountryCode;
}

// Valid UTF-8 emojis matching WhatsApp standards (same encoding as Enviar Comprobante)
const EMOJI_TICKET = '\u{1F516}';     // 🔖
const EMOJI_NAME = '\u{1F464}';       // 👤
const EMOJI_COUNTRY = '\u{1F4CD}';    // 📍
const EMOJI_SERVICE = '\u{1F6CE}';    // 🛎
const EMOJI_DATE = '\u{1F4C5}';       // 📅
const EMOJI_TIME = '\u{23F0}';        // ⏰
const EMOJI_MODE = '\u{26A1}';        // ⚡
const EMOJI_NOTE = '\u{1F4AC}';       // 💬
const EMOJI_AUTO = '\u{23F3}';       // ⏳
const EMOJI_PROTOCOL = '\u{23F1}';   // ⏱

const DAY_NAMES_ES: Record<number, string> = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
};

function formatLocalDateYYYYMMDD(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseLocalDateYYYYMMDD(dateStr: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
  const [y, m, d] = dateStr.split('-').map(Number);
  const parsed = new Date(y, m - 1, d, 12, 0, 0, 0);
  if (
    parsed.getFullYear() !== y ||
    parsed.getMonth() !== m - 1 ||
    parsed.getDate() !== d
  ) {
    return null;
  }
  return parsed;
}

function isWorkingDay(dateObj: Date, availableDays: DayAvailability[]): boolean {
  const dow = dateObj.getDay(); // 0 = Domingo, 1 = Lunes ... 6 = Sábado
  if (dow === 0) return false; // Atención de lunes a sábado: nunca permitir domingo
  const dayCfg = availableDays.find((d) => Number(d.dayId) === dow);
  return dayCfg ? dayCfg.enabled : true;
}

function getNextBusinessDateStr(availableDays: DayAvailability[], baseDate?: Date): string {
  const start = baseDate ? new Date(baseDate) : new Date();
  start.setHours(12, 0, 0, 0);
  const candidate = new Date(start);
  candidate.setDate(candidate.getDate() + 1);

  for (let i = 0; i < 14; i++) {
    if (isWorkingDay(candidate, availableDays)) {
      return formatLocalDateYYYYMMDD(candidate);
    }
    candidate.setDate(candidate.getDate() + 1);
  }

  // Fallback: advance if Sunday
  if (candidate.getDay() === 0) {
    candidate.setDate(candidate.getDate() + 1);
  }
  return formatLocalDateYYYYMMDD(candidate);
}

function getMinAllowedDateStr(availableDays: DayAvailability[], baseDate?: Date): string {
  const today = baseDate ? new Date(baseDate) : new Date();
  today.setHours(12, 0, 0, 0);
  if (isWorkingDay(today, availableDays)) {
    return formatLocalDateYYYYMMDD(today);
  }
  return getNextBusinessDateStr(availableDays, today);
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({ country }) => {
  const { t, localizeProduct, localizeDaysSummary } = useLanguage();
  const [scheduleConfig, setScheduleConfig] = useState(getSavedScheduleConfig());
  const [catalogProducts, setCatalogProducts] = useState(() => getSavedProducts());
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [name, setName] = useState('');
  const [selectedService, setSelectedService] = useState('Activación de Cuenta Digital');
  const [selectedDate, setSelectedDate] = useState(() =>
    getNextBusinessDateStr(getSavedScheduleConfig().availableDays)
  );
  const [dateError, setDateError] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    scheduleConfig.timeSlots[0] || '11:00 AM - 12:00 PM'
  );
  const [notes, setNotes] = useState('');
  const [generatedTicket, setGeneratedTicket] = useState<{
    ticketId: string;
    name: string;
    service: string;
    date: string;
    slot: string;
    whatsAppUrl: string;
  } | null>(null);
  const [copiedExample, setCopiedExample] = useState(false);

  const validateAppointmentDate = (
    dateStr: string,
    availableDays: DayAvailability[],
    minDateStr: string,
    daysSummary: string
  ): string | null => {
    if (!dateStr) {
      return t.appointments.dayDisabledError;
    }
    const parsed = parseLocalDateYYYYMMDD(dateStr);
    if (!parsed) {
      return t.appointments.dayDisabledError;
    }
    if (dateStr < minDateStr) {
      return `${t.appointments.dayDisabledError} (${minDateStr})`;
    }
    const dow = parsed.getDay();
    if (dow === 0) {
      return `${t.appointments.sundayErrorAlert} (${daysSummary})`;
    }
    if (!isWorkingDay(parsed, availableDays)) {
      const dayLabel = DAY_NAMES_ES[dow] || dateStr;
      return `${t.appointments.dayDisabledError} (${dayLabel} • ${daysSummary})`;
    }
    return null;
  };

  const sampleTicketId = 'TKT-849201';
  const sampleMessage = `¡Hola! Acabo de agendar una Cita de Atención Prioritaria en Servicios Digitales Premium:

${EMOJI_TICKET} *Ticket de Cita:* #${sampleTicketId}
${EMOJI_NAME} *Nombre:* Cliente Express (Atención Rápida)
${EMOJI_COUNTRY} *País:* México
${EMOJI_SERVICE} *Motivo / Servicio:* Activación de Cuenta Digital
${EMOJI_DATE} *Fecha Solicitada:* ${selectedDate}
${EMOJI_TIME} *Horario:* ${selectedTimeSlot}
${EMOJI_MODE} *Modo:* Generación Automática Instantánea (Sin escribir)

Por favor, confirmen mi turno de atención. ¡Gracias!`;

  const sampleWhatsAppUrl = buildWhatsAppLink(sampleMessage);

  const handleCopyExample = () => {
    navigator.clipboard.writeText(sampleMessage);
    setCopiedExample(true);
    setTimeout(() => setCopiedExample(false), 2500);
  };

  useEffect(() => {
    const updateHandler = () => {
      const updated = getSavedScheduleConfig();
      setScheduleConfig(updated);
      if (!updated.timeSlots.includes(selectedTimeSlot) && updated.timeSlots.length > 0) {
        setSelectedTimeSlot(updated.timeSlots[0]);
      }
    };
    const updateCatalogHandler = () => {
      setCatalogProducts(getSavedProducts());
    };

    window.addEventListener('schedule_config_updated', updateHandler);
    window.addEventListener('catalog_products_updated', updateCatalogHandler);
    return () => {
      window.removeEventListener('schedule_config_updated', updateHandler);
      window.removeEventListener('catalog_products_updated', updateCatalogHandler);
    };
  }, [selectedTimeSlot]);

  const timeSlots = scheduleConfig.timeSlots;
  const daysSummary = localizeDaysSummary(scheduleConfig.availableDays);
  const minAllowedDate = getMinAllowedDateStr(scheduleConfig.availableDays);
  const nextBusinessDate = getNextBusinessDateStr(scheduleConfig.availableDays);

  const servicesOptions = [
    {
      value: 'Activación de Cuenta Digital',
      label: t.appointments.reasonDigitalActivation,
    },
    ...catalogProducts
      .filter((p) => p.available !== false)
      .map((p) => {
        const loc = localizeProduct(p);
        return {
          value: `${p.name} ($${p.priceMxn} MXN / $${Number(p.priceUsd).toFixed(2)} USDT)`,
          label: `${loc.name} ($${p.priceMxn} MXN / $${Number(p.priceUsd).toFixed(2)} USDT)`,
        };
      }),
    {
      value: 'Registro en Programa de Afiliados',
      label: t.appointments.reasonAffiliateRegistration,
    },
    {
      value: 'Atención Comercial & Mayorista',
      label: t.appointments.reasonWholesaleSupport,
    },
  ];

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    const validationErr = validateAppointmentDate(
      newDate,
      scheduleConfig.availableDays,
      minAllowedDate,
      daysSummary
    );
    setDateError(validationErr);
    if (validationErr) {
      setGeneratedTicket(null);
    }
  };

  const triggerExternalLink = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const validationErr = validateAppointmentDate(
      selectedDate,
      scheduleConfig.availableDays,
      minAllowedDate,
      daysSummary
    );
    if (validationErr) {
      setDateError(validationErr);
      setGeneratedTicket(null);
      return;
    }
    setDateError(null);

    const currentCountryObj = COUNTRIES.find((c) => c.code === country);
    const appointmentId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;

    const message = `¡Hola! Acabo de agendar una Cita de Atención Prioritaria en Servicios Digitales Premium:

${EMOJI_TICKET} *Ticket de Cita:* #${appointmentId}
${EMOJI_NAME} *Nombre:* ${name}
${EMOJI_COUNTRY} *País:* ${currentCountryObj?.name || 'Internacional'}
${EMOJI_SERVICE} *Motivo / Servicio:* ${selectedService}
${EMOJI_DATE} *Fecha Solicitada:* ${selectedDate}
${EMOJI_TIME} *Horario:* ${selectedTimeSlot}
${notes.trim() ? `${EMOJI_NOTE} *Nota adicional:* ${notes}` : ''}

Por favor, confirmen mi turno de atención. ¡Gracias!`;

    const waUrl = buildWhatsAppLink(message);
    setGeneratedTicket({
      ticketId: appointmentId,
      name: name.trim(),
      service: selectedService,
      date: selectedDate,
      slot: selectedTimeSlot,
      whatsAppUrl: waUrl,
    });
    triggerExternalLink(waUrl);
  };

  const handleAutoGenerateAppointment = (serviceName?: string, presetLabel?: string, isWaitTimeoutRule = false) => {
    const validationErr = validateAppointmentDate(
      selectedDate,
      scheduleConfig.availableDays,
      minAllowedDate,
      daysSummary
    );
    if (validationErr) {
      setDateError(validationErr);
      setGeneratedTicket(null);
      return;
    }
    setDateError(null);

    const chosenService = serviceName || selectedService || 'Activación de Cuenta Digital';
    const autoName = name.trim() || `Cliente Express (${presetLabel || 'Atención Rápida'})`;
    const currentCountryObj = COUNTRIES.find((c) => c.code === country);
    const appointmentId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    const slot = selectedTimeSlot || timeSlots[0] || '11:00 AM - 12:00 PM';

    setName(autoName);
    setSelectedService(chosenService);

    const message = isWaitTimeoutRule
      ? `¡Hola Javier! Te escribo al WhatsApp oficial ${OFFICIAL_WHATSAPP_NUMBER}.

${EMOJI_AUTO} *Activación Automática:* Al no recibir respuesta de 3 a 5 minutos, el sistema me generó esta Cita de Atención Prioritaria automáticamente:

${EMOJI_TICKET} *Ticket de Cita:* #${appointmentId}
${EMOJI_NAME} *Nombre:* ${autoName}
${EMOJI_COUNTRY} *País:* ${currentCountryObj?.name || 'Internacional'}
${EMOJI_SERVICE} *Servicio Solicitado:* ${chosenService}
${EMOJI_DATE} *Fecha Solicitada:* ${selectedDate}
${EMOJI_TIME} *Horario Reservado:* ${slot}
${EMOJI_PROTOCOL} *Protocolo:* Auto-agendado por espera de 3 a 5 min sin contestar (${OFFICIAL_WHATSAPP_NUMBER})

Por favor, confirmen mi turno de atención preferencial. ¡Muchas gracias!`
      : `¡Hola! Acabo de agendar una Cita de Atención Prioritaria en Servicios Digitales Premium:

${EMOJI_TICKET} *Ticket de Cita:* #${appointmentId}
${EMOJI_NAME} *Nombre:* ${autoName}
${EMOJI_COUNTRY} *País:* ${currentCountryObj?.name || 'Internacional'}
${EMOJI_SERVICE} *Motivo / Servicio:* ${chosenService}
${EMOJI_DATE} *Fecha Solicitada:* ${selectedDate}
${EMOJI_TIME} *Horario:* ${slot}
${EMOJI_MODE} *Modo:* Generación Automática Instantánea (Sin escribir)

Por favor, confirmen mi turno de atención. ¡Gracias!`;

    const waUrl = buildWhatsAppLink(message);
    setGeneratedTicket({
      ticketId: appointmentId,
      name: autoName,
      service: chosenService,
      date: selectedDate,
      slot,
      whatsAppUrl: waUrl,
    });
    triggerExternalLink(waUrl);
  };

  return (
    <section id="citas" className="py-16 sm:py-20 bg-slate-900/50 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-3 py-1 rounded-md border border-purple-500/20 mb-3">
            <Headphones className="w-3.5 h-3.5" /> {t.appointments.badge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.appointments.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            {t.appointments.subtitle} (<strong className="text-emerald-400">{OFFICIAL_WHATSAPP_NUMBER}</strong>).
          </p>
        </div>

        {/* HIGH DEMAND ALERT BANNER */}
        <div className="max-w-4xl mx-auto mb-10 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  WhatsApp ({OFFICIAL_WHATSAPP_NUMBER})
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
                {t.chatbot.inactivityBannerDesc} (<strong className="text-emerald-400">{OFFICIAL_WHATSAPP_NUMBER}</strong>).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <button
              onClick={() => setIsManagerOpen(true)}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-semibold px-3.5 py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
              title={t.appointments.adminManageScheduleBtn}
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.appointments.adminManageScheduleBtn}</span>
            </button>

            <a
              href={buildWhatsAppLink('¡Hola! Requiero atención rápida inmediata en WhatsApp oficial por favor.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Schedule availability banner */}
        <div className="max-w-4xl mx-auto mb-6 p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>
              {t.appointments.activeScheduleLabel}{' '}
              <strong className="text-white">{daysSummary}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              <strong className="text-white">{timeSlots.length}</strong> • {t.appointments.sundayBlockedBadge}
            </span>
          </div>
        </div>

        {/* Appointment Form & Info Grid */}
        <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left form */}
            <form onSubmit={handleScheduleAppointment} className="flex-1 space-y-4">
              <div className="pb-3 border-b border-slate-800">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>{t.appointments.formTitle}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {t.appointments.timezoneCardSub}
                </p>
              </div>

              {/* ⚡ Acceso Rápido: Generar Cita Automática en 1 Clic (Sin Escribir) */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 1-Click Express Ticket
                  </span>
                  <span className="text-[10px] text-slate-400">WhatsApp {OFFICIAL_WHATSAPP_NUMBER}</span>
                </div>

                {/* Botón destacado: Regla de 3 a 5 min sin contestar */}
                <button
                  type="button"
                  onClick={() =>
                    handleAutoGenerateAppointment(
                      'Activación de Cuenta Digital',
                      'Espera 3-5 min WhatsApp',
                      true
                    )
                  }
                  className="w-full mb-2.5 text-xs font-bold bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 hover:from-amber-500/30 hover:to-emerald-500/30 text-amber-300 border border-amber-500/50 hover:border-amber-400 py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm active:scale-95"
                >
                  <Clock className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                  <span>⏳ {t.chatbot.inactivityBookNowBtn} ({OFFICIAL_WHATSAPP_NUMBER})</span>
                </button>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleAutoGenerateAppointment('Activación de Cuenta Digital', 'Atención Express')}
                    className="text-[11px] font-bold bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-emerald-500/60 py-2 px-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>⚡ Express</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAutoGenerateAppointment('Figma Pro (.edu) - Activación 2 Años', 'Figma Pro')}
                    className="text-[11px] font-bold bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-purple-500/60 py-2 px-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>🎨 Figma Pro</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAutoGenerateAppointment('Google AI Pro / Gemini - Activación', 'Gemini Flash AI')}
                    className="text-[11px] font-bold bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-emerald-500/60 py-2 px-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>🤖 Gemini AI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAutoGenerateAppointment('Coursera Plus - Soporte & Entrega', 'Coursera Plus')}
                    className="text-[11px] font-bold bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-500/60 py-2 px-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Bot className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>📚 Coursera</span>
                  </button>
                </div>
              </div>

              {generatedTicket && (
                <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 space-y-2.5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      {t.appointments.waTicketTitle}
                    </span>
                    <span className="text-[11px] font-mono font-bold bg-emerald-900/80 text-emerald-200 px-2 py-0.5 rounded">
                      #{generatedTicket.ticketId}
                    </span>
                  </div>
                  <div className="text-xs text-slate-200 space-y-0.5 font-mono">
                    <div>👤 <strong>{t.appointments.waFieldClient}:</strong> {generatedTicket.name}</div>
                    <div>🛎️ <strong>{t.appointments.waFieldReason}:</strong> {generatedTicket.service}</div>
                    <div>📅 <strong>{t.appointments.waFieldDate}:</strong> {generatedTicket.date} • ⏰ {generatedTicket.slot}</div>
                  </div>
                  <a
                    href={generatedTicket.whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                    <span>#{generatedTicket.ticketId} • WhatsApp ({OFFICIAL_WHATSAPP_NUMBER})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.appointments.clientNameLabel}:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder={t.appointments.clientNamePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 text-sm text-white px-3.5 py-2.5 rounded-xl outline-none transition-colors"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.appointments.reasonLabel}:
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl outline-none transition-colors"
                >
                  {servicesOptions.map((srv, idx) => (
                    <option key={idx} value={srv.value}>
                      {srv.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t.appointments.dateLabel}:
                  </label>
                  <input
                    type="date"
                    required
                    min={minAllowedDate}
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    aria-invalid={Boolean(dateError)}
                    className={`w-full bg-slate-950 border text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl outline-none transition-colors ${
                      dateError
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-slate-700 focus:border-emerald-500'
                    }`}
                  />
                  {dateError && (
                    <div
                      role="alert"
                      className="mt-2 p-2.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-[11px] flex flex-col gap-1.5"
                    >
                      <div className="flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span>{dateError}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDateChange(nextBusinessDate)}
                        className="self-start text-[10px] font-bold text-emerald-300 hover:text-emerald-200 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                      >
                        {t.appointments.nextBusinessDayHint} ({nextBusinessDate})
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t.appointments.timeSlotLabel}:
                  </label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl outline-none transition-colors"
                  >
                    {timeSlots.map((ts, idx) => (
                      <option key={idx} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.appointments.notesLabel}:
                </label>
                <textarea
                  rows={2}
                  placeholder={t.appointments.notesPlaceholder}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 text-xs sm:text-sm text-white px-3.5 py-2 rounded-xl outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>{t.appointments.submitWhatsAppBtn}</span>
              </button>
            </form>

            {/* Right Information Box */}
            <div className="md:w-72 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                  {t.appointments.previewTitle}
                </span>

                <div className="space-y-3.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{t.appointments.previewSubtitle}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{t.appointments.timezoneCardTitle}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{OFFICIAL_BENEFICIARY} ({OFFICIAL_WHATSAPP_NUMBER})</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{t.appointments.sundayBlockedBadge}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                <span>{t.appointments.directWhatsAppLabel}</span>
                <a
                  href={buildWhatsAppLink('¡Hola! Necesito soporte comercial inmediato.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-emerald-400 hover:text-emerald-300 font-bold block"
                >
                  {OFFICIAL_WHATSAPP_NUMBER} →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* DEMOSTRACIÓN & EXPLICACIÓN: CÓMO SE GENERA Y ENVÍA SOLA POR WHATSAPP */}
        <div className="mt-8">
          <ProtectedSectionLock
            badge={t.protectedLock.badge}
            title={t.appointments.previewTitle}
            subtitle={t.protectedLock.description}
          >
        <div className="max-w-4xl mx-auto mt-6 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 mb-1.5">
                <Zap className="w-3 h-3 text-amber-400" /> {t.appointments.badge}
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {t.appointments.previewTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.appointments.previewSubtitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyExample}
                className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                {copiedExample ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{t.appointments.copiedMessageBtn}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.appointments.copyMessageBtn}</span>
                  </>
                )}
              </button>

              <a
                href={sampleWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                <span>{t.appointments.submitWhatsAppBtn}</span>
              </a>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Visual Chat Bubble (WhatsApp Style) */}
            <div className="lg:col-span-6 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              {/* WhatsApp top bar */}
              <div className="bg-emerald-950/70 border-b border-emerald-900/40 px-4 py-2.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">
                  SD
                </div>
                <div className="leading-tight">
                  <span className="text-xs font-bold text-white block">
                    Servicios Digitales Premium Oficial
                  </span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {OFFICIAL_WHATSAPP_NUMBER}
                  </span>
                </div>
              </div>

              {/* Chat Canvas */}
              <div className="p-4 bg-[#0b141a] space-y-3">
                {/* Auto Generated message bubble */}
                <div className="max-w-[95%] ml-auto bg-[#005c4b] text-slate-100 rounded-2xl rounded-tr-none p-3.5 text-xs shadow-md border border-emerald-600/30">
                  <div className="text-[11px] font-bold text-emerald-200 border-b border-emerald-500/20 pb-1 mb-2 flex items-center justify-between">
                    <span>{t.appointments.waTicketTitle}</span>
                    <span className="text-[10px] bg-emerald-900/60 px-1.5 py-0.5 rounded text-emerald-300">
                      1-Click
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 bg-black/20 p-2 rounded-lg text-[11px] font-mono">
                    <div>🔖 <strong>Ticket:</strong> #{sampleTicketId}</div>
                    <div>👤 <strong>{t.appointments.waFieldClient}:</strong> Cliente Express</div>
                    <div>🛎️ <strong>{t.appointments.waFieldReason}:</strong> Activación Digital</div>
                    <div>📅 <strong>{t.appointments.waFieldDate}:</strong> {selectedDate}</div>
                    <div>⏰ <strong>{t.appointments.waFieldTime}:</strong> {selectedTimeSlot}</div>
                  </div>
                  <p className="mt-2 text-slate-200">
                    {t.appointments.waFooterConfirm}
                  </p>
                </div>
              </div>
            </div>

            {/* Explanation side */}
            <div className="lg:col-span-6 space-y-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="font-bold text-white flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center text-[11px]">
                    1
                  </span>
                  <span>{t.appointments.previewTitle}</span>
                </h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {t.appointments.previewSubtitle} (<code className="text-emerald-400">wa.me/526621805354</code>).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="font-bold text-white flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-extrabold flex items-center justify-center text-[11px]">
                    2
                  </span>
                  <span>{t.chatbot.inactivityBannerTitle}</span>
                </h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {t.chatbot.inactivityBannerDesc} (<strong className="text-emerald-400">{OFFICIAL_WHATSAPP_NUMBER}</strong>).
                </p>
              </div>
            </div>
          </div>
        </div>
          </ProtectedSectionLock>
        </div>
      </div>

      {/* Schedule Manager Modal for Javier */}
      <ScheduleManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        onSaved={(newCfg) => setScheduleConfig(newCfg)}
      />
    </section>
  );
};
