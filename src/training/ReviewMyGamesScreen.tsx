import { useMemo, useState } from "react";
import { ScreenShell } from "../app/ScreenShell";
import { PlayingCard } from "../components/Card";
import { storage, DealRecord } from "../storage";
import { ReviewPoint, reviewDeal } from "./replay";

export function ReviewMyGamesScreen() {
  const history = useMemo(() => storage.loadHistory(), []);
  const [selected, setSelected] = useState<number | null>(null);

  if (selected === null) {
    return (
      <ScreenShell title="Mes parties">
        {history.length === 0 ? (
          <p className="mt-6 text-center text-sm text-white/60">
            Aucune donne enregistrée pour l'instant. Joue une partie, puis reviens analyser tes
            décisions ici.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="mb-1 text-sm text-white/70">Tes dernières donnes — touche pour analyser.</p>
            {history.map((rec, i) => (
              <DealRow key={rec.ts} rec={rec} onClick={() => setSelected(i)} />
            ))}
          </div>
        )}
      </ScreenShell>
    );
  }

  return <DealReviewView rec={history[selected]} onBack={() => setSelected(null)} />;
}

function DealRow({ rec, onClick }: { rec: DealRecord; onClick: () => void }) {
  const review = useMemo(() => reviewDeal(rec), [rec]);
  const total = review.points.length;
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between rounded-xl bg-white/8 p-3 text-left ring-1 ring-white/10 hover:bg-white/12"
    >
      <span>
        <span className="font-semibold">{review.contractLabel}</span>{" "}
        <span className="text-sm text-white/60">· {review.resultLabel}</span>
      </span>
      <span className="text-sm text-white/70">
        {total > 0 ? `${review.goodCount}/${total} ✓` : "aucun choix"}
      </span>
    </button>
  );
}

function DealReviewView({ rec, onBack }: { rec: DealRecord; onBack: () => void }) {
  const review = useMemo(() => reviewDeal(rec), [rec]);
  const [i, setI] = useState(0);

  if (review.points.length === 0) {
    return (
      <ScreenShell title="Analyse de la donne">
        <p className="text-sm text-white/70">
          Cette donne n'avait aucun choix à analyser pour toi (que des coups forcés).
        </p>
        <button onClick={onBack} className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm">
          ← Mes parties
        </button>
      </ScreenShell>
    );
  }

  const p = review.points[i];
  return (
    <ScreenShell title="Analyse de la donne">
      <div className="mb-3 flex items-center justify-between text-sm">
        <button onClick={onBack} className="rounded-lg bg-white/10 px-3 py-1.5">
          ← Liste
        </button>
        <span className="text-white/70">
          {review.contractLabel} · {review.resultLabel}
        </span>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <span className="rounded-full bg-black/40 px-3 py-1 text-sm font-semibold">
          {p.phase === "bid" ? "🂠 Enchère" : "🃏 Jeu"} · choix {i + 1}/{review.points.length}
        </span>
        <span className="text-sm text-white/60">
          {review.goodCount}/{review.points.length} bons choix
        </span>
      </div>

      <PointView point={p} />

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setI((x) => Math.max(0, x - 1))}
          disabled={i === 0}
          className="flex-1 rounded-lg bg-white/10 py-2.5 text-sm font-semibold disabled:opacity-40"
        >
          ← Précédent
        </button>
        <button
          onClick={() => setI((x) => Math.min(review.points.length - 1, x + 1))}
          disabled={i === review.points.length - 1}
          className="flex-1 rounded-lg bg-yellow-400 py-2.5 text-sm font-bold text-emerald-950 disabled:opacity-40"
        >
          Suivant →
        </button>
      </div>
    </ScreenShell>
  );
}

function PointView({ point }: { point: ReviewPoint }) {
  const g = point.snapshot;
  const names = g.settings.playerNames;
  return (
    <div>
      {point.phase === "play" && (
        <>
          <p className="mb-1 text-center text-xs text-white/60">Pli en cours</p>
          <div className="mb-3 flex min-h-20 items-center justify-center gap-2">
            {g.trick.length === 0 && <span className="text-sm text-white/50">Tu entamais</span>}
            {g.trick.map((pc) => (
              <div key={pc.player} className="flex flex-col items-center gap-1">
                <PlayingCard card={pc.card} size="sm" />
                <span className="text-[10px] text-white/60">{names[pc.player]}</span>
              </div>
            ))}
          </div>
          <p className="mb-1 text-center text-xs text-white/60">Ta main</p>
          <div className="mb-3 flex flex-wrap justify-center gap-1">
            {g.hands[0].map((c) => {
              const isBest = c.id === point.bestCardId;
              const isActual = c.id === point.actualCardId;
              return (
                <div
                  key={c.id}
                  className={[
                    "rounded-lg",
                    isBest ? "ring-2 ring-green-400" : "",
                    isActual && !isBest ? "ring-2 ring-red-500" : "",
                  ].join(" ")}
                >
                  <PlayingCard card={c} size="sm" />
                </div>
              );
            })}
          </div>
        </>
      )}

      {point.phase === "bid" && (
        <>
          <p className="mb-1 text-center text-xs text-white/60">Ta main</p>
          <div className="mb-3 flex flex-wrap justify-center gap-1">
            {g.hands[0].map((c) => (
              <PlayingCard key={c.id} card={c} size="sm" />
            ))}
          </div>
        </>
      )}

      <div className="rounded-xl bg-emerald-900/70 p-3 ring-1 ring-emerald-700">
        <p className="font-bold">{point.good ? "✅ Bon choix" : "❌ À revoir"}</p>
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg bg-white/5 p-2">
            <div className="text-white/60">Tu as joué</div>
            <div className="text-lg font-bold">{point.actual}</div>
          </div>
          <div className="rounded-lg bg-white/5 p-2">
            <div className="text-white/60">Conseil du coach</div>
            <div className="text-lg font-bold text-yellow-300">{point.best}</div>
          </div>
        </div>
        <p className="mt-2 text-sm text-white/80">{point.reason}</p>
      </div>
    </div>
  );
}
