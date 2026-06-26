import { useEffect, useMemo, useRef, useState } from "react";
import { ScreenShell } from "../app/ScreenShell";
import { PlayingCard, suitColorClass, suitColorClassDark } from "../components/Card";
import { CoachText } from "../components/CoachText";
import { modeLabel } from "../components/Table";
import { Card, TrumpMode } from "../engine/cards";
import { availableModes, DEFAULT_SETTINGS } from "../engine/game";
import { useStats } from "../state/stats";
import { useDaily } from "../state/daily";
import { genDailyChallenge, isoDay, DailyChallenge } from "./daily";
import {
  gradeBid,
  gradePlay,
  BidGrade,
  PlayGrade,
  BidOption,
  BidExercise,
  PlayExercise,
} from "./exercises";
import { notify, scheduleDailyReminder } from "../notify";
import { SITE_URL as SITE } from "../config";

function prettyDate(key: string): string {
  try {
    return new Date(key).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  } catch {
    return key;
  }
}

function ModeSym({ mode, fourColors }: { mode: TrumpMode; fourColors: boolean }) {
  const m = modeLabel(mode);
  if (!m.suit) return <span>{m.text}</span>;
  return <span className={suitColorClassDark(m.suit, fourColors)}>{m.text}</span>;
}

export function DailyScreen() {
  const key = isoDay();
  const ex = useMemo<DailyChallenge | null>(() => {
    try {
      return genDailyChallenge(key);
    } catch {
      return null;
    }
  }, [key]);

  const daily = useDaily((s) => s.state);
  const doneToday = useDaily((s) => s.doneToday());

  return (
    <ScreenShell title="Défi du jour">
      <div className="mb-3 rounded-2xl bg-gradient-to-br from-sky-900/70 to-emerald-900/60 p-4 ring-1 ring-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/80">{prettyDate(key)}</p>
            <p className="text-lg font-bold">🗓️ Le défi du jour</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black tabular-nums text-yellow-300">🔥 {daily.streak}</div>
            <div className="text-[11px] text-white/55">série · record {daily.best}</div>
          </div>
        </div>
        <p className="mt-2 text-xs text-white/60">
          La même situation pour tout le monde. Une seule tentative : fais ton meilleur choix.
        </p>
      </div>

      {!ex ? (
        <p className="mt-6 text-center text-sm text-white/70">Défi indisponible aujourd'hui. Reviens plus tard !</p>
      ) : ex.kind === "bid" ? (
        <BidDaily ex={ex} keyDay={key} doneToday={doneToday} priorSuccess={daily.success} />
      ) : (
        <PlayDaily ex={ex} keyDay={key} doneToday={doneToday} priorSuccess={daily.success} />
      )}
    </ScreenShell>
  );
}

// --- Défi « jeu de la carte » -----------------------------------------------

