import { useEffect, useRef, useState } from "react";
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
import { useT, translate, currentLang } from "../i18n";

function prettyDate(key: string): string {
  try {
    const locale =
      typeof navigator !== "undefined" && navigator.language
        ? navigator.language
        : currentLang() === "en"
          ? "en-GB"
          : "fr-FR";
    return new Date(key).toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });
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
  const t = useT();
  const key = isoDay();
  // genDailyChallenge() lance des simulations PIMC (plusieurs centaines de ms) :
  // on le génère hors du rendu (setTimeout 0) pour laisser peindre l'écran et
  // éviter de geler le thread principal sur mobile.
  const [ex, setEx] = useState<DailyChallenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setEx(null);
    const id = setTimeout(() => {
      try {
        setEx(genDailyChallenge(key));
      } catch {
        setEx(null);
      } finally {
        setLoading(false);
      }
    }, 0);
    return () => clearTimeout(id);
  }, [key]);

  const daily = useDaily((s) => s.state);
  const doneToday = useDaily((s) => s.doneToday());

  return (
    <ScreenShell title={t("daily.title")}>
      <div className="mb-3 rounded-2xl bg-gradient-to-br from-sky-900/70 to-emerald-900/60 p-4 ring-1 ring-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/80">{prettyDate(key)}</p>
            <p className="text-lg font-bold">{t("daily.header")}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black tabular-nums text-yellow-300">🔥 {daily.streak}</div>
            <div className="text-[11px] text-white/55">{t("daily.streakLabel", { n: daily.best })}</div>
          </div>
        </div>
        <p className="mt-2 text-xs text-white/60">
          {t("daily.blurb")}
        </p>
      </div>

      {loading ? (
        <p className="mt-6 text-center text-sm text-white/70" aria-live="polite">{t("review.analyzing")}</p>
      ) : !ex ? (
        <p className="mt-6 text-center text-sm text-white/70">{t("daily.unavailable")}</p>
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
  const t = useT();
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
      <p className="mb-1 text-center text-xs text-white/60">{t("daily.currentTrick")}</p>
      <div className="mb-4 flex min-h-24 items-center justify-center gap-2">
        {g.trick.length === 0 && <span className="text-sm text-white/60">{t("daily.youLead")}</span>}
        {g.trick.map((p) => (
          <div key={p.player} className="flex flex-col items-center gap-1">
            <PlayingCard card={p.card} size="sm" />
            <span className="text-[10px] text-white/60">{names[p.player]}</span>
          </div>
        ))}
      </div>

      <p className="mb-2 text-center text-sm text-white/70">{answered ? t("daily.yourHand") : t("daily.whichCard")}</p>
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
          title={grade?.title ?? (priorSuccess ? t("daily.alreadyDone") : t("daily.alreadyTried"))}
          reason={ex.reason}
          keyDay={keyDay}
        />
      )}
    </>
  );
}

// --- Défi « enchère » -------------------------------------------------------

function BidDaily({ ex, keyDay, doneToday, priorSuccess }: { ex: BidExercise; keyDay: string; doneToday: boolean; priorSuccess: boolean }) {
  const t = useT();
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
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/60">{t("daily.auctionInProgress")}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {ex.auction.map((l, i) => (
              <span key={i} className="tabular-nums">
                <span className={l.partner ? "text-yellow-300" : "text-white/60"}>{l.name}</span>{" "}
                {l.value === "passe" ? <span className="text-white/60">{t("daily.pass.word")}</span> : <b>{l.value}{l.mode ? <> <ModeSym mode={l.mode} fourColors={fourColors} /></> : null}</b>}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="mb-2 text-center text-sm text-white/70">{ex.auction.length > 0 ? t("daily.yourTurn") : t("daily.youOpen")}</p>
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
            <button onClick={() => setValue(Math.max(minV, eff - 10))} disabled={eff <= minV} aria-label={t("daily.aria.decrease")} className="h-12 w-12 rounded-lg bg-white/15 text-2xl font-bold text-white disabled:opacity-30">−</button>
            <div className="flex h-12 flex-1 items-center justify-center gap-1 rounded-lg bg-black/30 text-2xl font-bold tabular-nums">
              <span>{eff}</span>
              <ModeSym mode={mode} fourColors={fourColors} />
            </div>
            <button onClick={() => setValue(Math.min(160, eff + 10))} disabled={eff >= 160} aria-label={t("daily.aria.increase")} className="h-12 w-12 rounded-lg bg-white/15 text-2xl font-bold text-white disabled:opacity-30">+</button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => submit({ kind: "bid", value: eff, mode })} className="min-h-11 flex-1 rounded-lg bg-yellow-400 px-3 font-bold text-emerald-950 hover:bg-yellow-300">{t("daily.bid", { n: eff })}</button>
            <button onClick={() => submit({ kind: "pass" })} className="min-h-11 flex-1 rounded-lg bg-white/15 font-semibold text-white hover:bg-white/25">{t("daily.pass")}</button>
          </div>
        </div>
      )}

      {answered && (
        <ResultPanel
          stars={grade?.stars}
          title={grade?.title ?? (priorSuccess ? t("daily.alreadyDone") : t("daily.alreadyTried"))}
          reason={ex.reason}
          keyDay={keyDay}
        />
      )}
    </>
  );
}

function ContractLine({ c, names, fourColors }: { c: NonNullable<PlayExercise["state"]["contract"]>; names: string[]; fourColors: boolean }) {
  const t = useT();
  return (
    <div className="mb-2 flex items-center justify-center gap-2 text-sm">
      <span className="rounded-full bg-black/40 px-3 py-1">
        {t("daily.contract")} <b>{c.generale ? t("daily.generale") : c.capot ? t("daily.capot") : c.value}</b>{" "}
        <span className={modeLabel(c.mode).suit ? suitColorClassDark(modeLabel(c.mode).suit!, fourColors) : ""}>{modeLabel(c.mode).text}</span>{" "}
        · {t("daily.taker", { name: names[c.taker] })}
      </span>
    </div>
  );
}

function ResultPanel({ stars, title, reason, keyDay }: { stars?: 1 | 2 | 3; title: string; reason: string; keyDay: string }) {
  const t = useT();
  const daily = useDaily((s) => s.state);
  const [shared, setShared] = useState(false);
  const [reminder, setReminder] = useState(notify.optedIn());
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const tone = stars === 3 ? "bg-emerald-900/70" : stars === 2 ? "bg-sky-900/70" : stars === 1 ? "bg-amber-900/60" : "bg-white/10";

  const share = async () => {
    const text = translate(currentLang(), "daily.shareText", {
      day: keyDay,
      stars: stars ? "⭐".repeat(stars) : "",
      streak: daily.streak,
      site: SITE,
    });
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
      notify.show(t("daily.remindersEnabled.title"), t("daily.remindersEnabled.body"));
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
        {t("daily.comeBack")}<b className="text-yellow-300">🔥 {daily.streak}</b>{t("daily.comeBackTail")}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={share} className="inline-flex min-h-11 items-center rounded-lg bg-yellow-400 px-4 text-sm font-bold text-emerald-950 hover:bg-yellow-300">
          {shared ? t("daily.shareDone") : t("daily.share")}
        </button>
        {notify.supported() && !reminder && (
          <button onClick={enableReminder} className="inline-flex min-h-11 items-center rounded-lg bg-white/10 px-4 text-sm font-semibold hover:bg-white/20">
            {t("daily.remindMe")}
          </button>
        )}
        {reminder && <span className="inline-flex min-h-11 items-center text-sm text-white/55">{t("daily.remindersOn")}</span>}
      </div>
    </div>
  );
}
