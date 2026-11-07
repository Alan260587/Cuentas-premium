import React from 'react';
import {
  Sparkles,
  Zap,
  TrendingUp,
  MessageCircle,
  Clock,
  ArrowRight,
  Gift,
  CreditCard,
  Play,
} from 'lucide-react';
import { CountryCode, UserProfile } from '../types';
import { COUNTRIES, buildWhatsAppLink } from '../data/catalog';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroProps {
  country: CountryCode;
  profile: UserProfile;
  onExploreCatalog: () => void;
  onGoToVideo?: () => void;
  onGoToPayments: () => void;
  onGoToAffiliates: () => void;
  onGoToAppointments: () => void;
  onGoToSimulator?: () => void;
  onOpenChat: () => void;
  onOpenSellerPanel?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  country,
  profile,
  onExploreCatalog,
  onGoToVideo,
  onGoToPayments,
  onGoToAffiliates,
  onGoToAppointments,
  onGoToSimulator,
  onOpenChat,
  onOpenSellerPanel,
}) => {
  const { t } = useLanguage();
  const currentCountry = COUNTRIES.find((c) => c.code === country);

  const getLocalizedCountryLabel = () => {
    if (country === 'mexico') return t.countries.mx;
    if (country === 'venezuela') return t.countries.ve;
    if (country === 'colombia') return t.countries.co;
    return t.countries.other;
  };

  const getSubtitleByProfile = () => {
    if (profile === 'afiliado') {
      return `${t.affiliates.subtitle} (${t.affiliates.rule1Title} / ${t.affiliates.rule2Title} / ${t.affiliates.rule3Title})`;
    }
    if (profile === 'atencion') {
      return t.appointments.subtitle;
    }
    return t.hero.subtitle;
  };

  return (
    <section className="relative pt-8 pb-12 sm:pt-14 sm:pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-600/15 via-cyan-600/15 to-purple-600/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner mb-6 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs sm:text-sm font-medium text-slate-300">
              {t.hero.badgeText}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-tight">
            {t.hero.titlePart1}{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>
          </h1>

          {/* Subtitle based on Profile & Country */}
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {getSubtitleByProfile()}
          </p>

          {/* Country context pill */}
          <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-800">
            <span>{t.header.countryLabel}</span>
            <span className="font-bold text-white flex items-center gap-1">
              {currentCountry?.flag} {getLocalizedCountryLabel()}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onExploreCatalog}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-6 py-3.5 rounded-2xl text-sm sm:text-base shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>{t.hero.ctaCatalog}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onGoToVideo && (
              <button
                onClick={onGoToVideo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/50 text-cyan-200 font-bold px-5 py-3.5 rounded-2xl text-sm sm:text-base transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-cyan-500/10"
              >
                <Play className="w-4 h-4 fill-cyan-300 text-cyan-300" />
                <span>{t.hero.ctaVideo}</span>
              </button>
            )}

            {onOpenSellerPanel && (
              <button
                onClick={onOpenSellerPanel}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500/20 to-amber-500/10 hover:from-amber-500/30 hover:to-amber-500/20 border border-amber-500/50 text-amber-300 font-bold px-5 py-3.5 rounded-2xl text-sm sm:text-base transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-amber-500/10"
              >
                <Gift className="w-4 h-4 text-amber-400" />
                <span>{t.hero.ctaSellerPanel}</span>
              </button>
            )}

            <button
              onClick={onOpenChat}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white font-semibold px-5 py-3.5 rounded-2xl text-sm sm:text-base transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t.hero.ctaAssistant}</span>
            </button>

            {onGoToSimulator && (
              <button
                onClick={onGoToSimulator}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 font-bold px-5 py-3.5 rounded-2xl text-sm sm:text-base transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/10"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400 text-slate-950" />
                <span>{t.hero.ctaSimulator}</span>
              </button>
            )}

            <a
              href={buildWhatsAppLink('¡Hola! Deseo asesoría comercial directa por WhatsApp con un agente oficial.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold px-5 py-3.5 rounded-2xl text-sm sm:text-base transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.footer.whatsappDirectBtn}</span>
            </a>
          </div>

          {/* Quick Access Badges Grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl text-left">
            <button
              onClick={onExploreCatalog}
              className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-emerald-500/40 transition-all group flex items-start gap-3 text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{t.hero.statProductsLabel}</div>
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300">
                  {t.hero.statProductsValue}
                </div>
              </div>
            </button>

            <button
              onClick={onGoToPayments}
              className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 transition-all group flex items-start gap-3 text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 group-hover:scale-110 transition-transform">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{t.hero.statPaymentsLabel}</div>
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300">
                  {t.hero.statPaymentsValue}
                </div>
              </div>
            </button>

            <button
              onClick={onGoToAffiliates}
              className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-amber-500/40 transition-all group flex items-start gap-3 text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400 group-hover:scale-110 transition-transform">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{t.hero.statAffiliateLabel}</div>
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300">
                  {t.hero.statAffiliateValue}
                </div>
              </div>
            </button>

            <button
              onClick={onGoToAppointments}
              className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-purple-500/40 transition-all group flex items-start gap-3 text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-purple-400 group-hover:scale-110 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{t.hero.statAppointmentsLabel}</div>
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300">
                  {t.hero.statAppointmentsValue}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