function PlayDaily({ ex, keyDay, doneToday, priorSuccess }: { ex: PlayExercise; keyDay: string; doneToday: boolean; priorSuccess: boolean }) {
  const record = useStats((s) => s.record);
  const complete = useDaily((s) => s.complete);
  const [grade, setGrade] = useState<PlayGrade | null>(null);
  const [pickedId, setPickedId] = useState<string | null>(null);

  const g = ex.state;
  const names = g.settings.playerNames;
  const c = g.contract!;
  const legalIds = new Set(ex.legal.map((cc) => cc.id));
  const answered = grade !== null || doneToday;
  const bestId = grade?.bestId ?? ex.correctId;

  const choose = (card: Card) => {
    if (answered || !legalIds.has(card.id)) return;
    const gr = gradePlay(g, card.id);
    setPickedId(card.id);
    setGrade(gr);
    const ok = gr.stars >= 2;
    record("play", ok);
    complete(ok);
  };

  const ringFor = (card: Card): string => {
    if (!answered) return "";
    if (card.id === pickedId) return grade && grade.stars >= 2 ? "ring-2 ring-green-400" : "ring-2 ring-amber-400";
    if (card.id === bestId) return "ring-2 ring-sky-400";
    return "";
  };

  return (
    <>
      <ContractLine c={c} names={names} fourColors={g.settings.fourColors} />
      <p className="mb-1 text-center text-xs text-white/60">Pli en cours</p>
      <div className="mb-4 flex min-h-24 items-center justify-center gap-2">
        {g.trick.length === 0 && <span className="text-sm text-white/60">Tu entames</span>}
        {g.trick.map((p) => (
          <div key={p.player} className="flex flex-col items-center gap-1">
            <PlayingCard card={p.card} size="sm" />
            <span className="text-[10px] text-white/60">{names[p.player]}</span>
          </div>
        ))}
      </div>

      <p className="mb-2 text-center text-sm text-white/70">{answered ? "Ta main" : "Ta main : quelle carte jouer ?"}</p>
      <div className="flex flex-wrap justify-center gap-1">
        {g.hands[0].map((card) => (
          <div key={card.id} className={`relative rounded-lg ${ringFor(card)}`}>
            <PlayingCard
              card={card}
              size="md"
              playable={!answered && legalIds.has(card.id)}
              dimmed={answered && card.id !== pickedId && card.id !== bestId}
              onClick={() => choose(card)}
            />
            {answered && card.id === bestId && card.id !== pickedId && (
              <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-sky-500 text-[10px] font-bold text-white">★</span>
            )}
          </div>
        ))}
      </div>

      {answered && (
        <ResultPanel
          stars={grade?.stars}
          title={grade?.title ?? (priorSuccess ? "Défi déjà relevé aujourd'hui." : "Défi déjà tenté aujourd'hui.")}
          reason={ex.reason}
          keyDay={keyDay}
        />
      )}
    </>
  );
}

// --- Défi « enchère » -------------------------------------------------------

function BidDaily({ ex, keyDay, doneToday, priorSuccess }: { ex: BidExercise; keyDay: string; doneToday: boolean; priorSuccess: boolean }) {
  const record = useStats((s) => s.record);
  const complete = useDaily((s) => s.complete);
  // Le défi est généré sur DEFAULT_SETTINGS : on propose les mêmes modes au picker.
  const modes = availableModes(DEFAULT_SETTINGS);
  const fourColors = false;
  const [grade, setGrade] = useState<BidGrade | null>(null);
  const [mode, setMode] = useState<TrumpMode>(modes[0]);
  const [value, setValue] = useState(Math.max(80, Math.min(160, ex.minValue)));
  const minV = Math.max(80, Math.min(160, ex.minValue));
  const eff = Math.min(160, Math.max(minV, value));
  const answered = grade !== null || doneToday;

  const submit = (option: BidOption) => {
    if (answered) return;
    const gr = gradeBid(option, ex.ideal);
    setGrade(gr);
    const ok = gr.stars >= 2;
    record("bid", ok);
    complete(ok);
  };

  return (
    <>
      {ex.auction.length > 0 && (
        <div className="mb-3 rounded-lg bg-black/30 p-2.5 text-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/60">Enchères en cours</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {ex.auction.map((l, i) => (
              <span key={i} className="tabular-nums">
                <span className={l.partner ? "text-yellow-300" : "text-white/60"}>{l.name}</span>{" "}
                {l.value === "passe" ? <span className="text-white/60">passe</span> : <b>{l.value}{l.mode ? <> <ModeSym mode={l.mode} fourColors={fourColors} /></> : null}</b>}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="mb-2 text-center text-sm text-white/70">{ex.auction.length > 0 ? "À toi de parler : quelle enchère ?" : "Tu ouvres : quelle enchère ?"}</p>
      <div className="mb-4 flex flex-wrap justify-center gap-1">
        {ex.hand.map((card) => (
          <PlayingCard key={card.id} card={card} size="md" />
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
                    lbl.suit ? suitColorClass(lbl.suit, fourColors) : mode === m ? "text-emerald-950" : "text-zinc-800",
                  ].join(" ")}
                >
                  {lbl.text}
                </button>
              );
            })}
          </div>
          <div className="flex items-stretch gap-2">
            <button onClick={() => setValue(Math.max(minV, eff - 10))} disabled={eff <= minV} aria-label="Diminuer" className="h-12 w-12 rounded-lg bg-white/15 text-2xl font-bold text-white disabled:opacity-30">−</button>
            <div className="flex h-12 flex-1 items-center justify-center gap-1 rounded-lg bg-black/30 text-2xl font-bold tabular-nums">
              <span>{eff}</span>
              <ModeSym mode={mode} fourColors={fourColors} />
            </div>
            <button onClick={() => setValue(Math.min(160, eff + 10))} disabled={eff >= 160} aria-label="Augmenter" className="h-12 w-12 rounded-lg bg-white/15 text-2xl font-bold text-white disabled:opacity-30">+</button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => submit({ kind: "bid", value: eff, mode })} className="min-h-11 flex-1 rounded-lg bg-yellow-400 px-3 font-bold text-emerald-950 hover:bg-yellow-300">Annoncer {eff}</button>
            <button onClick={() => submit({ kind: "pass" })} className="min-h-11 flex-1 rounded-lg bg-white/15 font-semibold text-white hover:bg-white/25">Passer</button>
          </div>
        </div>
      )}

      {answered && (
        <ResultPanel
          stars={grade?.stars}
          title={grade?.title ?? (priorSuccess ? "Défi déjà relevé aujourd'hui." : "Défi déjà tenté aujourd'hui.")}
          reason={ex.reason}
          keyDay={keyDay}
        />
      )}
    </>
  );
}

