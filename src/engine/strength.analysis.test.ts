import { describe, expect, it } from "vitest";
import {
  DEFAULT_SETTINGS,
  GameState,
  AiLevel,
  applyBid,
  applyCoinche,
  applyPass,
  applyPlay,
  applySurcoinche,
  newGame,
  nextDeal,
} from "./game";
import { aiBid, aiPlay } from "./ai";
import { teamOf } from "./scoring";

/** Joue `deals` donnes IA vs IA (même niveau partout) et mesure la calibration
 *  des enchères : valeur de contrat vs points réellement réalisés par le preneur. */
function analyze(level: AiLevel, deals: number) {
  const settings = { ...DEFAULT_SETTINGS, aiLevel: level };
  let g: GameState = newGame(settings);
  let guard = 0;
  let taken = 0;
  let made = 0;
  let sumContract = 0;
  let sumRealized = 0;
  const hist: Record<number, number> = {};
  let n = 0;
  while (n < deals && guard++ < deals * 4000) {
    if (g.phase === "bidding") {
      const d = aiBid(g, g.current);
      if (d.action === "bid") g = applyBid(g, d.value, d.mode, d.capot, d.generale);
      else if (d.action === "coinche") g = applyCoinche(g);
      else if (d.action === "surcoinche") g = applySurcoinche(g);
      else g = applyPass(g);
    } else if (g.phase === "playing") {
      g = applyPlay(g, aiPlay(g));
    } else if (g.phase === "dealScored") {
      const c = g.contract;
      const r = g.lastResult;
      if (c && r) {
        taken++;
        if (r.made) made++;
        sumContract += c.value;
        const tt = teamOf(c.taker);
        sumRealized += r.cardPoints[tt] + r.belote[tt];
        const bucket = c.capot ? 250 : c.generale ? 500 : c.value;
        hist[bucket] = (hist[bucket] ?? 0) + 1;
      }
      n++;
      g = nextDeal(g);
    } else {
      g = newGame(settings); // partie terminée : on en relance une
    }
  }
  return {
    level,
    deals: n,
    taken,
    makeRate: taken ? made / taken : 0,
    avgContract: taken ? sumContract / taken : 0,
    avgRealized: taken ? sumRealized / taken : 0,
    gap: taken ? (sumRealized - sumContract) / taken : 0,
    hist,
  };
}

describe("calibration des enchères (force de l'IA)", () => {
  it("Difficile : enchérit ce qu'il peut faire (contrat moyen élevé, réussite saine)", () => {
    const r = analyze("hard", 200);
    // Plus de « contrat moyen à 90 » : l'IA forte annonce ce qu'elle réalise.
    expect(r.avgContract).toBeGreaterThan(100);
    // Calibration saine : ni sur-prudent (~95% = sous-enchère), ni suicidaire.
    expect(r.makeRate).toBeGreaterThan(0.55);
    expect(r.makeRate).toBeLessThan(0.9);
    // L'écart réalisé/contrat reste modéré (on ne laisse plus 50 pts sur la table).
    expect(r.gap).toBeLessThan(30);
    // De vrais gros contrats existent (≥130).
    const big = Object.entries(r.hist)
      .filter(([v]) => Number(v) >= 130 && Number(v) <= 160)
      .reduce((s, [, n]) => s + n, 0);
    expect(big).toBeGreaterThan(0);
  });

  it("Moyen : réussite réaliste (> 50%, plus prudent que Difficile)", () => {
    const r = analyze("medium", 250);
    expect(r.makeRate).toBeGreaterThan(0.5);
  });
});
