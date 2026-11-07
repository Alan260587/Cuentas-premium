import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  Bot,
  User,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  Zap,
  Clock,
  Calendar,
  CreditCard,
} from 'lucide-react';
import { CountryCode, UserProfile, ChatMessage } from '../types';
import {
  OFFICIAL_WHATSAPP_NUMBER,
  buildWhatsAppLink,
  COUNTRIES,
  OFFICIAL_BENEFICIARY,
  MERCADO_PAGO_LINKS,
} from '../data/catalog';
import { getSavedScheduleConfig } from '../data/scheduleConfig';
import { processClientMessageIntelligently, BotConversationContext } from '../utils/intelligentBotEngine';
import { useLanguage } from '../i18n/LanguageContext';

function extractMercadoPagoButtons(
  text: string,
  lang: string = 'es'
): Array<{ url: string; label: string }> {
  const buttons: Array<{ url: string; label: string }> = [];
  if (!text) return buttons;
  const prefix =
    lang === 'en'
      ? 'Pay with Mercado Pago'
      : lang === 'pt'
      ? 'Pagar com Mercado Pago'
      : lang === 'fr'
      ? 'Payer avec Mercado Pago'
      : 'Pagar con Mercado Pago';

  if (text.includes(MERCADO_PAGO_LINKS[300])) {
    buttons.push({
      url: MERCADO_PAGO_LINKS[300],
      label: `${prefix} ($300 MXN)`,
    });
  }
  if (text.includes(MERCADO_PAGO_LINKS[200])) {
    buttons.push({
      url: MERCADO_PAGO_LINKS[200],
      label: `${prefix} ($200 MXN - Disney)`,
    });
  }
  if (text.includes(MERCADO_PAGO_LINKS[150])) {
    buttons.push({
      url: MERCADO_PAGO_LINKS[150],
      label: `${prefix} ($150 MXN)`,
    });
  }
  if (text.includes(MERCADO_PAGO_LINKS[100])) {
    buttons.push({
      url: MERCADO_PAGO_LINKS[100],
      label: `${prefix} ($100 MXN - iLovePDF)`,
    });
  }
  return buttons;
}

