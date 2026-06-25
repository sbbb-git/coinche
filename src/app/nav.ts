import { create } from "zustand";
import { storage } from "../storage";

export type View =
  | "welcome"
  | "home"
  | "play"
  | "exercises"
  | "mygames"
  | "lessons"
  | "guides"
  | "stats"
  | "account"
  | "legal"
  | "about"
  | "daily"
  | "compteur";

interface Nav {
  view: View;
  prev: View; // écran précédent (historique à 1 niveau pour le bouton retour)
  go: (v: View) => void;
  back: () => void;
}

export const useNav = create<Nav>((set) => ({
  // Premier lancement : on montre l'accueil de bienvenue (onboarding).
  view: storage.isOnboarded() ? "home" : "welcome",
  prev: "home",
  go: (view) => set((s) => ({ view, prev: s.view })),
  back: () => set((s) => ({ view: s.prev || "home", prev: "home" })),
}));
