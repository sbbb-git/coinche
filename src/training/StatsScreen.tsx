import { ScreenShell } from "../app/ScreenShell";
import { levelInfo, useStats } from "../state/stats";

function pct(n: number, d: number): string {
  return d ? `${Math.round((100 * n) / d)} %` : "—";
}

export function StatsScreen() {
  const stats = useStats((s) => s.stats);
  const reset = useStats((s) => s.reset);
  const totalDone = stats.bid.done + stats.play.done;
  const lvl = levelInfo(stats.rating);

  return (
    <ScreenShell title="Progression">
      <div className="rounded-2xl bg-gradient-to-br from-sky-900/70 to-emerald-900/60 p-4 ring-1 ring-white/10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/55">Ton niveau</p>
            <p className="text-2xl font-bold text-yellow-300">{lvl.label}</p>
          </div>
          <p className="text-3xl font-bold tabular-nums">{stats.rating}</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-yellow-400 transition-all" style={{ width: `${lvl.progress * 100}%` }} />
        </div>
        <p className="mt-1 text-right text-[11px] text-white/55">
          {lvl.max < 3000 ? `${lvl.max - stats.rating} pts avant le palier suivant` : "Niveau maximal"}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Stat big label="Exercices faits" value={String(totalDone)} />
        <Stat big label="Record de série" value={`🔥 ${stats.bestStreak}`} />
      </div>

      <Card title="🂠 Enchères">
        <Stat label="Exercices" value={String(stats.bid.done)} />
        <Stat label="Réussite" value={pct(stats.bid.correct, stats.bid.done)} />
      </Card>

      <Card title="🃏 Jeu de la carte">
        <Stat label="Exercices" value={String(stats.play.done)} />
        <Stat label="Réussite" value={pct(stats.play.correct, stats.play.done)} />
      </Card>

      {totalDone === 0 && (
        <p className="mt-4 text-center text-sm text-white/60">
          Lance des exercices pour suivre ta progression !
        </p>
      )}

      <button
        onClick={() => {
          if (confirm("Réinitialiser toutes tes statistiques ?")) reset();
        }}
        className="mt-6 w-full rounded-xl bg-white/10 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/20"
      >
        Réinitialiser les statistiques
      </button>
    </ScreenShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-xl bg-white/5 p-3">
      <p className="mb-2 font-bold">{title}</p>
      <div className="flex gap-3">{children}</div>
    </div>
  );
}

function Stat({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="flex-1 rounded-lg bg-white/5 p-3 text-center">
      <div className={`font-bold tabular-nums ${big ? "text-2xl" : "text-xl"}`}>{value}</div>
      <div className="text-xs text-white/60">{label}</div>
    </div>
  );
}
