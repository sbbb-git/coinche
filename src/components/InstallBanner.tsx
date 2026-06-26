import { useEffect, useState } from "react";
import { useT } from "../i18n";

// Raccourci « ajouter à l'écran d'accueil » proposé sur le web mobile (sauf
// quand le site tourne déjà en mode installé). C'est une fonctionnalité 100% web
// (PWA) : aucun store, juste un accès direct plein écran et hors-ligne.

const DISMISS_KEY = "coincheur.install.dismissed.v1";

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

export function InstallBanner() {
  const t = useT();
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
    <div className="sticky top-0 z-40 bg-gradient-to-r from-sky-600 to-emerald-600 px-3 py-2 text-white shadow-lg">
      <div className="mx-auto flex max-w-3xl items-center gap-2">
        <span className="text-xl" aria-hidden>
          📱
        </span>
        <p className="min-w-0 flex-1 text-sm font-semibold leading-tight">
          {t("install.title")}
          <span className="block text-[11px] font-normal text-white/80">
            {t("install.subtitle")}
          </span>
        </p>
        <button
          onClick={install}
          className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-white px-4 text-sm font-bold text-emerald-700 hover:bg-white/90"
        >
          {t("install.add")}
        </button>
        <button
          onClick={close}
          aria-label={t("install.close")}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white/80 hover:bg-white/20"
        >
          ✕
        </button>
      </div>
      {showIOSHelp && (
        <p className="mx-auto mt-1 max-w-3xl text-[12px] text-white/90">
          {t("install.iosHelp")}
        </p>
      )}
    </div>
  );
}
