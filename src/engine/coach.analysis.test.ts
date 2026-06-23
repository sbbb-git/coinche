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
import { playReason } from "./coach";

/** Joue des parties (IA rapide) et passe CHAQUE décision (≥2 cartes jouables) dans
 *  le générateur d'explications du coach, pour voir la répartition et débusquer les
 *  explications génériques/trompeuses. */
function collect(targetDecisions: number) {
  const settings = { ...DEFAULT_SETTINGS, aiLevel: "medium" as const };
  let g: GameState = newGame(settings);
  const buckets = new Map<string, number>();
  const examples = new Map<string, string>();
  let misleading = 0;
  let n = 0;
  let guard = 0;
  while (n < targetDecisions && guard++ < targetDecisions * 60) {
    if (g.phase === "bidding") {
      const d = aiBid(g, g.current);
      if (d.action === "bid") g = applyBid(g, d.value, d.mode, d.capot, d.generale);
      else if (d.action === "coinche") g = applyCoinche(g);
      else if (d.action === "surcoinche") g = applySurcoinche(g);
      else g = applyPass(g);
    } else if (g.phase === "playing") {
      const legal = legalForCurrent(g);
      const card = aiPlay(g);
      if (legal.length > 1) {
        const r = playReason(g, card);
        // signature = phrase sans les variantes de position, pour regrouper
        const sig = r.replace(/2ᵉ|3ᵉ|dernier/g, "·").slice(0, 60);
        buckets.set(sig, (buckets.get(sig) ?? 0) + 1);
        if (!examples.has(sig)) examples.set(sig, r);
        // détection de texte trompeur : prétendre gagner sans être le dernier
        const isLast = g.trick.length === 3;
        if (!isLast && /remportes le pli|juste assez forte pour gagner/.test(r)) misleading++;
        n++;
      }
      g = applyPlay(g, card);
    } else if (g.phase === "dealScored") {
      g = nextDeal(g);
    } else {
      g = newGame(settings);
    }
  }
  return { buckets, examples, misleading, n };
}

describe("ANALYSE explications du coach", () => {
  // Échantillon volontairement modéré pour rester rapide en CI ; l'analyse
  // exhaustive (10 000 décisions) a servi à affiner les phrases.
  it("aucune explication trompeuse + pas de phrase fourre-tout dominante", () => {
    const { buckets, misleading, n } = collect(2000);
    // Jamais prétendre gagner un pli qu'on ne tient pas.
    expect(misleading).toBe(0);
    // Aucune explication unique ne doit écraser toutes les autres (signe d'un
    // bucket trop générique) : la plus fréquente reste sous la moitié des cas.
    const max = Math.max(...buckets.values());
    expect(max).toBeLessThan(n * 0.5);
  });
});
