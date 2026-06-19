import { create } from "zustand";
import { EMPTY_STATS, TrainingStats, storage } from "../storage";

interface StatsStore {
  stats: TrainingStats;
  record: (kind: "bid" | "play", correct: boolean) => void;
  reset: () => void;
}

// Mise à jour du « niveau » façon Elo : on affronte un puzzle de difficulté fixe.
// Un bon coup quand on est faible rapporte beaucoup ; une erreur quand on est fort
// coûte cher. Bornes [100, 3000].
const PUZZLE_RATING = 1200;
const K = 24;
function nextRating(rating: number, correct: boolean): number {
  const expected = 1 / (1 + Math.pow(10, (PUZZLE_RATING - rating) / 400));
  const r = rating + K * ((correct ? 1 : 0) - expected);
  return Math.max(100, Math.min(3000, Math.round(r)));
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
      rating: nextRating(prev.rating, correct),
    };
    next[kind] = { done: prev[kind].done + 1, correct: prev[kind].correct + (correct ? 1 : 0) };
    storage.saveStats(next);
    set({ stats: next });
  },
  reset: () => {
    const fresh: TrainingStats = { ...EMPTY_STATS, bid: { done: 0, correct: 0 }, play: { done: 0, correct: 0 } };
    storage.saveStats(fresh);
    set({ stats: fresh });
  },
}));

// --- Niveaux (paliers) ------------------------------------------------------

export interface LevelInfo {
  label: string;
  min: number;
  max: number; // borne haute du palier (exclusive)
  /** progression dans le palier courant, 0..1 */
  progress: number;
}

const TIERS: { label: string; min: number }[] = [
  { label: "Débutant", min: 0 },
  { label: "Amateur", min: 1000 },
  { label: "Intermédiaire", min: 1400 },
  { label: "Avancé", min: 1800 },
  { label: "Expert", min: 2200 },
  { label: "Maître", min: 2600 },
];

export function levelInfo(rating: number): LevelInfo {
  let idx = 0;
  for (let i = 0; i < TIERS.length; i++) if (rating >= TIERS[i].min) idx = i;
  const min = TIERS[idx].min;
  const max = idx + 1 < TIERS.length ? TIERS[idx + 1].min : 3000;
  const progress = Math.max(0, Math.min(1, (rating - min) / (max - min)));
  return { label: TIERS[idx].label, min, max, progress };
}

export { EMPTY_STATS };
