import { describe, expect, it } from "vitest";
import { makeCard } from "./cards";
import { GameState } from "./game";
import { estimateForMode, estimateWithAuction, readAuction } from "./ai";

// État minimal : seule la séquence d'enchères est nécessaire pour ces fonctions.
const withBids = (bids: GameState["bidHistory"]): GameState => ({ bidHistory: bids } as GameState);

// Joueur 0 = nous ; partenaire = 2 ; adversaires = 1 et 3.
describe("lecture des annonces (enchères)", () => {
  it("identifie la couleur/valeur adverse et celle du partenaire", () => {
    const r = readAuction(
      withBids([
        { player: 1, kind: "bid", value: 110, mode: "H" },
        { player: 2, kind: "bid", value: 120, mode: "S" },
        { player: 3, kind: "pass" },
      ]),
      0,
    );
    expect(r.oppBestInSuit.H).toBe(110);
    expect(r.oppBestAny).toBe(110); // 120 est au partenaire, pas un adversaire
    expect(r.partnerSuit).toBe("S");
    expect(r.partnerValue).toBe(120);
  });

  it("dévalue fortement une couleur déjà prise par l'adversaire", () => {
    const hand = [
      makeCard("H", "J"),
      makeCard("H", "9"),
      makeCard("H", "A"),
      makeCard("H", "10"),
      makeCard("H", "K"),
      makeCard("S", "A"),
      makeCard("D", "7"),
      makeCard("C", "8"),
    ];
    const base = estimateForMode(hand, "H");
    const read = readAuction(withBids([{ player: 1, kind: "bid", value: 110, mode: "H" }]), 0);
    const adjusted = estimateWithAuction(hand, "H", read);
    // L'adversaire tient les gros atouts à Cœur : notre Cœur vaut nettement moins.
    expect(adjusted).toBeLessThan(base - 20);
  });

  it("revalorise notre couleur quand le partenaire l'a annoncée", () => {
    const hand = [
      makeCard("S", "K"),
      makeCard("S", "Q"),
      makeCard("S", "9"),
      makeCard("H", "A"),
      makeCard("H", "7"),
      makeCard("D", "8"),
      makeCard("C", "9"),
      makeCard("C", "7"),
    ];
    const base = estimateForMode(hand, "S");
    const read = readAuction(withBids([{ player: 2, kind: "bid", value: 80, mode: "S" }]), 0);
    expect(estimateWithAuction(hand, "S", read)).toBeGreaterThan(base);
  });

  it("ignore les annonces de structure (capot / générale) dans la lecture", () => {
    const r = readAuction(
      withBids([
        { player: 1, kind: "bid", value: 250, mode: "H", capot: true },
        { player: 3, kind: "bid", value: 500, mode: "S", generale: true },
      ]),
      0,
    );
    expect(r.oppBestInSuit.H).toBeUndefined();
    expect(r.oppBestAny).toBe(0);
  });

  it("ne dévalue pas à Sans Atout / Tout Atout (pas de couleur d'atout adverse)", () => {
    const hand = [
      makeCard("S", "A"),
      makeCard("H", "A"),
      makeCard("D", "A"),
      makeCard("C", "A"),
      makeCard("S", "10"),
      makeCard("H", "10"),
      makeCard("D", "K"),
      makeCard("C", "K"),
    ];
    // Un adversaire a annoncé une couleur : cela ne doit pas pénaliser un mode SA.
    const read = readAuction(withBids([{ player: 1, kind: "bid", value: 110, mode: "H" }]), 0);
    const base = estimateForMode(hand, "NT");
    // Seule la pénalité globale "adversaires forts" s'applique (pas la pénalité de couleur).
    expect(estimateWithAuction(hand, "NT", read)).toBeGreaterThan(base - 12);
  });

  it("sans annonce, l'estimation est inchangée", () => {
    const hand = [
      makeCard("D", "J"),
      makeCard("D", "9"),
      makeCard("D", "A"),
      makeCard("D", "8"),
      makeCard("S", "A"),
      makeCard("H", "10"),
      makeCard("C", "K"),
      makeCard("C", "7"),
    ];
    const read = readAuction(withBids([]), 0);
    expect(estimateWithAuction(hand, "D", read)).toBe(estimateForMode(hand, "D"));
  });
});
