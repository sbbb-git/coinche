import { describe, expect, it } from "vitest";
import { levelInfo } from "./stats";

describe("niveau (paliers)", () => {
  it("associe le bon palier au rating", () => {
    expect(levelInfo(900).label).toBe("Débutant");
    expect(levelInfo(1000).label).toBe("Amateur");
    expect(levelInfo(1400).label).toBe("Intermédiaire");
    expect(levelInfo(1800).label).toBe("Avancé");
    expect(levelInfo(2200).label).toBe("Expert");
    expect(levelInfo(2700).label).toBe("Maître");
  });

  it("progression bornée 0..1 dans le palier", () => {
    for (const r of [0, 1000, 1200, 1399, 1800, 2999]) {
      const p = levelInfo(r).progress;
      expect(p).toBeGreaterThanOrEqual(0);
      expect(p).toBeLessThanOrEqual(1);
    }
  });
});
