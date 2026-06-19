// Simulateur massif IA vs IA : joue beaucoup de parties pour fournir une
// « review globale » de la stratégie de l'IA (taux de réussite, modes, etc.).

import { TrumpMode } from "../engine/cards";
import {
  AiLevel,
  GameState,
  Settings,
  applyBid,
  applyCoinche,
  applyPass,
  applyPlay,
  applySurcoinche,
  newGame,
  nextDeal,
  winnerTeam,
} from "../engine/game";
import { aiBid, aiPlay } from "../engine/ai";
import { Team, teamOf } from "../engine/scoring";

export interface SimConfig {
  games: number;
  levelA: AiLevel; // équipe 0 (sièges 0 & 2)
  levelB: AiLevel; // équipe 1 (sièges 1 & 3)
}

export interface ModeStat {
  taken: number;
  made: number;
}

export interface SimReport {
  config: SimConfig;
  games: number;
  deals: number;
  winsA: number;
  winsB: number;
  takerStat: [ModeStat, ModeStat]; // par équipe preneuse : pris / réussis
  byMode: Record<string, ModeStat>;
  coinches: number;
  surcoinches: number;
  capots: number;
  avgContractValue: number;
  avgWinnerDealScore: number;
}

function withLevel(g: GameState, level: AiLevel): GameState {
  return g.settings.aiLevel === level ? g : { ...g, settings: { ...g.settings, aiLevel: level } };
}

/** Joue une partie entière, en pilotant chaque équipe avec son niveau. */
function playGame(
  settings: Settings,
  cfg: SimConfig,
  onDeal: (g: GameState) => void,
): Team | null {
  let g = newGame(settings);
  const levelOf = (p: number): AiLevel => (teamOf(p) === 0 ? cfg.levelA : cfg.levelB);
  let guard = 0;
  while (g.phase !== "gameOver" && guard++ < 100000) {
    if (g.phase === "bidding") {
      const d = aiBid(withLevel(g, levelOf(g.current)), g.current);
      if (d.action === "bid") g = applyBid(g, d.value, d.mode, d.capot, d.generale);
      else if (d.action === "coinche") g = applyCoinche(g);
      else if (d.action === "surcoinche") g = applySurcoinche(g);
      else g = applyPass(g);
    } else if (g.phase === "playing") {
      g = applyPlay(g, aiPlay(withLevel(g, levelOf(g.current))));
    } else if (g.phase === "dealScored") {
      onDeal(g);
      g = nextDeal(g);
    }
  }
  return winnerTeam(g);
}

const MODE_KEYS: Record<TrumpMode, string> = {
  S: "Pique",
  H: "Cœur",
  D: "Carreau",
  C: "Trèfle",
  NT: "Sans Atout",
  AT: "Tout Atout",
};

interface Acc {
  report: SimReport;
  contractValueSum: number;
  winnerScoreSum: number;
}

function newAcc(cfg: SimConfig): Acc {
  return {
    report: {
      config: cfg,
      games: 0,
      deals: 0,
      winsA: 0,
      winsB: 0,
      takerStat: [
        { taken: 0, made: 0 },
        { taken: 0, made: 0 },
      ],
      byMode: {},
      coinches: 0,
      surcoinches: 0,
      capots: 0,
      avgContractValue: 0,
      avgWinnerDealScore: 0,
    },
    contractValueSum: 0,
    winnerScoreSum: 0,
  };
}

function runOneGame(settings: Settings, cfg: SimConfig, acc: Acc) {
  const report = acc.report;
  const onDeal = (g: GameState) => {
    const c = g.contract;
    const r = g.lastResult;
    if (!c || !r) return;
    report.deals++;
    const tt = c.taker % 2;
    report.takerStat[tt].taken++;
    if (r.made) report.takerStat[tt].made++;
    const key = MODE_KEYS[c.mode];
    const m = (report.byMode[key] ??= { taken: 0, made: 0 });
    m.taken++;
    if (r.made) m.made++;
    if (c.coinche === 2) report.coinches++;
    if (c.coinche === 4) report.surcoinches++;
    if (c.capot) report.capots++;
    acc.contractValueSum += c.value;
    acc.winnerScoreSum += Math.max(r.scores[0], r.scores[1]);
  };
  const w = playGame(settings, cfg, onDeal);
  report.games++;
  if (w === 0) report.winsA++;
  else if (w === 1) report.winsB++;
}

function finalize(acc: Acc): SimReport {
  const r = acc.report;
  r.avgContractValue = r.deals ? Math.round(acc.contractValueSum / r.deals) : 0;
  r.avgWinnerDealScore = r.deals ? Math.round(acc.winnerScoreSum / r.deals) : 0;
  return r;
}

/** Version synchrone (petits volumes / tests). */
export function simulate(settings: Settings, cfg: SimConfig): SimReport {
  const acc = newAcc(cfg);
  for (let i = 0; i < cfg.games; i++) runOneGame(settings, cfg, acc);
  return finalize(acc);
}

/** Version asynchrone par lots : ne gèle pas l'UI, rapporte la progression. */
export async function simulateAsync(
  settings: Settings,
  cfg: SimConfig,
  onProgress?: (done: number, total: number) => void,
  isCancelled?: () => boolean,
): Promise<SimReport> {
  const acc = newAcc(cfg);
  const BATCH = 20;
  for (let i = 0; i < cfg.games; i++) {
    if (isCancelled?.()) return finalize(acc); // écran quitté : on s'arrête
    runOneGame(settings, cfg, acc);
    if ((i + 1) % BATCH === 0) {
      onProgress?.(i + 1, cfg.games);
      await new Promise((r) => setTimeout(r, 0)); // rend la main au navigateur
    }
  }
  onProgress?.(cfg.games, cfg.games);
  return finalize(acc);
}
