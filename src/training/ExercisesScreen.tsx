import { useEffect, useRef, useState } from "react";
import { ScreenShell } from "../app/ScreenShell";
import { CoachText } from "../components/CoachText";
import { TrainTabs } from "./TrainTabs";
import { useGame } from "../state/store";
import { useStats } from "../state/stats";
import { PlayingCard, suitColorClass, suitColorClassDark } from "../components/Card";
import { modeLabel } from "../components/Table";
import { availableModes } from "../engine/game";
import { Card, TrumpMode } from "../engine/cards";
import {
  AuctionLine,
  BidExercise,
  BidGrade,
  BidOption,
  PlayExercise,
  PlayFocus,
  genBidExercise,
  gradeBid,
  genPlayExercise,
} from "./exercises";

type Kind = "bid" | "play";

export function ExercisesScreen() {
  const [kind, setKind] = useState<Kind>("bid");
  return (
    <ScreenShell title="S'entraîner">
      <TrainTabs current="exercises" />
      <div role="tablist" aria-label="Type d'exercice" className="mb-3 flex gap-1 rounded-lg bg-black/30 p-1">
        <Tab id="exo-tab-bid" active={kind === "bid"} onClick={() => setKind("bid")}>
          🂠 Enchères
        </Tab>
        <Tab id="exo-tab-play" active={kind === "play"} onClick={() => setKind("play")}>
          🃏 Jeu de la carte
        </Tab>
      </div>
      <StreakBar />
      <div role="tabpanel" id="exo-panel" aria-labelledby={`exo-tab-${kind}`}>
        {kind === "bid" ? <BidTrainer /> : <PlayTrainer />}
      </div>
    </ScreenShell>
  );
}

function StreakBar() {
  const stats = useStats((s) => s.stats);
  return (
    <div className="mb-3 flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm">
      <span>
        🔥 Série : <b className="text-yellow-300">{stats.streak}</b>
      </span>
      <span className="text-white/60">Record : {stats.bestStreak}</span>
    </div>
  );
}

// --- Entraînement aux enchères ----------------------------------------------

function BidTrainer() {
  const settings = useGame((s) => s.game.settings);
  const record = useStats((s) => s.record);
  const [ex, setEx] = useState<BidExercise | null>(null);
  const [mode, setMode] = useState<TrumpMode>("S");
  const [value, setValue] = useState(80);
  const [grade, setGrade] = useState<BidGrade | null>(null);

  const next = () => {
    setGrade(null);
    const e = genBidExercise(settings);
    setEx(e);
    setMode(availableModes(settings)[0]);
    setValue(Math.max(80, Math.min(160, e.minValue)));
  };
  useEffect(next, [settings]);
  if (!ex) return null;

  const modes = availableModes(settings);
  const minV = Math.max(80, Math.min(160, ex.minValue));
  const eff = Math.min(160, Math.max(minV, value));
  const answered = grade !== null;

  const submit = (option: BidOption) => {
    if (answered) return;
    const g = gradeBid(option, ex.ideal);
    setGrade(g);
    record("bid", g.stars >= 2);
  };

  return (
    <div>
      {ex.auction.length > 0 && <AuctionRecap auction={ex.auction} fourColors={settings.fourColors} />}
      <p className="mb-2 text-sm text-white/70">
        {ex.auction.length > 0 ? "À toi de parler : choisis ton enchère." : "Tu ouvres : choisis ton enchère."}
      </p>
      <div className="mb-4 flex flex-wrap justify-center gap-1">
        {ex.hand.map((c) => (
          <PlayingCard key={c.id} card={c} size="md" />
        ))}
      </div>

      {!answered && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            {modes.map((m) => {
              const lbl = modeLabel(m);
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={[
                    "h-11 flex-1 min-w-11 rounded-md text-lg font-bold shadow",
                    mode === m ? "bg-yellow-400" : "bg-white/90",
                    lbl.suit
                      ? suitColorClass(lbl.suit, settings.fourColors)
                      : mode === m
                        ? "text-emerald-950"
                        : "text-zinc-800",
                  ].join(" ")}
                >
                  {lbl.text}
                </button>
              );
            })}
          </div>
          <div className="flex items-stretch gap-2">
            <button
              onClick={() => setValue(Math.max(minV, eff - 10))}
              disabled={eff <= minV}
              aria-label="Diminuer"
              className="h-12 w-12 rounded-lg bg-white/15 text-2xl font-bold text-white disabled:opacity-30"
            >
              −
            </button>
            <div className="flex h-12 flex-1 items-center justify-center gap-1 rounded-lg bg-black/30 text-2xl font-bold tabular-nums">
              <span>{eff}</span>
              <ModeSym mode={mode} fourColors={settings.fourColors} />
            </div>
            <button
              onClick={() => setValue(Math.min(160, eff + 10))}
              disabled={eff >= 160}
              aria-label="Augmenter"
              className="h-12 w-12 rounded-lg bg-white/15 text-2xl font-bold text-white disabled:opacity-30"
            >
              +
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => submit({ kind: "bid", value: eff, mode })}
              className="min-h-11 flex-1 rounded-lg bg-yellow-400 px-3 font-bold text-emerald-950 hover:bg-yellow-300"
            >
              Annoncer {eff}
            </button>
            <button
              onClick={() => submit({ kind: "pass" })}
              className="min-h-11 flex-1 rounded-lg bg-white/15 font-semibold text-white hover:bg-white/25"
            >
              Passer
            </button>
          </div>
        </div>
      )}

      {answered && grade && (
        <>
          <EstimateBar estimates={ex.estimates} fourColors={settings.fourColors} />
          <BidFeedback grade={grade} reason={ex.reason} onNext={next} />
        </>
      )}
    </div>
  );
}

