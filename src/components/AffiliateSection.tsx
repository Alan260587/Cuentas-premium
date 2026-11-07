import React, { useState } from 'react';
import {
  TrendingUp,
  Gift,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Zap,
  Calculator,
} from 'lucide-react';
import { OFFICIAL_WHATSAPP_NUMBER, buildWhatsAppLink } from '../data/catalog';
import { useLanguage } from '../i18n/LanguageContext';

interface AffiliateSectionProps {
  onOpenSellerPanel?: () => void;
}

export const AffiliateSection: React.FC<AffiliateSectionProps> = ({ onOpenSellerPanel }) => {
  const { t } = useLanguage();
  const [figmaSales, setFigmaSales] = useState<number>(3);
  const [baseSales, setBaseSales] = useState<number>(12);

  // Affiliate reward rules calculation:
  // Rule 1: Every 3 Figmas sold = 1 Figma Pro free
  const freeFigmasFromFigma = Math.floor(figmaSales / 3);
  const figmaProgressToNext = figmaSales % 3;

  // Rule 2: Every 6 products of 150 MXN (Coursera, Gemini, CapCut, Office) = 1 Figma Pro free
  const freeFigmasFromBase = Math.floor(baseSales / 6);
  const baseProgressToNext = baseSales % 6;

  // Rule 3 (NEW): Every 4 products of 150 MXN = 1 free account of $150 (Gemini, Coursera, etc.)
  const freeBaseFromBase = Math.floor(baseSales / 4);
  const baseProgressToNextAccount = baseSales % 4;

  const totalFreeFigmas = freeFigmasFromFigma + freeFigmasFromBase;
  const totalRewardValueMxn = totalFreeFigmas * 300 + freeBaseFromBase * 150;
  const totalRewardValueUsd = totalFreeFigmas * 17.0 + freeBaseFromBase * 8.74;

  const affiliateWhatsAppUrl = buildWhatsAppLink(`¡Hola! Deseo unirme al Programa Oficial de Afiliados de Servicios Digitales Premium.

Quiero registrarme como vendedor oficial para promocionar las licencias digitales y ganar recompensas por metas de ventas.

WhatsApp de canalización: ${OFFICIAL_WHATSAPP_NUMBER}`);

  return (
    <section id="afiliados" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20 mb-3">
            <TrendingUp className="w-3.5 h-3.5" /> {t.affiliates.badge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.affiliates.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            {t.affiliates.subtitle}
          </p>
        </div>

        {/* 3 Core Rules Graphic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Rule 1 Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-7 rounded-2xl border border-emerald-500/30 relative overflow-hidden shadow-lg shadow-emerald-500/5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                {t.affiliates.rule1Tag}
              </span>
              <Gift className="w-5 h-5 text-emerald-400" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{t.affiliates.rule1Title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.affiliates.rule1Desc}
            </p>

            <div className="mt-5 p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">{t.affiliates.goalLabel}:</span>
              <span className="font-bold text-emerald-400">{t.affiliates.rule1Reward}</span>
            </div>
          </div>

          {/* Rule 2 Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-7 rounded-2xl border border-cyan-500/30 relative overflow-hidden shadow-lg shadow-cyan-500/5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                {t.affiliates.rule2Tag}
              </span>
              <Award className="w-5 h-5 text-cyan-400" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{t.affiliates.rule2Title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.affiliates.rule2Desc}
            </p>

            <div className="mt-5 p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">{t.affiliates.goalLabel}:</span>
              <span className="font-bold text-cyan-400">{t.affiliates.rule2Reward}</span>
            </div>
          </div>

          {/* Rule 3 Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-7 rounded-2xl border border-amber-500/30 relative overflow-hidden shadow-lg shadow-amber-500/5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                {t.affiliates.rule3Tag}
              </span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{t.affiliates.rule3Title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.affiliates.rule3Desc}
            </p>

            <div className="mt-5 p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">{t.affiliates.goalLabel}:</span>
              <span className="font-bold text-amber-400">{t.affiliates.rule3Reward}</span>
            </div>
          </div>
        </div>

        {/* Interactive Simulator / Calculator - PROYECCIÓN */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl relative">
          {/* PROYECCIÓN TAG */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {t.affiliates.simTitle}
                  </h3>
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                    {t.affiliates.simBadge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  {t.affiliates.simSubtitle}
                </p>
              </div>
            </div>

            {/* Direct button to open existing Seller Panel */}
            {onOpenSellerPanel && (
              <button
                type="button"
                onClick={onOpenSellerPanel}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow transition-all cursor-pointer shrink-0"
              >
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>{t.affiliates.openSellerPanelBtn}</span>
              </button>
            )}
          </div>

          {/* Mandatory Non-Exclusive Clarification */}
          <div className="mt-4 p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs text-slate-300 flex items-start gap-2">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-cyan-300">{t.affiliates.cumulativeBannerTitle}</strong>{' '}
              {t.affiliates.cumulativeBannerDesc}
            </p>
          </div>

          {/* Sliders for Projections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-slate-800">
            {/* Control 1: Figma Sales Slider */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-semibold text-slate-200">
                  {t.affiliates.simFigmaInputLabel}:
                </label>
                <span className="text-base font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
                  {figmaSales}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="21"
                step="1"
                value={figmaSales}
                onChange={(e) => setFigmaSales(parseInt(e.target.value) || 0)}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <span className="text-[11px] text-slate-400 block">
                {t.affiliates.simFigmaInputSub}
              </span>
            </div>

            {/* Control 2: Base Products Sales Slider */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-semibold text-slate-200">
                  {t.affiliates.simBaseInputLabel}:
                </label>
                <span className="text-base font-extrabold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-lg border border-cyan-500/20">
                  {baseSales}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={baseSales}
                onChange={(e) => setBaseSales(parseInt(e.target.value) || 0)}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <span className="text-[11px] text-slate-400 block">
                {t.affiliates.simBaseInputSub}
              </span>
            </div>
          </div>

          {/* 3 COMPLETE RULES BREAKDOWN - PROYECCIÓN */}
          <div className="py-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-300">
                {t.affiliates.simRewardsTitle}
              </h4>
              <button
                type="button"
                onClick={() => {
                  setFigmaSales(3);
                  setBaseSales(12);
                }}
                className="text-[11px] text-amber-400 hover:text-amber-300 font-mono underline cursor-pointer"
              >
                {t.affiliates.simResetBtn}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Rule 1 Simulator Result */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-emerald-400">{t.affiliates.simRule1ResultLabel}</span>
                    <span className="text-[10px] text-slate-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                      {figmaSales}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    3 Figma Pro = <strong>1 Figma Pro</strong>
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{t.affiliates.simCycleProgress} (0–3):</span>
                    <span className="font-semibold text-emerald-300">{figmaProgressToNext} / 3</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${(figmaProgressToNext / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{t.affiliates.rule1Tag}:</span>
                  <span className="font-black text-emerald-400 text-sm">
                    {freeFigmasFromFigma} {t.affiliates.simFreeFigmaUnit}
                  </span>
                </div>
              </div>

              {/* Rule 2 Simulator Result */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-cyan-400">{t.affiliates.simRule2ResultLabel}</span>
                    <span className="text-[10px] text-slate-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-mono">
                      {baseSales}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    6 Base ($150) = <strong>1 Figma Pro</strong>
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{t.affiliates.simCycleProgress} (0–6):</span>
                    <span className="font-semibold text-cyan-300">{baseProgressToNext} / 6</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 transition-all duration-300"
                      style={{ width: `${(baseProgressToNext / 6) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{t.affiliates.rule2Tag}:</span>
                  <span className="font-black text-cyan-400 text-sm">
                    {freeFigmasFromBase} {t.affiliates.simFreeFigmaUnit}
                  </span>
                </div>
              </div>

              {/* Rule 3 Simulator Result */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-amber-400">{t.affiliates.simRule3ResultLabel}</span>
                    <span className="text-[10px] text-slate-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-mono">
                      {baseSales}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    4 Base ($150) = <strong>1 ($150 MXN)</strong>
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{t.affiliates.simCycleProgress} (0–4):</span>
                    <span className="font-semibold text-amber-300">{baseProgressToNextAccount} / 4</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{ width: `${(baseProgressToNextAccount / 4) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{t.affiliates.rule3Tag}:</span>
                  <span className="font-black text-amber-400 text-sm">
                    {freeBaseFromBase} {t.affiliates.simFreeBaseUnit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Box - Explicit Projections Totals */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-slate-950 to-cyan-500/10 border border-slate-700/80 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    {t.affiliates.simTotalValueLabel}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                    {t.affiliates.simBadge}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-200 mt-1">
                  {t.affiliates.rule1Tag} = <span className="text-emerald-400">{freeFigmasFromFigma} {t.affiliates.simFreeFigmaUnit}</span> | {t.affiliates.rule2Tag} = <span className="text-cyan-400">{freeFigmasFromBase} {t.affiliates.simFreeFigmaUnit}</span> | {t.affiliates.rule3Tag} = <span className="text-amber-400">{freeBaseFromBase} {t.affiliates.simFreeBaseUnit}</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-white mt-1">
                  Total: {totalFreeFigmas} {t.affiliates.simFreeFigmaUnit}
                  {freeBaseFromBase > 0 && ` + ${freeBaseFromBase} ${t.affiliates.simFreeBaseUnit}`}
                </div>
                <div className="text-xs text-emerald-400 font-semibold mt-0.5">
                  ${totalRewardValueMxn.toLocaleString()} MXN / ${totalRewardValueUsd.toFixed(2)} USDT
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0">
              {onOpenSellerPanel && (
                <button
                  type="button"
                  onClick={onOpenSellerPanel}
                  className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 font-bold px-4 py-3 rounded-xl text-xs sm:text-sm shadow transition-all cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>{t.affiliates.openSellerPanelBtn}</span>
                </button>
              )}
              <a
                href={affiliateWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-extrabold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>WhatsApp ({OFFICIAL_WHATSAPP_NUMBER})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
