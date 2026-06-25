import { describe, it, expect } from "vitest";
import { makeCard, points, strength, type Card, type TrumpMode } from "./cards";

// Copie EXACTE de la fonction actuelle (ai.ts:853-866)
function pickBestIndexCurrent(legal: Card[], scoreSum: number[], mode: TrumpMode, eps: number): number {
  let best = 0;
  for (let i = 1; i < legal.length; i++) {
    const d = scoreSum[i] - scoreSum[best];
    if (d > eps) {
      best = i;
    } else if (d >= -eps) {
      const a = legal[i], b = legal[best];
      const pa = points(a, mode), pb = points(b, mode);
      if (pa < pb || (pa === pb && strength(a, mode) < strength(b, mode))) best = i;
    }
  }
  return best;
}

// Fix proposé : max global d'abord, tie-break parmi [max-eps, max]
function pickBestIndexFixed(legal: Card[], scoreSum: number[], mode: TrumpMode, eps: number): number {
  let max = -Infinity;
  for (const s of scoreSum) if (s > max) max = s;
  let best = -1;
  for (let i = 0; i < legal.length; i++) {
    if (scoreSum[i] < max - eps) continue;
    if (best === -1) { best = i; continue; }
    const pa = points(legal[i], mode), pb = points(legal[best], mode);
    if (pa < pb || (pa === pb && strength(legal[i], mode) < strength(legal[best], mode))) best = i;
  }
  return best;
}

const H = (r: any) => makeCard("H", r);
const S = (r: any) => makeCard("S", r);

describe("pickBestIndex intransitivity", () => {
  it("contre-exemple 1: scores=[50,30,10], mode H, eps=32", () => {
    const legal = [H("A"), H("Q"), H("7")]; // HA=11pts couleur? non, mode H -> atout
    const scores = [50, 30, 10];
    const eps = 32;
    const idx = pickBestIndexCurrent(legal, scores, "H", eps);
    console.log("EX1 current ->", legal[idx].id, "score", scores[idx], "max", Math.max(...scores));
    const idxF = pickBestIndexFixed(legal, scores, "H", eps);
    console.log("EX1 fixed   ->", legal[idxF].id, "score", scores[idxF]);
    // points en mode H (atout): A=11, Q=3, 7=0
    console.log("points HA,HQ,H7 =", points(H("A"),"H"), points(H("Q"),"H"), points(H("7"),"H"));
  });

  it("contre-exemple 2: scores=[96,64,32,0] HA,HK,HQ,H7 eps=32", () => {
    const legal = [H("A"), H("K"), H("Q"), H("7")];
    const scores = [96, 64, 32, 0];
    const eps = 32;
    const idx = pickBestIndexCurrent(legal, scores, "H", eps);
    console.log("EX2 current ->", legal[idx].id, "score", scores[idx], "max", Math.max(...scores));
    const idxF = pickBestIndexFixed(legal, scores, "H", eps);
    console.log("EX2 fixed   ->", legal[idxF].id, "score", scores[idxF]);
    expect(scores[idx]).toBeLessThan(Math.max(...scores)); // confirme bug si vrai
  });

  it("contre-exemple 3 (jeu reel): S7=7060, HA=8056, HJ=8044, H8=8044, eps=32", () => {
    // legal=[S7:7060, HA:8056, HJ:8044, ...] -> coach recommande H8 (8044) au lieu de HA(8056)
    const legal = [S("7"), H("A"), H("J"), H("8")];
    const scores = [7060, 8056, 8044, 8044];
    const eps = 32;
    const idx = pickBestIndexCurrent(legal, scores, "H", eps);
    console.log("EX3 current ->", legal[idx].id, "score", scores[idx], "max", Math.max(...scores));
    const idxF = pickBestIndexFixed(legal, scores, "H", eps);
    console.log("EX3 fixed   ->", legal[idxF].id, "score", scores[idxF]);
  });

  it("sanity: egalite stricte -> moins chere, pas de regression", () => {
    const legal = [H("A"), H("7")];
    const scores = [100, 100];
    expect(legal[pickBestIndexCurrent(legal, scores, "H", 32)].id).toBe("H7");
    expect(legal[pickBestIndexFixed(legal, scores, "H", 32)].id).toBe("H7");
  });
});
