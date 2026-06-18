import { create } from "zustand";

export type View =
  | "home"
  | "play"
  | "exercises"
  | "mygames"
  | "review"
  | "lessons"
  | "guides"
  | "stats";

interface Nav {
  view: View;
  go: (v: View) => void;
}

export const useNav = create<Nav>((set) => ({
  view: "home",
  go: (view) => set({ view }),
}));
