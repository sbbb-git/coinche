import { create } from "zustand";
import { storage } from "../storage";

export type View =
  | "welcome"
  | "home"
  | "play"
  | "exercises"
  | "mygames"
  | "review"
  | "lessons"
  | "guides"
  | "stats"
  | "account";

interface Nav {
  view: View;
  go: (v: View) => void;
}

export const useNav = create<Nav>((set) => ({
  // Premier lancement : on montre l'accueil de bienvenue (onboarding).
  view: storage.isOnboarded() ? "home" : "welcome",
  go: (view) => set({ view }),
}));
