import React, { useState } from 'react';
import {
  Smartphone,
  Monitor,
  Download,
  Share,
  PlusSquare,
  CheckCircle2,
  X,
  WifiOff,
  Cpu,
  Globe,
  MoreVertical,
} from 'lucide-react';
import { useDeviceAndPWA } from '../utils/deviceDetector';
import { useLanguage } from '../i18n/LanguageContext';

export const PWAInstallModalAndButton: React.FC<{ variant?: 'header' | 'banner' }> = ({
  variant = 'header',
}) => {
  const { t } = useLanguage();
  const {
    os,
    deviceType,
    browser,
    isAndroid,
    isIOS,
    isInstallable,
    isInstalled,
    isOnline,
    platformBadge,
    installApp,
  } = useDeviceAndPWA();

  const [showGuideModal, setShowGuideModal] = useState(false);

  const localizedDeviceType =
    deviceType === 'Escritorio'
      ? t.pwa.deviceDesktop
      : deviceType === 'Móvil'
      ? t.pwa.deviceMobile
      : deviceType === 'Tablet'
      ? t.pwa.deviceTablet
      : deviceType;

  const localizedBrowser =
    browser === 'Navegador Web' ? t.pwa.browserWeb : browser;

  const localizedPlatformBadge = platformBadge
    .replace('Escritorio', localizedDeviceType)
    .replace('Móvil', localizedDeviceType)
    .replace('Tablet', localizedDeviceType)
    .replace('Navegador Web', localizedBrowser);

  const handleInstallClick = async () => {
    if (isInstallable) {
      await installApp();
    } else {
      setShowGuideModal(true);
    }
  };

  if (variant === 'banner') {
    return (
      <>
        {!isOnline && (
          <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-extrabold flex items-center justify-center gap-2 shadow-md">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Offline Mode Active</span>
          </div>
        )}

        <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1.5 text-[11px] text-slate-300">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <Cpu className="w-3 h-3" />
                <span>OS:</span>
              </span>
              <span className="font-semibold text-white">{localizedPlatformBadge}</span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="hidden sm:inline text-slate-400">
                Android, iOS & Web
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isInstalled ? (
                <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>App ({os})</span>
                </span>
              ) : (
                <button
                  onClick={handleInstallClick}
                  className="inline-flex items-center gap-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-md font-bold transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>{t.pwa.installBtn} ({os})</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {showGuideModal && (
          <InstallGuideModal
            os={os}
            deviceType={localizedDeviceType}
            browser={localizedBrowser}
            isIOS={isIOS}
            isAndroid={isAndroid}
            onClose={() => setShowGuideModal(false)}
          />
        )}
      </>
    );
  }

  // Header button variant
  if (isInstalled) {
    return (
      <div
        className="hidden xl:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-2.5 py-1.5 rounded-xl text-xs font-semibold"
        title={`App (${os} • ${localizedDeviceType})`}
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>App {os}</span>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 border border-cyan-500/40 text-cyan-300 font-bold px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer shrink-0"
        title={`${t.pwa.installBtn} (${os})`}
      >
        {isIOS || isAndroid ? (
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
        ) : (
          <Monitor className="w-3.5 h-3.5 text-cyan-400" />
        )}
        <span className="hidden md:inline">
          {isIOS ? 'App iOS' : isAndroid ? 'App Android' : t.pwa.installBtn}
        </span>
      </button>

      {showGuideModal && (
        <InstallGuideModal
          os={os}
          deviceType={localizedDeviceType}
          browser={localizedBrowser}
          isIOS={isIOS}
          isAndroid={isAndroid}
          onClose={() => setShowGuideModal(false)}
        />
      )}
    </>
  );
};

interface InstallGuideModalProps {
  os: string;
  deviceType: string;
  browser: string;
  isIOS: boolean;
  isAndroid: boolean;
  onClose: () => void;
}

const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  os,
  deviceType,
  browser,
  isIOS,
  isAndroid,
  onClose,
}) => {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              {isIOS || isAndroid ? (
                <Smartphone className="w-5 h-5" />
              ) : (
                <Monitor className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                {t.pwa.modalTitle} ({os})
              </h3>
              <p className="text-[11px] text-emerald-400 font-semibold">
                {os} ({deviceType}) • {browser}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {t.pwa.modalSubtitle}
        </p>

        {isIOS ? (
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs text-slate-200">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <span className="flex items-center gap-1.5">
                Safari <Share className="w-4 h-4 text-cyan-400 inline" />
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <span className="flex items-center gap-1.5">
                <PlusSquare className="w-4 h-4 text-emerald-400 inline" /> Add to Home Screen
              </span>
            </div>
          </div>
        ) : isAndroid ? (
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs text-slate-200">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <span className="flex items-center gap-1.5">
                Chrome <MoreVertical className="w-4 h-4 text-cyan-400 inline" />
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <span>{t.pwa.installBtn}</span>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs text-slate-200">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <span>
                <Download className="w-3.5 h-3.5 text-cyan-400 inline mr-1" /> {t.pwa.installBtn} ({os})
              </span>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
        >
          {t.pwa.closeBtn}
        </button>
      </div>
    </div>
  );
};
