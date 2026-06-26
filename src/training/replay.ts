// Rejoue une donne enregistrée et extrait les POINTS DE DÉCISION du joueur
// (siège 0) : enchères puis jeu, en sautant les coups forcés. Pour chacun, on
// compare ce qui a été joué au conseil du coach.

import { Card, RANK_LABEL, SUIT_SYMBOL, TrumpMode, points } from "../engine/cards";
import {
  BidEntry,
  DEFAULT_PROFILE,
  DEFAULT_SETTINGS,
  GameState,
  applyBid,
  applyCoinche,
  applyPass,
  applyPlay,
  applySurcoinche,
  dealStateFrom,
} from "../engine/game";
import { coachBid, coachPlay, isPlayDecision } from "../engine/coach";
import { Team } from "../engine/scoring";
import { DealRecord } from "../storage";
import { currentLang, translate } from "../i18n";

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
  const lang = currentLang();
  if (b.kind === "pass") return translate(lang, "replay.pass");
  if (b.kind === "coinche") return translate(lang, "replay.coinche");
  if (b.kind === "surcoinche") return translate(lang, "replay.surcoinche");
  const value = b.generale
    ? translate(lang, "replay.generale")
    : b.capot
      ? translate(lang, "replay.capot")
      : b.value;
  return `${value} ${modeText(b.mode!)}`;
}
function applyEntry(g: GameState, b: BidEntry): GameState {
  if (b.kind === "bid") return applyBid(g, b.value!, b.mode!, !!b.capot, !!b.generale);
  if (b.kind === "coinche") return applyCoinche(g);
  if (b.kind === "surcoinche") return applySurcoinche(g);
  return applyPass(g);
}

// --- Rejeu COMPLET d'une donne (qui avait quoi + pli par pli) ----------------

export interface ReplayTrick {
  played: { player: number; card: Card }[];
  winner: number;
  team: Team;
  points: number; // points cartes du pli (hors 10 de der)
  lastDix: boolean; // ce pli est le dernier (10 de der)
}

export interface FullReplay {
  hands: Card[][]; // mains initiales des 4 joueurs (telles que distribuées)
  dealer: number;
  taker: number;
  mode: TrumpMode;
  contractLabel: string;
  resultLabel: string;
  scores: [number, number];
  bids: { player: number; text: string }[];
  tricks: ReplayTrick[];
  cumul: [number, number][]; // cumul des points par équipe après chaque pli (avec 10 de der au dernier)
}

function mergedSettings(rec: DealRecord) {
  return {
    ...DEFAULT_SETTINGS,
    ...rec.settings,
    profile: { ...DEFAULT_PROFILE, ...(rec.settings?.profile ?? {}) },
  };
}

/** Rejoue intégralement une donne enregistrée et en extrait les mains initiales,
 *  la séquence d'enchères et le détail pli par pli. */
export function fullReplay(rec: DealRecord): FullReplay {
  const settings = mergedSettings(rec);
  let g = dealStateFrom(settings, rec.dealer, rec.dealtHands);
  for (const b of rec.bids) g = applyEntry(g, b);
  for (const pl of rec.plays) {
    if (g.phase !== "playing") break;
    const card = g.hands[g.current].find((c) => c.id === pl.cardId);
    if (!card) break;
    const prev = g;
    g = applyPlay(g, card);
    if (g === prev) break;
  }

  const mode = rec.contract?.mode ?? "S";
  const n = g.completedTricks.length;
  const complete = n === 8; // 10 de der seulement si la donne est réellement terminée
  const tricks: ReplayTrick[] = g.completedTricks.map((t, i) => ({
    played: t.played.map((p) => ({ player: p.player, card: p.card })),
    winner: t.winner,
    team: t.winnerTeam,
    points: t.cards.reduce((s, c) => s + points(c, mode), 0),
    lastDix: complete && i === n - 1,
  }));

  const cumul: [number, number][] = [];
  const acc: [number, number] = [0, 0];
  tricks.forEach((t) => {
    acc[t.team] += t.points + (t.lastDix ? 10 : 0);
    cumul.push([acc[0], acc[1]]);
  });

  const lang = currentLang();
  const c = rec.contract;
  const contractValue = c
    ? c.generale
      ? translate(lang, "replay.generale")
      : c.capot
        ? translate(lang, "replay.capot")
        : c.value
    : null;
  const contractLabel = c
    ? `${contractValue} ${modeText(c.mode)}${
        c.coinche > 1 ? (c.coinche === 4 ? " ×4" : " ×2") : ""
      }`
    : "-";
  const made = rec.result?.made;
  const resultLabel =
    made === undefined ? "" : made ? translate(lang, "replay.made") : translate(lang, "replay.failed");

  return {
    hands: rec.dealtHands,
    dealer: rec.dealer,
    taker: c?.taker ?? 0,
    mode,
    contractLabel,
    resultLabel,
    scores: rec.result?.scores ?? [0, 0],
    bids: rec.bids.map((b) => ({ player: b.player, text: bidEntryLabel(b) })),
    tricks,
    cumul,
  };
}

/** Export texte lisible d'une donne (mains, enchères, plis) + JSON exact en fin,
 *  pour la partager / la coller dans une analyse. */