interface ChatbotWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  country: CountryCode;
  profile: UserProfile;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: t.chatbot.welcomeMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionUrl: buildWhatsAppLink('¡Hola! Me comunico desde el Asistente Comercial Oficial para consultar sobre sus servicios.'),
      actionLabel: t.chatbot.confirmAppointmentWhatsAppBtn,
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [botContext, setBotContext] = useState<BotConversationContext>({ state: 'idle' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Keep welcome message synchronized when the user switches the interface language
  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === 'welcome-1'
          ? {
              ...m,
              text: t.chatbot.welcomeMessage,
              actionLabel: t.chatbot.confirmAppointmentWhatsAppBtn,
            }
          : m
      )
    );
  }, [lang, t.chatbot.welcomeMessage, t.chatbot.confirmAppointmentWhatsAppBtn]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputValue).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputValue('');
    setIsLoading(true);

    try {
      const schedule = getSavedScheduleConfig();
      const result = await Promise.race([
        Promise.resolve().then(() =>
          processClientMessageIntelligently(
            textToSend,
            { ...botContext, preferredLang: lang },
            schedule,
            lang
          )
        ),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Assistant timeout exceeded')), 2500)
        ),
      ]);

      setBotContext(result.updatedContext);

      let actionUrl = buildWhatsAppLink(
        `¡Hola Javier! Estaba consultando en el Asistente Oficial sobre: "${textToSend.slice(0, 70)}". Deseo atención directa.`
      );
      let actionLabel = `WhatsApp (${OFFICIAL_WHATSAPP_NUMBER})`;

      if (result.isAppointmentConfirmed && result.confirmedTicket?.whatsAppLink) {
        actionUrl = result.confirmedTicket.whatsAppLink;
        actionLabel = `#${result.confirmedTicket.ticketId} • WhatsApp (${OFFICIAL_WHATSAPP_NUMBER})`;
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: result.replyText || t.chatbot.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionUrl,
        actionLabel,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error processing assistant message:', err);
      const errorText =
        lang === 'en'
          ? '⚠️ An unexpected error occurred while processing your message. Please try again or contact us directly on WhatsApp (+52 662 180 5354).'
          : lang === 'pt'
          ? '⚠️ Ocorreu um erro ao processar sua mensagem. Tente novamente ou fale conosco diretamente no WhatsApp (+52 662 180 5354).'
          : lang === 'fr'
          ? '⚠️ Une erreur est survenue lors du traitement de votre message. Veuillez réessayer ou nous contacter sur WhatsApp (+52 662 180 5354).'
          : '⚠️ Ocurrió un error al procesar tu consulta. Por favor intenta de nuevo o contáctanos directamente por WhatsApp (+52 662 180 5354).';

      const errorMsg: ChatMessage = {
        id: `assistant-err-${Date.now()}`,
        sender: 'assistant',
        text: errorText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionUrl: buildWhatsAppLink(`¡Hola! Deseo atención sobre: ${textToSend}`),
        actionLabel: `WhatsApp (${OFFICIAL_WHATSAPP_NUMBER})`,
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 sm:inset-auto sm:bottom-4 sm:right-4 z-50 w-full sm:w-[420px] sm:max-h-[640px] h-full sm:h-[620px] bg-slate-950 sm:rounded-3xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Top Header */}
      <div className="bg-slate-900/95 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-white text-sm">{t.chatbot.headerTitle}</h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {t.chatbot.headerOnline}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>{t.chatbot.headerSubtitle}:</span>
              <strong className="text-emerald-400">{OFFICIAL_WHATSAPP_NUMBER}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          title={t.chatbot.closeChatTitle}
          className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* WhatsApp Status Subheader */}
      <div className="bg-emerald-950/40 border-b border-emerald-500/20 px-4 py-2 flex items-center justify-between text-[11px] text-emerald-300">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{t.chatbot.inactivityBannerTitle}</span>
        </span>
        <span className="text-slate-400">3-5 min</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const mpButtons =
            msg.sender === 'assistant' ? extractMercadoPagoButtons(msg.text, lang) : [];
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Clickable Mercado Pago Buttons when present */}
                {mpButtons.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-col gap-1.5">
                    {mpButtons.map((btn) => (
                      <a
                        key={btn.url}
                        href={btn.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold px-3 py-1.5 rounded-lg text-xs transition-transform active:scale-95 shadow-md shadow-sky-500/10"
                      >
                        <span className="flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>{btn.label}</span>
                        </span>
                        <ExternalLink className="w-3 h-3 opacity-80 shrink-0" />
                      </a>
                    ))}
                  </div>
                )}

                {/* Action Button to WhatsApp */}
                {msg.actionUrl && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800">
                    <a
                      href={msg.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-transform active:scale-95 shadow-md shadow-emerald-500/10"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                      <span>{msg.actionLabel || t.chatbot.confirmAppointmentWhatsAppBtn}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3.5 py-2.5 rounded-2xl w-fit">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>{t.chatbot.footerNote}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions Chips */}
      <div className="p-2 border-t border-slate-800 bg-slate-900/60 overflow-x-auto flex gap-1.5 no-scrollbar">
        <button
          onClick={() => handleSendMessage(t.chatbot.quickPromptBook)}
          className="shrink-0 text-[11px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold px-2.5 py-1 rounded-lg border border-amber-500/40 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Clock className="w-3 h-3 text-amber-400" />
          <span>⏳ {t.chatbot.inactivityBookNowBtn}</span>
        </button>
        <button
          onClick={() => handleSendMessage(t.chatbot.quickPromptCatalog)}
          className="shrink-0 text-[11px] bg-slate-800/90 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/60 transition-colors cursor-pointer"
        >
          📦 {t.chatbot.quickPromptCatalog}
        </button>
        <button
          onClick={() => handleSendMessage(t.chatbot.quickPromptConcept)}
          className="shrink-0 text-[11px] bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/30 transition-colors cursor-pointer"
        >
          ⚠️ {t.chatbot.quickPromptConcept}
        </button>
        <button
          onClick={() => handleSendMessage(t.chatbot.quickPromptAffiliates)}
          className="shrink-0 text-[11px] bg-slate-800/90 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/60 transition-colors cursor-pointer"
        >
          🎁 {t.chatbot.quickPromptAffiliates}
        </button>
        <button
          onClick={() => handleSendMessage(t.chatbot.quickPromptSchedule)}
          className="shrink-0 text-[11px] bg-slate-800/90 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/60 transition-colors cursor-pointer"
        >
          📅 {t.chatbot.quickPromptSchedule}
        </button>
      </div>

      {/* Input area */}
      <div className="p-3 bg-slate-900 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={t.chatbot.inputPlaceholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-slate-950 border border-slate-700 focus:border-emerald-500 text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            title={t.chatbot.sendBtnTitle}
            className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 flex items-center justify-center transition-all cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
