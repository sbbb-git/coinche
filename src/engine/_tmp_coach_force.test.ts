import { describe, it } from "vitest";
import { coachPlay } from "./coach";
import { makeCard, Card } from "./cards";
import { GameState, DEFAULT_SETTINGS } from "./game";
import { Contract } from "./scoring";

function makeState(opts: {
  mode: Contract["mode"]; taker: number; current: number; hands: Card[][];
}): GameState {
  const contract: Contract = {
    value: 100, mode: opts.mode, taker: opts.taker,
    capot: false, generale: false, coinche: 1,
  };
  return {
    settings: { ...DEFAULT_SETTINGS },
    phase: "playing", dealer: 3, current: opts.current,
    hands: opts.hands, dealtHands: opts.hands.map((h) => [...h]),
    bidHistory: [], standing: null, coinche: 1, passStreak: 0,
    contract, trick: [], trickLeader: opts.current, completedTricks: [],
    scores: [0, 0], lastResult: null, message: "",
  };
}

describe("force: As de côté est le meilleur coup mais coupable", () => {
  it("preneur 2 cartes restantes: As de carreau OU petit; As est best mais peut être coupé", () => {
    // J0 preneur (Pique). Reste 2 cartes. As de carreau + un petit cœur.
    // Le partenaire J2 ne peut pas aider. Les adversaires détiennent encore un atout.
    // Si on joue l'As, on gagne SAUF si un adversaire est void carreau + a l'atout.
    const aceD = makeCard("D", "A");
    const hands: Card[][] = [
      [aceD, makeCard("H", "7")],                      // J0 preneur
      [makeCard("S", "7"), makeCard("D", "8")],        // J1: a un atout (S7) ET un carreau -> NE coupera pas l'As (doit fournir carreau) ... mais varie selon monde
      [makeCard("D", "K"), makeCard("H", "K")],        // J2 partenaire
      [makeCard("D", "10"), makeCard("D", "9")],       // J3
    ];
    const state = makeState({ mode: "S", taker: 0, current: 0, hands });
    const advice = coachPlay(state);
    console.log("=== F1 best:", advice.best.id);
    console.log("=== F1 reason:\n" + advice.reason);
  });

  it("preneur, As de cote, adversaires PEUVENT etre void (atouts en circulation)", () => {
    // 4 cartes restantes. J0 preneur a As+Roi carreau et 2 atouts deja maitres? Non:
    // on laisse des atouts adverses pour creer le risque de coupe sur l'As.
    const aceD = makeCard("D", "A");
    const hands: Card[][] = [
      [aceD, makeCard("D", "K"), makeCard("S", "J"), makeCard("S", "A")], // J0 preneur
      [makeCard("S", "9"), makeCard("C", "7"), makeCard("C", "8"), makeCard("H", "7")], // J1 court carreau, a 9 atout
      [makeCard("D", "10"), makeCard("D", "Q"), makeCard("D", "J"), makeCard("H", "K")], // J2 partenaire
      [makeCard("S", "10"), makeCard("S", "K"), makeCard("C", "A"), makeCard("H", "A")], // J3 court carreau aussi
    ];
    const state = makeState({ mode: "S", taker: 0, current: 0, hands });
    const advice = coachPlay(state);
    console.log("=== F2 best:", advice.best.id);
    console.log("=== F2 reason:\n" + advice.reason);
  });
});
