import { create } from "zustand";

// Abstraction FREEMIUM / PUBLICITÉ.
//
// MODÈLE v1 : gratuit AVEC publicités (décision produit). Toutes les
// fonctionnalités restent ACCESSIBLES — on ne verrouille rien : la monétisation
// passe par la pub (et plus tard un achat « Retirer les pubs » → premium).
//
// Branchement réel (au packaging natif) : Google AdMob via
// `@capacitor-community/admob`, derrière `<AdSlot>` qui n'affiche que si
// `showAds()` est vrai. Cf. ADS.md.

/** Fonctionnalités qu'on POURRAIT un jour réserver au premium. En v1 tout est
 *  ouvert (la pub monétise), donc `canUse` renvoie toujours vrai. */
export type PremiumFeature =
  | "unlimitedReview"
  | "advancedStats"
  | "dailyChallenge"
  | "expertCoach";

export interface Entitlements {
  premium: boolean; // a débloqué « Retirer les pubs » (achat in-app, plus tard)
  adsEnabled: boolean; // la pub est-elle activée pour cette build ?
}

// v1 : utilisateur gratuit (premium=false) + pubs activées. Le premium (sans pub)
// arrivera avec l'achat in-app au packaging.
const DEFAULT: Entitlements = { premium: false, adsEnabled: true };

interface EntitlementsStore extends Entitlements {
  setPremium: (v: boolean) => void;
  setAdsEnabled: (v: boolean) => void;
  /** Faut-il afficher des pubs à cet utilisateur ? (pub activée ET non-premium) */
  showAds: () => boolean;
  /** v1 : rien n'est verrouillé (la pub monétise, pas le paywall). */
  canUse: (f: PremiumFeature) => boolean;
}

export const useEntitlements = create<EntitlementsStore>((set, get) => ({
  ...DEFAULT,
  setPremium: (premium) => set({ premium }),
  setAdsEnabled: (adsEnabled) => set({ adsEnabled }),
  showAds: () => get().adsEnabled && !get().premium,
  canUse: (_f) => true,
}));
