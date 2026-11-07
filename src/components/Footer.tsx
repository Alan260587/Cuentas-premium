import React from 'react';
import {
  ShieldCheck,
  MessageCircle,
  Lock,
} from 'lucide-react';
import {
  OFFICIAL_WHATSAPP_NUMBER,
  OFFICIAL_BENEFICIARY,
  buildWhatsAppLink,
} from '../data/catalog';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 font-black text-sm">
                SDP
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Servicios Digitales <span className="text-emerald-400">Premium</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.payments.beneficiaryLabel}: <strong>{OFFICIAL_BENEFICIARY}</strong></span>
            </div>
          </div>

          {/* Col 2: Canales de Atención */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="text-slate-300">
                <span className="text-slate-500 block">WhatsApp:</span>
                <a
                  href={buildWhatsAppLink('¡Hola! Me comunico desde el pie de página oficial.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 mt-0.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>{OFFICIAL_WHATSAPP_NUMBER}</span>
                </a>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500 block">PayPal / Binance:</span>
                <span className="font-mono text-slate-300 break-all">javieralanrodriguezyescas31@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Col 3: Políticas & Aviso */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {t.footer.officialRulesTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-slate-400 flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>{t.footer.ruleConceptItem}</span>
              </li>
              <li className="text-slate-400 flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>{t.footer.ruleScheduleItem}</span>
              </li>
              <li className="text-slate-400 flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{t.footer.ruleAffiliatesItem}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Servicios Digitales Premium. {t.footer.rightsReserved}
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>SSL / Verified</span>
            </span>
            <span>WhatsApp: {OFFICIAL_WHATSAPP_NUMBER}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
