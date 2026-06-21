// Persistance abstraite. Implémentation locale (localStorage) pour l'instant ;
// une implémentation cloud pourra la remplacer sans toucher au reste.

import { BidEntry, DEFAULT_PROFILE, DEFAULT_SETTINGS, GameState, Settings } from "../engine/game";
import { Card } from "../engine/cards";
import { Contract, ScoreBreakdown } from "../engine/scoring";

/** Donne enregistrée, rejouable pour la review. */
export interface DealRecord {
  ts: number;
  dealtHands: Card[][];
  dealer: number;
  settings: Settings;
  bids: BidEntry[];
  plays: { player: number; cardId: string }[];
  contract: Contract | null;
  result: ScoreBreakdown | null;
}

export interface ExoStat {
  done: number;
  correct: number;
}
export interface TrainingStats {
  bid: ExoStat;
  play: ExoStat;
  streak: number; // série en cours
  bestStreak: number;
  rating: number; // niveau estimé façon Elo (départ 1000)
  ratingHistory: number[]; // historique du rating (courbe façon Chess.com)
  dayStreak: number; // jours d'affilée avec au moins un exercice
  lastActive: string; // dernier jour d'activité (AAAA-MM-JJ)
}

export const EMPTY_STATS: TrainingStats = {
  bid: { done: 0, correct: 0 },
  play: { done: 0, correct: 0 },
  streak: 0,
  bestStreak: 0,
  rating: 800, // on démarre « Débutant » et on progresse vers Amateur (1000+)
  ratingHistory: [],
  dayStreak: 0,
  lastActive: "",
};

/** Progression du « Défi du jour » (façon puzzle quotidien). */
export interface DailyState {
  day: string; // dernier jour joué (AAAA-MM-JJ)
  done: boolean; // défi du jour terminé ?
  success: boolean; // réussi ?
  streak: number; // jours d'affilée où le défi a été fait
  best: number; // record de série
}

export const EMPTY_DAILY: DailyState = { day: "", done: false, success: false, streak: 0, best: 0 };

export interface Storage {
  loadSettings(): Settings | null;
  saveSettings(s: Settings): void;
  loadStats(): TrainingStats;
  saveStats(s: TrainingStats): void;
  loadHistory(): DealRecord[];
  saveDeal(rec: DealRecord): void;
  loadDoneLessons(): string[];
  setLessonDone(id: string): void;
  loadProfile(): LocalProfile;
  saveProfile(p: LocalProfile): void;
  loadDaily(): DailyState;
  saveDaily(s: DailyState): void;
  loadGame(): GameState | null;
  saveGame(g: GameState): void;
  isOnboarded(): boolean;
  setOnboarded(): void;
  /** Efface toutes les données locales (RGPD). */
  clearAll(): void;
}

export interface LocalProfile {
  name: string;
}

