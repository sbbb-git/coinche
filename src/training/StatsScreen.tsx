import { ScreenShell } from "../app/ScreenShell";
import { useStats } from "../state/stats";

function pct(n: number, d: number): string {
  return d ? `${Math.round((100 * n) / d)} %` : "—";
}

export function StatsScreen() {
  const stats = useStats((s) => s.stats);
  const reset = useStats((s) => s.reset);
  const totalDone = stats.bid.done + stats.play.done;

  return (
    <ScreenShell title="Progression">
      <div className="grid grid-cols-2 gap-3">
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
