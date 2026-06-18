import { describe, expect, it } from "vitest";
import { makeCard, points, strength, totalPoints, freshDeck } from "./cards";
import { beats, legalMoves, winningIndex } from "./rules";
import { scoreDeal, Contract } from "./scoring";

/** Découpe le jeu en 8 plis de 4 cartes (pour des décomptes réalistes). */
function dealIntoTricks() {
  const deck = freshDeck();
  const tricks: ReturnType<typeof freshDeck>[] = [];
  for (let i = 0; i < 8; i++) tricks.push(deck.slice(i * 4, i * 4 + 4));
  return tricks;
}

describe("valeurs des cartes", () => {
  it("Valet et 9 sont rois à l'atout", () => {
    expect(points(makeCard("S", "J"), "S")).toBe(20);
    expect(points(makeCard("S", "9"), "S")).toBe(14);
    expect(points(makeCard("S", "J"), "H")).toBe(2); // valet hors atout
  });

  it("un jeu complet vaut 152 points à la couleur (+10 de der = 162)", () => {
    const deck = freshDeck();
    expect(totalPoints(deck, "S")).toBe(152);
  });

  it("Sans Atout et Tout Atout valent aussi 152", () => {
    expect(totalPoints(freshDeck(), "NT")).toBe(152);
    expect(totalPoints(freshDeck(), "AT")).toBe(152);
  });

  it("l'atout est plus fort que le valet est plus fort que le 9", () => {
    expect(strength(makeCard("S", "J"), "S")).toBeGreaterThan(strength(makeCard("S", "9"), "S"));
    expect(strength(makeCard("S", "9"), "S")).toBeGreaterThan(strength(makeCard("S", "A"), "S"));
  });
});

describe("résolution des plis", () => {
  it("l'atout bat une carte non-atout", () => {
    expect(beats(makeCard("S", "7"), makeCard("H", "A"), "H", "S")).toBe(true);
  });

  it("une défausse hors couleur ne gagne jamais", () => {
    const trick = [
      { card: makeCard("H", "A"), player: 0 },
      { card: makeCard("D", "A"), player: 1 }, // défausse
    ];
    expect(winningIndex(trick, "S")).toBe(0);
  });

  it("le plus haut atout remporte le pli", () => {
    const trick = [
      { card: makeCard("H", "A"), player: 0 },
      { card: makeCard("S", "7"), player: 1 },
      { card: makeCard("S", "J"), player: 2 },
      { card: makeCard("S", "9"), player: 3 },
    ];
    expect(winningIndex(trick, "S")).toBe(2); // le valet d'atout
  });
});

describe("cartes jouables", () => {
  it("on doit fournir la couleur demandée", () => {
    const hand = [makeCard("H", "K"), makeCard("S", "A"), makeCard("D", "7")];
    const trick = [{ card: makeCard("H", "A"), player: 0 }];
    const legal = legalMoves(hand, trick, 1, "S");
    expect(legal.map((c) => c.id)).toEqual(["HK"]);
  });

  it("sans la couleur, on doit couper si l'adversaire est maître", () => {
    const hand = [makeCard("S", "7"), makeCard("D", "K")];
    const trick = [{ card: makeCard("H", "A"), player: 0 }];
    const legal = legalMoves(hand, trick, 1, "S");
    expect(legal.map((c) => c.id)).toEqual(["S7"]); // obligation de couper
  });

  it("on peut pisser si le partenaire est maître", () => {
    const hand = [makeCard("S", "7"), makeCard("D", "K")];
    const trick = [
      { card: makeCard("H", "7"), player: 0 },
      { card: makeCard("H", "A"), player: 1 }, // partenaire de 3 mène
    ];
    const legal = legalMoves(hand, trick, 3, "S");
    expect(legal.length).toBe(2); // libre, pas d'obligation de couper
  });

  it("obligation de monter à l'atout quand l'atout est demandé", () => {
    const hand = [makeCard("S", "8"), makeCard("S", "A")];
    const trick = [
      { card: makeCard("S", "10"), player: 0 },
    ];
    const legal = legalMoves(hand, trick, 1, "S");
    expect(legal.map((c) => c.id)).toEqual(["SA"]); // doit monter (As > 10)
  });
});

describe("décompte d'une donne", () => {
  const baseContract = (over: Partial<Contract>): Contract => ({
    value: 80,
    mode: "S",
    taker: 0,
    capot: false,
    coinche: 1,
    ...over,
  });

  it("contrat réussi : le preneur marque contrat + points réalisés", () => {
    const res = scoreDeal(baseContract({}), {
      trickWinners: [0, 0, 0, 0, 0, 0, 0, 0],
      tricks: dealIntoTricks(),
      hands: [[], [], [], []],
    });
    // équipe 0 fait tous les plis : 152 cartes + 10 de der = 162
    expect(res.made).toBe(true);
    expect(res.cardPoints[0]).toBe(162);
    expect(res.scores[0]).toBe(80 + 162);
  });

  it("contrat chuté : la défense marque 160 + contrat", () => {
    const res = scoreDeal(baseContract({ value: 120 }), {
      trickWinners: [1, 1, 1, 1, 1, 1, 1, 1],
      tricks: dealIntoTricks(),
      hands: [[], [], [], []],
    });
    expect(res.made).toBe(false);
    expect(res.scores[1]).toBe(160 + 120);
    expect(res.scores[0]).toBe(0);
  });

  it("coinche réussie double l'enjeu (contrat + 160) × 2", () => {
    const res = scoreDeal(baseContract({ value: 100, coinche: 2 }), {
      trickWinners: [0, 0, 0, 0, 0, 0, 0, 0],
      tricks: dealIntoTricks(),
      hands: [[], [], [], []],
    });
    expect(res.made).toBe(true);
    expect(res.scores[0]).toBe((100 + 160) * 2);
  });
});
