// Persistance abstraite. Implémentation locale (localStorage) pour l'instant ;
// une implémentation cloud pourra la remplacer sans toucher au reste.

import { DEFAULT_PROFILE, DEFAULT_SETTINGS, Settings } from "../engine/game";

export interface Storage {
  loadSettings(): Settings | null;
  saveSettings(s: Settings): void;
}

const SETTINGS_KEY = "coincheur.settings.v1";

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
}

export const storage: Storage = new LocalStorage();

/** Réglages au démarrage : ceux sauvegardés, sinon les défauts. */
export function loadInitialSettings(): Settings {
  return storage.loadSettings() ?? DEFAULT_SETTINGS;
}
