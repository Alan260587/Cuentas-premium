import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const TopWhatsAppAlertBanner: React.FC = () => {
  const { t } = useLanguage();
  // Use ONLY useState (no localStorage, sessionStorage, or cookies) so the banner reappears on every reload/visit
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="w-full z-50 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 text-white border-b-4 border-amber-300 shadow-2xl px-4 py-4 sm:px-6 sm:py-5 relative"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-950/90 border-2 border-amber-300 flex items-center justify-center shrink-0 shadow-lg">
            <span className="text-2xl sm:text-3xl leading-none" aria-hidden="true">
              ⚠️
            </span>
          </div>
          <p className="text-xl md:text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] leading-snug">
            {t.noticeBanner.topWhatsAppAlertMessage}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-center">
          <a
            href="https://wa.me/526621805354"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base sm:text-lg px-5 py-3 rounded-xl border-2 border-white/90 shadow-xl shadow-slate-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-slate-950" />
            <span>{t.noticeBanner.topWhatsAppAlertBtn}</span>
          </a>

          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label={t.noticeBanner.topWhatsAppAlertClose}
            title={t.noticeBanner.topWhatsAppAlertClose}
            className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-950/85 hover:bg-slate-900 text-white border-2 border-amber-200/80 shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.75]" />
          </button>
        </div>
      </div>
    </div>
  );
};
