// Rejoue une donne enregistrée et extrait les POINTS DE DÉCISION du joueur
// (siège 0) : enchères puis jeu, en sautant les coups forcés. Pour chacun, on
// compare ce qui a été joué au conseil du coach.

import { Card, RANK_LABEL, SUIT_SYMBOL, TrumpMode } from "../engine/cards";
import {
  BidEntry,
  GameState,
  applyBid,
  applyCoinche,
  applyPass,
  applyPlay,
  applySurcoinche,
  dealStateFrom,
} from "../engine/game";
import { coachBid, coachPlay, isPlayDecision } from "../engine/coach";
import { DealRecord } from "../storage";

export interface ReviewPoint {
  phase: "bid" | "play";
  snapshot: GameState; // état juste avant la décision du siège 0
  actual: string;
  best: string;
  good: boolean;
  reason: string;
  actualCardId?: string;
  bestCardId?: string;
}

export interface DealReview {
  points: ReviewPoint[];
  contractLabel: string;
  resultLabel: string;
  bidCount: number;
  playCount: number;
  goodCount: number;
}

function modeText(m: TrumpMode): string {
  if (m === "NT") return "SA";
  if (m === "AT") return "TA";
  return SUIT_SYMBOL[m];
}
function cardLabel(c: Card): string {
  return `${RANK_LABEL[c.rank]}${SUIT_SYMBOL[c.suit]}`;
}
function bidEntryLabel(b: BidEntry): string {
  if (b.kind === "pass") return "Passer";
  if (b.kind === "coinche") return "Coincher";
  if (b.kind === "surcoinche") return "Surcoincher";
  return `${b.capot ? "Capot" : b.value} ${modeText(b.mode!)}`;
}
function applyEntry(g: GameState, b: BidEntry): GameState {
  if (b.kind === "bid") return applyBid(g, b.value!, b.mode!, !!b.capot);
  if (b.kind === "coinche") return applyCoinche(g);
  if (b.kind === "surcoinche") return applySurcoinche(g);
  return applyPass(g);
}

export function reviewDeal(rec: DealRecord): DealReview {
  let g = dealStateFrom(rec.settings, rec.dealer, rec.dealtHands);
  const points: ReviewPoint[] = [];

  // --- Enchères ---
  for (const b of rec.bids) {
    if (g.phase === "bidding" && g.current === 0 && b.player === 0) {
      const adv = coachBid(g, 0);
      const best =
        adv.action.action === "pass" ? "Passer" : `${adv.action.value} ${modeText(adv.action.mode)}`;
      const good =
        adv.action.action === "pass"
          ? b.kind === "pass"
          : b.kind === "bid" && b.value === adv.action.value && b.mode === adv.action.mode;
      points.push({ phase: "bid", snapshot: g, actual: bidEntryLabel(b), best, good, reason: adv.reason });
    }
    g = applyEntry(g, b);
  }

  // --- Jeu de la carte ---
  for (const pl of rec.plays) {
    if (g.phase !== "playing") break;
    if (g.current === 0 && isPlayDecision(g)) {
      const { best, reason } = coachPlay(g);
      const actualCard = g.hands[0].find((c) => c.id === pl.cardId);
      points.push({
        phase: "play",
        snapshot: g,
        actual: actualCard ? cardLabel(actualCard) : pl.cardId,
        best: cardLabel(best),
        good: pl.cardId === best.id,
        reason,
        actualCardId: pl.cardId,
        bestCardId: best.id,
      });
    }
    const card = g.hands[g.current].find((c) => c.id === pl.cardId);
    if (!card) break; // sécurité (donnée corrompue)
    g = applyPlay(g, card);
  }

  const c = rec.contract;
  const contractLabel = c ? `${c.capot ? "Capot" : c.value} ${modeText(c.mode)}` : "—";
  const made = rec.result?.made;
  const resultLabel = made === undefined ? "" : made ? "Contrat réussi" : "Chute";

  return {
    points,
    contractLabel,
    resultLabel,
    bidCount: points.filter((p) => p.phase === "bid").length,
    playCount: points.filter((p) => p.phase === "play").length,
    goodCount: points.filter((p) => p.good).length,
  };
}
