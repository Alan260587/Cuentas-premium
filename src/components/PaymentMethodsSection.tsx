import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Copy,
  Check,
  AlertCircle,
  Building,
  Coins,
  Send,
  UserCheck,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { CountryCode, Product } from '../types';
import {
  BANK_DETAILS,
  getSavedProducts,
  OFFICIAL_BENEFICIARY,
  OFFICIAL_WHATSAPP_NUMBER,
  MERCADO_PAGO_150_PRODUCT_NAMES,
  buildWhatsAppLink,
  getMercadoPagoLinkByPrice,
  getMercadoPagoLinkForProduct,
} from '../data/catalog';
import { useLanguage } from '../i18n/LanguageContext';

interface PaymentMethodsSectionProps {
  country: CountryCode;
}

export const PaymentMethodsSection: React.FC<PaymentMethodsSectionProps> = ({ country }) => {
  const { t, lang, localizeProduct } = useLanguage();
  const [liveProducts, setLiveProducts] = useState<Product[]>(() => getSavedProducts());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [recommendedBy, setRecommendedBy] = useState<string>('');
  const [isNoRecommender, setIsNoRecommender] = useState<boolean>(false);

  const mpLabels = {
    es: {
      sectionTitle: '💳 Pagar con Mercado Pago (Enlaces Oficiales por Producto y Precio)',
      verifiedBadge: 'MXN Verificado',
      sectionSubtitle: 'Selecciona el botón correspondiente al producto y precio exacto que deseas adquirir:',
      tier300Label: 'Nivel $300 MXN',
      tier300Title: 'Figma Pro (.edu) / Netflix 12 Meses',
      tier300Desc: 'Para Figma Pro (2 Años) y Netflix Premium (12 Meses) — $300 MXN / 17.00 USDT.',
      tier300Btn: 'Pagar con Mercado Pago ($300 MXN)',
      tier200Label: 'Nivel $200 MXN',
      tier200Title: 'Disney 12 Meses / 1 Año',
      tier200Desc: 'Exclusivo para Disney premium 1 año completo y Disney 12 meses cuenta completa ($200 MXN / $11.66 USDT).',
      tier200Btn: 'Pagar con Mercado Pago ($200 MXN)',
      tier150Label: 'Nivel $150 MXN',
      tier150Badge: '$150 MXN c/u',
      tier150Title: 'Productos de $150 MXN',
      tier150Desc: `${MERCADO_PAGO_150_PRODUCT_NAMES.join(', ')}.`,
      tier150Btn: 'Pagar con Mercado Pago ($150 MXN)',
      tier100Label: 'Nivel $100 MXN',
      tier100Title: 'ilove pdf premium 12 meses',
      tier100Desc: 'Exclusivo para iLovePDF Premium 12 Meses ($100 MXN / 5.83 USDT).',
      tier100Btn: 'Pagar con Mercado Pago ($100 MXN)',
      directHeader: (count: number) => `Acceso directo por producto (${count} productos activos en el catálogo):`,
      payBtnShort: 'Pagar con Mercado Pago',
    },
    en: {
      sectionTitle: '💳 Pay with Mercado Pago (Official Links by Product & Exact Price)',
      verifiedBadge: 'Verified MXN',
      sectionSubtitle: 'Select the button corresponding to the exact product and price you wish to purchase:',
      tier300Label: '$300 MXN Tier',
      tier300Title: 'Figma Pro (.edu) / Netflix 12 Months',
      tier300Desc: 'For Figma Pro (2 Years) and Netflix Premium (12 Months) — $300 MXN / 17.00 USDT.',
      tier300Btn: 'Pay with Mercado Pago ($300 MXN)',
      tier200Label: '$200 MXN Tier',
      tier200Title: 'Disney+ 12 Months / 1 Full Year',
      tier200Desc: 'Exclusive for Disney+ Premium Full 1 Year and Disney+ 12 Months Full Account ($200 MXN / $11.66 USDT).',
      tier200Btn: 'Pay with Mercado Pago ($200 MXN)',
      tier150Label: '$150 MXN Tier',
      tier150Badge: '$150 MXN each',
      tier150Title: '$150 MXN Products',
      tier150Desc: `${MERCADO_PAGO_150_PRODUCT_NAMES.join(', ')}.`,
      tier150Btn: 'Pay with Mercado Pago ($150 MXN)',
      tier100Label: '$100 MXN Tier',
      tier100Title: 'iLovePDF Premium 12 Months',
      tier100Desc: 'Exclusive for iLovePDF Premium 12 Months ($100 MXN / 5.83 USDT).',
      tier100Btn: 'Pay with Mercado Pago ($100 MXN)',
      directHeader: (count: number) => `Direct access by product (${count} active products in the catalog):`,
      payBtnShort: 'Pay with Mercado Pago',
    },
    pt: {
      sectionTitle: '💳 Pagar com Mercado Pago (Links Oficiais por Produto e Preço)',
      verifiedBadge: 'MXN Verificado',
      sectionSubtitle: 'Selecione o botão correspondente ao produto e preço exato que deseja adquirir:',
      tier300Label: 'Nível $300 MXN',
      tier300Title: 'Figma Pro (.edu) / Netflix 12 Meses',
      tier300Desc: 'Para Figma Pro (2 Anos) e Netflix Premium (12 Meses) — $300 MXN / 17.00 USDT.',
      tier300Btn: 'Pagar com Mercado Pago ($300 MXN)',
      tier200Label: 'Nível $200 MXN',
      tier200Title: 'Disney+ 12 Meses / 1 Ano Completo',
      tier200Desc: 'Exclusivo para Disney+ Premium 1 Ano Completo e Disney+ 12 Meses Conta Completa ($200 MXN / $11.66 USDT).',
      tier200Btn: 'Pagar com Mercado Pago ($200 MXN)',
      tier150Label: 'Nível $150 MXN',
      tier150Badge: '$150 MXN cada',
      tier150Title: 'Produtos de $150 MXN',
      tier150Desc: `${MERCADO_PAGO_150_PRODUCT_NAMES.join(', ')}.`,
      tier150Btn: 'Pagar com Mercado Pago ($150 MXN)',
      tier100Label: 'Nível $100 MXN',
      tier100Title: 'iLovePDF Premium 12 Meses',
      tier100Desc: 'Exclusivo para iLovePDF Premium 12 Meses ($100 MXN / 5.83 USDT).',
      tier100Btn: 'Pagar com Mercado Pago ($100 MXN)',
      directHeader: (count: number) => `Acesso direto por produto (${count} produtos ativos no catálogo):`,
      payBtnShort: 'Pagar com Mercado Pago',
    },
    fr: {
      sectionTitle: '💳 Payer avec Mercado Pago (Liens Officiels par Produit et Prix Exact)',
      verifiedBadge: 'MXN Vérifié',
      sectionSubtitle: 'Sélectionnez le bouton correspondant au produit et au prix exact que vous souhaitez acheter :',
      tier300Label: 'Palier $300 MXN',
      tier300Title: 'Figma Pro (.edu) / Netflix 12 Mois',
      tier300Desc: 'Pour Figma Pro (2 Ans) et Netflix Premium (12 Mois) — $300 MXN / 17.00 USDT.',
      tier300Btn: 'Payer avec Mercado Pago ($300 MXN)',
      tier200Label: 'Palier $200 MXN',
      tier200Title: 'Disney+ 12 Mois / 1 An Complet',
      tier200Desc: 'Exclusif pour Disney+ Premium 1 An Complet et Disney+ 12 Mois Compte Complet ($200 MXN / $11.66 USDT).',
      tier200Btn: 'Payer avec Mercado Pago ($200 MXN)',
      tier150Label: 'Palier $150 MXN',
      tier150Badge: '$150 MXN ch.',
      tier150Title: 'Produits à $150 MXN',
      tier150Desc: `${MERCADO_PAGO_150_PRODUCT_NAMES.join(', ')}.`,
      tier150Btn: 'Payer avec Mercado Pago ($150 MXN)',
      tier100Label: 'Palier $100 MXN',
      tier100Title: 'iLovePDF Premium 12 Mois',
      tier100Desc: 'Exclusif pour iLovePDF Premium 12 Mois ($100 MXN / 5.83 USDT).',
      tier100Btn: 'Payer avec Mercado Pago ($100 MXN)',
      directHeader: (count: number) => `Accès direct par produit (${count} produits actifs dans le catalogue) :`,
      payBtnShort: 'Payer avec Mercado Pago',
    },
  };
  const mpText = (mpLabels as Record<string, typeof mpLabels.es>)[lang] || (lang === 'es' ? mpLabels.es : mpLabels.en);

  useEffect(() => {
    const syncLiveCatalog = () => {
      setLiveProducts(getSavedProducts());
    };
    syncLiveCatalog();
    window.addEventListener('catalog_products_updated', syncLiveCatalog);
    return () => window.removeEventListener('catalog_products_updated', syncLiveCatalog);
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2200);
  };

  const getComputedConcept = () => {
    if (isNoRecommender) return 'pago';
    const trimmed = recommendedBy.trim();
    return trimmed.length > 0 ? trimmed : 'pago';
  };

  const activeConcept = getComputedConcept();

  const localizeAccountBadge = (badge: string) => {
    if (badge === 'Recomendado México (SPEI)') return t.payments.badgeRecommendedMx;
    if (badge === 'Depósitos OXXO / Transferencia') return t.payments.badgeOxxoTransfer;
    if (badge === 'Cripto Sin Comisiones (USDT)') return t.payments.badgeCryptoZeroFee;
    if (badge === 'Internacional / Saldo Digital') return t.payments.badgeIntlDigital;
    return badge;
  };

  const localizeAccountType = (type: string) => {
    if (type === 'CLABE / Tarjeta') return t.payments.typeClabeCard;
    if (type === 'Tarjeta') return t.payments.typeCard;
    if (type === 'Correo Electrónico') return t.payments.typeEmail;
    return type;
  };

  const proofWhatsAppUrl = buildWhatsAppLink(`¡Hola! Acabo de realizar mi pago en Servicios Digitales Premium.

👤 *Titular verificado:* ${OFFICIAL_BENEFICIARY}
📝 *Concepto que coloqué:* "${activeConcept}"
📎 Adjunto aquí mi captura / comprobante de transferencia para entrega y activación de mi servicio.`);

  const activeCatalogProducts = liveProducts.filter((p) => p.available !== false);

  return (
    <section id="pagos" className="py-16 sm:py-20 bg-slate-900/40 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-3 py-1 rounded-md border border-cyan-500/20 mb-3">
            <CreditCard className="w-3.5 h-3.5" /> {t.payments.badge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.payments.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            {t.payments.subtitle}
          </p>

          {/* Beneficiary Badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-slate-950/80 border border-slate-700/80 px-4 py-2 rounded-xl text-xs sm:text-sm text-slate-200 shadow-sm">
            <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {t.payments.beneficiaryLabel}:{' '}
              <strong className="text-white font-extrabold">{OFFICIAL_BENEFICIARY}</strong>
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold border border-emerald-500/30">
              ✓
            </span>
          </div>
        </div>

        {/* Bank Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Mexico Accounts */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-1.5">
                      <span>🇲🇽 {t.payments.countryTransferTitle}</span>
                    </h3>
                    <p className="text-xs text-slate-400">SPEI / MXN</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  MXN
                </span>
              </div>

              {/* Account details */}
              <div className="space-y-4">
                {BANK_DETAILS.mexico.map((acc, idx) => {
                  const copyId = `mx-${idx}`;
                  const isCopied = copiedKey === copyId;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span className="font-bold text-slate-200">{acc.bank}</span>
                        <span className="text-[11px] text-emerald-400/90 font-medium">{localizeAccountBadge(acc.badge)}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mb-1.5">{localizeAccountType(acc.type)}</div>

                      <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 font-mono text-xs sm:text-sm text-slate-100">
                        <span className="tracking-wider font-semibold">{acc.accountNumber}</span>
                        <button
                          onClick={() => handleCopy(acc.accountNumber, copyId)}
                          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md transition-all font-sans cursor-pointer ${
                            isCopied
                              ? 'bg-emerald-500 text-slate-950 font-bold'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{t.payments.copiedClabe}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{t.payments.copyClabe}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{t.payments.beneficiaryLabel}: <strong>{OFFICIAL_BENEFICIARY}</strong></span>
              <span className="text-emerald-400 font-medium">SPEI</span>
            </div>
          </div>

          {/* International & Crypto Accounts */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-1.5">
                      <span>🌐 {t.payments.internationalTitle}</span>
                    </h3>
                    <p className="text-xs text-slate-400">{t.payments.internationalDesc}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                  {t.payments.internationalBadge}
                </span>
              </div>

              {/* Account details */}
              <div className="space-y-4">
                {BANK_DETAILS.international.map((acc, idx) => {
                  const copyId = `intl-${idx}`;
                  const isCopied = copiedKey === copyId;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span className="font-bold text-slate-200">{acc.platform}</span>
                        <span className="text-[11px] text-cyan-400/90 font-medium">{localizeAccountBadge(acc.badge)}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mb-1.5">{localizeAccountType(acc.type)}</div>

                      <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 font-mono text-xs sm:text-sm text-slate-100">
                        <span className="tracking-wider font-semibold break-all">{acc.accountNumber}</span>
                        <button
                          onClick={() => handleCopy(acc.accountNumber, copyId)}
                          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md transition-all font-sans shrink-0 ml-2 cursor-pointer ${
                            isCopied
                              ? 'bg-emerald-500 text-slate-950 font-bold'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{t.payments.copiedClabe}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{t.payments.copyClabe}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{t.payments.beneficiaryLabel}: <strong>{OFFICIAL_BENEFICIARY}</strong></span>
              <span className="text-cyan-400 font-medium">Binance Pay 0% Fee</span>
            </div>
          </div>
        </div>

        {/* MERCADO PAGO VERIFIED PAYMENT LINKS BY PRODUCT & PRICE TIER */}
        <div className="bg-slate-900/90 rounded-2xl border border-sky-500/30 p-6 sm:p-8 mb-12 relative overflow-hidden shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-base sm:text-lg text-white">
                    {mpText.sectionTitle}
                  </h3>
                  <span className="text-[10px] font-bold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded border border-sky-500/30">
                    {mpText.verifiedBadge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {mpText.sectionSubtitle}
                </p>
              </div>
            </div>
          </div>

          {/* 4 Price Tiers Summary Cards ($300, $200, $150, $100 MXN) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* $300 MXN Tier */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-extrabold text-sky-400 uppercase">{mpText.tier300Label}</span>
                  <span className="text-xs font-black bg-sky-500/15 text-sky-300 px-2 py-0.5 rounded border border-sky-500/30">
                    $300 MXN
                  </span>
                </div>
                <div className="text-sm font-bold text-white">{mpText.tier300Title}</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {mpText.tier300Desc}
                </p>
              </div>
              <a
                href={getMercadoPagoLinkByPrice(300, 'figma-pro-edu')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-sky-500/15 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>{mpText.tier300Btn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* $200 MXN Tier - Disney products */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-extrabold text-purple-400 uppercase">{mpText.tier200Label}</span>
                  <span className="text-xs font-black bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                    $200 MXN
                  </span>
                </div>
                <div className="text-sm font-bold text-white">{mpText.tier200Title}</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {mpText.tier200Desc}
                </p>
              </div>
              <a
                href={getMercadoPagoLinkByPrice(200)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-sky-500/15 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>{mpText.tier200Btn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* $150 MXN Tier */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-extrabold text-emerald-400 uppercase">{mpText.tier150Label}</span>
                  <span className="text-xs font-black bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                    {mpText.tier150Badge}
                  </span>
                </div>
                <div className="text-sm font-bold text-white">{mpText.tier150Title}</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {mpText.tier150Desc}
                </p>
              </div>
              <a
                href={getMercadoPagoLinkByPrice(150)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-sky-500/15 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>{mpText.tier150Btn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* $100 MXN Tier - ONLY iLovePDF Premium */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-extrabold text-amber-400 uppercase">{mpText.tier100Label}</span>
                  <span className="text-xs font-black bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                    $100 MXN
                  </span>
                </div>
                <div className="text-sm font-bold text-white">{mpText.tier100Title}</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {mpText.tier100Desc}
                </p>
              </div>
              <a
                href={getMercadoPagoLinkByPrice(100, 'ilovepdf-premium')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-sky-500/15 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>{mpText.tier100Btn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Dynamic Individual Product Links for all active products in the live catalog */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="text-xs font-bold text-slate-300 mb-3">
              {mpText.directHeader(activeCatalogProducts.length)}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {activeCatalogProducts.map((product) => {
                const loc = localizeProduct(product);
                const mpUrl = getMercadoPagoLinkForProduct(product);
                return (
                  <div
                    key={product.id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/90 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{loc.name}</div>
                      <div className="text-[11px] text-sky-400 font-semibold">
                        ${product.priceMxn} MXN / ${product.priceUsd.toFixed(2)} USDT
                        {loc.duration ? (
                          <>
                            {' • '}
                            <span className="text-cyan-300">{loc.duration}</span>
                          </>
                        ) : null}
                      </div>
                    </div>
                    {mpUrl ? (
                      <a
                        href={mpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1.5 bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-slate-950 font-bold px-2.5 py-1.5 rounded-lg text-[11px] border border-sky-500/30 transition-all cursor-pointer"
                      >
                        <span>{mpText.payBtnShort}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* STRICT CONCEPT RULE GENERATOR & VALIDATOR */}
        <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">
                  {t.payments.strictRuleBadge}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {t.payments.strictRuleTitle}
                </h3>
              </div>
            </div>
            <div className="text-xs text-amber-200/90 bg-amber-500/15 px-3 py-1.5 rounded-lg border border-amber-500/30 font-medium">
              ⚠️ {t.payments.strictRuleBadge}
            </div>
          </div>

          <div className="py-6 space-y-4">
            <p className="text-sm text-slate-200 leading-relaxed">
              <strong className="text-amber-300 font-semibold">{t.payments.strictRuleBadge}:</strong> {t.payments.strictRuleIntro}{' '}
              <span className="text-amber-200">{t.payments.strictRuleForbidden}</span>
            </p>

            {/* Interactive Concept Builder */}
            <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-4">
              <label className="block text-xs font-semibold text-slate-300">
                {t.payments.validExamplesTitle}
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Carlos Mendoza"
                  value={recommendedBy}
                  disabled={isNoRecommender}
                  onChange={(e) => {
                    setRecommendedBy(e.target.value);
                    if (isNoRecommender) setIsNoRecommender(false);
                  }}
                  className={`flex-1 bg-slate-900 border text-sm text-white px-3.5 py-2.5 rounded-xl outline-none transition-all ${
                    isNoRecommender
                      ? 'opacity-40 border-slate-800 cursor-not-allowed'
                      : 'border-slate-700 focus:border-amber-400'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => {
                    setIsNoRecommender(!isNoRecommender);
                    if (!isNoRecommender) {
                      setRecommendedBy('');
                    }
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    isNoRecommender
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {isNoRecommender ? '✓ "pago"' : '"pago"'}
                </button>
              </div>

              {/* Exact Text Preview to Put in Bank App */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">
                    {t.payments.strictRuleTitle}:
                  </span>
                  <div className="font-mono text-base sm:text-lg font-black text-amber-300 mt-0.5 tracking-wider">
                    "{activeConcept}"
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(activeConcept, 'active-concept')}
                  className={`flex items-center justify-center gap-1.5 text-xs px-4 py-2 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
                    copiedKey === 'active-concept'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                  }`}
                >
                  {copiedKey === 'active-concept' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t.payments.copiedClabe}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{t.payments.copyClabe}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Action to WhatsApp */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                WhatsApp: <strong>{OFFICIAL_WHATSAPP_NUMBER}</strong>
              </span>
            </div>

            <a
              href={proofWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{t.payments.requestCryptoLinkBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
