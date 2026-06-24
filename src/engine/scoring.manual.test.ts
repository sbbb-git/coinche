import { describe, expect, it } from "vitest";
import { scoreManualDeal } from "./scoring";

describe("compteur manuel (scoreManualDeal)", () => {
  it("contrat normal réussi : preneur = points + contrat", () => {
    const { scores, made } = scoreManualDeal({ takerTeam: 0, value: 90, takerCardPoints: 100 });
    expect(made).toBe(true);
    expect(scores).toEqual([100 + 90, 62]);
  });

  it("contrat normal chuté : défense = 162 + contrat", () => {
    const { scores, made } = scoreManualDeal({ takerTeam: 0, value: 110, takerCardPoints: 90 });
    expect(made).toBe(false);
    expect(scores).toEqual([0, 162 + 110]);
  });

  it("coinche réussie : 162 + contrat × 2", () => {
    const { scores } = scoreManualDeal({ takerTeam: 0, value: 100, takerCardPoints: 110, coinche: 2 });
    expect(scores[0]).toBe(162 + 100 * 2);
    expect(scores[1]).toBe(0);
  });

  it("capot annoncé réussi : 252 + 250", () => {
    const { scores } = scoreManualDeal({ takerTeam: 1, value: 250, capot: true, succeeded: true, takerCardPoints: 0 });
    expect(scores[1]).toBe(252 + 250);
  });

  it("capot annoncé chuté, défense rafle les 8 plis : capot défensif (252 + 250)", () => {
    const { scores, made } = scoreManualDeal({
      takerTeam: 0,
      value: 250,
      capot: true,
      succeeded: false,
      defenseWonAll: true,
      takerCardPoints: 0,
    });
    expect(made).toBe(false);
    expect(scores).toEqual([0, 252 + 250]); // la défense marque son propre capot
  });

  it("capot annoncé chuté sans tout rafler : défense = 162 + 250", () => {
    const { scores } = scoreManualDeal({
      takerTeam: 0,
      value: 250,
      capot: true,
      succeeded: false,
      defenseWonAll: false,
      takerCardPoints: 0,
    });
    expect(scores).toEqual([0, 162 + 250]);
  });

  it("belote imprenable même en chute", () => {
    const { scores } = scoreManualDeal({ takerTeam: 0, value: 120, takerCardPoints: 80, beloteTeam: 0 });
    expect(scores[0]).toBe(20); // chute : seule la belote reste au preneur
    expect(scores[1]).toBe(162 + 120);
  });
});
