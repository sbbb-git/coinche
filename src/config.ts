// Réglages externes (un seul endroit). Coincheur est diffusé comme site web.

export const SITE_URL = "https://coincheur.fr";
export const CONTACT_EMAIL = "contact@coincheur.fr"; // boîte à créer (forwarding) chez le registrar

// --- Publicité (Google AdSense, web) ---------------------------------------
// INTERRUPTEUR MAÎTRE : pubs désactivées pour l'instant (pas encore de compte
// AdSense). Toute l'infra reste en place ; pour RALLUMER : passer ADS_ENABLED à
// true ET fournir l'identifiant éditeur (variable de dépôt ADSENSE_CLIENT).
export const ADS_ENABLED = false;

// L'identifiant éditeur AdSense (« ca-pub-... ») est fourni au build via la
// variable d'env VITE_ADSENSE_CLIENT (cf. .github/workflows). Tant qu'il est vide
// OU que ADS_ENABLED est false, AUCUNE pub n'est chargée (zéro risque, zéro réseau).
// Les pubs ne se chargent de toute façon qu'APRÈS consentement (RGPD, ConsentBanner).
const ENV = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};

export const ADSENSE_CLIENT: string = ENV.VITE_ADSENSE_CLIENT ?? "";

// Identifiants d'emplacements (ad units) AdSense, optionnels. Si vide, on laisse
// les « Auto ads » d'AdSense placer la pub (configurable dans la console).
export const ADSENSE_SLOTS: Record<string, string> = {
  home: ENV.VITE_ADSENSE_SLOT_HOME ?? "",
  stats: ENV.VITE_ADSENSE_SLOT_STATS ?? "",
  exercises: ENV.VITE_ADSENSE_SLOT_EXERCISES ?? "",
};

/** La pub est-elle activée ET configurée pour cette build ? */
export function adsConfigured(): boolean {
  return ADS_ENABLED && /^ca-pub-\d+$/.test(ADSENSE_CLIENT);
}
