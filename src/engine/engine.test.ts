import { describe, expect, it } from "vitest";
import { Card, makeCard, points, strength, totalPoints, freshDeck } from "./cards";
import { beats, legalMoves, winningIndex } from "./rules";
import { scoreDeal, Contract, DEFAULT_SCORE_OPTIONS } from "./scoring";
import { DEFAULT_SETTINGS, applyBid, applyCoinche, canBid, canCoinche, applyPass, newGame } from "./game";

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

  it("option pisser : sans surcoupe possible, défausse libre si non obligatoire", () => {
    // Pique atout. Joueur 3 entame Cœur, joueur 1 (adversaire) coupe du Roi de pique.
    const hand = [makeCard("S", "7"), makeCard("D", "K")]; // S7 ne bat pas SK
    const trick = [
      { card: makeCard("H", "10"), player: 3 },
      { card: makeCard("S", "K"), player: 1 },
    ];
    // Par défaut : obligation de mettre de l'atout.
    expect(legalMoves(hand, trick, 0, "S").map((c) => c.id)).toEqual(["S7"]);
    // Option « pisser » désactivée : défausse libre.
    expect(legalMoves(hand, trick, 0, "S", { pisserObligatoire: false }).length).toBe(2);
  });
});

describe("décompte d'une donne", () => {
  const baseContract = (over: Partial<Contract>): Contract => ({
    value: 80,
    mode: "S",
    taker: 0,
    capot: false,
    generale: false,
    coinche: 1,
    ...over,
  });

  const c = (...ids: [Card["suit"], Card["rank"]][]) => ids.map(([s, r]) => makeCard(s, r));

  it("contrat réussi : l'attaque marque ses points + le contrat", () => {
    // team0 gagne 3 plis (dont la der), team1 le reste. Pas de capot.
    const res = scoreDeal(baseContract({ value: 80 }), {
      trickWinners: [0, 0, 1, 1, 1, 1, 1, 0],
      tricks: [c(["S", "J"], ["S", "9"], ["S", "A"], ["S", "10"]), c(["H", "A"], ["H", "10"]), [], [], [], [], [], []],
      hands: [[], [], [], []],
    });
    expect(res.cardPoints[0]).toBe(55 + 21 + 10); // 86 (avec 10 de der)
    expect(res.made).toBe(true);
    expect(res.scores[0]).toBe(86 + 80);
    expect(res.scores[1]).toBe(0);
  });

  it("réussite refusée si l'attaque ne fait pas plus que la défense", () => {
    // 21 partout (contrat de test à 20) : égalité -> pas réussi.
    const res = scoreDeal(baseContract({ value: 20 }), {
      trickWinners: [1, 0, 0, 0, 0, 0, 0, 0], // team0 gagne la der
      tricks: [c(["S", "10"], ["H", "A"]), c(["S", "K"], ["S", "Q"], ["D", "K"]), [], [], [], [], [], []],
      hands: [[], [], [], []],
    });
    expect(res.realized[0]).toBe(res.realized[1]); // 21 == 21
    expect(res.made).toBe(false);
  });

  it("contrat chuté : la défense marque 162 + contrat", () => {
    const res = scoreDeal(baseContract({ value: 120 }), {
      trickWinners: [0, 1, 1, 1, 1, 1, 1, 1], // team0 gagne 1 pli vide (pas capot défense)
      tricks: [[], [], [], [], [], [], [], []],
      hands: [[], [], [], []],
    });
    expect(res.made).toBe(false);
    expect(res.scores[1]).toBe(162 + 120);
    expect(res.scores[0]).toBe(0);
  });

  it("coinche réussie : 162 + contrat × 2", () => {
    const res = scoreDeal(baseContract({ value: 100, coinche: 2 }), {
      trickWinners: [0, 0, 0, 0, 0, 0, 1, 0], // team0 gagne 7 plis (pas capot)
      tricks: [
        c(["S", "J"], ["S", "9"], ["S", "A"], ["S", "10"]), // 55
        c(["C", "A"], ["C", "10"]), // 21
        c(["H", "A"], ["H", "10"], ["H", "K"]), // 25
        [], [], [], [], [],
      ],
      hands: [[], [], [], []],
    });
    expect(res.realized[0]).toBeGreaterThanOrEqual(100);
    expect(res.made).toBe(true);
    expect(res.scores[0]).toBe(162 + 100 * 2);
  });

  it("capot non annoncé : bonus +90", () => {
    const res = scoreDeal(baseContract({ value: 80 }), {
      trickWinners: [0, 0, 0, 0, 0, 0, 0, 0], // team0 rafle tout
      tricks: dealIntoTricks(),
      hands: [[], [], [], []],
    });
    expect(res.cardPoints[0]).toBe(162 + 90); // 252
    expect(res.scores[0]).toBe(252 + 80);
  });

  it("surcoinche réussie : 162 + contrat × 4", () => {
    const res = scoreDeal(baseContract({ value: 90, coinche: 4 }), {
      trickWinners: [0, 0, 0, 0, 0, 0, 1, 0],
      tricks: [
        c(["S", "J"], ["S", "9"], ["S", "A"], ["S", "10"]), // 55
        c(["H", "A"], ["H", "10"], ["H", "K"]), // 25
        c(["C", "A"], ["C", "10"]), // 21
        [], [], [], [], [],
      ],
      hands: [[], [], [], []],
    });
    expect(res.made).toBe(true);
    expect(res.scores[0]).toBe(162 + 90 * 4);
  });

  it("belote : +20 imprenable à l'équipe qui a R+D d'atout", () => {
    const res = scoreDeal(baseContract({ value: 80 }), {
      trickWinners: [1, 1, 1, 1, 1, 1, 1, 1], // chute du preneur
      tricks: [[], [], [], [], [], [], [], []],
      hands: [c(["S", "K"], ["S", "Q"]), [], [], []], // preneur (siège 0) a R+D de pique
    });
    expect(res.belote[0]).toBe(20);
    expect(res.scores[0]).toBe(20); // imprenable même en chute
  });

  it("capot annoncé réussi : 252 (points + bonus) + 250 = 502", () => {
    const res = scoreDeal(baseContract({ value: 250, capot: true }), {
      trickWinners: [0, 0, 0, 0, 0, 0, 0, 0], // l'attaque rafle tout
      tricks: dealIntoTricks(),
      hands: [[], [], [], []],
    });
    expect(res.made).toBe(true);
    expect(res.scores[0]).toBe(252 + 250);
  });

  it("capot annoncé chuté : la défense marque 162 + 250", () => {
    const res = scoreDeal(baseContract({ value: 250, capot: true }), {
      trickWinners: [0, 1, 1, 1, 1, 1, 1, 1], // l'attaque rate le capot
      tricks: [[], [], [], [], [], [], [], []],
      hands: [[], [], [], []],
    });
    expect(res.made).toBe(false);
    expect(res.scores[1]).toBe(162 + 250);
  });

  it("générale réussie (tous les plis par le preneur seul) = 500", () => {
    const res = scoreDeal(baseContract({ value: 500, generale: true }), {
      trickWinners: [0, 0, 0, 0, 0, 0, 0, 0],
      trickWinnerPlayers: [0, 0, 0, 0, 0, 0, 0, 0], // siège 0 rafle seul
      tricks: dealIntoTricks(),
      hands: [[], [], [], []],
    });
    expect(res.made).toBe(true);
    expect(res.scores[0]).toBe(500);
  });

  it("générale chutée (le partenaire prend un pli) = 500 à la défense", () => {
    const res = scoreDeal(baseContract({ value: 500, generale: true }), {
      trickWinners: [0, 0, 0, 0, 0, 0, 0, 0], // l'équipe a tout fait...
      trickWinnerPlayers: [0, 0, 2, 0, 0, 0, 0, 0], // ...mais le partenaire (2) a pris un pli
      tricks: dealIntoTricks(),
      hands: [[], [], [], []],
    });
    expect(res.made).toBe(false);
    expect(res.scores[1]).toBe(500);
  });

  it("option arrondi à la dizaine", () => {
    const res = scoreDeal(baseContract({ value: 90 }), {
      trickWinners: [0, 1, 1, 1, 1, 1, 1, 1], // chute -> défense 162 + 90 = 252
      tricks: [[], [], [], [], [], [], [], []],
      hands: [[], [], [], []],
    });
    const rounded = scoreDeal(
      baseContract({ value: 90 }),
      { trickWinners: [0, 1, 1, 1, 1, 1, 1, 1], tricks: Array(8).fill([]), hands: [[], [], [], []] },
      { ...DEFAULT_SCORE_OPTIONS, roundToTen: true },
    );
    expect(res.scores[1]).toBe(252);
    expect(rounded.scores[1]).toBe(250); // 252 -> 250
  });

  it("option : contrat réussi même si la défense fait autant", () => {
    const args = {
      trickWinners: [1, 0, 0, 0, 0, 0, 0, 0] as const,
      tricks: [c(["S", "10"], ["H", "A"]), c(["S", "K"], ["S", "Q"], ["D", "K"]), [], [], [], [], [], []],
      hands: [[], [], [], []],
    };
    const strict = scoreDeal(baseContract({ value: 20 }), { ...args, trickWinners: [...args.trickWinners] });
    const lax = scoreDeal(
      baseContract({ value: 20 }),
      { ...args, trickWinners: [...args.trickWinners] },
      { ...DEFAULT_SCORE_OPTIONS, contractCanSucceedIfDefenseMore: true },
    );
    expect(strict.made).toBe(false); // 21 == 21 -> raté par défaut
    expect(lax.made).toBe(true); // accepté avec l'option
  });
});

