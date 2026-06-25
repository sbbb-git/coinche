import { describe, it } from "vitest";
import { coachPlay } from "./coach";
import { makeCard, Card } from "./cards";
import { GameState, DEFAULT_SETTINGS } from "./game";
import { Contract } from "./scoring";

function makeState(opts: {
  mode: Contract["mode"];
  taker: number;
  current: number;
  hands: Card[][];
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

describe("narrative coachPlay - PRENEUR entame As de côté", () => {
  it("preneur, atouts épuisés, entame As de côté (peut être coupé si adversaire void)", () => {
    // Contrat Pique, J0 preneur. J0 a déjà tiré les atouts (n'en a plus).
    // Il entame son As de Carreau. Les atouts adverses ne sont pas tous tombés ->
    // un adversaire peut être void en carreau et couper.
    const aceD = makeCard("D", "A");
    const hands: Card[][] = [
      [aceD, makeCard("D", "10"), makeCard("H", "K")],            // J0 preneur, plus d'atout
      [makeCard("S", "Q"), makeCard("C", "7"), makeCard("C", "8")], // J1 a un atout pique restant
      [makeCard("D", "K"), makeCard("D", "Q"), makeCard("H", "A")], // J2 partenaire
      [makeCard("H", "7"), makeCard("H", "8"), makeCard("C", "A")], // J3 court en carreau -> peut défausser, pas couper (pas d'atout)
    ];
    const state = makeState({ mode: "S", taker: 0, current: 0, hands });
    const advice = coachPlay(state);
    console.log("=== T1 best:", advice.best.id);
    console.log("=== T1 reason:\n" + advice.reason);
  });

  it("preneur début de donne, fort en atout, As de côté avec risque de coupe", () => {
    const aceD = makeCard("D", "A");
    const hands: Card[][] = [
      [makeCard("S", "J"), makeCard("S", "9"), makeCard("S", "A"), aceD, makeCard("D", "10"), makeCard("H", "K"), makeCard("H", "Q"), makeCard("C", "K")], // J0 preneur fort
      [makeCard("S", "10"), makeCard("S", "K"), makeCard("C", "7"), makeCard("C", "8"), makeCard("C", "9"), makeCard("C", "10"), makeCard("C", "Q"), makeCard("H", "7")], // J1 court carreau
      [makeCard("D", "K"), makeCard("D", "Q"), makeCard("D", "J"), makeCard("D", "9"), makeCard("D", "8"), makeCard("H", "A"), makeCard("H", "10"), makeCard("H", "9")], // J2 partenaire, long carreau
      [makeCard("S", "Q"), makeCard("S", "8"), makeCard("S", "7"), makeCard("D", "7"), makeCard("H", "J"), makeCard("H", "8"), makeCard("C", "A"), makeCard("C", "J")], // J3
    ];
    const state = makeState({ mode: "S", taker: 0, current: 0, hands });
    const advice = coachPlay(state);
    console.log("=== T2 best:", advice.best.id);
    console.log("=== T2 reason:\n" + advice.reason);
  });
});
