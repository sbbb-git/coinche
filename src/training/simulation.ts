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
      if (d.action === "bid") g = applyBid(g, d.value, d.mode, d.capot);
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

export function simulate(settings: Settings, cfg: SimConfig): SimReport {
  const report: SimReport = {
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
  };
  let contractValueSum = 0;
  let winnerScoreSum = 0;

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
    contractValueSum += c.value;
    winnerScoreSum += Math.max(r.scores[0], r.scores[1]);
  };

  for (let i = 0; i < cfg.games; i++) {
    const w = playGame(settings, cfg, onDeal);
    report.games++;
    if (w === 0) report.winsA++;
    else if (w === 1) report.winsB++;
  }

  report.avgContractValue = report.deals ? Math.round(contractValueSum / report.deals) : 0;
  report.avgWinnerDealScore = report.deals ? Math.round(winnerScoreSum / report.deals) : 0;
  return report;
}
