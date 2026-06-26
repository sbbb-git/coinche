import { useState } from "react";
import { ScreenShell } from "../app/ScreenShell";
import { scoreManualDeal, Team } from "../engine/scoring";
import { useCounter } from "../state/counter";
import { useT, translate, currentLang } from "../i18n";

const TARGETS = [500, 1000, 1500, 2000, 3000];
type Special = "none" | "capot" | "generale";

/** Compteur de points pour les parties avec de vraies cartes (sans IA). */
export function CompteurScreen() {
  const t = useT();
  const { state, totals, setName, setTarget, addDeal, undo, reset } = useCounter();
  const [t0, t1] = totals();
  const [adding, setAdding] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const winner = t0 >= state.target && t0 > t1 ? 0 : t1 >= state.target && t1 > t0 ? 1 : null;

  return (
    <ScreenShell title={t("counter.title")}>
      <p className="mb-3 text-sm text-white/70">
        {t("counter.blurb")}
      </p>

      {/* Scores */}
      <div className="grid grid-cols-2 gap-3">
        {[0, 1].map((i) => (
          <div key={i} className="rounded-2xl bg-white/8 p-3 text-center ring-1 ring-white/10">
            <input
              value={state.names[i]}
              maxLength={12}
              onChange={(e) => setName(i as 0 | 1, e.target.value)}
              aria-label={t("counter.aria.teamName", { n: i + 1 })}
              className="w-full bg-transparent text-center text-sm font-semibold text-white/80 outline-none"
            />
            <div className={`mt-1 text-4xl font-black tabular-nums ${winner === i ? "text-yellow-300" : ""}`}>
              {i === 0 ? t0 : t1}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-2 text-xs text-white/60">
        <span>{t("counter.target")}</span>
        <select
          value={state.target}
          onChange={(e) => setTarget(Number(e.target.value))}
          className="rounded bg-white/10 px-2 py-1 text-white"
        >
          {TARGETS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {winner !== null && (
        <p className="animate-pop mt-3 rounded-xl bg-yellow-400/90 p-2.5 text-center font-bold text-emerald-950">
          {t("counter.winner", { name: state.names[winner] })}
        </p>
      )}

      {/* Ajouter une donne */}
      {adding ? (
        <DealForm names={state.names} onCancel={() => setAdding(false)} onAdd={(d) => { addDeal(d); setAdding(false); }} />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-4 min-h-11 w-full rounded-xl bg-yellow-400 py-2.5 font-bold text-emerald-950 hover:bg-yellow-300"
        >
          {t("counter.addDeal")}
        </button>
      )}

      {/* Historique */}
      {state.deals.length > 0 && (
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/60">{t("counter.deals")}</p>
            <button onClick={undo} className="min-h-9 rounded-lg px-3 text-xs font-semibold text-white/70 hover:bg-white/10">
              {t("counter.undoLast")}
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {state.deals
              .slice()
              .reverse()
              .map((d, idx) => (
                <div key={state.deals.length - idx} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm">
                  <span className="min-w-0 flex-1 truncate text-white/80">{d.desc}</span>
                  <span className="tabular-nums text-white/70">
                    +{d.scores[0]} / +{d.scores[1]}
                  </span>
                </div>
              ))}
          </div>

          {confirmReset ? (
            <div className="mt-3 rounded-xl bg-red-500/10 p-3 text-center ring-1 ring-red-500/30">
              <p className="text-sm text-white/85">{t("counter.confirmReset")}</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => setConfirmReset(false)} className="min-h-11 flex-1 rounded-lg bg-white/10 text-sm font-semibold hover:bg-white/20">
                  {t("counter.cancel")}
                </button>
                <button onClick={() => { reset(); setConfirmReset(false); }} className="min-h-11 flex-1 rounded-lg bg-red-500/90 text-sm font-bold text-white hover:bg-red-500">
                  {t("counter.newGame")}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="mt-3 min-h-11 w-full rounded-xl bg-white/5 text-sm font-semibold text-white/70 hover:bg-white/10"
            >
              {t("counter.newGameReset")}
            </button>
          )}
        </div>
      )}
    </ScreenShell>
  );
}

function DealForm({
  names,
  onAdd,
  onCancel,
}: {
  names: [string, string];
  onAdd: (d: { desc: string; scores: [number, number] }) => void;
  onCancel: () => void;
}) {
  const [taker, setTaker] = useState<Team>(0);
  const [special, setSpecial] = useState<Special>("none");
  const [value, setValue] = useState(90);
  const [points, setPoints] = useState("");
  const [coinche, setCoinche] = useState<1 | 2 | 4>(1);
  const [belote, setBelote] = useState<Team | null>(null);
  const [succeeded, setSucceeded] = useState(true);
  const [defenseWonAll, setDefenseWonAll] = useState(false);

  const t = useT();
  const valid = special !== "none" || points !== "";

  const validate = () => {
    const takerPts = special === "none" ? Number(points) : 0;
    const { scores, made } = scoreManualDeal({
      takerTeam: taker,
      value,
      capot: special === "capot",
      generale: special === "generale",
      takerCardPoints: takerPts,
      succeeded,
      defenseWonAll: special === "capot" && !succeeded && defenseWonAll,
      coinche,
      beloteTeam: belote,
    });
    const lang = currentLang();
    const what =
      special === "generale"
        ? translate(lang, "counter.desc.generale")
        : special === "capot"
          ? translate(lang, "counter.desc.capot")
          : translate(lang, "counter.desc.numbered", { n: value });
    const mult =
      coinche === 4
        ? translate(lang, "counter.desc.surcoinche")
        : coinche === 2
          ? translate(lang, "counter.desc.coinche")
          : "";
    const desc = translate(lang, "counter.desc.line", {
      name: names[taker],
      what,
      mult,
      result: translate(lang, made ? "counter.desc.made" : "counter.desc.failed"),
    });
    onAdd({ desc, scores });
  };

  return (
    <div className="animate-pop mt-4 space-y-3 rounded-2xl bg-emerald-950/80 p-3 ring-1 ring-emerald-700">
      <Field label={t("counter.field.taker")}>
        <Seg options={[[0, names[0]], [1, names[1]]]} value={taker} onChange={(v) => setTaker(v as Team)} />
      </Field>

      <Field label={t("counter.field.contract")}>
        <Seg
          options={[["none", t("counter.contract.numbered")], ["capot", t("counter.contract.capot")], ["generale", t("counter.contract.generale")]]}
          value={special}
          onChange={(v) => setSpecial(v as Special)}
        />
      </Field>

      {special === "none" && (
        <>
          <Field label={t("counter.field.announced", { n: value })}>
            <div className="flex items-center gap-2">
              <Step onClick={() => setValue((v) => Math.max(80, v - 10))}>−</Step>
              <input
                type="range"
                min={80}
                max={160}
                step={10}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="flex-1 accent-yellow-400"
              />
              <Step onClick={() => setValue((v) => Math.min(160, v + 10))}>+</Step>
            </div>
          </Field>
          <Field label={t("counter.field.takerPoints")}>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={162}
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder={t("counter.points.placeholder")}
              className="w-full rounded-lg bg-white/90 px-3 py-2.5 font-semibold text-zinc-800 placeholder:text-zinc-400"
            />
          </Field>
        </>
      )}

      {special !== "none" && (
        <Field label={t("counter.field.result")}>
          <Seg options={[[true, t("counter.result.made")], [false, t("counter.result.failed")]]} value={succeeded} onChange={(v) => setSucceeded(v as boolean)} />
        </Field>
      )}

      {special === "capot" && !succeeded && (
        <Field label={t("counter.field.defenseAll")}>
          <Seg
            options={[[false, t("counter.defenseAll.no")], [true, t("counter.defenseAll.yes")]]}
            value={defenseWonAll}
            onChange={(v) => setDefenseWonAll(v as boolean)}
          />
        </Field>
      )}

      <Field label={t("counter.field.coinche")}>
        <Seg options={[[1, t("counter.coinche.no")], [2, t("counter.coinche.x2")], [4, t("counter.coinche.x4")]]} value={coinche} onChange={(v) => setCoinche(v as 1 | 2 | 4)} />
      </Field>

      <Field label={t("counter.field.belote")}>
        <Seg
          options={[[-1, t("counter.belote.none")], [0, names[0]], [1, names[1]]]}
          value={belote === null ? -1 : belote}
          onChange={(v) => setBelote(v === -1 ? null : (v as Team))}
        />
      </Field>

      <div className="flex gap-2 pt-1">
        <button onClick={onCancel} className="min-h-11 flex-1 rounded-xl bg-white/10 font-semibold hover:bg-white/20">
          {t("counter.cancel")}
        </button>
        <button
          onClick={validate}
          disabled={!valid}
          className="min-h-11 flex-1 rounded-xl bg-yellow-400 font-bold text-emerald-950 hover:bg-yellow-300 disabled:opacity-40"
        >
          {t("counter.validate")}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/60">{label}</p>
      {children}
    </div>
  );
}

function Step({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white/10 text-lg font-bold hover:bg-white/20">
      {children}
    </button>
  );
}

function Seg<T extends string | number | boolean>({
  options,
  value,
  onChange,
}: {
  options: [T, string][];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-1 rounded-lg bg-black/30 p-1">
      {options.map(([v, lbl]) => (
        <button
          key={String(v)}
          onClick={() => onChange(v)}
          aria-pressed={value === v}
          className={[
            "min-h-11 flex-1 rounded-md px-2 text-sm font-semibold transition",
            value === v ? "bg-yellow-400 text-emerald-950" : "text-white/80 hover:bg-white/10",
          ].join(" ")}
        >
          {lbl}
        </button>
      ))}
    </div>
  );
}