function ContractLine({ c, names, fourColors }: { c: NonNullable<PlayExercise["state"]["contract"]>; names: string[]; fourColors: boolean }) {
  return (
    <div className="mb-2 flex items-center justify-center gap-2 text-sm">
      <span className="rounded-full bg-black/40 px-3 py-1">
        Contrat <b>{c.generale ? "Générale" : c.capot ? "Capot" : c.value}</b>{" "}
        <span className={modeLabel(c.mode).suit ? suitColorClassDark(modeLabel(c.mode).suit!, fourColors) : ""}>{modeLabel(c.mode).text}</span>{" "}
        · preneur {names[c.taker]}
      </span>
    </div>
  );
}

function ResultPanel({ stars, title, reason, keyDay }: { stars?: 1 | 2 | 3; title: string; reason: string; keyDay: string }) {
  const daily = useDaily((s) => s.state);
  const [shared, setShared] = useState(false);
  const [reminder, setReminder] = useState(notify.optedIn());
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const tone = stars === 3 ? "bg-emerald-900/70" : stars === 2 ? "bg-sky-900/70" : stars === 1 ? "bg-amber-900/60" : "bg-white/10";

  const share = async () => {
    const text = `Coincheur, défi du jour ${keyDay}\n${stars ? "⭐".repeat(stars) : ""} · série ${daily.streak} 🔥\n${SITE}`;
    try {
      if (navigator.share) await navigator.share({ text });
      else await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    } catch {
      /* annulé */
    }
  };

  const enableReminder = async () => {
    const ok = await notify.enable();
    setReminder(ok);
    if (ok) {
      await scheduleDailyReminder(19);
      notify.show("Rappels activés 🔔", "On te préviendra pour le défi du jour.");
    }
  };

  return (
    <div ref={ref} aria-live="polite" className={`mt-4 rounded-xl p-3 ring-1 ring-white/10 ${tone}`}>
      <p className="font-bold">
        {stars ? "⭐".repeat(stars) + " " : ""}
        {title}
      </p>
      <CoachText text={reason} className="mt-1 block text-sm leading-relaxed text-white/85" />
      <p className="mt-2 text-sm">
        Série : <b className="text-yellow-300">🔥 {daily.streak}</b> · reviens demain pour la prolonger.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={share} className="inline-flex min-h-11 items-center rounded-lg bg-yellow-400 px-4 text-sm font-bold text-emerald-950 hover:bg-yellow-300">
          {shared ? "✅ Copié !" : "📤 Partager mon score"}
        </button>
        {notify.supported() && !reminder && (
          <button onClick={enableReminder} className="inline-flex min-h-11 items-center rounded-lg bg-white/10 px-4 text-sm font-semibold hover:bg-white/20">
            🔔 Me rappeler
          </button>
        )}
        {reminder && <span className="inline-flex min-h-11 items-center text-sm text-white/55">🔔 Rappels activés</span>}
      </div>
    </div>
  );
}
