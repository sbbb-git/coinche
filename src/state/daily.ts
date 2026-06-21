import { create } from "zustand";
import { DailyState, storage } from "../storage";
import { isoDay } from "../training/daily";

function yesterdayOf(key: string): string {
  // Parse en heure LOCALE (et non UTC) pour rester cohérent avec isoDay().
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y, (m || 1) - 1, d || 1);
  date.setDate(date.getDate() - 1);
  return isoDay(date);
}

interface DailyStore {
  state: DailyState;
  /** Le défi d'aujourd'hui est-il déjà terminé ? */
  doneToday: () => boolean;
  /** Enregistre le résultat du défi du jour (une seule fois par jour). */
  complete: (success: boolean) => void;
}

export const useDaily = create<DailyStore>((set, get) => ({
  state: storage.loadDaily(),
  doneToday: () => {
    const s = get().state;
    return s.done && s.day === isoDay();
  },
  complete: (success) => {
    const today = isoDay();
    const prev = get().state;
    if (prev.done && prev.day === today) return; // déjà fait aujourd'hui
    // Série : +1 si on enchaîne depuis hier, sinon on repart à 1.
    const streak = prev.day === yesterdayOf(today) && prev.done ? prev.streak + 1 : 1;
    const next: DailyState = {
      day: today,
      done: true,
      success,
      streak,
      best: Math.max(prev.best, streak),
    };
    storage.saveDaily(next);
    set({ state: next });
  },
}));
