import { useState } from "react";
import { useNav } from "../app/nav";
import { useT } from "../i18n";
import { loadAds } from "../ads";

// Bandeau de consentement cookies (RGPD). GA et la pub (AdSense) sont en "denied"
// par défaut (cf. index.html, Consent Mode v2) ; on ne passe en "granted" qu'après
// acceptation, et c'est seulement là que la pub se charge.
const KEY = "cookie-consent";

function setConsent(granted: boolean) {
  const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (granted && typeof g === "function") {
    g("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
  }
}

export function ConsentBanner() {
  const go = useNav((s) => s.go);
  const t = useT();
  const [choice, setChoice] = useState<string | null>(() => {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  });
  if (choice) return null;

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch {
      /* ignore */
    }
    if (granted) {
      setConsent(true);
      loadAds(); // la pub ne se charge qu'ici, après acceptation explicite
    }
    setChoice(granted ? "granted" : "denied");
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-lg flex-col gap-2 rounded-xl bg-zinc-900/95 p-3 text-sm text-white/90 shadow-lg ring-1 ring-white/15">
        <p>
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
