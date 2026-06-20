import { beforeEach, describe, expect, it } from "vitest";
import { storage, DealRecord } from "./index";
import { DEFAULT_SETTINGS } from "../engine/game";

// localStorage en mémoire pour l'environnement de test (node).
function installLocalStorage() {
  const store = new Map<string, string>();
  (globalThis as { localStorage?: unknown }).localStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => store.set(k, String(v)),
    removeItem: (k: string) => store.delete(k),
    clear: () => store.clear(),
  };
}

function rec(dealer = 0): DealRecord {
  return {
    ts: Date.now(),
    dealtHands: [[], [], [], []],
    dealer,
    settings: DEFAULT_SETTINGS,
    bids: [],
    plays: [],
    contract: null,
    result: null,
  };
}

describe("persistance locale", () => {
  beforeEach(() => installLocalStorage());

  it("historique : aller-retour + plafond à 25", () => {
    for (let i = 0; i < 30; i++) storage.saveDeal(rec(i % 4));
    const hist = storage.loadHistory();
    expect(hist.length).toBe(25); // HISTORY_MAX
  });

  it("historique : filtre les enregistrements corrompus", () => {
    installLocalStorage();
    storage.saveDeal(rec(0));
    // injecte une entrée corrompue (dealer hors borne, dealtHands invalide)
    const bad = [{ dealer: 9, dealtHands: "nope", bids: [], plays: [] }, rec(1)];
    localStorage.setItem("coincheur.history.v1", JSON.stringify(bad));
    const hist = storage.loadHistory();
    expect(hist.every((r) => r.dealer >= 0 && r.dealer <= 3 && Array.isArray(r.dealtHands))).toBe(true);
    expect(hist.length).toBe(1);
  });

  it("stats : aller-retour", () => {
    storage.saveStats({ bid: { done: 3, correct: 2 }, play: { done: 1, correct: 1 }, streak: 2, bestStreak: 5, rating: 1340, ratingHistory: [800, 1340] });
    const s = storage.loadStats();
    expect(s.bid.done).toBe(3);
    expect(s.bestStreak).toBe(5);
    expect(s.rating).toBe(1340);
    expect(s.ratingHistory).toEqual([800, 1340]);
  });

  it("profil local : aller-retour + défaut", () => {
    expect(storage.loadProfile().name).toBe("Vous"); // défaut
    storage.saveProfile({ name: "Sacha" });
    expect(storage.loadProfile().name).toBe("Sacha");
  });

  it("leçons : marquage et lecture", () => {
    storage.setLessonDone("bases");
    storage.setLessonDone("bases"); // idempotent
    storage.setLessonDone("encheres");
    const done = storage.loadDoneLessons();
    expect(done).toContain("bases");
    expect(done).toContain("encheres");
    expect(done.length).toBe(2);
  });

  it("réglages : fusion avec les défauts pour un schéma partiel", () => {
    localStorage.setItem("coincheur.settings.v1", JSON.stringify({ aiLevel: "expert" }));
    const s = storage.loadSettings()!;
    expect(s.aiLevel).toBe("expert");
    expect(s.targetScore).toBe(DEFAULT_SETTINGS.targetScore); // défaut conservé
    expect(s.profile).toBeDefined();
  });
});