describe("légalité en Sans Atout / Tout Atout", () => {
  it("Sans Atout : on fournit la couleur, sinon défausse libre", () => {
    const trick = [{ card: makeCard("H", "7"), player: 0 }];
    const withHeart = [makeCard("H", "A"), makeCard("S", "A")];
    expect(legalMoves(withHeart, trick, 1, "NT").map((c) => c.id)).toEqual(["HA"]);
    const noHeart = [makeCard("S", "A"), makeCard("D", "K")];
    expect(legalMoves(noHeart, trick, 1, "NT").length).toBe(2); // libre
  });

  it("Tout Atout : obligation de monter dans la couleur entamée", () => {
    const trick = [{ card: makeCard("H", "10"), player: 0 }];
    const hand = [makeCard("H", "8"), makeCard("H", "J")]; // J > 10 en atout
    expect(legalMoves(hand, trick, 1, "AT").map((c) => c.id)).toEqual(["HJ"]);
  });

  it("Tout Atout : sans la couleur entamée, défausse libre", () => {
    const trick = [{ card: makeCard("H", "10"), player: 0 }];
    const hand = [makeCard("S", "J"), makeCard("D", "9")]; // pas de Cœur
    expect(legalMoves(hand, trick, 1, "AT").length).toBe(2);
  });
});

