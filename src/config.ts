// Réglages externes à compléter avant publication (un seul endroit).
// Laisser vide tant que ce n'est pas connu : l'UI s'adapte (boutons masqués).

export const SITE_URL = "https://sbbb-git.github.io/coinche/";
export const CONTACT_EMAIL = ""; // ex: "contact@coincheur.app" — pour « Nous écrire »
export const APP_STORE_URL = ""; // ex: "https://apps.apple.com/app/idXXXXXXXX"
export const PLAY_STORE_URL = ""; // ex: "https://play.google.com/store/apps/details?id=..."

/** Lien de notation adapté à la plateforme (vide si non publié). */
export function storeUrl(): string {
  const iOS = /iPhone|iPad|iPod/i.test(typeof navigator !== "undefined" ? navigator.userAgent : "");
  return (iOS ? APP_STORE_URL : PLAY_STORE_URL) || APP_STORE_URL || PLAY_STORE_URL;
}
