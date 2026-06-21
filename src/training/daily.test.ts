import { describe, expect, it } from "vitest";
import { genDailyChallenge } from "./daily";

describe("défi du jour", () => {
  it("est déterministe : même date → même exercice", () => {
    const a = genDailyChallenge("2026-06-21");
    const b = genDailyChallenge("2026-06-21");
    expect(a.correctId).toBe(b.correctId);
    expect(a.state.hands[0].map((c) => c.id)).toEqual(b.state.hands[0].map((c) => c.id));
  });

  it("produit un exercice valide (la bonne carte est jouable)", () => {
    const ex = genDailyChallenge("2026-07-01");
    expect(ex.legal.length).toBeGreaterThan(1);
    expect(ex.legal.map((c) => c.id)).toContain(ex.correctId);
  });

  it("ne fuit pas le seed : Math.random restauré après génération", () => {
    const before = Math.random;
    genDailyChallenge("2026-08-15");
    expect(Math.random).toBe(before);
  });
});
