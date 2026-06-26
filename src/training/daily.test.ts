import { describe, expect, it } from "vitest";
import { genDailyChallenge } from "./daily";

describe("défi du jour", () => {
  it("est déterministe : même date → même défi", () => {
    const a = genDailyChallenge("2026-06-21");
    const b = genDailyChallenge("2026-06-21");
    expect(a.kind).toBe(b.kind);
    if (a.kind === "play" && b.kind === "play") {
      expect(a.correctId).toBe(b.correctId);
      expect(a.state.hands[0].map((c) => c.id)).toEqual(b.state.hands[0].map((c) => c.id));
    } else if (a.kind === "bid" && b.kind === "bid") {
      expect(a.hand.map((c) => c.id)).toEqual(b.hand.map((c) => c.id));
      expect(a.ideal).toEqual(b.ideal);
    }
  });

  it("produit un défi valide (jeu : la bonne carte est jouable ; enchère : main de 8)", () => {
    for (const key of ["2026-07-01", "2026-07-02", "2026-07-03", "2026-07-04", "2026-07-05"]) {
      const ex = genDailyChallenge(key);
      if (ex.kind === "play") {
        expect(ex.legal.length).toBeGreaterThan(1);
        expect(ex.legal.map((c) => c.id)).toContain(ex.correctId);
      } else {
        expect(ex.hand.length).toBe(8);
        expect(["pass", "bid"]).toContain(ex.ideal.action);
      }
    }
  });

  it("varie selon la date (pas toujours le même type)", () => {
    const kinds = new Set<string>();
    for (let d = 1; d <= 20; d++) kinds.add(genDailyChallenge(`2026-09-${String(d).padStart(2, "0")}`).kind);
    expect(kinds.size).toBeGreaterThan(1); // au moins une enchère ET un coup à jouer dans le mois
  });

  it("ne fuit pas le seed : Math.random restauré après génération", () => {
    const before = Math.random;
    genDailyChallenge("2026-08-15");
    expect(Math.random).toBe(before);
  });
});
