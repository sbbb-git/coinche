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
    value: 100,
    mode: opts.mode,
    taker: opts.taker,
    capot: false,
    generale: false,
    coinche: 1,
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
    trick: [],
    trickLeader: opts.current,
    completedTricks: [],
    scores: [0, 0],
    lastResult: null,
    message: "",
  };
}

describe("narrative coachPlay - As de côté coupable", () => {
  it("scénario fin de donne: défenseur entame un As de côté que le preneur peut couper", () => {
    // Contrat Pique (taker = J1, équipe 1). J0 (défense, équipe 0) à l'entame.
    // Il reste 3 cartes par main. J0 a l'As de Carreau (couleur de côté).
    // Le preneur J1 est court en carreau et a un atout -> peut couper l'As.
    const aceD = makeCard("D", "A");
    const hands: Card[][] = [
      [aceD, makeCard("H", "K"), makeCard("C", "Q")],            // J0 défense, à l'entame
      [makeCard("S", "9"), makeCard("H", "7"), makeCard("C", "7")], // J1 preneur, court carreau, a un atout pique
      [makeCard("D", "K"), makeCard("D", "Q"), makeCard("H", "8")], // J2 (défense, partenaire J0)
      [makeCard("D", "10"), makeCard("H", "A"), makeCard("C", "A")], // J3 preneur (partenaire J1)
    ];
    const state = makeState({ mode: "S", taker: 1, current: 0, hands });
    const advice = coachPlay(state);
    console.log("=== best:", advice.best.id);
    console.log("=== reason:\n" + advice.reason);
  });

  it("scénario milieu de donne: défenseur As de côté, preneur peut couper", () => {
    const aceD = makeCard("D", "A");
    const hands: Card[][] = [
      [aceD, makeCard("D", "9"), makeCard("D", "8"), makeCard("H", "K"), makeCard("C", "Q")],   // J0
      [makeCard("S", "9"), makeCard("S", "8"), makeCard("H", "7"), makeCard("C", "7"), makeCard("C", "8")], // J1 court carreau, atouts
      [makeCard("D", "K"), makeCard("D", "Q"), makeCard("D", "J"), makeCard("H", "8"), makeCard("H", "9")], // J2
      [makeCard("S", "J"), makeCard("D", "10"), makeCard("H", "A"), makeCard("C", "A"), makeCard("C", "K")], // J3
    ];
    const state = makeState({ mode: "S", taker: 1, current: 0, hands });
    const advice = coachPlay(state);
    console.log("=== MILIEU best:", advice.best.id);
    console.log("=== MILIEU reason:\n" + advice.reason);
  });
});
