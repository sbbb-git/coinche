// Chargement de Google Analytics (GA4), privacy-first : on n'injecte le script
// QU'APRÈS consentement explicite (RGPD / lignes directrices CNIL). Tant que
// l'utilisateur n'a pas accepté, aucun appel n'est fait à Google.
const GA_ID = "G-89PX80N9H7";
const CONSENT_KEY = "cookie-consent";
let loaded = false;

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };

function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

/** Injecte GA4 (gtag.js + config) une seule fois, uniquement si consenti. */
export function loadAnalytics(): void {
  if (loaded || !hasConsent() || typeof document === "undefined") return;
  loaded = true;
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    w.dataLayer!.push(args);
  };
  w.gtag = w.gtag || gtag;
  w.gtag("js", new Date());
  w.gtag("consent", "default", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  w.gtag("config", GA_ID);
}
