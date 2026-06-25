import { describe, expect, it } from "vitest";
import {
  DEFAULT_SETTINGS,
  GameState,
  applyBid,
  applyPass,
  applyPlay,
  legalForCurrent,
  newGame,
  nextDeal,
} from "./game";
import { aiBid, aiPlay, analyzePlay } from "./ai";

/**
 * Régression du bug d'intransitivité de pickBestIndex (audit) : le coup recommandé
 * ne doit JAMAIS être nettement sous le meilleur différentiel disponible. Le
 * départage « carte la moins chère » est borné à eps (=samples ⇒ ~1 pt/monde de
 * moyenne) ; avant correction, le balayage relatif pouvait choisir une carte très
 * en dessous du max (jusqu'à 0). On vérifie sur de vraies décisions de partie.
 */
describe("coach — le coup conseillé reste (quasi) optimal", () => {
  it("best.scoreDiff est à ~1 pt près du meilleur différentiel (jamais en dessous)", () => {
    const settings = { ...DEFAULT_SETTINGS, aiLevel: "medium" as const };
    let g: GameState = newGame(settings);
    let decisions = 0;
    let worstGap = 0;
    let guard = 0;
    while (decisions < 800 && guard++ < 60000) {
      if (g.phase === "bidding") {
        const d = aiBid(g, g.current);
        g = d.action === "bid" ? applyBid(g, d.value, d.mode, d.capot, d.generale) : applyPass(g);
      } else if (g.phase === "playing") {
        if (legalForCurrent(g).length >= 2) {
          const cs = { ...g, settings: { ...g.settings, aiLevel: "expert" as const } };
          const { best, outcomes } = analyzePlay(cs, true);
          const maxDiff = Math.max(...outcomes.map((o) => o.scoreDiff));
          const bestDiff = outcomes.find((o) => o.card.id === best.id)!.scoreDiff;
          worstGap = Math.max(worstGap, maxDiff - bestDiff);
          decisions++;
        }
        g = applyPlay(g, aiPlay(g));
      } else if (g.phase === "dealScored") {
        g = nextDeal(g);
      } else {
        g = newGame(settings);
      }
    }
    // eps = samples ⇒ tolérance ~1 pt de moyenne ; petite marge flottante.
    expect(worstGap).toBeLessThanOrEqual(1.05);
  });
});
