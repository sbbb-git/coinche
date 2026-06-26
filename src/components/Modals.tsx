import { useEffect, useId, useRef, useState } from "react";
import { useGame } from "../state/store";
import { useNav } from "../app/nav";
import { useFocusTrap } from "../app/useFocusTrap";
import { AiLevel, PlayProfile, Settings, winnerTeam } from "../engine/game";
import { storage } from "../storage";
import { shareResultImage } from "../share";
import { useLang, useT, Lang } from "../i18n";

function Overlay({
  children,
  wide,
  onClose,
  label,
}: {
  children: React.ReactNode;
  wide?: boolean;
  onClose?: () => void;
  label?: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef);
  useEffect(() => {
    if (!onClose) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))]"
      onClick={onClose ? () => onClose() : undefined}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
        className={[
          "animate-pop max-h-[88dvh] w-full overflow-y-auto rounded-2xl bg-emerald-950 p-5 shadow-2xl ring-1 ring-emerald-700",
          wide ? "max-w-md" : "max-w-sm",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

export function DealResultModal() {
  const game = useGame((s) => s.game);
  const cont = useGame((s) => s.continueDeal);
  const t = useT();
  if (game.phase !== "dealScored" || !game.lastResult || !game.contract) return null;

  const r = game.lastResult;
  const c = game.contract;
  const n = game.settings.playerNames;
  const takerTeam = r.takerTeam;
  const defTeam = (1 - takerTeam) as 0 | 1;
  const takerName = n[c.taker];
  const teamName = (t: 0 | 1) => `${n[t === 0 ? 0 : 1]} & ${n[t === 0 ? 2 : 3]}`;
  const target = c.generale ? t("score.generale") : c.capot ? t("score.capot") : c.value;
  const mult = c.coinche > 1 ? (c.coinche === 4 ? " ×4" : " ×2") : "";

  return (
    <Overlay label={t("settings.dealResult.title")}>
      <h2 className="text-center text-xl font-bold">
        {r.made ? t("settings.dealResult.made") : t("settings.dealResult.failed")}
      </h2>
      <p className="mt-1 text-center text-sm text-white/70">
        {takerName}, {target}
        {mult}
      </p>

      <div className="mt-4 space-y-1 text-sm">
        <p className="mb-1 text-xs uppercase tracking-wide text-white/60">{t("settings.dealResult.tricks")}</p>
        <Row label={`${teamName(takerTeam)} (${t("settings.dealResult.taker")})`} value={r.cardPoints[takerTeam]} />
        <Row label={`${teamName(defTeam)} (${t("settings.dealResult.defense")})`} value={r.cardPoints[defTeam]} />
        {(r.belote[0] > 0 || r.belote[1] > 0) && (
          <>
            <p className="mb-1 mt-2 text-xs uppercase tracking-wide text-white/60">{t("settings.dealResult.belote")}</p>
            {r.belote[takerTeam] > 0 && <Row label={teamName(takerTeam)} value={`+${r.belote[takerTeam]}`} />}
            {r.belote[defTeam] > 0 && <Row label={teamName(defTeam)} value={`+${r.belote[defTeam]}`} />}
          </>
        )}
        <p className="mb-1 mt-2 text-xs uppercase tracking-wide text-white/60">{t("settings.dealResult.contract")}</p>
        <Row
          label={t("settings.dealResult.realized", {
            done: r.realized[takerTeam],
            need: c.capot || c.generale ? t("settings.dealResult.allTricks") : c.value,
          })}
          value={r.made ? t("settings.dealResult.success") : t("settings.dealResult.chute")}
        />

        <div className="my-2 h-px bg-white/10" />
        <p className="mb-1 text-xs uppercase tracking-wide text-white/60">{t("settings.dealResult.scoredThisRound")}</p>
        <Row label={teamName(0)} value={`+${r.scores[0]}`} bold />
        <Row label={teamName(1)} value={`+${r.scores[1]}`} bold />
        <div className="mt-1 flex justify-between text-xs text-white/55">
          <span>{t("settings.dealResult.gameTotal")}</span>
          <span className="tabular-nums">
            {game.scores[0]}, {game.scores[1]}
          </span>
        </div>
      </div>

      <button
        onClick={cont}
        className="mt-5 min-h-11 w-full rounded-xl bg-yellow-400 py-3 font-bold text-emerald-950 hover:bg-yellow-300"
      >
        {t("settings.dealResult.next")}
      </button>
    </Overlay>
  );
}

export function GameOverModal() {
  const game = useGame((s) => s.game);
  const startNewGame = useGame((s) => s.startNewGame);
  const go = useNav((s) => s.go);
  const t = useT();
  const [sharing, setSharing] = useState(false);
  if (game.phase !== "gameOver") return null;
  const w = winnerTeam(game);
  const youWon = w === 0;

  const share = async () => {
    if (sharing) return;
    setSharing(true);
    try {
      await shareResultImage({ won: youWon, scoreYou: game.scores[0], scoreThem: game.scores[1] });
    } finally {
      setSharing(false);
    }
  };

  return (
    <Overlay label={t("settings.gameOver.title")}>
      <h2 className="text-center text-2xl font-bold">{youWon ? t("settings.gameOver.win") : t("settings.gameOver.loss")}</h2>
      <p className="mt-2 text-center text-sm text-white/70">
        {game.scores[0]}, {game.scores[1]}
      </p>
      <button
        onClick={() => startNewGame()}
        className="mt-5 min-h-11 w-full rounded-xl bg-yellow-400 py-2.5 font-bold text-emerald-950 hover:bg-yellow-300"
      >
        {t("settings.gameOver.newGame")}
      </button>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => go("home")}
          className="min-h-11 flex-1 rounded-xl bg-white/10 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/20"
        >
          {t("settings.gameOver.home")}
        </button>
        <button
          onClick={share}
          disabled={sharing}
          className="min-h-11 flex-1 rounded-xl bg-white/10 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/20 disabled:opacity-50"
        >
          {sharing ? "…" : t("settings.gameOver.share")}
        </button>
      </div>
    </Overlay>
  );
}

type Tab = "interface" | "jeu" | "ia" | "comptage";
const TABS: { id: Tab; labelKey: string }[] = [
  { id: "interface", labelKey: "settings.tab.interface" },
  { id: "jeu", labelKey: "settings.tab.game" },
  { id: "ia", labelKey: "settings.tab.ai" },
  { id: "comptage", labelKey: "settings.tab.scoring" },
];

export function MenuSheet({ onClose }: { onClose: () => void }) {
  const game = useGame((s) => s.game);
  const startNewGame = useGame((s) => s.startNewGame);
  const updateSettings = useGame((s) => s.updateSettings);
  const [draft, setDraft] = useState<Settings>(game.settings);
  const [tab, setTab] = useState<Tab>("interface");
  const [confirmClear, setConfirmClear] = useState(false);
  const lang = useLang((s) => s.lang);
  const setLang = useLang((s) => s.setLang);
  const t = useT();

  const upd = (p: Partial<Settings>) => setDraft({ ...draft, ...p });
  const updP = (p: Partial<PlayProfile>) => setDraft({ ...draft, profile: { ...draft.profile, ...p } });

  return (
    <Overlay wide onClose={onClose} label={t("settings.title")}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{t("settings.title")}</h2>
        <button
          onClick={onClose}
          aria-label={t("settings.close")}
          className="grid h-11 w-11 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div role="tablist" aria-label={t("settings.sections")} className="mt-3 flex gap-1 rounded-lg bg-black/30 p-1">
        {TABS.map((tb) => (
          <button
            key={tb.id}
            id={`settab-${tb.id}`}
            onClick={() => setTab(tb.id)}
            role="tab"
            aria-selected={tab === tb.id}
            aria-controls="settings-panel"
            className={[
              "min-w-0 flex-1 truncate rounded-md py-2.5 text-sm font-semibold transition",
              tab === tb.id ? "bg-yellow-400 text-emerald-950" : "text-white/80 hover:bg-white/10",
            ].join(" ")}
          >
            {t(tb.labelKey)}
          </button>
        ))}
      </div>

      <div
        id="settings-panel"
        role="tabpanel"
        aria-labelledby={`settab-${tab}`}
        className="mt-3 max-h-[55vh] space-y-3 overflow-y-auto pr-1"
      >
        {tab === "interface" && (
          <>
            <Seg
              label={t("settings.language")}
              value={lang}
              options={[
                ["fr", "Français"],
                ["en", "English"],
              ]}
              onChange={(v) => setLang(v as Lang)}
            />
            <Seg
              label={t("settings.gameSpeed")}
              value={draft.gameSpeed}
              options={[
                ["lent", t("settings.gameSpeed.slow")],
                ["normal", t("settings.gameSpeed.normal")],
                ["rapide", t("settings.gameSpeed.fast")],
              ]}
              onChange={(v) => upd({ gameSpeed: v as Settings["gameSpeed"] })}
            />
            <Seg
              label={t("settings.direction")}
              value={draft.sensHoraire ? "h" : "a"}
              options={[
                ["a", t("settings.direction.ccw")],
                ["h", t("settings.direction.cw")],
              ]}
              onChange={(v) => upd({ sensHoraire: v === "h" })}
            />
            <Seg
              label={t("settings.cardSort")}
              value={draft.cardSort}
              options={[
                ["asc", t("settings.cardSort.asc")],
                ["desc", t("settings.cardSort.desc")],
              ]}
              onChange={(v) => upd({ cardSort: v as Settings["cardSort"] })}
            />
            <Toggle on={draft.fourColors} onClick={() => upd({ fourColors: !draft.fourColors })}>
              {t("settings.fourColors")}
            </Toggle>
            <Toggle on={draft.sound} onClick={() => upd({ sound: !draft.sound })}>
              {t("settings.sound")}
            </Toggle>
            <Toggle on={draft.haptics} onClick={() => upd({ haptics: !draft.haptics })}>
              {t("settings.haptics")}
            </Toggle>
            <Toggle on={draft.autoPlaySingle} onClick={() => upd({ autoPlaySingle: !draft.autoPlaySingle })}>
              {t("settings.autoPlaySingle")}
            </Toggle>
            <Toggle on={draft.preselectPlayable} onClick={() => upd({ preselectPlayable: !draft.preselectPlayable })}>
              {t("settings.preselectPlayable")}
            </Toggle>
            <Toggle on={draft.showLiveScores} onClick={() => upd({ showLiveScores: !draft.showLiveScores })}>
              {t("settings.showLiveScores")}
            </Toggle>
            <Toggle on={draft.trumpHelper} onClick={() => upd({ trumpHelper: !draft.trumpHelper })}>
              {t("settings.trumpHelper")}
            </Toggle>
          </>
        )}

        {tab === "jeu" && (
          <>
            <Seg
              label={t("settings.targetScore")}
              value={String(draft.targetScore)}
              options={[
                ["1000", "1000"],
                ["1500", "1500"],
                ["2000", "2000"],
              ]}
              onChange={(v) => upd({ targetScore: Number(v) })}
            />
            <Toggle on={draft.allowNT} onClick={() => upd({ allowNT: !draft.allowNT })}>
              {t("settings.allowNT")}
            </Toggle>
            <Toggle on={draft.allowAT} onClick={() => upd({ allowAT: !draft.allowAT })}>
              {t("settings.allowAT")}
            </Toggle>
            <Toggle on={draft.beloteAtToutAtout} onClick={() => upd({ beloteAtToutAtout: !draft.beloteAtToutAtout })}>
              {t("settings.beloteAtToutAtout")}
            </Toggle>
            <Toggle on={draft.pisserObligatoire} onClick={() => upd({ pisserObligatoire: !draft.pisserObligatoire })}>
              {t("settings.pisserObligatoire")}
            </Toggle>
            <Toggle on={draft.allowCoinche} onClick={() => upd({ allowCoinche: !draft.allowCoinche })}>
              {t("settings.allowCoinche")}
            </Toggle>
            <Toggle on={draft.allowSurcoinche} onClick={() => upd({ allowSurcoinche: !draft.allowSurcoinche })}>
              {t("settings.allowSurcoinche")}
            </Toggle>
            <Toggle on={draft.allowCapot} onClick={() => upd({ allowCapot: !draft.allowCapot })}>
              {t("settings.allowCapot")}
            </Toggle>
            <Toggle on={draft.allowGenerale} onClick={() => upd({ allowGenerale: !draft.allowGenerale })}>
              {t("settings.allowGenerale")}
            </Toggle>
            <Toggle on={draft.coincheEndsGame} onClick={() => upd({ coincheEndsGame: !draft.coincheEndsGame })}>
              {t("settings.coincheEndsGame")}
            </Toggle>
          </>
        )}

        {tab === "ia" && (
          <>
            <Seg
              label={t("settings.aiLevel")}
              value={draft.aiLevel}
              options={[
                ["easy", t("settings.aiLevel.easy")],
                ["medium", t("settings.aiLevel.medium")],
                ["hard", t("settings.aiLevel.hard")],
                ["expert", t("settings.aiLevel.expert")],
              ]}
              onChange={(v) => upd({ aiLevel: v as AiLevel })}
            />
            {draft.aiLevel === "expert" && (
              <Seg
                label={t("settings.expertDepth")}
                value={draft.expertDepth}
                options={[
                  ["rapide", t("settings.expertDepth.fast")],
                  ["normal", t("settings.expertDepth.normal")],
                  ["fort", t("settings.expertDepth.strong")],
                ]}
                onChange={(v) => upd({ expertDepth: v as Settings["expertDepth"] })}
              />
            )}
            <Slider
              label={t("settings.style")}
              left={t("settings.style.cautious")}
              right={t("settings.style.aggressive")}
              value={draft.profile.aggressiveness}
              onChange={(v) => updP({ aggressiveness: v })}
            />
            <Seg
              label={t("settings.appels")}
              value={draft.profile.appels}
              options={[
                ["directs", t("settings.appels.direct")],
                ["indirects", t("settings.appels.indirect")],
                ["aucun", t("settings.appels.none")],
              ]}
              onChange={(v) => updP({ appels: v as PlayProfile["appels"] })}
            />
            <Seg
              label={t("settings.annonceSystem")}
              value={draft.profile.jeuAuxAs ? "as" : "petit"}
              options={[
                ["petit", t("settings.annonceSystem.small")],
                ["as", t("settings.annonceSystem.aces")],
              ]}
              onChange={(v) => updP({ jeuAuxAs: v === "as" })}
            />
            <p className="-mt-1 px-1 text-[11px] text-white/60">
              {t("settings.annonceSystem.hint")}
            </p>
            <Toggle on={draft.profile.entameAtoutValet} onClick={() => updP({ entameAtoutValet: !draft.profile.entameAtoutValet })}>
              {t("settings.entameAtoutValet")}
            </Toggle>
            <Toggle on={draft.profile.conventionAnnonce100} onClick={() => updP({ conventionAnnonce100: !draft.profile.conventionAnnonce100 })}>
              {t("settings.conventionAnnonce100")}
            </Toggle>
            <Toggle on={draft.profile.appelBelote} onClick={() => updP({ appelBelote: !draft.profile.appelBelote })}>
              {t("settings.appelBelote")}
            </Toggle>
          </>
        )}

        {tab === "comptage" && (
          <>
            <Toggle on={draft.roundToTen} onClick={() => upd({ roundToTen: !draft.roundToTen })}>
              {t("settings.roundToTen")}
            </Toggle>
            <Toggle on={draft.contractCanSucceedIfDefenseMore} onClick={() => upd({ contractCanSucceedIfDefenseMore: !draft.contractCanSucceedIfDefenseMore })}>
              {t("settings.contractCanSucceedIfDefenseMore")}
            </Toggle>
            <Toggle on={draft.beloteCountsToSucceed} onClick={() => upd({ beloteCountsToSucceed: !draft.beloteCountsToSucceed })}>
              {t("settings.beloteCountsToSucceed")}
            </Toggle>
            <Toggle on={draft.beloteCountsToFail} onClick={() => upd({ beloteCountsToFail: !draft.beloteCountsToFail })}>
              {t("settings.beloteCountsToFail")}
            </Toggle>
          </>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => {
            updateSettings(draft);
            onClose();
          }}
          className="flex-1 rounded-xl bg-white/15 py-2.5 font-semibold text-white hover:bg-white/25"
        >
          {t("settings.apply")}
        </button>
        <button
          onClick={() => {
            startNewGame(draft);
            onClose();
          }}
          className="flex-1 rounded-xl bg-yellow-400 py-2.5 font-bold text-emerald-950 hover:bg-yellow-300"
        >
          {t("settings.newGame")}
        </button>
      </div>
      <p className="mt-2 text-center text-[11px] text-white/60">
        {t("settings.applyHint")}
      </p>

      <div className="mt-4 border-t border-white/10 pt-3">
        {confirmClear ? (
          <div className="rounded-xl bg-red-500/10 p-3 text-center ring-1 ring-red-500/30">
            <p className="text-sm text-white/85">{t("settings.clearConfirm")}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setConfirmClear(false)}
                className="min-h-11 flex-1 rounded-lg bg-white/10 text-sm font-semibold hover:bg-white/20"
              >
                {t("settings.cancel")}
              </button>
              <button
                onClick={() => {
                  storage.clearAll();
                  location.reload();
                }}
                className="min-h-11 flex-1 rounded-lg bg-red-500/90 text-sm font-bold text-white hover:bg-red-500"
              >
                {t("settings.clearAll")}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirmClear(true)}
            className="min-h-11 w-full rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10"
          >
            {t("settings.clearMyData")}
          </button>
        )}
      </div>
    </Overlay>
  );
}

