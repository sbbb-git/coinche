import { useEffect, useRef, useState } from "react";
import { ScreenShell } from "../app/ScreenShell";
import { useGame } from "../state/store";
import { useStats } from "../state/stats";
import { PlayingCard, suitColorClassDark } from "../components/Card";
import { modeLabel } from "../components/Table";
import { Card } from "../engine/cards";
import {
  BidExercise,
  PlayExercise,
  genBidExercise,
  genPlayExercise,
} from "./exercises";

type Kind = "bid" | "play";

export function ExercisesScreen() {
  const [kind, setKind] = useState<Kind>("bid");
  return (
    <ScreenShell title="S'entraîner">
      <div className="mb-3 flex gap-1 rounded-lg bg-black/30 p-1">
        <Tab active={kind === "bid"} onClick={() => setKind("bid")}>
          🂠 Enchères
        </Tab>
        <Tab active={kind === "play"} onClick={() => setKind("play")}>
          🃏 Jeu de la carte
        </Tab>
      </div>
      <StreakBar />
      {kind === "bid" ? <BidTrainer /> : <PlayTrainer />}
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
  const [picked, setPicked] = useState<number | null>(null);

  const next = () => {
    setPicked(null);
    setEx(genBidExercise(settings));
  };
  useEffect(next, [settings]);
  if (!ex) return null;

  const answered = picked !== null;
  const choose = (i: number) => {
    if (answered) return;
    setPicked(i);
    record("bid", i === ex.correctIndex);
  };

  return (
    <div>
      <p className="mb-2 text-sm text-white/70">Votre main — quelle enchère ?</p>
      <div className="mb-4 flex flex-wrap justify-center gap-1">
        {ex.hand.map((c) => (
          <PlayingCard key={c.id} card={c} size="md" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {ex.options.map((opt, i) => (
          <OptionBtn
            key={i}
            label={opt}
            state={
              !answered ? "idle" : i === ex.correctIndex ? "good" : i === picked ? "bad" : "muted"
            }
            onClick={() => choose(i)}
          />
        ))}
      </div>
      {answered && <Feedback ok={picked === ex.correctIndex} reason={ex.reason} onNext={next} />}
    </div>
  );
}

// --- Entraînement au jeu de la carte ----------------------------------------

function PlayTrainer() {
  const settings = useGame((s) => s.game.settings);
  const record = useStats((s) => s.record);
  const [ex, setEx] = useState<PlayExercise | null>(null);
  const [pickedId, setPickedId] = useState<string | null>(null);

  const next = () => {
    setPickedId(null);
    setEx(genPlayExercise(settings));
  };
  useEffect(next, [settings]);
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
      <div className="mb-2 flex items-center justify-center gap-2 text-sm">
        <span className="rounded-full bg-black/40 px-3 py-1">
          Contrat <b>{c.capot ? "Capot" : c.value}</b>{" "}
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
        {g.trick.length === 0 && <span className="text-sm text-white/50">Vous entamez</span>}
        {g.trick.map((p) => (
          <div key={p.player} className="flex flex-col items-center gap-1">
            <PlayingCard card={p.card} size="sm" />
            <span className="text-[10px] text-white/60">{names[p.player]}</span>
          </div>
        ))}
      </div>

      <p className="mb-2 text-center text-sm text-white/70">
        Votre main — quelle carte jouer ?
      </p>
      <div className="flex flex-wrap justify-center gap-1">
        {g.hands[0].map((card) => {
          const st = cardState(card);
          return (
            <div
              key={card.id}
              className={[
                "rounded-lg",
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

function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={[
        "flex-1 rounded-md py-2 text-sm font-semibold transition",
        active ? "bg-yellow-400 text-emerald-950" : "text-white/80 hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

type OptState = "idle" | "good" | "bad" | "muted";
function OptionBtn({ label, state, onClick }: { label: string; state: OptState; onClick: () => void }) {
  const cls =
    state === "good"
      ? "bg-green-500/90 text-white"
      : state === "bad"
        ? "bg-red-500/90 text-white"
        : state === "muted"
          ? "bg-white/5 text-white/50"
          : "bg-white/10 text-white hover:bg-white/20";
  return (
    <button
      onClick={onClick}
      disabled={state !== "idle"}
      className={`rounded-xl px-4 py-3 text-left font-semibold ${cls}`}
    >
      {label}
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
      <p className="mt-1 text-sm text-white/80">{reason}</p>
      <button
        onClick={onNext}
        className="mt-3 w-full rounded-lg bg-yellow-400 py-2.5 font-bold text-emerald-950 hover:bg-yellow-300"
      >
        Suivant →
      </button>
    </div>
  );
}
