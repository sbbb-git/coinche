import { describe, it, expect } from "vitest";
import { playReason } from "./coach";
import { makeCard, Card } from "./cards";
import { GameState, DEFAULT_SETTINGS } from "./game";
import { Contract } from "./scoring";

// Construit un GameState en phase "playing" au 8e (dernier) pli.
function makeLastTrickState(opts: {
  mode: Contract["mode"];
  taker: number;
  capot: boolean;
  generale: boolean;
  current: number;
  hands: Card[][];
  trick: { card: Card; player: number }[];
}): GameState {
  const contract: Contract = {
    value: opts.capot ? 250 : opts.generale ? 500 : 100,
    mode: opts.mode,
    taker: opts.taker,
    capot: opts.capot,
    generale: opts.generale,
    coinche: 1,
  };
  // 7 plis complétés bidon pour simuler le dernier pli.
  const fakeTrick = {
    cards: [] as Card[],
    played: [] as { card: Card; player: number }[],
    winner: 0,
    winnerTeam: 0 as 0 | 1,
  };
  return {
    settings: { ...DEFAULT_SETTINGS },
    phase: "playing",
    dealer: 3,
    current: opts.current,
    hands: opts.hands,
    dealtHands: opts.hands.map((h) => [...h]),
    bidHistory: [],
    standing: null,
    coinche: 1,
    passStreak: 0,
    contract,
    trick: opts.trick,
    trickLeader: 0,
    completedTricks: Array.from({ length: 7 }, () => ({ ...fakeTrick })),
    scores: [0, 0],
    lastResult: null,
    message: "",
  };
}

describe("finding: 10 de der / capot — pas d'explication dédiée", () => {
  it("8e pli, joueur 0 prend avec sa derniere carte : aucun mot 'der'", () => {
    // Contrat Pique, taker 0 (preneur). Joueur 0 a 2 cartes pour avoir un choix.
    // Trick: J1 a joue 8 de pique (atout). J0 peut prendre avec A pique ou se debarrasser.
    const hand0 = [makeCard("S", "A"), makeCard("D", "7")];
    const state = makeLastTrickState({
      mode: "S",
      taker: 0,
      capot: false,
      generale: false,
      current: 0,
      hands: [hand0, [], [], []],
      trick: [{ card: makeCard("S", "8"), player: 1 }],
    });
    const reason = playReason(state, makeCard("S", "A"));
    console.log("8e pli (prise):", reason);
    expect(reason.toLowerCase()).not.toContain("der");
    expect(reason).not.toContain("10 de der");
  });

  it("capot en cours : aucun mot 'capot' dans l'explication de jeu", () => {
    const hand0 = [makeCard("S", "A"), makeCard("D", "7")];
    const state = makeLastTrickState({
      mode: "S",
      taker: 0,
      capot: true,
      generale: false,
      current: 0,
      hands: [hand0, [], [], []],
      trick: [{ card: makeCard("S", "8"), player: 1 }],
    });
    const reason = playReason(state, makeCard("S", "A"));
    console.log("capot (prise):", reason);
    expect(reason.toLowerCase()).not.toContain("capot");
  });

  it("8e pli charge partenaire : texte identique au pli generique (pas de mention der)", () => {
    // Partenaire (J2) tient le pli ; J0 charge. isLast (3 cartes deja jouees).
    const hand0 = [makeCard("S", "A"), makeCard("D", "7")];
    const state = makeLastTrickState({
      mode: "S",
      taker: 2,
      capot: false,
      generale: false,
      current: 0,
      hands: [hand0, [], [], []],
      // J1 entame 8 trefle, J2 (partenaire) coupe avec 9 pique (atout), J3 7 trefle.
      trick: [
        { card: makeCard("C", "8"), player: 1 },
        { card: makeCard("S", "9"), player: 2 },
        { card: makeCard("C", "7"), player: 3 },
      ],
    });
    const reason = playReason(state, makeCard("S", "A"));
    console.log("8e pli charge partenaire:", reason);
    expect(reason.toLowerCase()).not.toContain("der");
  });
});