function Row({ label, value, bold }: { label: string; value: string | number; bold?: boolean }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="min-w-0 truncate text-white/70">{label}</span>
      <span className={bold ? "shrink-0 font-bold tabular-nums" : "shrink-0 tabular-nums"}>{value}</span>
    </div>
  );
}

function Seg<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: [T, string][];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="mb-1 text-xs uppercase tracking-wide text-white/60">{label}</p>
      <div className="flex gap-1">
        {options.map(([id, lbl]) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            aria-pressed={value === id}
            className={[
              "min-h-11 flex-1 rounded-lg px-2 py-2 text-sm font-semibold transition",
              value === id ? "bg-yellow-400 text-emerald-950" : "bg-white/10 text-white hover:bg-white/20",
            ].join(" ")}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}

function Slider({
  label,
  left,
  right,
  value,
  onChange,
}: {
  label: string;
  left: string;
  right: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const t = useT();
  const id = useId();
  const word =
    value <= 0.2
      ? t("settings.style.veryCautious")
      : value < 0.45
        ? t("settings.style.cautious")
        : value < 0.55
          ? t("settings.style.balanced")
          : value < 0.8
            ? t("settings.style.aggressive")
            : t("settings.style.veryAggressive");
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label htmlFor={id} className="text-xs uppercase tracking-wide text-white/60">
          {label}
        </label>
        <span className="text-xs font-semibold text-yellow-300">{word}</span>
      </div>
      <div className="flex min-h-11 items-center">
        <input
          id={id}
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={value}
          aria-label={label}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-yellow-400"
        />
      </div>
      <div className="flex justify-between text-[11px] text-white/60">
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );
}

function Toggle({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      role="switch"
      aria-checked={on}
      className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2.5 text-left text-sm hover:bg-white/10"
    >
      <span>{children}</span>
      <span
        className={[
          "h-6 w-10 shrink-0 rounded-full p-0.5 transition",
          on ? "bg-yellow-400" : "bg-white/20",
        ].join(" ")}
      >
        <span
          className={["block h-5 w-5 rounded-full bg-white transition", on ? "translate-x-4" : ""].join(" ")}
        />
      </span>
    </button>
  );
}
