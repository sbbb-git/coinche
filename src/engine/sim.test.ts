import { describe, expect, it } from "vitest";
import {
  DEFAULT_SETTINGS,
  GameState,
  applyBid,
  applyCoinche,
  applyPass,
  applyPlay,
  applySurcoinche,
  legalForCurrent,
  newGame,
  nextDeal,
} from "./game";
import { aiBid, aiPlay } from "./ai";

/** Joue une partie entière en pilotant les 4 sièges par l'IA. */
function playFullGame(state: GameState): GameState {
  let g = state;
  let steps = 0;
  while (g.phase !== "gameOver" && steps < 20000) {
    steps++;
    if (g.phase === "bidding") {
      const d = aiBid(g, g.current);
      if (d.action === "bid") g = applyBid(g, d.value, d.mode, d.capot);
      else if (d.action === "coinche") g = applyCoinche(g);
      else if (d.action === "surcoinche") g = applySurcoinche(g);
      else g = applyPass(g);
    } else if (g.phase === "playing") {
      const legal = legalForCurrent(g);
      expect(legal.length).toBeGreaterThan(0); // jamais bloqué
      g = applyPlay(g, aiPlay(g));
    } else if (g.phase === "dealScored") {
      g = nextDeal(g);
    }
  }
  return g;
}

describe("simulation de parties complètes (IA vs IA)", () => {
  for (const level of ["easy", "medium", "hard", "expert"] as const) {
    it(`niveau ${level} : la partie se termine proprement`, () => {
      for (let i = 0; i < 5; i++) {
        const g = playFullGame(newGame({ ...DEFAULT_SETTINGS, aiLevel: level }));
        expect(g.phase).toBe("gameOver");
        const target = g.settings.targetScore;
        expect(Math.max(g.scores[0], g.scores[1])).toBeGreaterThanOrEqual(target);
      }
    });
  }

  it("avec Sans Atout et Tout Atout activés, tout reste jouable", () => {
    for (let i = 0; i < 5; i++) {
      const g = playFullGame(
        newGame({ ...DEFAULT_SETTINGS, allowNT: true, allowAT: true, aiLevel: "hard" }),
      );
      expect(g.phase).toBe("gameOver");
    }
  });

  it("toutes les cartes sont bien consommées à chaque donne", () => {
    let g = newGame(DEFAULT_SETTINGS);
    // joue jusqu'à la fin d'une donne au moins
    let steps = 0;
    while (g.completedTricks.length < 8 && g.phase !== "gameOver" && steps < 5000) {
      steps++;
      if (g.phase === "bidding") {
        const d = aiBid(g, g.current);
        if (d.action === "bid") g = applyBid(g, d.value, d.mode, d.capot);
        else if (d.action === "coinche") g = applyCoinche(g);
        else if (d.action === "surcoinche") g = applySurcoinche(g);
        else g = applyPass(g);
      } else if (g.phase === "playing") {
        g = applyPlay(g, aiPlay(g));
      }
    }
    // si une donne a été jouée, 8 plis de 4 cartes = 32 cartes
    if (g.completedTricks.length === 8) {
      const cards = g.completedTricks.reduce((n, t) => n + t.cards.length, 0);
      expect(cards).toBe(32);
    }
  });
});
