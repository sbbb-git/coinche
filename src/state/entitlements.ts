import { create } from "zustand";

// Abstraction FREEMIUM / PUBLICITÉ — branchable plus tard (achats in-app via
// Capacitor, réseau publicitaire). AUJOURD'HUI : tout est gratuit et SANS PUB.
// Quand on voudra monétiser : passer `premium` à false par défaut, activer
// `adsEnabled`, et brancher la vérification d'achat / le SDK pub ici, sans
// toucher au reste de l'app (les écrans appellent juste `canUse` / `useEntitlements`).

/** Fonctionnalités potentiellement réservées au premium (non verrouillées tant
 *  que `premium` est true par défaut). */
export type PremiumFeature =
  | "unlimitedReview" // historique de parties illimité
  | "advancedStats" // stats détaillées / courbes
  | "dailyChallenge" // défi du jour
  | "expertCoach"; // explications avancées du coach

export interface Entitlements {
  premium: boolean; // l'utilisateur a-t-il débloqué le premium ?
  adsEnabled: boolean; // affiche-t-on des pubs (gratuit non-premium) ?
}

// Valeurs par défaut : phase actuelle = 100% gratuit, aucune pub.
const DEFAULT: Entitlements = { premium: true, adsEnabled: false };

interface EntitlementsStore extends Entitlements {
  setPremium: (v: boolean) => void;
  setAdsEnabled: (v: boolean) => void;
  /** Une fonctionnalité premium est-elle utilisable par cet utilisateur ? */
  canUse: (f: PremiumFeature) => boolean;
}

export const useEntitlements = create<EntitlementsStore>((set, get) => ({
  ...DEFAULT,
  setPremium: (premium) => set({ premium }),
  setAdsEnabled: (adsEnabled) => set({ adsEnabled }),
  // Tant que premium=true par défaut, rien n'est verrouillé. Le jour où l'on
  // passe en freemium, il suffira de retourner `get().premium` (ou une logique
  // par fonctionnalité) pour gating, sans changer les écrans.
  canUse: (_f) => get().premium,
}));