function BidFeedback({ grade, reason, onNext }: { grade: BidGrade; reason: string; onNext: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);
  const tone =
    grade.stars === 3 ? "bg-emerald-900/70" : grade.stars === 2 ? "bg-sky-900/70" : "bg-amber-900/60";
  return (
    <div ref={ref} role="status" tabIndex={-1} className={`mt-3 rounded-xl p-3 ${tone}`}>
      <p className="font-bold">
        {grade.stars > 0 ? "⭐".repeat(grade.stars) + " " : ""}
        {grade.title}
      </p>
      <CoachText text={reason} className="mt-1 block text-sm leading-relaxed text-white/85" />
      <button
        onClick={onNext}
        className="mt-3 min-h-11 w-full rounded-lg bg-white/15 font-semibold text-white hover:bg-white/25"
      >
        Suivant
      </button>
    </div>
  );
}

/** Symbole d'atout coloré (rouge/bleu/vert/blanc) sur fond sombre. */
function ModeSym({ mode, fourColors }: { mode: TrumpMode; fourColors: boolean }) {
  const m = modeLabel(mode);
  if (!m.suit) return <span>{m.text}</span>;
  return <span className={suitColorClassDark(m.suit, fourColors)}>{m.text}</span>;
}

/** Rappel de la séquence d'enchères déjà prononcée (fausses enchères). */
function AuctionRecap({ auction, fourColors }: { auction: AuctionLine[]; fourColors: boolean }) {
  return (
    <div className="mb-3 rounded-lg bg-black/30 p-2.5">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-white/60">
        Enchères en cours
      </p>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
        {auction.map((l, i) => (
          <span key={i} className="tabular-nums">
            <span className={l.partner ? "text-yellow-300" : "text-white/60"}>{l.name}</span>{" "}
            {l.value === "passe" ? (
              <span className="text-white/60">passe</span>
            ) : (
              <b>
                {l.value}
                {l.mode ? (
                  <>
                    {" "}
                    <ModeSym mode={l.mode} fourColors={fourColors} />
                  </>
                ) : null}
              </b>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function EstimateBar({
  estimates,
  fourColors,
}: {
  estimates: BidExercise["estimates"];
  fourColors: boolean;
}) {
  const sorted = [...estimates].sort((a, b) => b.est - a.est);
  return (
    <div className="mt-3 rounded-lg bg-white/5 p-2 text-xs text-white/70">
      <span className="text-white/60">Valeur estimée de ta main : </span>
      {sorted.map((e, i) => (
        <span key={e.mode} className="ml-1 tabular-nums">
          <ModeSym mode={e.mode} fourColors={fourColors} /> <b className="text-white/90">{e.est}</b>
          {i < sorted.length - 1 ? " ·" : ""}
        </span>
      ))}
    </div>
  );
}

// --- Entraînement au jeu de la carte ----------------------------------------

function PlayTrainer() {
  const settings = useGame((s) => s.game.settings);
  const record = useStats((s) => s.record);
  const [focus, setFocus] = useState<PlayFocus>("any");
  const [ex, setEx] = useState<PlayExercise | null>(null);
  const [pickedId, setPickedId] = useState<string | null>(null);

  const [error, setError] = useState(false);
  const next = () => {
    setPickedId(null);
    try {
      setEx(genPlayExercise(settings, focus));
      setError(false);
    } catch {
      setEx(null);
      setError(true);
    }
  };
  useEffect(next, [settings, focus]);
  if (error)
    return (
      <p className="mt-6 text-center text-sm text-white/70">
        Impossible de générer une situation pour ce thème avec ces réglages.{" "}
        <button onClick={next} className="underline">
          Réessayer
        </button>
      </p>
    );
  if (!ex) return null;

  const answered = pickedId !== null;
  const legalIds = new Set(ex.legal.map((c) => c.id));
  const g = ex.state;
  const names = g.settings.playerNames;
  const c = g.contract!;

  const choose = (card: Card) => {
    if (answered || !legalIds.has(card.id)) return;
    setPickedId(card.id);
    record("play", card.id === ex.correctId);
  };

  const cardState = (card: Card): CardMark => {
    if (!answered) return legalIds.has(card.id) ? "playable" : "off";
    if (card.id === ex.correctId) return "good";
    if (card.id === pickedId) return "bad";
    return "off";
  };

  return (
    <div>
      <div className="mb-3 flex gap-1 rounded-lg bg-black/30 p-1" role="group" aria-label="Thème">
        {([["any", "Tout"], ["attack", "Attaque"], ["defense", "Défense"]] as [PlayFocus, string][]).map(
          ([id, lbl]) => (
            <button
              key={id}
              onClick={() => setFocus(id)}
              aria-pressed={focus === id}
              className={[
                "min-h-11 flex-1 rounded-md py-1.5 text-xs font-semibold transition",
                focus === id ? "bg-yellow-400 text-emerald-950" : "text-white/75 hover:bg-white/10",
              ].join(" ")}
            >
              {lbl}
            </button>
          ),
        )}
      </div>
      <div className="mb-2 flex items-center justify-center gap-2 text-sm">
        <span className="rounded-full bg-black/40 px-3 py-1">
          Contrat <b>{c.generale ? "Générale" : c.capot ? "Capot" : c.value}</b>{" "}
          <span
            className={
              modeLabel(c.mode).suit
                ? suitColorClassDark(modeLabel(c.mode).suit!, g.settings.fourColors)
                : ""
            }
          >
            {modeLabel(c.mode).text}
          </span>{" "}
          · preneur {names[c.taker]}
        </span>
      </div>

      <p className="mb-1 text-center text-xs text-white/60">Pli en cours</p>
      <div className="mb-4 flex min-h-24 items-center justify-center gap-2">
        {g.trick.length === 0 && <span className="text-sm text-white/70">Tu entames</span>}
        {g.trick.map((p) => (
          <div key={p.player} className="flex flex-col items-center gap-1">
            <PlayingCard card={p.card} size="sm" />
            <span className="text-[10px] text-white/60">{names[p.player]}</span>
          </div>
        ))}
      </div>

      <p className="mb-2 text-center text-sm text-white/70">
        Ta main, quelle carte jouer ?
      </p>
      <div className="flex flex-wrap justify-center gap-1">
        {g.hands[0].map((card) => {
          const st = cardState(card);
          return (
            <div
              key={card.id}
              className={[
                "relative rounded-lg",
                st === "good" ? "ring-2 ring-green-400" : "",
                st === "bad" ? "ring-2 ring-red-500" : "",
              ].join(" ")}
            >
              <PlayingCard
                card={card}
                size="md"
                playable={!answered && legalIds.has(card.id)}
                dimmed={st === "off"}
                onClick={() => choose(card)}
              />
              {st === "good" && (
                <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-green-500 text-[10px] font-bold text-white">
                  ✓
                </span>
              )}
              {st === "bad" && (
                <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  ✗
                </span>
              )}
            </div>
          );
        })}
      </div>

      {answered && <Feedback ok={pickedId === ex.correctId} reason={ex.reason} onNext={next} />}
    </div>
  );
}

type CardMark = "playable" | "off" | "good" | "bad";

// --- Composants partagés ----------------------------------------------------

function Tab({ id, active, onClick, children }: { id?: string; active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      id={id}
      onClick={onClick}
      role="tab"
      aria-selected={active}
      aria-controls="exo-panel"
      className={[
        "min-h-11 flex-1 rounded-md py-2 text-sm font-semibold transition",
        active ? "bg-yellow-400 text-emerald-950" : "text-white/80 hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Feedback({ ok, reason, onNext }: { ok: boolean; reason: string; onNext: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);
  return (
    <div
      ref={ref}
      className={[
        "animate-pop mt-4 rounded-xl p-3 ring-1",
        ok ? "bg-emerald-900/70 ring-emerald-600" : "bg-red-900/60 ring-red-600",
      ].join(" ")}
    >
      <p className="font-bold">{ok ? "✅ Bien vu !" : "❌ Pas le meilleur choix"}</p>
      <CoachText text={reason} className="mt-1 block text-sm leading-relaxed text-white/85" />
      <button
        onClick={onNext}
        className="mt-3 w-full rounded-lg bg-yellow-400 py-2.5 font-bold text-emerald-950 hover:bg-yellow-300"
      >
        Suivant →
      </button>
    </div>
  );
}
