import { describe, it, expect } from "vitest";
import { newGame, applyBid, applyPass, applyPlay, legalForCurrent, nextDeal, DEFAULT_SETTINGS, GameState } from "./game";
import { aiBid, aiPlay } from "./ai";
import { isPlayDecision } from "./coach";

// Verifie: sur le pli ou il reste 2 cartes en main (donc penultieme pli =
// completedTricks.length === 6), y a-t-il des decisions ? Et sur length===7 ?
describe("idx: que vaut completedTricks.length sur les derniers plis", () => {
  it("aucune decision avec completedTricks.length===7 (dead code du fix propose)", () => {
    const settings = { ...DEFAULT_SETTINGS, aiLevel: "medium" as const };
    let g: GameState = newGame(settings);
    let decAtLen6 = 0; // penultieme pli
    let decAtLen7 = 0; // dernier pli => cible du fix propose
    let deals = 0;
    let guard = 0;
    while (deals < 2000 && guard++ < 2_000_000) {
      if (g.phase === "bidding") {
        const d = aiBid(g, g.current);
        g = d.action === "bid" ? applyBid(g, d.value, d.mode, d.capot, d.generale) : applyPass(g);
      } else if (g.phase === "playing") {
        if (isPlayDecision(g) && legalForCurrent(g).length >= 2) {
          if (g.completedTricks.length === 6) decAtLen6++;
          if (g.completedTricks.length === 7) decAtLen7++;
        }
        g = applyPlay(g, aiPlay(g));
      } else if (g.phase === "dealScored") {
        deals++;
        g = nextDeal(g);
      } else {
        g = newGame(settings);
      }
    }
    console.log("Decisions a length===6 (penultieme pli):", decAtLen6);
    console.log("Decisions a length===7 (dernier pli, cible du fix):", decAtLen7);
    expect(decAtLen7).toBe(0); // le fix propose viserait du code mort
  });
});
