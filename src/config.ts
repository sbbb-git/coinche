// Réglages externes (un seul endroit). Coincheur est diffusé comme site web.

export const SITE_URL = "https://coincheur.fr";
export const CONTACT_EMAIL = "contact@coincheur.fr"; // boîte à créer (forwarding) chez le registrar

// --- Publicité (Google AdSense, web) ---------------------------------------
// Tout est piloté par l'identifiant éditeur AdSense (« ca-pub-... »). Tant qu'il
// est vide, AUCUNE pub n'est chargée (zéro risque, zéro réseau). On le fournit
// au build via la variable d'env VITE_ADSENSE_CLIENT (cf. .github/workflows).
// Les pubs ne se chargent qu'APRÈS consentement (RGPD, cf. ConsentBanner).
const ENV = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};

export const ADSENSE_CLIENT: string = ENV.VITE_ADSENSE_CLIENT ?? "";

// Identifiants d'emplacements (ad units) AdSense, optionnels. Si vide, on laisse
// les « Auto ads » d'AdSense placer la pub (configurable dans la console).
export const ADSENSE_SLOTS: Record<string, string> = {
  home: ENV.VITE_ADSENSE_SLOT_HOME ?? "",
  stats: ENV.VITE_ADSENSE_SLOT_STATS ?? "",
  exercises: ENV.VITE_ADSENSE_SLOT_EXERCISES ?? "",
};

/** La pub est-elle configurée pour cette build ? */
export function adsConfigured(): boolean {
  return /^ca-pub-\d+$/.test(ADSENSE_CLIENT);
}
