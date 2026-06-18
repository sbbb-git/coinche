import { describe, expect, it } from "vitest";
import { makeCard } from "./cards";
import { DEFAULT_SETTINGS, dealStateFrom, legalForCurrent } from "./game";
import { coachBid, coachPlay, isPlayDecision } from "./coach";

function stateWithHand(hand: ReturnType<typeof makeCard>[]) {
  return dealStateFrom(DEFAULT_SETTINGS, 3, [hand, [], [], []]);
}

describe("coach — enchères", () => {
  it("recommande d'annoncer avec une main forte à l'atout", () => {
    // Valet + 9 + As + 10 + Roi de pique, etc. → très forte à Pique.
    const hand = [
      makeCard("S", "J"),
      makeCard("S", "9"),
      makeCard("S", "A"),
      makeCard("S", "10"),
      makeCard("S", "K"),
      makeCard("H", "A"),
      makeCard("D", "A"),
      makeCard("C", "7"),
    ];
    const adv = coachBid(stateWithHand(hand), 0);
    expect(adv.action.action).toBe("bid");
    if (adv.action.action === "bid") {
      expect(adv.action.mode).toBe("S");
      expect(adv.action.value).toBeGreaterThanOrEqual(80);
    }
  });

  it("recommande de passer avec une main faible", () => {
    const hand = [
      makeCard("S", "7"),
      makeCard("S", "8"),
      makeCard("H", "7"),
      makeCard("H", "8"),
      makeCard("D", "7"),
      makeCard("D", "8"),
      makeCard("C", "7"),
      makeCard("C", "8"),
    ];
    const adv = coachBid(stateWithHand(hand), 0);
    expect(adv.action.action).toBe("pass");
  });
});

describe("coach — jeu", () => {
  it("ne conseille que des cartes légales", () => {
    // état d'entame : toutes les cartes sont jouables
    const hand = [makeCard("S", "A"), makeCard("H", "K"), makeCard("D", "10")];
    const g = { ...dealStateFrom(DEFAULT_SETTINGS, 3, [hand, [], [], []]) };
    // bascule artificielle en jeu avec un contrat à Pique, à seat 0 d'entamer
    const playing = {
      ...g,
      phase: "playing" as const,
      contract: { value: 80, mode: "S" as const, taker: 0, capot: false, coinche: 1 as const },
      current: 0,
      trick: [],
    };
    if (isPlayDecision(playing)) {
      const best = coachPlay(playing).best;
      const legalIds = legalForCurrent(playing).map((c) => c.id);
      expect(legalIds).toContain(best.id);
    }
  });
});
