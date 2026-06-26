// Chargement de Google AdSense (web), centralisé et idempotent.
//
// Règles :
//  - Rien ne se charge si l'éditeur AdSense n'est pas configuré (ADSENSE_CLIENT vide).
//  - Rien ne se charge AVANT le consentement (RGPD) : on n'injecte le script qu'une
//    fois `cookie-consent === "granted"`. La pub partage donc le même consentement
//    que la mesure d'audience (un seul bandeau, cf. ConsentBanner).
//  - Le script n'est injecté qu'UNE fois ; les emplacements (AdSlot) se contentent
//    ensuite de pousser des unités.
import { create } from "zustand";
import { ADSENSE_CLIENT, adsConfigured } from "./config";

const CONSENT_KEY = "cookie-consent";
let scriptInjected = false;

// État réactif : permet à <AdSlot> de se (re)rendre quand la pub devient prête
// (ex. juste après le clic « Accepter »).
interface AdsStore {
  ready: boolean;
  markReady: () => void;
}
export const useAdsStore = create<AdsStore>((set) => ({
  ready: false,
  markReady: () => set({ ready: true }),
}));

type AdsWindow = Window & { adsbygoogle?: unknown[] };

/** L'utilisateur a-t-il accepté (cookies/pub) ? */
export function hasAdsConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

/** Injecte le script AdSense si tout est réuni (configuré + consenti). Idempotent. */
export function loadAds(): void {
  if (scriptInjected || !adsConfigured() || !hasAdsConsent()) return;
  if (typeof document === "undefined") return;
  scriptInjected = true;
  const s = document.createElement("script");
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
    ADSENSE_CLIENT,
  )}`;
  document.head.appendChild(s);
  useAdsStore.getState().markReady();
}

/** Demande à AdSense de remplir une unité (<ins class="adsbygoogle">). */
export function pushAd(): void {
  if (!scriptInjected) return;
  try {
    const w = window as AdsWindow;
    (w.adsbygoogle = w.adsbygoogle || []).push({});
  } catch {
    /* AdSense pas encore prêt : l'unité se remplira au prochain passage */
  }
}

/** Le script a-t-il été injecté (consentement donné + configuré) ? */
export function adsLoaded(): boolean {
  return scriptInjected;
}
