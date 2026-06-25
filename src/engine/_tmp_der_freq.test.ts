import { describe, it } from "vitest";
import { newGame, applyBid, applyPass, applyPlay, legalForCurrent, nextDeal, DEFAULT_SETTINGS, GameState } from "./game";
import { aiBid, aiPlay } from "./ai";
import { isPlayDecision } from "./coach";

// Mesure: sur N donnes simulees, combien de fois une VRAIE decision (>=2 cartes
// legales) survient sur le 8e pli (completedTricks.length === 7) ?
// Et combien sur les 7 premiers plis ? Et capot/generale en cours ?
describe("freq: decisions sur le dernier pli", () => {
  it("compte les decisions par numero de pli", () => {
    const settings = { ...DEFAULT_SETTINGS, aiLevel: "medium" as const };
    let g: GameState = newGame(settings);
    const decisionsByTrick = new Array(8).fill(0);
    let totalDecisions = 0;
    let capotContracts = 0;
    let deals = 0;
    let guard = 0;
    const MAX = 2_000_000;
    while (deals < 3000 && guard++ < MAX) {
      if (g.phase === "bidding") {
        const d = aiBid(g, g.current);
        g = d.action === "bid" ? applyBid(g, d.value, d.mode, d.capot, d.generale) : applyPass(g);
      } else if (g.phase === "playing") {
        if (g.contract && (g.contract.capot || g.contract.generale)) {
          // compte une fois par donne capot
        }
        if (isPlayDecision(g) && legalForCurrent(g).length >= 2) {
          const ti = g.completedTricks.length; // 0..7
          decisionsByTrick[ti]++;
          totalDecisions++;
        }
        g = applyPlay(g, aiPlay(g));
      } else if (g.phase === "dealScored") {
        if (g.contract && (g.contract.capot || g.contract.generale)) capotContracts++;
        deals++;
        g = nextDeal(g);
      } else {
        g = newGame(settings);
      }
    }
    console.log("Donnes jouees:", deals);
    console.log("Decisions totales (>=2 cartes):", totalDecisions);
    console.log("Decisions par pli (0-indexe):", JSON.stringify(decisionsByTrick));
    console.log("Decisions sur le 8e pli (idx 7):", decisionsByTrick[7], "soit", ((decisionsByTrick[7] / totalDecisions) * 100).toFixed(2), "%");
    console.log("Contrats capot/generale:", capotContracts, "soit", ((capotContracts / deals) * 100).toFixed(2), "% des donnes");
  });
});
