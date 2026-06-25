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
} from "../engine/game";
import { aiBid, aiPlay } from "../engine/ai";
import { DealRecord } from "../storage";
import { genBidExercise, genPlayExercise, gradeBid } from "./exercises";
import { simulate } from "./simulation";
import { reviewDeal } from "./replay";

const S = DEFAULT_SETTINGS;

/** Joue une donne complète (IA) et en construit l'enregistrement rejouable. */
function playOneDeal(): DealRecord {
  let g: GameState = newGame(S);
  let s = 0;
  while (g.phase !== "dealScored" && g.phase !== "gameOver" && s++ < 3000) {
    if (g.phase === "bidding") {
      const d = aiBid(g, g.current);
      if (d.action === "bid") g = applyBid(g, d.value, d.mode, d.capot, d.generale);
      else if (d.action === "coinche") g = applyCoinche(g);
      else if (d.action === "surcoinche") g = applySurcoinche(g);
      else g = applyPass(g);
    } else {
      g = applyPlay(g, aiPlay(g));
    }
  }
  return {
    ts: 0,
    dealtHands: g.dealtHands,
    dealer: g.dealer,
    settings: g.settings,
    bids: g.bidHistory,
    plays: g.completedTricks.flatMap((t) => t.played.map((p) => ({ player: p.player, cardId: p.card.id }))),
    contract: g.contract,
    result: g.lastResult,
  };
}

describe("générateur d'exercices", () => {
  it("enchères : réponse idéale + plancher cohérents (saisie libre)", () => {
    for (let i = 0; i < 20; i++) {
      const ex = genBidExercise(S);
      expect(ex.hand.length).toBe(8);
      expect(ex.minValue).toBeGreaterThanOrEqual(80);
      expect(["pass", "bid"]).toContain(ex.ideal.action);
      if (ex.ideal.action === "bid") {
        expect(ex.ideal.value).toBeGreaterThanOrEqual(80);
        expect(ex.ideal.value).toBeLessThanOrEqual(160);
      }
      expect(ex.reason.length).toBeGreaterThan(0);
    }
  });

  it("notation nuancée des enchères (gradeBid)", () => {
    // Idéal 120 Cœur : 120♥ = 3⭐, 110♥ = 2⭐ (pas mal), passer = trop prudent.
    const ideal = { action: "bid" as const, value: 120, mode: "H" as const };
    expect(gradeBid({ kind: "bid", value: 120, mode: "H" }, ideal).stars).toBe(3);
    expect(gradeBid({ kind: "bid", value: 110, mode: "H" }, ideal).stars).toBe(2);
    expect(gradeBid({ kind: "pass" }, ideal).stars).toBe(1);
    // Idéal passer : passer = 3⭐, annoncer = trop optimiste.
    expect(gradeBid({ kind: "pass" }, { action: "pass" }).stars).toBe(3);
  });

  it("enchères : propose parfois des annonces préalables (fausses enchères) bien formées", () => {
    let withAuction = 0;
    for (let i = 0; i < 40; i++) {
      const ex = genBidExercise(S);
      for (const l of ex.auction) {
        expect(l.name.length).toBeGreaterThan(0);
        expect(typeof l.value).toBe("string");
      }
      if (ex.auction.length > 0) withAuction++;
    }
    expect(withAuction).toBeGreaterThan(0); // au moins quelques scénarios avec enchères
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

  it("l'Expert (PIMC) bat nettement le Moyen", () => {
    const r = simulate(S, { games: 50, levelA: "expert", levelB: "medium" });
    expect(r.winsA).toBeGreaterThan(r.winsB);
  });

  it("le Difficile (mini-PIMC) bat le Moyen", () => {
    const r = simulate(S, { games: 50, levelA: "hard", levelB: "medium" });
    expect(r.winsA).toBeGreaterThan(r.winsB);
  });

  it("taux de contrats réussis réaliste (pas ~100% : calibration des enchères)", () => {
    const r = simulate(S, { games: 40, levelA: "medium", levelB: "medium" });
    const taken = r.takerStat[0].taken + r.takerStat[1].taken;
    const made = r.takerStat[0].made + r.takerStat[1].made;
    const rate = made / taken;
    expect(rate).toBeLessThan(0.97); // la défense / les enchères créent des chutes
    expect(rate).toBeGreaterThan(0.5); // mais le preneur reste favori
  });
});

describe("review d'une donne (reconstruction)", () => {
  it("rejoue fidèlement et conseille des coups légaux", () => {
    for (let i = 0; i < 10; i++) {
      const rec = playOneDeal();
      const review = reviewDeal(rec);
      for (const p of review.points) {
        expect(typeof p.good).toBe("boolean");
        if (p.phase === "play") {
          // le coup conseillé doit être jouable dans l'état reconstruit
          const legalIds = legalForCurrent(p.snapshot).map((c) => c.id);
          expect(legalIds).toContain(p.bestCardId);
          // c'était bien au siège 0 de jouer, avec un vrai choix
          expect(p.snapshot.current).toBe(0);
          expect(legalIds.length).toBeGreaterThan(1);
        }
      }
      expect(review.goodCount).toBeLessThanOrEqual(review.points.length);
    }
  });
});
