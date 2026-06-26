import { describe, expect, it } from "vitest";
import { makeCard } from "./cards";
import {
  DEFAULT_SETTINGS,
  GameState,
  applyBid,
  applyPass,
  applyPlay,
  dealStateFrom,
  legalForCurrent,
  newGame,
  nextDeal,
} from "./game";
import { coachBid, coachPlay, isPlayDecision, playReason } from "./coach";
import { aiBid, aiPlay } from "./ai";

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

  it("soutient le partenaire : relance son 80 avec un fit + un As extérieur", () => {
    // Partenaire (siège 2) a ouvert à 80 Pique ; on a Valet de Pique + un As extérieur.
    const hand = [
      makeCard("S", "J"),
      makeCard("S", "7"),
      makeCard("H", "A"),
      makeCard("H", "8"),
      makeCard("D", "9"),
      makeCard("D", "7"),
      makeCard("C", "8"),
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
    expect(adv.action.action).toBe("bid");
    if (adv.action.action === "bid") {
      expect(adv.action.mode).toBe("S");
      expect(adv.action.value).toBeGreaterThan(80); // on relance, on ne laisse pas tomber
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

  it("produit des explications EN non vides (coachBid / coachPlay en 'en')", () => {
    // --- Enchère en anglais ---
    const bidHand = [
      makeCard("S", "J"),
      makeCard("S", "9"),
      makeCard("S", "A"),
      makeCard("S", "10"),
      makeCard("S", "K"),
      makeCard("H", "A"),
      makeCard("D", "A"),
      makeCard("C", "7"),
    ];
    const bidAdv = coachBid(stateWithHand(bidHand), 0, "en");
    expect(typeof bidAdv.reason).toBe("string");
    expect(bidAdv.reason.length).toBeGreaterThan(0);
    // Un terme EN attendu dans l'explication d'enchère (couleur d'atout / Sans Atout…).
    expect(bidAdv.reason).toMatch(/trump|Trumps?|No Trump|Spades|Hearts|Diamonds|Clubs|points/);

    // --- Jeu de la carte en anglais ---
    const playHand = [makeCard("S", "A"), makeCard("H", "K"), makeCard("D", "10")];
    const g = dealStateFrom(DEFAULT_SETTINGS, 3, [playHand, [], [], []]);
    const playing: GameState = {
      ...g,
      phase: "playing" as const,
      contract: { value: 80, mode: "S" as const, taker: 0, capot: false, generale: false, coinche: 1 as const },
      current: 0,
      trick: [],
    };
    expect(isPlayDecision(playing)).toBe(true);
    const playAdv = coachPlay(playing, "en");
    expect(typeof playAdv.reason).toBe("string");
    expect(playAdv.reason.length).toBeGreaterThan(0);
    expect(playAdv.reason).toMatch(/trick|trump|No Trump|Ace|lead/);
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

  it("défense 2ᵉ main : explique « garde ton As » et NE prétend PAS gagner le pli", () => {
    // Reproduit la capture : contrat 90 ♦, preneur Est (3, équipe adverse).
    // Ouest (1) entame 7♣. Toi (0) es 2ᵉ ; tu as A♣ et 8♣. Le bon coup = 8♣.
    const hand = [makeCard("C", "A"), makeCard("C", "8"), makeCard("S", "A"), makeCard("S", "K")];
    const g = dealStateFrom(DEFAULT_SETTINGS, 3, [hand, [], [], []]);
    const playing = {
      ...g,
      phase: "playing" as const,
      contract: { value: 90, mode: "D" as const, taker: 3, capot: false, generale: false, coinche: 1 as const },
      current: 0,
      trick: [{ card: makeCard("C", "7"), player: 1 }],
    };
    const reason = playReason(playing, makeCard("C", "8"));
    expect(reason.toLowerCase()).toContain("deuxième main basse");
    expect(reason).not.toContain("juste assez forte pour gagner");
    // Et jouer l'As ici n'est PAS présenté comme « deuxième main basse ».
    expect(playReason(playing, makeCard("C", "A"))).not.toContain("deuxième main basse");
  });

  it("le conseil en jeu est scénarisé et chiffré (probabilités issues du Monte-Carlo)", () => {
    // On joue une vraie partie jusqu'à une décision en cours de pli, puis on
    // vérifie que le conseil du coach mentionne des % réels et le coup recommandé.
    const settings = { ...DEFAULT_SETTINGS, aiLevel: "medium" as const };
    let g: GameState = newGame(settings);
    let advice: ReturnType<typeof coachPlay> | null = null;
    let guard = 0;
    while (!advice && guard++ < 4000) {
      if (g.phase === "bidding") {
        const d = aiBid(g, g.current);
        g = d.action === "bid" ? applyBid(g, d.value, d.mode, d.capot, d.generale) : applyPass(g);
      } else if (g.phase === "playing") {
        if (legalForCurrent(g).length >= 2 && g.trick.length >= 1) advice = coachPlay(g);
        else g = applyPlay(g, aiPlay(g));
      } else if (g.phase === "dealScored") {
        g = nextDeal(g);
      } else {
        g = newGame(settings);
      }
    }
    expect(advice).not.toBeNull();
    const reason = advice!.reason;
    // Contient au moins un pourcentage et plusieurs lignes (concept + chiffres).
    expect(reason).toMatch(/\d+%/);
    expect(reason.split("\n").length).toBeGreaterThanOrEqual(2);
    // Le coup recommandé est légal (cohérence carte affichée ↔ explication).
    expect(legalForCurrent(g).map((c) => c.id)).toContain(advice!.best.id);
  });
});