export function exportDealText(rec: DealRecord): string {
  const lang = currentLang();
  const locale = lang === "en" ? "en-GB" : "fr-FR";
  const names = mergedSettings(rec).playerNames;
  const r = fullReplay(rec);
  const L: string[] = [];
  L.push(translate(lang, "export.header", { date: new Date(rec.ts).toLocaleString(locale) }));
  L.push(
    translate(lang, "export.contract", {
      contract: r.contractLabel,
      taker: names[r.taker],
      result: r.resultLabel,
      a: r.scores[0],
      b: r.scores[1],
    }),
  );
  L.push("");
  L.push(translate(lang, "export.hands"));
  for (let p = 0; p < 4; p++) {
    L.push(
      `  ${names[p]}${p === r.taker ? translate(lang, "export.taker") : ""} : ${r.hands[p].map(cardLabel).join(" ")}`,
    );
  }
  L.push("");
  L.push(translate(lang, "export.bids") + r.bids.map((b) => `${names[b.player]} ${b.text}`).join(" · "));
  L.push("");
  L.push(translate(lang, "export.tricks"));
  r.tricks.forEach((t, i) => {
    const cards = t.played.map((p) => `${names[p.player]}:${cardLabel(p.card)}`).join("  ");
    L.push(`  ${i + 1}. ${cards}  → ${names[t.winner]} (+${t.points}${t.lastDix ? " +10 der" : ""})`);
  });
  L.push("");
  L.push(translate(lang, "export.json"));
  L.push(JSON.stringify(rec));
  return L.join("\n");
}

export function reviewDeal(rec: DealRecord): DealReview {
  // Fusion avec les défauts : tolère les anciennes parties enregistrées (schéma incomplet).
  const settings = {
    ...DEFAULT_SETTINGS,
    ...rec.settings,
    profile: { ...DEFAULT_PROFILE, ...(rec.settings?.profile ?? {}) },
  };
  let g = dealStateFrom(settings, rec.dealer, rec.dealtHands);
  const points: ReviewPoint[] = [];

  // --- Enchères ---
  for (const b of rec.bids) {
    // Le coach n'évalue que « annoncer » ou « passer » : on n'analyse pas
    // les coinches/surcoinches du joueur (sinon elles seraient comptées à tort).
    if (g.phase === "bidding" && g.current === 0 && b.player === 0 && (b.kind === "bid" || b.kind === "pass")) {
      const adv = coachBid(g, 0, currentLang());
      const best =
        adv.action.action === "pass"
          ? translate(currentLang(), "replay.bestBid")
          : `${adv.action.value} ${modeText(adv.action.mode)}`;
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
      const { best, reason } = coachPlay(g, currentLang());
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
    const prev = g;
    g = applyPlay(g, card);
    if (g === prev) break; // coup rejeté (illégal/corrompu) : on s'arrête proprement
  }

  const lang = currentLang();
  const c = rec.contract;
  const contractValue = c
    ? c.generale
      ? translate(lang, "replay.generale")
      : c.capot
        ? translate(lang, "replay.capot")
        : c.value
    : null;
  const contractLabel = c ? `${contractValue} ${modeText(c.mode)}` : "-";
  const made = rec.result?.made;
  const resultLabel =
    made === undefined ? "" : made ? translate(lang, "replay.made") : translate(lang, "replay.failed");

  return {
    points,
    contractLabel,
    resultLabel,
    bidCount: points.filter((p) => p.phase === "bid").length,
    playCount: points.filter((p) => p.phase === "play").length,
    goodCount: points.filter((p) => p.good).length,
  };
}

/** Rend la main au navigateur entre deux calculs lourds (anti-gel). */
function yieldToMain(): Promise<void> {
  return new Promise((r) => setTimeout(r, 0));
}

/**
 * Version ASYNCHRONE de `reviewDeal` : identique au résultat, mais rend la main
 * au thread entre chaque analyse coach (PIMC) coûteuse, pour ne pas geler l'UI
 * sur mobile. Le résultat est strictement le même (même coach déterministe).
 */
export async function reviewDealAsync(rec: DealRecord): Promise<DealReview> {
  const settings = {
    ...DEFAULT_SETTINGS,
    ...rec.settings,
    profile: { ...DEFAULT_PROFILE, ...(rec.settings?.profile ?? {}) },
  };
  let g = dealStateFrom(settings, rec.dealer, rec.dealtHands);
  const points: ReviewPoint[] = [];

  for (const b of rec.bids) {
    if (g.phase === "bidding" && g.current === 0 && b.player === 0 && (b.kind === "bid" || b.kind === "pass")) {
      const adv = coachBid(g, 0, currentLang());
      const best =
        adv.action.action === "pass"
          ? translate(currentLang(), "replay.bestBid")
          : `${adv.action.value} ${modeText(adv.action.mode)}`;
      const good =
        adv.action.action === "pass"
          ? b.kind === "pass"
          : b.kind === "bid" && b.value === adv.action.value && b.mode === adv.action.mode;
      points.push({ phase: "bid", snapshot: g, actual: bidEntryLabel(b), best, good, reason: adv.reason });
    }
    g = applyEntry(g, b);
  }

  for (const pl of rec.plays) {
    if (g.phase !== "playing") break;
    if (g.current === 0 && isPlayDecision(g)) {
      await yieldToMain(); // libère le thread avant le calcul PIMC
      const { best, reason } = coachPlay(g, currentLang());
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
    if (!card) break;
    const prev = g;
    g = applyPlay(g, card);
    if (g === prev) break;
  }

  const lang = currentLang();
  const c = rec.contract;
  const contractValue = c
    ? c.generale
      ? translate(lang, "replay.generale")
      : c.capot
        ? translate(lang, "replay.capot")
        : c.value
    : null;
  const contractLabel = c ? `${contractValue} ${modeText(c.mode)}` : "-";
  const made = rec.result?.made;
  const resultLabel =
    made === undefined ? "" : made ? translate(lang, "replay.made") : translate(lang, "replay.failed");

  return {
    points,
    contractLabel,
    resultLabel,
    bidCount: points.filter((p) => p.phase === "bid").length,
    playCount: points.filter((p) => p.phase === "play").length,
    goodCount: points.filter((p) => p.good).length,
  };
}
