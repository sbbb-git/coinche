import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS } from "../engine/game";
import { genBidExercise, genPlayExercise } from "./exercises";
import { simulate } from "./simulation";

const S = DEFAULT_SETTINGS;

describe("générateur d'exercices", () => {
  it("enchères : options valides + index correct cohérent", () => {
    for (let i = 0; i < 20; i++) {
      const ex = genBidExercise(S);
      expect(ex.hand.length).toBe(8);
      expect(ex.options.length).toBeGreaterThanOrEqual(2);
      expect(ex.options.length).toBeLessThanOrEqual(4);
      expect(ex.correctIndex).toBeGreaterThanOrEqual(0);
      expect(ex.correctIndex).toBeLessThan(ex.options.length);
      expect(ex.reason.length).toBeGreaterThan(0);
    }
  });

  it("jeu : la réponse du coach est toujours une carte jouable", () => {
    for (let i = 0; i < 20; i++) {
      const ex = genPlayExercise(S);
      const legalIds = ex.legal.map((c) => c.id);
      expect(legalIds).toContain(ex.correctId);
      expect(ex.legal.length).toBeGreaterThan(0);
    }
  });
});

describe("simulation massive IA vs IA", () => {
  it("produit des comptes cohérents", () => {
    const r = simulate(S, { games: 6, levelA: "hard", levelB: "easy" });
    expect(r.games).toBe(6);
    expect(r.winsA + r.winsB).toBe(6); // pas de partie sans gagnant
    expect(r.deals).toBeGreaterThan(0);
    // contrats pris <= donnes jouées
    expect(r.takerStat[0].taken + r.takerStat[1].taken).toBeLessThanOrEqual(r.deals);
    // réussis <= pris
    expect(r.takerStat[0].made).toBeLessThanOrEqual(r.takerStat[0].taken);
  });

  it("un meilleur niveau gagne nettement plus souvent (Difficile vs Facile)", () => {
    const r = simulate(S, { games: 40, levelA: "hard", levelB: "easy" });
    expect(r.winsA).toBeGreaterThan(r.winsB);
  });
});
