/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  X,
  User,
  Gift,
  Award,
  Sparkles,
  Copy,
  Check,
  Share2,
  PlusCircle,
  Trash2,
  Send,
  AlertTriangle,
  Info,
  DollarSign,
  Package,
  Calendar,
  ExternalLink,
  RotateCcw,
  Zap,
  Calculator,
} from 'lucide-react';
import {
  SellerSale,
  SELLER_SALE_PRODUCTS,
  getSellerSales,
  addSellerSale,
  deleteSellerSale,
  clearSellerData,
  loadSellerExampleData,
  calculateSellerRewards,
  normalizeSellerCode,
  buildSellerReferralUrl,
  buildClaimRewardWhatsAppUrl,
  buildSendSaleWhatsAppUrl,
  buildShareReferralWhatsAppUrl,
  subscribeSellerSales,
  SELLER_WHATSAPP_DISPLAY,
} from '../data/sellerData';
import { useLanguage } from '../i18n/LanguageContext';
import { PRODUCT_TRANSLATIONS } from '../i18n/productTranslations';

interface SellerPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSellerCode?: string;
}

export const SellerPanelModal: React.FC<SellerPanelModalProps> = ({
  isOpen,
  onClose,
  initialSellerCode = '',
}) => {
  const { lang, t } = useLanguage();
  const [sellerCode, setSellerCode] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('vendedor') || params.get('codigo') || '';
    if (fromUrl) return normalizeSellerCode(fromUrl);
    return normalizeSellerCode(initialSellerCode || localStorage.getItem('sdp_last_seller_code') || '');
  });

  const [inputCode, setInputCode] = useState<string>('');
  const [sales, setSales] = useState<SellerSale[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>(SELLER_SALE_PRODUCTS[0].id);
  const [clientName, setClientName] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [justAddedSale, setJustAddedSale] = useState<SellerSale | null>(null);
  const [claimedRewardMessage, setClaimedRewardMessage] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<'syncing' | 'synced' | 'local'>('synced');

  // Allow closing modal with Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Sync from URL params on load or modal open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const urlCode = params.get('vendedor') || params.get('codigo');
    if (urlCode) {
      const clean = normalizeSellerCode(urlCode);
      if (clean) {
        setSellerCode(clean);
        localStorage.setItem('sdp_last_seller_code', clean);
      }
    } else if (initialSellerCode) {
      const clean = normalizeSellerCode(initialSellerCode);
      if (clean) {
        setSellerCode(clean);
        localStorage.setItem('sdp_last_seller_code', clean);
      }
    }
  }, [isOpen, initialSellerCode]);

  // Load sales from localStorage cache and subscribe to Firestore cloud sync when sellerCode changes
  useEffect(() => {
    if (!sellerCode) {
      setSales([]);
      return;
    }
    setSales(getSellerSales(sellerCode));

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail || customEvent.detail.sellerCode === sellerCode) {
        setSales(getSellerSales(sellerCode));
      }
    };

    window.addEventListener('sdp_seller_sales_updated', handleUpdate);
    const unsubscribeCloud = subscribeSellerSales(sellerCode, (status) => {
      setSyncStatus(status);
    });

    return () => {
      window.removeEventListener('sdp_seller_sales_updated', handleUpdate);
      unsubscribeCloud();
    };
  }, [sellerCode]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = normalizeSellerCode(inputCode);
    if (!clean) return;
    setSellerCode(clean);
    localStorage.setItem('sdp_last_seller_code', clean);
    setInputCode('');
  };

  const handleLogoutSeller = () => {
    setSellerCode('');
    localStorage.removeItem('sdp_last_seller_code');
    setJustAddedSale(null);
  };

  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerCode) return;
    const newSale = addSellerSale(sellerCode, {
      productId: selectedProductId,
      clientName: clientName.trim() || undefined,
    });
    setClientName('');
    setJustAddedSale(newSale);
  };

  const handleDeleteSale = (saleId: string) => {
    if (!sellerCode) return;
    deleteSellerSale(sellerCode, saleId);
    if (justAddedSale?.id === saleId) {
      setJustAddedSale(null);
    }
  };

  const handleLoadExample = () => {
    if (!sellerCode) return;
    loadSellerExampleData(sellerCode);
    setJustAddedSale(null);
  };

  const handleClearData = () => {
    if (!sellerCode) return;
    clearSellerData(sellerCode);
    setJustAddedSale(null);
  };

  const handleCopyLink = () => {
    if (!sellerCode) return;
    const link = buildSellerReferralUrl(sellerCode);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const rewards = calculateSellerRewards(sales);
  const realRewardValueMxn = rewards.totalFreeFigmas * 300 + rewards.totalFreeBaseAccounts * 150;
  const realRewardValueUsd = rewards.totalFreeFigmas * 17.0 + rewards.totalFreeBaseAccounts * 8.74;
  const referralUrl = sellerCode ? buildSellerReferralUrl(sellerCode) : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-0.5 shadow-md shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {t.sellerPanel.title}
                </h2>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {t.sellerPanel.syncBadge}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t.sellerPanel.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {sellerCode && (
              <button
                onClick={handleLogoutSeller}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                title={t.sellerPanel.selectSellerLabel}
              >
                {t.sellerPanel.selectSellerLabel}
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              title={t.sellerPanel.closeBtn}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* STEP 1: LOGIN / PROMPT FOR SELLER CODE IF NOT SET */}
          {!sellerCode ? (
            <div className="max-w-md mx-auto py-8 text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
                <User className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">{t.sellerPanel.selectSellerLabel}</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {t.sellerPanel.subtitle}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3 pt-2">
                <div className="relative">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder={t.sellerPanel.addSellerPlaceholder}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-3 text-center text-lg font-mono font-bold text-white uppercase placeholder:text-slate-600 focus:outline-none transition-all tracking-wider"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputCode.trim()}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>{t.sellerPanel.addSellerBtn}</span>
                </button>
              </form>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 text-left space-y-1">
                <p className="font-semibold text-slate-300 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-cyan-400" /> {t.sellerPanel.directLinkInfoTitle}
                </p>
                <p>
                  {t.sellerPanel.directLinkInfoBody}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Active Seller Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 bg-slate-950/70 border border-slate-800 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
                    {sellerCode.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-slate-400">{t.sellerPanel.selectSellerLabel}</span>
                      <span className="font-mono font-extrabold text-sm sm:text-base text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {sellerCode}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          syncStatus === 'synced'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : syncStatus === 'syncing'
                            ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {syncStatus === 'synced'
                          ? `☁️ ${t.sellerPanel.cloudSyncedFirestore}`
                          : syncStatus === 'syncing'
                          ? `🔄 ${t.sellerPanel.syncingStatus}`
                          : `💾 ${t.sellerPanel.localCacheStatus}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {t.sellerPanel.personalStatsSub}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {rewards.hasExampleData ? (
                    <button
                      onClick={handleClearData}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 text-xs font-semibold transition-all cursor-pointer"
                      title={t.sellerPanel.clearExampleBtn}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.sellerPanel.clearExampleBtn}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleLoadExample}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all cursor-pointer"
                      title={t.sellerPanel.loadExampleBtn}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{t.sellerPanel.loadExampleBtn}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* EXAMPLE DATA ALERT BADGE */}
              {rewards.hasExampleData && (
                <div className="p-3 bg-amber-500/15 border border-amber-500/30 rounded-xl flex items-center gap-2.5 text-xs text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>{t.sellerPanel.exampleModeActiveTitle}</strong> {t.sellerPanel.exampleModeActiveText}
                  </span>
                </div>
              )}

              {/* SUMMARY STATS GRID */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Total Sold */}
                <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium block">{t.sellerPanel.totalSoldLabel}</span>
                  <div className="mt-1">
                    <span className="text-lg sm:text-xl font-extrabold text-emerald-400">
                      ${rewards.totalSoldMxn.toLocaleString()} MXN
                    </span>
                    <span className="block text-xs font-semibold text-slate-400">
                      ${rewards.totalSoldUsd.toFixed(2)} USDT
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    {rewards.totalSalesCount} {rewards.totalSalesCount === 1 ? t.sellerPanel.saleRegisteredSingular : t.sellerPanel.saleRegisteredPlural}
                  </span>
                </div>

                {/* Figma Sales */}
                <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-emerald-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-semibold">{t.sellerPanel.metricFigmaSold}</span>
                    <Package className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-xl sm:text-2xl font-black text-white">
                      {rewards.figmaCount}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-300/80 block mt-0.5">
                    $300 MXN / 17.00 USDT {t.sellerPanel.eachAbbr}
                  </span>
                </div>

                {/* Base Sales */}
                <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-cyan-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-cyan-400 font-semibold">{t.sellerPanel.metricBaseSold}</span>
                    <Package className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-xl sm:text-2xl font-black text-white">
                      {rewards.baseCount}
                    </span>
                  </div>
                  <span className="text-[10px] text-cyan-300/80 block mt-0.5">
                    $150 MXN / 8.74 USDT {t.sellerPanel.eachAbbr}
                  </span>
                </div>

                {/* Earned Rewards Summary */}
                <div className="p-3.5 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-amber-300 font-semibold">{t.sellerPanel.metricTotalEarned}</span>
                    <Gift className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="mt-1 text-xs font-bold text-white space-y-0.5">
                    <div className="text-amber-300 font-extrabold text-sm sm:text-base">
                      {rewards.totalFreeFigmas} {t.affiliates.simFreeFigmaUnit}
                    </div>
                    <div className="text-cyan-300 font-bold text-xs">
                      + {rewards.totalFreeBaseAccounts} {t.affiliates.simFreeBaseUnit}
                    </div>
                  </div>
                </div>
              </div>

              {/* REWARD RULES & PROGRESS SECTION */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-400" />
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {t.sellerPanel.rulesProgressTitle}
                    </h3>
                  </div>
                  <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                    {t.sellerPanel.cumulativeBadge}
                  </span>
                </div>

                {/* MANDATORY CLARIFICATION BLOCK */}
                <div className="p-3.5 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                    <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{t.sellerPanel.clarificationTitle}</span>
                  </div>
                  <p className="leading-relaxed font-semibold text-white">
                    {t.sellerPanel.clarificationBody}
                  </p>
                  <p className="text-[11px] text-cyan-200/90 bg-slate-900/80 p-2 rounded-lg border border-cyan-500/20 font-mono">
                    <strong>{t.sellerPanel.clarificationExample}</strong>
                    <br />
                    {t.sellerPanel.clarificationFormulas}
                  </p>
                </div>

                {/* 3 PROGRESS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* RULE 1 */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-emerald-400">{t.sellerPanel.rule1ShortTitle}</span>
                        <span className="font-mono text-emerald-300 font-semibold">
                          {rewards.figmaCount} {t.sellerPanel.soldFemLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-tight">
                        {t.sellerPanel.rule1ShortDesc}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>{t.sellerPanel.currentCycleLabel} {rewards.rule1CycleProgress} / 3</span>
                        <span>{t.sellerPanel.missingLabel} {3 - rewards.rule1CycleProgress === 3 ? 3 : 3 - rewards.rule1CycleProgress}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-300"
                          style={{ width: `${(rewards.rule1CycleProgress / 3) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">{t.sellerPanel.earnedLabel}</span>
                        <span className="font-extrabold text-emerald-400 text-sm">
                          {rewards.rule1Earned} {rewards.rule1Earned === 1 ? 'Figma' : 'Figmas'}
                        </span>
                      </div>

                      {rewards.rule1Earned > 0 ? (
                        <a
                          href={buildClaimRewardWhatsAppUrl(
                            sellerCode,
                            `${rewards.rule1Earned} Licencia(s) Figma Pro gratis`,
                            'Regla 1 (Cada 3 Figma Pro vendidas = 1 gratis)'
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs shadow transition-all cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>{t.sellerPanel.claimShortBtn}</span>
                        </a>
                      ) : (
                        <span className="text-[10px] text-slate-500">{t.sellerPanel.noRewardYetLabel}</span>
                      )}
                    </div>
                  </div>

                  {/* RULE 2 */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-cyan-400">{t.sellerPanel.rule2ShortTitle}</span>
                        <span className="font-mono text-cyan-300 font-semibold">
                          {rewards.baseCount} {t.sellerPanel.soldMascLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-tight">
                        {t.sellerPanel.rule2ShortDesc}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>{t.sellerPanel.currentCycleLabel} {rewards.rule2CycleProgress} / 6</span>
                        <span>{t.sellerPanel.missingLabel} {6 - rewards.rule2CycleProgress === 6 ? 6 : 6 - rewards.rule2CycleProgress}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 transition-all duration-300"
                          style={{ width: `${(rewards.rule2CycleProgress / 6) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">{t.sellerPanel.earnedLabel}</span>
                        <span className="font-extrabold text-cyan-400 text-sm">
                          {rewards.rule2Earned} {rewards.rule2Earned === 1 ? 'Figma' : 'Figmas'}
                        </span>
                      </div>

                      {rewards.rule2Earned > 0 ? (
                        <a
                          href={buildClaimRewardWhatsAppUrl(
                            sellerCode,
                            `${rewards.rule2Earned} Licencia(s) Figma Pro gratis`,
                            'Regla 2 (Cada 6 servicios base de $150 = 1 Figma gratis)'
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs shadow transition-all cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>{t.sellerPanel.claimShortBtn}</span>
                        </a>
                      ) : (
                        <span className="text-[10px] text-slate-500">{t.sellerPanel.noRewardYetLabel}</span>
                      )}
                    </div>
                  </div>

                  {/* RULE 3 */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-amber-400">{t.sellerPanel.rule3ShortTitle}</span>
                        <span className="font-mono text-amber-300 font-semibold">
                          {rewards.baseCount} {t.sellerPanel.soldMascLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-tight">
                        {t.sellerPanel.rule3ShortDesc}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>{t.sellerPanel.currentCycleLabel} {rewards.rule3CycleProgress} / 4</span>
                        <span>{t.sellerPanel.missingLabel} {4 - rewards.rule3CycleProgress === 4 ? 4 : 4 - rewards.rule3CycleProgress}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 transition-all duration-300"
                          style={{ width: `${(rewards.rule3CycleProgress / 4) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">{t.sellerPanel.earnedLabel}</span>
                        <span className="font-extrabold text-amber-400 text-sm">
                          {rewards.rule3Earned} {rewards.rule3Earned === 1 ? t.sellerPanel.account150Singular : t.sellerPanel.account150Plural}
                        </span>
                      </div>

                      {rewards.rule3Earned > 0 ? (
                        <a
                          href={buildClaimRewardWhatsAppUrl(
                            sellerCode,
                            `${rewards.rule3Earned} Cuenta(s) gratis de $150 (a elegir: Gemini, Coursera, CapCut o Microsoft)`,
                            'Regla 3 (Cada 4 servicios base de $150 = 1 cuenta de $150 gratis)'
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs shadow transition-all cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>{t.sellerPanel.claimShortBtn}</span>
                        </a>
                      ) : (
                        <span className="text-[10px] text-slate-500">{t.sellerPanel.noRewardYetLabel}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* REAL SIMULATOR RESULTS BLOCK (VENTAS REALES REGISTRADAS) */}
              <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {t.sellerPanel.realSimResultsTitle}
                    </h3>
                  </div>
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                    {t.sellerPanel.realSalesBadge}
                  </span>
                </div>

                {/* Note about real sales vs projection */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">
                      {t.sellerPanel.realSimNoteTitle}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {t.sellerPanel.realSimNoteDesc
                        .replace('{figma}', String(rewards.figmaCount))
                        .replace('{base}', String(rewards.baseCount))}{' '}
                      <span className="font-mono text-amber-300">{sellerCode}</span>.
                    </p>
                  </div>
                </div>

                {/* 3 Real Rules Bars & Results */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Real Rule 1 */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/20 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-400">{t.sellerPanel.realRule1Title}</span>
                      <span className="text-[10px] font-mono text-slate-400">{rewards.figmaCount} {t.sellerPanel.realCountSuffix}</span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      {t.sellerPanel.realRule1Sub}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>{t.sellerPanel.barLabel} (0–3):</span>
                        <span className="font-semibold text-emerald-300">{rewards.rule1CycleProgress} / 3</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-300"
                          style={{ width: `${(rewards.rule1CycleProgress / 3) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{t.sellerPanel.realRewardLabel}</span>
                      <span className="font-extrabold text-emerald-400">
                        {rewards.rule1Earned} {rewards.rule1Earned === 1 ? t.sellerPanel.freeFigmaSingular : t.sellerPanel.freeFigmaPlural}
                      </span>
                    </div>
                  </div>

                  {/* Real Rule 2 */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/20 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-cyan-400">{t.sellerPanel.realRule2Title}</span>
                      <span className="text-[10px] font-mono text-slate-400">{rewards.baseCount} {t.sellerPanel.realCountSuffix}</span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      {t.sellerPanel.realRule2Sub}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>{t.sellerPanel.barLabel} (0–6):</span>
                        <span className="font-semibold text-cyan-300">{rewards.rule2CycleProgress} / 6</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 transition-all duration-300"
                          style={{ width: `${(rewards.rule2CycleProgress / 6) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{t.sellerPanel.realRewardLabel}</span>
                      <span className="font-extrabold text-cyan-400">
                        {rewards.rule2Earned} {rewards.rule2Earned === 1 ? t.sellerPanel.freeFigmaSingular : t.sellerPanel.freeFigmaPlural}
                      </span>
                    </div>
                  </div>

                  {/* Real Rule 3 */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/20 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-400">{t.sellerPanel.realRule3Title}</span>
                      <span className="text-[10px] font-mono text-slate-400">{rewards.baseCount} {t.sellerPanel.realCountSuffix}</span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      {t.sellerPanel.realRule3Sub}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>{t.sellerPanel.barLabel} (0–4):</span>
                        <span className="font-semibold text-amber-300">{rewards.rule3CycleProgress} / 4</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 transition-all duration-300"
                          style={{ width: `${(rewards.rule3CycleProgress / 4) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{t.sellerPanel.realRewardLabel}</span>
                      <span className="font-extrabold text-amber-400">
                        {rewards.rule3Earned} {rewards.rule3Earned === 1 ? t.sellerPanel.freeBaseAccountSingular : t.sellerPanel.freeBaseAccountPlural}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Explicit Real Breakdown and Totals */}
                <div className="p-3.5 bg-gradient-to-r from-slate-900 to-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      {t.sellerPanel.consolidatedBreakdownLabel}
                    </span>
                    <div className="font-semibold text-slate-200 mt-0.5">
                      {t.affiliates.rule1Tag} = <span className="text-emerald-400">{rewards.rule1Earned} {t.sellerPanel.freeFigmaSingular}</span> | {t.affiliates.rule2Tag} = <span className="text-cyan-400">{rewards.rule2Earned} {t.sellerPanel.freeFigmaSingular}</span> | {t.affiliates.rule3Tag} = <span className="text-amber-400">{rewards.rule3Earned} {rewards.rule3Earned === 1 ? t.sellerPanel.freeBaseAccountSingular : t.sellerPanel.freeBaseAccountPlural}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {t.sellerPanel.sameBaseSalesNote.replace('{base}', String(rewards.baseCount))}
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      {t.sellerPanel.totalRealEarnedLabel}
                    </span>
                    <span className="font-extrabold text-sm sm:text-base text-white block">
                      {rewards.totalFreeFigmas} Figma Pro + {rewards.totalFreeBaseAccounts} {rewards.totalFreeBaseAccounts === 1 ? t.sellerPanel.account150Singular : t.sellerPanel.account150Plural}
                    </span>
                    <span className="text-xs text-emerald-400 font-bold">
                      ${realRewardValueMxn.toLocaleString()} MXN / ${realRewardValueUsd.toFixed(2)} USDT
                    </span>
                  </div>
                </div>
              </div>

              {/* REFERRAL LINK SECTION */}
              <div className="p-4 sm:p-5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    {t.sellerPanel.referralLinkTitle}
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  {t.sellerPanel.referralLinkDesc}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <input
                    type="text"
                    readOnly
                    value={referralUrl}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all cursor-pointer"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">{t.sellerPanel.copiedLinkBtn}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t.sellerPanel.copyLinkBtn}</span>
                        </>
                      )}
                    </button>
                    <a
                      href={buildShareReferralWhatsAppUrl(sellerCode)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.sellerPanel.shareWhatsAppBtn}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* REGISTER NEW SALE FORM */}
              <div className="p-4 sm:p-5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {t.sellerPanel.tabRegisterSale}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {t.sellerPanel.syncBadge}
                  </span>
                </div>

                <form onSubmit={handleAddSale} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.sellerPanel.saleProductLabel}:
                      </label>
                      <select
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-400 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      >
                        {SELLER_SALE_PRODUCTS.map((p) => {
                          const localizedName = PRODUCT_TRANSLATIONS[lang]?.[p.id]?.name || p.name;
                          return (
                            <option key={p.id} value={p.id}>
                              {localizedName} — ${p.priceMxn} MXN / ${p.priceUsd.toFixed(2)} {p.currencyType}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.sellerPanel.saleClientNameLabel}:
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder={t.appointments.clientNamePlaceholder}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-400 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                    <p className="text-[11px] text-slate-400 leading-tight">
                      ℹ️ {t.sellerPanel.syncBadge} ({SELLER_WHATSAPP_DISPLAY}).
                    </p>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>{t.sellerPanel.registerSaleBtn}</span>
                    </button>
                  </div>
                </form>

                {/* Direct Send Confirmation Banner when a sale is just added */}
                {justAddedSale && (
                  <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
                    <div className="text-xs text-emerald-200">
                      <strong className="text-white">{t.sellerPanel.registerSaleBtn} ✓</strong>
                      <span className="block text-slate-300">
                        {PRODUCT_TRANSLATIONS[lang]?.[justAddedSale.productId]?.name || justAddedSale.productName} (${justAddedSale.priceMxn} MXN)
                      </span>
                    </div>
                    <a
                      href={buildSendSaleWhatsAppUrl(sellerCode, justAddedSale)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold rounded-lg shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.sellerPanel.claimViaWhatsAppBtn}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* SALES HISTORY TABLE */}
              <div className="p-4 sm:p-5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {t.sellerPanel.tabHistory} ({sales.length})
                    </h3>
                  </div>
                </div>

                {sales.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 space-y-2">
                    <Package className="w-8 h-8 mx-auto text-slate-600 stroke-[1.5]" />
                    <p className="text-xs">{t.sellerPanel.tabHistory}: 0 ({sellerCode})</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-800/80 max-h-72 overflow-y-auto pr-1">
                    {sales.map((sale) => (
                      <div
                        key={sale.id}
                        className="py-2.5 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white truncate">
                              {PRODUCT_TRANSLATIONS[lang]?.[sale.productId]?.name || sale.productName}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                sale.category === 'figma'
                                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                                  : sale.category === 'streaming'
                                  ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                                  : sale.category === 'excluded'
                                  ? 'bg-slate-500/15 text-slate-300 border border-slate-500/20'
                                  : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20'
                              }`}
                            >
                              {sale.category === 'figma'
                                ? 'Figma'
                                : sale.category === 'streaming'
                                ? 'Streaming'
                                : sale.category === 'excluded'
                                ? 'Sin Recompensa'
                                : t.sellerPanel.base150Tag}
                            </span>
                            {sale.isExample && (
                              <span className="text-[9px] font-bold bg-amber-500/20 text-amber-300 px-1 rounded">
                                {t.sellerPanel.exampleBadge}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 flex-wrap">
                            <span>${sale.priceMxn} MXN (${sale.priceUsd.toFixed(2)} {sale.currencyType})</span>
                            {sale.clientName && (
                              <>
                                <span>•</span>
                                <span className="text-slate-300">{t.sellerPanel.clientPrefix}: {sale.clientName}</span>
                              </>
                            )}
                            <span>•</span>
                            <span className="text-slate-500">
                              {new Date(sale.createdAt).toLocaleDateString(lang === 'es' ? 'es-MX' : lang, {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <a
                            href={buildSendSaleWhatsAppUrl(sellerCode, sale)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 transition-all cursor-pointer"
                            title={t.sellerPanel.sendSaleWhatsAppTitle}
                          >
                            <Send className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDeleteSale(sale.id)}
                            className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 transition-all cursor-pointer"
                            title={t.sellerPanel.deleteSaleTitle}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 sm:px-6 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{t.sellerPanel.officialChannelWhatsAppLabel} <strong className="text-emerald-400 font-mono">{SELLER_WHATSAPP_DISPLAY}</strong></span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-all cursor-pointer"
          >
            {t.sellerPanel.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
