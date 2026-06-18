// Persistance abstraite. Implémentation locale (localStorage) pour l'instant ;
// une implémentation cloud pourra la remplacer sans toucher au reste.

import { DEFAULT_PROFILE, DEFAULT_SETTINGS, Settings } from "../engine/game";

export interface ExoStat {
  done: number;
  correct: number;
}
export interface TrainingStats {
  bid: ExoStat;
  play: ExoStat;
  streak: number; // série en cours
  bestStreak: number;
}

export const EMPTY_STATS: TrainingStats = {
  bid: { done: 0, correct: 0 },
  play: { done: 0, correct: 0 },
  streak: 0,
  bestStreak: 0,
};

export interface Storage {
  loadSettings(): Settings | null;
  saveSettings(s: Settings): void;
  loadStats(): TrainingStats;
  saveStats(s: TrainingStats): void;
}

const SETTINGS_KEY = "coincheur.settings.v1";
const STATS_KEY = "coincheur.stats.v1";

class LocalStorage implements Storage {
  loadSettings(): Settings | null {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<Settings>;
      // Fusion avec les défauts : tolère l'ajout de nouveaux réglages.
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        profile: { ...DEFAULT_PROFILE, ...(parsed.profile ?? {}) },
        playerNames: parsed.playerNames ?? DEFAULT_SETTINGS.playerNames,
      };
    } catch {
      return null;
    }
  }

  saveSettings(s: Settings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
    } catch {
      /* quota / mode privé : on ignore silencieusement */
    }
  }

  loadStats(): TrainingStats {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      if (!raw) return { ...EMPTY_STATS };
      const p = JSON.parse(raw) as Partial<TrainingStats>;
      return {
        bid: { ...EMPTY_STATS.bid, ...(p.bid ?? {}) },
        play: { ...EMPTY_STATS.play, ...(p.play ?? {}) },
        streak: p.streak ?? 0,
        bestStreak: p.bestStreak ?? 0,
      };
    } catch {
      return { ...EMPTY_STATS };
    }
  }

  saveStats(s: TrainingStats): void {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }
}

export const storage: Storage = new LocalStorage();

/** Réglages au démarrage : ceux sauvegardés, sinon les défauts. */
export function loadInitialSettings(): Settings {
  return storage.loadSettings() ?? DEFAULT_SETTINGS;
}
