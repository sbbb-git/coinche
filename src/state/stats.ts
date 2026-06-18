import { create } from "zustand";
import { EMPTY_STATS, TrainingStats, storage } from "../storage";

interface StatsStore {
  stats: TrainingStats;
  record: (kind: "bid" | "play", correct: boolean) => void;
  reset: () => void;
}

export const useStats = create<StatsStore>((set, get) => ({
  stats: storage.loadStats(),
  record: (kind, correct) => {
    const prev = get().stats;
    const streak = correct ? prev.streak + 1 : 0;
    const next: TrainingStats = {
      bid: { ...prev.bid },
      play: { ...prev.play },
      streak,
      bestStreak: Math.max(prev.bestStreak, streak),
    };
    next[kind] = { done: prev[kind].done + 1, correct: prev[kind].correct + (correct ? 1 : 0) };
    storage.saveStats(next);
    set({ stats: next });
  },
  reset: () => {
    const fresh: TrainingStats = {
      bid: { done: 0, correct: 0 },
      play: { done: 0, correct: 0 },
      streak: 0,
      bestStreak: 0,
    };
    storage.saveStats(fresh);
    set({ stats: fresh });
  },
}));

export { EMPTY_STATS };