describe("enchères", () => {
  it("4 passes consécutives -> redonne, donneur suivant", () => {
    let g = newGame(DEFAULT_SETTINGS);
    const firstDealer = g.dealer;
    g = applyPass(g);
    g = applyPass(g);
    g = applyPass(g);
    g = applyPass(g);
    expect(g.phase).toBe("bidding");
    expect(g.standing).toBeNull();
    // sens anti-horaire par défaut : le donneur passe à (dealer + 3) % 4
    expect(g.dealer).toBe((firstDealer + 3) % 4);
  });

  it("canBid refuse les valeurs invalides", () => {
    const g = newGame(DEFAULT_SETTINGS);
    expect(canBid(g, 75, false)).toBe(false); // < 80
    expect(canBid(g, 85, false)).toBe(false); // pas un multiple de 10
    expect(canBid(g, 170, false)).toBe(false); // > 160
    expect(canBid(g, 80, false)).toBe(true);
  });

  it("générale interdite en premier de parole, autorisée ensuite", () => {
    const g = newGame({ ...DEFAULT_SETTINGS, allowGenerale: true });
    expect(canBid(g, 500, false, true)).toBe(false); // premier de parole
    const g2 = applyPass(g);
    expect(canBid(g2, 500, false, true)).toBe(true); // après une passe
  });

  it("coinche à la volée : un adversaire coinche hors de son tour", () => {
    let g = newGame(DEFAULT_SETTINGS);
    const opener = g.current;
    g = applyBid(g, 90, "H", false); // l'ouvreur prend, le tour avance
    const flyer = (opener + 1) % 4; // adversaire de l'ouvreur, pas forcément de tour
    expect(canCoinche(g, flyer)).toBe(true);
    const g2 = applyCoinche(g, flyer);
    expect(g2.coinche).toBe(2);
    expect(g2.current).toBe(opener); // le preneur peut surcoincher
  });
});

describe("score générale coinchée", () => {
  it("générale coinchée réussie = 500 × 2", () => {
    const res = scoreDeal(
      { value: 500, mode: "S", taker: 0, capot: false, generale: true, coinche: 2 },
      {
        trickWinners: [0, 0, 0, 0, 0, 0, 0, 0],
        trickWinnerPlayers: [0, 0, 0, 0, 0, 0, 0, 0],
        tricks: dealIntoTricks(),
        hands: [[], [], [], []],
      },
    );
    expect(res.made).toBe(true);
    expect(res.scores[0]).toBe(1000);
  });
});
