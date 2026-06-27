import { useEffect, useRef, useState } from "react";
import { useNav } from "../app/nav";
import { useT } from "../i18n";
import { loadAds } from "../ads";
import { loadAnalytics } from "../analytics";
import { useFocusTrap } from "../app/useFocusTrap";

// Bandeau de consentement cookies (RGPD). Mesure d'audience (GA4) et publicité
// (AdSense) sont chargées UNIQUEMENT après acceptation explicite — rien avant.
const KEY = "cookie-consent";

export function ConsentBanner() {
  const go = useNav((s) => s.go);
  const view = useNav((s) => s.view);
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const [choice, setChoice] = useState<string | null>(() => {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  });
  // Pas de bandeau pendant l'onboarding ni en pleine partie : il chevaucherait
  // les boutons du bas. On le présente sur l'accueil, une fois l'onboarding fini.
  const open = !choice && view !== "welcome" && view !== "play";
  useFocusTrap(ref, open);

  // Focus initial + Échap = refuser (équivalent d'une fermeture).
  useEffect(() => {
    if (!open) return;
    const el = ref.current?.querySelector<HTMLButtonElement>("button");
    el?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") decide(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch {
      /* ignore */
    }
    if (granted) {
      loadAnalytics(); // mesure d'audience seulement après acceptation
      loadAds(); // pub seulement après acceptation
    }
    setChoice(granted ? "granted" : "denied");
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cc-text"
        className="mx-auto flex max-w-lg flex-col gap-2 rounded-xl bg-zinc-900/95 p-3 text-sm text-white/90 shadow-lg ring-1 ring-white/15"
      >
        <p id="cc-text">
          {t("consent.text")}{" "}
          <button onClick={() => go("legal")} className="underline underline-offset-2">
            {t("consent.learnMore")}
          </button>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => decide(true)}
            className="min-h-11 flex-1 rounded-lg bg-yellow-400 px-4 font-bold text-emerald-950 hover:bg-yellow-300"
          >
            {t("consent.accept")}
          </button>
          <button
            onClick={() => decide(false)}
            className="min-h-11 flex-1 rounded-lg bg-white/15 px-4 font-semibold text-white hover:bg-white/25"
          >
            {t("consent.refuse")}
          </button>
        </div>
      </div>
    </div>
  );
}
