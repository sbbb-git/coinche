import { useEffect, useMemo, useState } from "react";
import { ScreenShell } from "../app/ScreenShell";
import { useNav } from "../app/nav";
import { PlayingCard } from "../components/Card";
import { CoachText } from "../components/CoachText";
import { storage, DealRecord } from "../storage";
import { DealReview, FullReplay, ReviewPoint, exportDealText, fullReplay, reviewDealAsync } from "./replay";

export function ReviewMyGamesScreen() {
  const history = useMemo(() => storage.loadHistory(), []);
  const [selected, setSelected] = useState<number | null>(null);
  const go = useNav((s) => s.go);

  if (selected === null) {
    return (
      <ScreenShell title="Mes parties">
        {history.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-sm text-white/60">
              Aucune donne enregistrée pour l'instant. Joue une partie, puis reviens analyser tes
              décisions ici.
            </p>
            <button
              onClick={() => go("play")}
              className="mt-4 rounded-xl bg-yellow-400 px-5 py-2.5 font-bold text-emerald-950 hover:bg-yellow-300"
            >
              🃏 Jouer une partie
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="mb-1 text-sm text-white/70">Tes dernières donnes — touche pour revoir.</p>
            {history.map((rec, i) => (
              <DealRow key={`${rec.ts}-${i}`} rec={rec} onClick={() => setSelected(i)} />
            ))}
          </div>
        )}
      </ScreenShell>
    );
  }

  return <DealDetail rec={history[selected]} onBack={() => setSelected(null)} />;
}

function DealRow({ rec, onClick }: { rec: DealRecord; onClick: () => void }) {
  // Liste légère : on n'exécute PAS l'analyse coach (PIMC) ici — seulement le
  // rejeu rapide pour les libellés. La review coach est calculée à l'ouverture du
  // détail (sinon, monter 25 lignes gèlerait le thread avec des centaines de PIMC).
  const full = useMemo(() => fullReplay(rec), [rec]);
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between rounded-xl bg-white/8 p-3 text-left ring-1 ring-white/10 hover:bg-white/12"
    >
      <span>
        <span className="font-semibold">{full.contractLabel}</span>{" "}
        <span className="text-sm text-white/60">· {full.resultLabel}</span>
      </span>
      <span className="text-sm tabular-nums text-white/70">
        {full.scores[0]}-{full.scores[1]}
      </span>
    </button>
  );
}

// --- Détail d'une donne : onglets « Donne complète » / « Tes décisions » ------

type DetailTab = "full" | "decisions";

function DealDetail({ rec, onBack }: { rec: DealRecord; onBack: () => void }) {
  const full = useMemo(() => fullReplay(rec), [rec]);
  const [tab, setTab] = useState<DetailTab>("full");
  // L'analyse coach (PIMC) est LOURDE : on ne la calcule qu'à l'ouverture de
  // l'onglet « Tes décisions », en différé, avec un état de chargement.
  const [review, setReview] = useState<DealReview | null>(null);
  useEffect(() => {
    if (tab !== "decisions" || review) return;
    let alive = true;
    reviewDealAsync(rec).then((r) => {
      if (alive) setReview(r);
    });
    return () => {
      alive = false;
    };
  }, [tab, rec, review]);

  return (
    <ScreenShell title="Revoir la donne" onBack={onBack}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-sm text-white/70">
          {full.contractLabel} · {full.resultLabel}{" "}
          <span className="text-white/60">({full.scores[0]}-{full.scores[1]})</span>
        </span>
        <ExportButton rec={rec} />
      </div>

      <div role="tablist" className="mb-3 flex gap-1 rounded-lg bg-black/30 p-1">
        <TabBtn id="deal-tab-full" active={tab === "full"} onClick={() => setTab("full")}>
          🃏 Donne complète
        </TabBtn>
        <TabBtn id="deal-tab-decisions" active={tab === "decisions"} onClick={() => setTab("decisions")}>
          🎯 Tes décisions
        </TabBtn>
      </div>

      <div role="tabpanel" id="deal-panel" aria-labelledby={`deal-tab-${tab}`}>
        {tab === "full" ? (
          <FullDealView full={full} rec={rec} />
        ) : review ? (
          <DecisionsView review={review} />
        ) : (
          <p className="mt-8 text-center text-sm text-white/60">⏳ Analyse du coach en cours…</p>
        )}
      </div>
    </ScreenShell>
  );
}

