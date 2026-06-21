import { useState } from "react";
import { ScreenShell } from "../app/ScreenShell";
import { modeLabel } from "../components/Table";
import { suitColorClassDark } from "../components/Card";
import { TrumpMode } from "../engine/cards";
import { scoreManualDeal, Team } from "../engine/scoring";
import { useCounter } from "../state/counter";

const MODES: TrumpMode[] = ["S", "H", "D", "C", "NT", "AT"];
const TARGETS = [500, 1000, 1500, 2000, 3000];
type Special = "none" | "capot" | "generale";

/** Compteur de points pour les parties avec de vraies cartes (sans IA). */
export function CompteurScreen() {
  const { state, totals, setName, setTarget, addDeal, undo, reset } = useCounter();
  const [t0, t1] = totals();
  const [adding, setAdding] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const winner = t0 >= state.target && t0 > t1 ? 0 : t1 >= state.target && t1 > t0 ? 1 : null;

  return (
    <ScreenShell title="Compteur de points">
      <p className="mb-3 text-sm text-white/70">
        Pour jouer avec de vraies cartes : saisis chaque donne, le compteur fait les comptes.
      </p>

      {/* Scores */}
      <div className="grid grid-cols-2 gap-3">
        {[0, 1].map((i) => (
          <div key={i} className="rounded-2xl bg-white/8 p-3 text-center ring-1 ring-white/10">
            <input
              value={state.names[i]}
              maxLength={12}
              onChange={(e) => setName(i as 0 | 1, e.target.value)}
              aria-label={`Nom équipe ${i + 1}`}
              className="w-full bg-transparent text-center text-sm font-semibold text-white/80 outline-none"
            />
            <div className={`mt-1 text-4xl font-black tabular-nums ${winner === i ? "text-yellow-300" : ""}`}>
              {i === 0 ? t0 : t1}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-2 text-xs text-white/60">
        <span>Objectif</span>
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
          🏆 {state.names[winner]} {winner === 0 ? "gagnent" : "gagnent"} !
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
          ➕ Ajouter une donne
        </button>
      )}

      {/* Historique */}
      {state.deals.length > 0 && (
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Donnes</p>
            <button onClick={undo} className="min-h-9 rounded-lg px-3 text-xs font-semibold text-white/70 hover:bg-white/10">
              ↩︎ Annuler la dernière
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
              <p className="text-sm text-white/85">Tout remettre à zéro ?</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => setConfirmReset(false)} className="min-h-11 flex-1 rounded-lg bg-white/10 text-sm font-semibold hover:bg-white/20">
                  Annuler
                </button>
                <button onClick={() => { reset(); setConfirmReset(false); }} className="min-h-11 flex-1 rounded-lg bg-red-500/90 text-sm font-bold text-white hover:bg-red-500">
                  Nouvelle partie
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="mt-3 min-h-11 w-full rounded-xl bg-white/5 text-sm font-semibold text-white/70 hover:bg-white/10"
            >
              Nouvelle partie (remettre à zéro)
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
  const [mode, setMode] = useState<TrumpMode>("S");
  const [points, setPoints] = useState("");
  const [coinche, setCoinche] = useState<1 | 2 | 4>(1);
  const [belote, setBelote] = useState<Team | null>(null);
  const [succeeded, setSucceeded] = useState(true);

  const ml = modeLabel(mode);
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
      coinche,
      beloteTeam: belote,
    });
    const what = special === "generale" ? "Générale" : special === "capot" ? "Capot" : `${value} ${ml.text}`;
    const mult = coinche === 4 ? " ×4" : coinche === 2 ? " ×2" : "";
    const desc = `${names[taker]} · ${what}${mult} · ${made ? "réussi" : "chuté"}`;
    onAdd({ desc, scores });
  };

  return (
    <div className="animate-pop mt-4 space-y-3 rounded-2xl bg-emerald-950/80 p-3 ring-1 ring-emerald-700">
      <Field label="Preneur">
        <Seg options={[[0, names[0]], [1, names[1]]]} value={taker} onChange={(v) => setTaker(v as Team)} />
      </Field>

      <Field label="Contrat">
        <Seg
          options={[["none", "Chiffré"], ["capot", "Capot"], ["generale", "Générale"]]}
          value={special}
          onChange={(v) => setSpecial(v as Special)}
        />
      </Field>

      {special === "none" && (
        <>
          <Field label={`Valeur : ${value}`}>
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
          <Field label="Couleur">
            <div className="flex flex-wrap gap-1">
              {MODES.map((m) => {
                const l = modeLabel(m);
                return (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={[
                      "min-h-11 flex-1 rounded-md px-2 text-sm font-bold",
                      mode === m ? "bg-yellow-400 text-emerald-950" : "bg-white/10 hover:bg-white/20",
                      mode === m || !l.suit ? "" : suitColorClassDark(l.suit, true),
                    ].join(" ")}
                  >
                    {l.text}
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Points du preneur (0–162)">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={162}
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="ex. 95"
              className="w-full rounded-lg bg-white/90 px-3 py-2.5 font-semibold text-zinc-800 placeholder:text-zinc-400"
            />
          </Field>
        </>
      )}

      {special !== "none" && (
        <Field label="Résultat">
          <Seg options={[[true, "Réussi"], [false, "Chuté"]]} value={succeeded} onChange={(v) => setSucceeded(v as boolean)} />
        </Field>
      )}

      <Field label="Coinche">
        <Seg options={[[1, "Non"], [2, "×2"], [4, "×4"]]} value={coinche} onChange={(v) => setCoinche(v as 1 | 2 | 4)} />
      </Field>

      <Field label="Belote (20)">
        <Seg
          options={[[-1, "Aucune"], [0, names[0]], [1, names[1]]]}
          value={belote === null ? -1 : belote}
          onChange={(v) => setBelote(v === -1 ? null : (v as Team))}
        />
      </Field>

      <div className="flex gap-2 pt-1">
        <button onClick={onCancel} className="min-h-11 flex-1 rounded-xl bg-white/10 font-semibold hover:bg-white/20">
          Annuler
        </button>
        <button
          onClick={validate}
          disabled={!valid}
          className="min-h-11 flex-1 rounded-xl bg-yellow-400 font-bold text-emerald-950 hover:bg-yellow-300 disabled:opacity-40"
        >
          Valider
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
