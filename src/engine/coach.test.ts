import { describe, expect, it } from "vitest";
import { makeCard } from "./cards";
import { DEFAULT_SETTINGS, dealStateFrom, legalForCurrent } from "./game";
import { coachBid, coachPlay, isPlayDecision } from "./coach";
import { aiBid } from "./ai";

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

  it("l'IA annonce une Générale avec une main qui rafle tout en solo", () => {
    // 5 atouts maîtres consécutifs (V,9,A,10,R de pique) + 3 As secs.
    const hand = [
      makeCard("S", "J"),
      makeCard("S", "9"),
      makeCard("S", "A"),
      makeCard("S", "10"),
      makeCard("S", "K"),
      makeCard("H", "A"),
      makeCard("D", "A"),
      makeCard("C", "A"),
    ];
    const base = dealStateFrom(
      { ...DEFAULT_SETTINGS, allowGenerale: true, aiLevel: "hard" },
      0,
      [hand, [], [], []],
    );
    // Pas en premier de parole (une passe a précédé).
    const state = { ...base, current: 0, bidHistory: [{ player: 3, kind: "pass" as const }] };
    const d = aiBid(state, 0);
    expect(d.action).toBe("bid");
    if (d.action === "bid") expect(d.generale).toBe(true);
  });

  it("applique la convention « 100 fort » : partenaire 80 + on a Valet & 9 de sa couleur", () => {
    // Le partenaire (siège 2) a ouvert à 80 Pique ; on a Valet + 9 de Pique.
    const hand = [
      makeCard("S", "J"),
      makeCard("S", "9"),
      makeCard("S", "8"),
      makeCard("H", "K"),
      makeCard("H", "7"),
      makeCard("D", "9"),
      makeCard("C", "Q"),
      makeCard("C", "7"),
    ];
    const base = dealStateFrom(DEFAULT_SETTINGS, 3, [hand, [], [], []]);
    const state = {
      ...base,
      current: 0,
      standing: { player: 2, value: 80, mode: "S" as const, capot: false, generale: false },
      bidHistory: [
        { player: 2, kind: "bid" as const, value: 80, mode: "S" as const, capot: false, generale: false },
        { player: 1, kind: "pass" as const },
      ],
    };
    const adv = coachBid(state, 0);
    expect(adv.action).toEqual({ action: "bid", value: 100, mode: "S" });
  });

  it("lit les annonces adverses : ne reprend pas la couleur déjà prise par l'adversaire", () => {
    // Main correcte à Cœur, mais un adversaire a déjà annoncé 110 Cœur → on évite Cœur.
    const hand = [
      makeCard("H", "A"),
      makeCard("H", "10"),
      makeCard("H", "K"),
      makeCard("S", "A"),
      makeCard("S", "10"),
      makeCard("D", "8"),
      makeCard("C", "9"),
      makeCard("C", "7"),
    ];
    const base = dealStateFrom(DEFAULT_SETTINGS, 3, [hand, [], [], []]);
    const state = {
      ...base,
      current: 0,
      standing: { player: 1, value: 110, mode: "H" as const, capot: false, generale: false },
      bidHistory: [
        { player: 1, kind: "bid" as const, value: 110, mode: "H" as const, capot: false, generale: false },
      ],
    };
    const adv = coachBid(state, 0);
    if (adv.action.action === "bid") expect(adv.action.mode).not.toBe("H");
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
      contract: { value: 80, mode: "S" as const, taker: 0, capot: false, generale: false, coinche: 1 as const },
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
