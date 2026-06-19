import { useEffect, useState } from "react";

// Bannière « installer / télécharger l'app » affichée sur le web mobile (sauf
// quand l'app tourne déjà en mode installé). Drive l'installation PWA, et
// affichera les liens stores quand les apps natives seront publiées.

const DISMISS_KEY = "coincheur.install.dismissed.v1";

// Liens stores (à remplir quand les apps seront publiées).
const APP_STORE_URL = ""; // ex: https://apps.apple.com/app/idXXXXXXXX
const PLAY_STORE_URL = ""; // ex: https://play.google.com/store/apps/details?id=...

interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandalone(): boolean {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    // iOS Safari
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function isMobile(): boolean {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
}

function isIOS(): boolean {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function InstallBanner() {
  const [dismissed, setDismissed] = useState(true); // caché par défaut jusqu'au check
  const [bip, setBip] = useState<BIPEvent | null>(null);
  const [showIOSHelp, setShowIOSHelp] = useState(false);

  useEffect(() => {
    if (isStandalone() || !isMobile()) return;
    if (localStorage.getItem(DISMISS_KEY) === "1") return;
    setDismissed(false);

    const onBip = (e: Event) => {
      e.preventDefault();
      setBip(e as BIPEvent);
    };
    window.addEventListener("beforeinstallprompt", onBip);
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, []);

  if (dismissed) return null;

  const close = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  };

  const install = async () => {
    if (APP_STORE_URL && isIOS()) {
      window.location.href = APP_STORE_URL;
      return;
    }
    if (PLAY_STORE_URL && !isIOS()) {
      window.location.href = PLAY_STORE_URL;
      return;
    }
    if (bip) {
      await bip.prompt();
      await bip.userChoice;
      setBip(null);
      close();
      return;
    }
    // iOS / pas de prompt natif : on explique l'ajout à l'écran d'accueil.
    setShowIOSHelp((v) => !v);
  };

  return (
    <div className="safe-top sticky top-0 z-40 bg-gradient-to-r from-sky-600 to-emerald-600 px-3 py-2 text-white shadow-lg">
      <div className="mx-auto flex max-w-3xl items-center gap-2">
        <span className="text-xl" aria-hidden>
          📱
        </span>
        <p className="min-w-0 flex-1 text-sm font-semibold leading-tight">
          Installe l'app Coincheur
          <span className="block text-[11px] font-normal text-white/80">
            Plein écran, hors-ligne, comme une vraie app.
          </span>
        </p>
        <button
          onClick={install}
          className="min-h-9 shrink-0 rounded-full bg-white px-3 text-sm font-bold text-emerald-700 hover:bg-white/90"
        >
          Installer
        </button>
        <button
          onClick={close}
          aria-label="Fermer"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/80 hover:bg-white/20"
        >
          ✕
        </button>
      </div>
      {showIOSHelp && (
        <p className="mx-auto mt-1 max-w-3xl text-[12px] text-white/90">
          Sur iPhone : appuie sur <b>Partager</b> ⬆️ puis <b>« Sur l'écran d'accueil »</b>.
        </p>
      )}
    </div>
  );
}
