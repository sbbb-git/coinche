import { useEffect, useRef, useState } from "react";
import { ScreenShell } from "../app/ScreenShell";
import { useGame } from "../state/store";
import { AiLevel } from "../engine/game";
import { SimReport, simulateAsync } from "./simulation";

const LEVELS: { id: AiLevel; label: string }[] = [
  { id: "easy", label: "Facile" },
  { id: "medium", label: "Moyen" },
  { id: "hard", label: "Difficile" },
  { id: "expert", label: "Expert" },
];
const PRESETS = [50, 200, 1000];

export function ReviewGlobalScreen() {
  const settings = useGame((s) => s.game.settings);
  const [levelA, setLevelA] = useState<AiLevel>("expert");
  const [levelB, setLevelB] = useState<AiLevel>("medium");
  const [games, setGames] = useState(200);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState<SimReport | null>(null);
  const cancel = useRef(false);

  // Si on quitte l'écran pendant une simulation, on l'annule.
  useEffect(() => {
    return () => {
      cancel.current = true;
    };
  }, []);

  const run = async () => {
    setRunning(true);
    setReport(null);
    setProgress(0);
    const r = await simulateAsync(
      settings,
      { games, levelA, levelB },
      (done, total) => setProgress(Math.round((100 * done) / total)),
      () => cancel.current,
    );
    if (cancel.current) return; // écran quitté entre-temps
    setReport(r);
    setRunning(false);
  };

  return (
    <ScreenShell title="Review IA">
      <p className="mb-3 text-sm text-white/70">
        Fais s'affronter deux niveaux d'IA sur de nombreuses parties pour analyser la stratégie
        (taux de contrats réussis, victoires, modes…).
      </p>

      <Picker label="Équipe A (Nous)" value={levelA} onChange={setLevelA} />
      <Picker label="Équipe B (Eux)" value={levelB} onChange={setLevelB} />

      <p className="mb-1 mt-3 text-xs uppercase tracking-wide text-white/60">Nombre de parties</p>
      <div className="flex gap-1">
        {PRESETS.map((n) => (
          <button
            key={n}
            onClick={() => setGames(n)}
            aria-pressed={games === n}
            className={[
              "flex-1 rounded-lg py-2 text-sm font-semibold",
              games === n ? "bg-yellow-400 text-emerald-950" : "bg-white/10 hover:bg-white/20",
            ].join(" ")}
          >
            {n}
          </button>
        ))}
      </div>

      <button
        onClick={run}
        disabled={running}
        className="mt-4 w-full rounded-xl bg-yellow-400 py-3 font-bold text-emerald-950 hover:bg-yellow-300 disabled:opacity-60"
      >
        {running ? `Calcul… ${progress}%` : "Lancer la simulation"}
      </button>
      {running && (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-yellow-400 transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}

      {report && <Report r={report} />}
    </ScreenShell>
  );
}

function Picker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: AiLevel;
  onChange: (v: AiLevel) => void;
}) {
  return (
    <div className="mb-2">
      <p className="mb-1 text-xs uppercase tracking-wide text-white/60">{label}</p>
      <div className="flex gap-1">
        {LEVELS.map((l) => (
          <button
            key={l.id}
            onClick={() => onChange(l.id)}
            aria-pressed={value === l.id}
            className={[
              "flex-1 rounded-lg py-2.5 text-xs font-semibold",
              value === l.id ? "bg-yellow-400 text-emerald-950" : "bg-white/10 hover:bg-white/20",
            ].join(" ")}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function pct(n: number, d: number): string {
  return d ? `${Math.round((100 * n) / d)} %` : "—";
}

function Report({ r }: { r: SimReport }) {
  const la = LEVELS.find((l) => l.id === r.config.levelA)!.label;
  const lb = LEVELS.find((l) => l.id === r.config.levelB)!.label;
  return (
    <div className="animate-pop mt-5 space-y-4">
      <div className="rounded-xl bg-white/5 p-3">
        <p className="mb-2 text-sm font-bold">Victoires ({r.games} parties)</p>
        <Bar leftLabel={`A · ${la}`} rightLabel={`B · ${lb}`} left={r.winsA} right={r.winsB} />
      </div>

      <div className="rounded-xl bg-white/5 p-3 text-sm">
        <p className="mb-2 font-bold">Contrats réussis (preneur)</p>
        <Row k={`Équipe A (${la})`} v={`${pct(r.takerStat[0].made, r.takerStat[0].taken)} (${r.takerStat[0].taken} pris)`} />
        <Row k={`Équipe B (${lb})`} v={`${pct(r.takerStat[1].made, r.takerStat[1].taken)} (${r.takerStat[1].taken} pris)`} />
      </div>

      <div className="rounded-xl bg-white/5 p-3 text-sm">
        <p className="mb-2 font-bold">Par contrat</p>
        {Object.entries(r.byMode)
          .sort((a, b) => b[1].taken - a[1].taken)
          .map(([mode, m]) => (
            <Row key={mode} k={mode} v={`${pct(m.made, m.taken)} réussis · ${m.taken} pris`} />
          ))}
      </div>

      <div className="rounded-xl bg-white/5 p-3 text-sm">
        <p className="mb-2 font-bold">Divers</p>
        <Row k="Donnes jouées" v={String(r.deals)} />
        <Row k="Contrat moyen" v={String(r.avgContractValue)} />
        <Row k="Score moyen du gagnant / donne" v={String(r.avgWinnerDealScore)} />
        <Row k="Coinches" v={String(r.coinches)} />
        <Row k="Surcoinches" v={String(r.surcoinches)} />
        <Row k="Capots" v={String(r.capots)} />
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between py-0.5">
      <span className="text-white/70">{k}</span>
      <span className="font-semibold tabular-nums">{v}</span>
    </div>
  );
}

function Bar({
  leftLabel,
  rightLabel,
  left,
  right,
}: {
  leftLabel: string;
  rightLabel: string;
  left: number;
  right: number;
}) {
  const total = left + right || 1;
  const lp = Math.round((100 * left) / total);
  return (
    <div>
      <div className="flex h-6 overflow-hidden rounded-full bg-white/10">
        <div className="flex items-center justify-center bg-yellow-400 text-xs font-bold text-emerald-950" style={{ width: `${lp}%` }}>
          {lp > 12 ? `${lp}%` : ""}
        </div>
        <div className="flex flex-1 items-center justify-center bg-sky-500 text-xs font-bold">
          {100 - lp > 12 ? `${100 - lp}%` : ""}
        </div>
      </div>
      <div className="mt-1 flex justify-between text-xs text-white/70">
        <span>{leftLabel} · {left}</span>
        <span>{rightLabel} · {right}</span>
      </div>
    </div>
  );
}