function TabBtn({ id, active, onClick, children }: { id?: string; active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      id={id}
      onClick={onClick}
      role="tab"
      aria-selected={active}
      aria-controls="deal-panel"
      className={[
        "min-h-11 flex-1 rounded-md py-2.5 text-sm font-semibold transition",
        active ? "bg-yellow-400 text-emerald-950" : "text-white/80 hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ExportButton({ rec }: { rec: DealRecord }) {
  const [done, setDone] = useState(false);
  const onExport = async () => {
    const text = exportDealText(rec);
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      // Repli : téléchargement d'un fichier si le presse-papier est indisponible.
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `coinche-donne-${rec.ts}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };
  return (
    <button
      onClick={onExport}
      className="inline-flex min-h-11 shrink-0 items-center rounded-lg bg-white/10 px-3 text-xs font-semibold hover:bg-white/20"
    >
      {done ? "✅ Copié !" : "📋 Exporter"}
    </button>
  );
}

// --- Vue « donne complète » : qui avait quoi + pli par pli -------------------

function FullDealView({ full, rec }: { full: FullReplay; rec: DealRecord }) {
  const names = rec.settings?.playerNames ?? ["Vous", "Ouest", "Nord", "Est"];
  return (
    <div className="space-y-4">
      <section>
        <h3 className="mb-2 text-sm font-bold text-white/80">Les mains distribuées</h3>
        <div className="flex flex-col gap-2">
          {[0, 2, 1, 3].map((p) => (
            <div key={p} className="rounded-xl bg-white/5 p-2 ring-1 ring-white/10">
              <div className="mb-1 text-xs">
                <span className={p % 2 === 0 ? "text-sky-300" : "text-white/70"}>{names[p]}</span>
                {p === full.taker && <span className="ml-1">👑 preneur</span>}
              </div>
              <div className="flex flex-wrap gap-1">
                {full.hands[p].map((c) => (
                  <PlayingCard key={c.id} card={c} size="sm" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-sm font-bold text-white/80">Les enchères</h3>
        <div className="flex flex-wrap gap-x-3 gap-y-1 rounded-xl bg-white/5 p-2.5 text-sm ring-1 ring-white/10">
          {full.bids.map((b, i) => (
            <span key={i}>
              <span className={b.player % 2 === 0 ? "text-sky-300" : "text-white/60"}>{names[b.player]}</span>{" "}
              <b>{b.text}</b>
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-sm font-bold text-white/80">Les plis</h3>
        <div className="flex flex-col gap-2">
          {full.tricks.map((t, i) => (
            <div key={i} className="rounded-xl bg-white/5 p-2 ring-1 ring-white/10">
              <div className="mb-1 flex items-center justify-between text-xs text-white/60">
                <span>Pli {i + 1}</span>
                <span>
                  remporté par <b className="text-yellow-300">{names[t.winner]}</b> · +{t.points}
                  {t.lastDix ? " (+10 der)" : ""} · cumul {full.cumul[i][0]}-{full.cumul[i][1]}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.played.map((p) => {
                  const isWin = p.player === t.winner;
                  return (
                    <div key={p.player} className="flex flex-col items-center gap-0.5">
                      <div className={isWin ? "rounded-lg ring-2 ring-yellow-400" : ""}>
                        <PlayingCard card={p.card} size="sm" />
                      </div>
                      <span className="text-[10px] text-white/55">{names[p.player]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- Vue « tes décisions » (coup par coup) ----------------------------------

function DecisionsView({ review }: { review: DealReview }) {
  const [i, setI] = useState(0);

  if (review.points.length === 0) {
    return (
      <p className="mt-4 text-sm text-white/70">
        Cette donne n'avait aucun choix à analyser pour toi (que des coups forcés). Va voir l'onglet
        « Donne complète ».
      </p>
    );
  }

  const p = review.points[i];
  const acc = Math.round((100 * review.goodCount) / review.points.length);
  return (
    <div>
      <AccuracyBanner pct={acc} good={review.goodCount} total={review.points.length} />
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
    </div>
  );
}

/** Bandeau de précision façon « Game Review » de Chess.com. */
function AccuracyBanner({ pct, good, total }: { pct: number; good: number; total: number }) {
  const { label, color } =
    pct >= 90
      ? { label: "Excellent", color: "text-green-400" }
      : pct >= 75
        ? { label: "Solide", color: "text-emerald-300" }
        : pct >= 55
          ? { label: "Correct", color: "text-yellow-300" }
          : { label: "À retravailler", color: "text-orange-300" };
  return (
    <div className="mb-3 flex items-center justify-between rounded-2xl bg-gradient-to-br from-sky-900/70 to-emerald-900/60 p-4 ring-1 ring-white/10">
      <div>
        <p className="text-xs uppercase tracking-wide text-white/55">Précision de tes choix</p>
        <p className={`text-lg font-bold ${color}`}>{label}</p>
        <p className="text-xs text-white/55">{good}/{total} coups optimaux</p>
      </div>
      <div className={`text-4xl font-black tabular-nums ${color}`}>{pct}%</div>
    </div>
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
            {g.trick.length === 0 && <span className="text-sm text-white/60">Tu entamais</span>}
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
                    "relative rounded-lg",
                    isBest ? "ring-2 ring-green-400" : "",
                    isActual && !isBest ? "ring-2 ring-red-500" : "",
                  ].join(" ")}
                >
                  <PlayingCard card={c} size="sm" />
                  {/* Marqueur de forme (en plus de la couleur) pour les daltoniens. */}
                  {isBest && (
                    <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-green-500 text-[10px] font-bold text-white">
                      ✓
                    </span>
                  )}
                  {isActual && !isBest && (
                    <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      ✗
                    </span>
                  )}
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
        <p className="font-bold">{point.good ? "✅ Meilleur coup" : "⚠️ Imprécision"}</p>
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
        <CoachText text={point.reason} className="mt-2 block text-sm leading-relaxed text-white/85" />
      </div>
    </div>
  );
}
