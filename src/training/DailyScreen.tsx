import { useEffect, useMemo, useRef, useState } from "react";
import { ScreenShell } from "../app/ScreenShell";
import { PlayingCard } from "../components/Card";
import { CoachText } from "../components/CoachText";
import { modeLabel } from "../components/Table";
import { suitColorClassDark } from "../components/Card";
import { Card } from "../engine/cards";
import { useStats } from "../state/stats";
import { useDaily } from "../state/daily";
import { genDailyChallenge, isoDay } from "./daily";
import { notify, scheduleDailyReminder } from "../notify";
import { SITE_URL as SITE } from "../config";

function prettyDate(key: string): string {
  try {
    return new Date(key).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  } catch {
    return key;
  }
}

export function DailyScreen() {
  const key = isoDay();
  const ex = useMemo(() => {
    try {
      return genDailyChallenge(key);
    } catch {
      return null;
    }
  }, [key]);

  const daily = useDaily((s) => s.state);
  const doneToday = useDaily((s) => s.doneToday());
  const complete = useDaily((s) => s.complete);
  const record = useStats((s) => s.record);

  const [pickedId, setPickedId] = useState<string | null>(null);
  const answered = pickedId !== null || doneToday;

  if (!ex) {
    return (
      <ScreenShell title="Défi du jour">
        <p className="mt-6 text-center text-sm text-white/70">Défi indisponible aujourd'hui. Reviens plus tard !</p>
      </ScreenShell>
    );
  }

  const g = ex.state;
  const names = g.settings.playerNames;
  const c = g.contract!;
  const legalIds = new Set(ex.legal.map((cc) => cc.id));
  const success = doneToday ? daily.success : pickedId === ex.correctId;

  const choose = (card: Card) => {
    if (answered || !legalIds.has(card.id)) return;
    const ok = card.id === ex.correctId;
    setPickedId(card.id);
    record("play", ok);
    complete(ok);
  };

  const cardMark = (card: Card): "good" | "bad" | "playable" | "off" => {
    if (!answered) return legalIds.has(card.id) ? "playable" : "off";
    if (card.id === ex.correctId) return "good";
    if (card.id === pickedId) return "bad";
    return "off";
  };

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
          La même donne pour tout le monde. Une seule tentative, choisis la meilleure carte.
        </p>
      </div>

      <div className="mb-2 flex items-center justify-center gap-2 text-sm">
        <span className="rounded-full bg-black/40 px-3 py-1">
          Contrat <b>{c.generale ? "Générale" : c.capot ? "Capot" : c.value}</b>{" "}
          <span className={modeLabel(c.mode).suit ? suitColorClassDark(modeLabel(c.mode).suit!, g.settings.fourColors) : ""}>
            {modeLabel(c.mode).text}
          </span>{" "}
          · preneur {names[c.taker]}
        </span>
      </div>

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

      <p className="mb-2 text-center text-sm text-white/70">
        {answered ? "Ta main" : "Ta main, quelle carte jouer ?"}
      </p>
      <div className="flex flex-wrap justify-center gap-1">
        {g.hands[0].map((card) => {
          const m = cardMark(card);
          return (
            <div
              key={card.id}
              className={[
                "relative rounded-lg",
                m === "good" ? "ring-2 ring-green-400" : "",
                m === "bad" ? "ring-2 ring-red-500" : "",
              ].join(" ")}
            >
              <PlayingCard
                card={card}
                size="md"
                playable={!answered && legalIds.has(card.id)}
                dimmed={m === "off"}
                onClick={() => choose(card)}
              />
              {/* Marqueur de forme en plus de la couleur (daltoniens). */}
              {m === "good" && (
                <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-green-500 text-[10px] font-bold text-white">
                  ✓
                </span>
              )}
              {m === "bad" && (
                <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  ✗
                </span>
              )}
            </div>
          );
        })}
      </div>

      {answered && <Result success={success} reason={ex.reason} streak={daily.streak} keyDay={key} />}
    </ScreenShell>
  );
}

function Result({ success, reason, streak, keyDay }: { success: boolean; reason: string; streak: number; keyDay: string }) {
  const [shared, setShared] = useState(false);
  const [reminder, setReminder] = useState(notify.optedIn());
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const share = async () => {
    const text = `Coincheur, Défi du jour ${keyDay}\n${success ? "✅ trouvé" : "❌ manqué"} · série ${streak} 🔥\n${SITE}`;
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
      await scheduleDailyReminder(19); // rappel natif planifié (no-op sur le web)
      notify.show("Rappels activés 🔔", "On te préviendra pour le défi du jour.");
    }
  };

  return (
    <div ref={ref} aria-live="polite" className="mt-4 rounded-xl bg-emerald-900/70 p-3 ring-1 ring-emerald-700">
      <p className="font-bold">{success ? "✅ Bien joué !" : "❌ Pas le meilleur coup"}</p>
      <CoachText text={reason} className="mt-1 block text-sm leading-relaxed text-white/85" />
      <p className="mt-2 text-sm">
        Série : <b className="text-yellow-300">🔥 {streak}</b>, reviens demain pour la prolonger !
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={share}
          className="inline-flex min-h-11 items-center rounded-lg bg-yellow-400 px-4 text-sm font-bold text-emerald-950 hover:bg-yellow-300"
        >
          {shared ? "✅ Copié !" : "📤 Partager mon score"}
        </button>
        {notify.supported() && !reminder && (
          <button
            onClick={enableReminder}
            className="inline-flex min-h-11 items-center rounded-lg bg-white/10 px-4 text-sm font-semibold hover:bg-white/20"
          >
            🔔 Me rappeler
          </button>
        )}
        {reminder && <span className="inline-flex min-h-11 items-center text-sm text-white/55">🔔 Rappels activés</span>}
      </div>
    </div>
  );
}