const SETTINGS_KEY = "coincheur.settings.v1";
const STATS_KEY = "coincheur.stats.v1";
const HISTORY_KEY = "coincheur.history.v1";
const LESSONS_KEY = "coincheur.lessons.v1";
const PROFILE_KEY = "coincheur.profile.v1";
const DAILY_KEY = "coincheur.daily.v1";
const GAME_KEY = "coincheur.game.v1";
const ONBOARDED_KEY = "coincheur.onboarded.v1";
const HISTORY_MAX = 25;

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
        rating: p.rating ?? EMPTY_STATS.rating,
        ratingHistory: Array.isArray(p.ratingHistory) ? p.ratingHistory.slice(-60) : [],
        dayStreak: p.dayStreak ?? 0,
        lastActive: p.lastActive ?? "",
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

  loadHistory(): DealRecord[] {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw) as DealRecord[];
      if (!Array.isArray(arr)) return [];
      // On filtre les enregistrements manifestement corrompus (robustesse review).
      return arr.filter(
        (r) =>
          r &&
          typeof r.dealer === "number" &&
          r.dealer >= 0 &&
          r.dealer <= 3 &&
          Array.isArray(r.dealtHands) &&
          r.dealtHands.length === 4 &&
          r.dealtHands.every((h) => Array.isArray(h)) &&
          Array.isArray(r.bids) &&
          Array.isArray(r.plays),
      );
    } catch {
      return [];
    }
  }

  saveDeal(rec: DealRecord): void {
    try {
      const hist = [rec, ...this.loadHistory()].slice(0, HISTORY_MAX);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(hist));
    } catch {
      /* ignore */
    }
  }

  loadDoneLessons(): string[] {
    try {
      const raw = localStorage.getItem(LESSONS_KEY);
      const arr = raw ? (JSON.parse(raw) as unknown) : [];
      return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
    } catch {
      return [];
    }
  }

  setLessonDone(id: string): void {
    try {
      const done = new Set(this.loadDoneLessons());
      done.add(id);
      localStorage.setItem(LESSONS_KEY, JSON.stringify([...done]));
    } catch {
      /* ignore */
    }
  }

  loadProfile(): LocalProfile {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      const p = raw ? (JSON.parse(raw) as Partial<LocalProfile>) : {};
      return { name: typeof p.name === "string" && p.name.trim() ? p.name : "Vous" };
    } catch {
      return { name: "Vous" };
    }
  }

  saveProfile(p: LocalProfile): void {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    } catch {
      /* ignore */
    }
  }

  loadDaily(): DailyState {
    try {
      const raw = localStorage.getItem(DAILY_KEY);
      if (!raw) return { ...EMPTY_DAILY };
      const p = JSON.parse(raw) as Partial<DailyState>;
      return {
        day: p.day ?? "",
        done: !!p.done,
        success: !!p.success,
        streak: p.streak ?? 0,
        best: p.best ?? 0,
      };
    } catch {
      return { ...EMPTY_DAILY };
    }
  }

  saveDaily(s: DailyState): void {
    try {
      localStorage.setItem(DAILY_KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }

  loadGame(): GameState | null {
    try {
      const raw = localStorage.getItem(GAME_KEY);
      if (!raw) return null;
      const g = JSON.parse(raw) as GameState;
      // Validation : structure plausible ET phase connue ; contrat présent en jeu.
      const phases = ["bidding", "playing", "dealScored", "gameOver"];
      if (!g || !Array.isArray(g.hands) || g.hands.length !== 4) return null;
      if (!phases.includes(g.phase) || !Array.isArray(g.trick) || !Array.isArray(g.completedTricks)) return null;
      if ((g.phase === "playing" || g.phase === "dealScored") && !g.contract) return null;
      // Filet de défauts sur les réglages (comme loadSettings) : tolère l'ajout de champs.
      const settings: Settings = {
        ...DEFAULT_SETTINGS,
        ...g.settings,
        profile: { ...DEFAULT_PROFILE, ...(g.settings?.profile ?? {}) },
        playerNames: g.settings?.playerNames ?? DEFAULT_SETTINGS.playerNames,
      };
      return { ...g, settings };
    } catch {
      return null;
    }
  }

  saveGame(g: GameState): void {
    try {
      localStorage.setItem(GAME_KEY, JSON.stringify(g));
    } catch {
      /* ignore */
    }
  }

  clearAll(): void {
    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith("coincheur.")) keys.push(k);
      }
      keys.forEach((k) => localStorage.removeItem(k));
    } catch {
      /* ignore */
    }
  }

  isOnboarded(): boolean {
    try {
      return localStorage.getItem(ONBOARDED_KEY) === "1";
    } catch {
      return false;
    }
  }

  setOnboarded(): void {
    try {
      localStorage.setItem(ONBOARDED_KEY, "1");
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

/** Partie en cours à reprendre : uniquement en pleine donne (enchères ou jeu).
 *  En « score de donne » ou « fin de partie », on repart proprement. */
export function loadResumableGame(): GameState | null {
  const g = storage.loadGame();
  return g && (g.phase === "bidding" || g.phase === "playing") ? g : null;
}
