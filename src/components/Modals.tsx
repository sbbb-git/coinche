import { useState } from "react";
import { useGame } from "../state/store";
import { Settings, winnerTeam } from "../engine/game";
import { AiLevel } from "../engine/game";

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="animate-pop w-full max-w-sm rounded-2xl bg-emerald-950 p-5 shadow-2xl ring-1 ring-emerald-700">
        {children}
      </div>
    </div>
  );
}

export function DealResultModal() {
  const game = useGame((s) => s.game);
  const cont = useGame((s) => s.continueDeal);
  if (game.phase !== "dealScored" || !game.lastResult || !game.contract) return null;

  const r = game.lastResult;
  const takerName = game.settings.playerNames[game.contract.taker];

  return (
    <Overlay>
      <h2 className="text-center text-xl font-bold">
        {r.made ? "✅ Contrat réussi" : "❌ Chute"}
      </h2>
      <p className="mt-1 text-center text-sm text-white/70">
        {takerName} — {game.contract.capot ? "Capot" : game.contract.value}
        {game.contract.coinche > 1 ? (game.contract.coinche === 4 ? " ×4" : " ×2") : ""}
      </p>
      <div className="mt-4 space-y-1 text-sm">
        <Row label="Points réalisés (preneur)" value={r.realized[r.takerTeam]} />
        {(r.belote[0] > 0 || r.belote[1] > 0) && (
          <Row label="Belote" value={r.belote[0] + r.belote[1]} />
        )}
        <div className="my-2 h-px bg-white/10" />
        <Row label="Manche — équipe Vous & Nord" value={`+${r.scores[0]}`} bold />
        <Row label="Manche — équipe Ouest & Est" value={`+${r.scores[1]}`} bold />
      </div>
      <button
        onClick={cont}
        className="mt-5 w-full rounded-xl bg-yellow-400 py-2.5 font-bold text-emerald-950 hover:bg-yellow-300"
      >
        Donne suivante
      </button>
    </Overlay>
  );
}

export function GameOverModal() {
  const game = useGame((s) => s.game);
  const startNewGame = useGame((s) => s.startNewGame);
  if (game.phase !== "gameOver") return null;
  const w = winnerTeam(game);
  const youWon = w === 0;

  return (
    <Overlay>
      <h2 className="text-center text-2xl font-bold">{youWon ? "🏆 Victoire !" : "Défaite"}</h2>
      <p className="mt-2 text-center text-sm text-white/70">
        {game.scores[0]} — {game.scores[1]}
      </p>
      <button
        onClick={() => startNewGame()}
        className="mt-5 w-full rounded-xl bg-yellow-400 py-2.5 font-bold text-emerald-950 hover:bg-yellow-300"
      >
        Nouvelle partie
      </button>
    </Overlay>
  );
}

const LEVELS: { id: AiLevel; label: string }[] = [
  { id: "easy", label: "Facile" },
  { id: "medium", label: "Moyen" },
  { id: "hard", label: "Difficile" },
];
const TARGETS = [1000, 1500, 2000];

export function MenuSheet({ onClose }: { onClose: () => void }) {
  const game = useGame((s) => s.game);
  const startNewGame = useGame((s) => s.startNewGame);
  const [draft, setDraft] = useState<Settings>(game.settings);

  const upd = (p: Partial<Settings>) => setDraft({ ...draft, ...p });

  return (
    <Overlay>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Réglages</h2>
        <button onClick={onClose} aria-label="Fermer" className="text-white/60 hover:text-white">
          ✕
        </button>
      </div>

      <Field label="Niveau de l'IA">
        <div className="flex gap-1">
          {LEVELS.map((l) => (
            <Chip key={l.id} active={draft.aiLevel === l.id} onClick={() => upd({ aiLevel: l.id })}>
              {l.label}
            </Chip>
          ))}
        </div>
      </Field>

      <Field label="Partie jusqu'à">
        <div className="flex gap-1">
          {TARGETS.map((t) => (
            <Chip key={t} active={draft.targetScore === t} onClick={() => upd({ targetScore: t })}>
              {t}
            </Chip>
          ))}
        </div>
      </Field>

      <Field label="Variantes">
        <div className="flex flex-col gap-1.5">
          <Toggle on={draft.allowNT} onClick={() => upd({ allowNT: !draft.allowNT })}>
            Sans Atout
          </Toggle>
          <Toggle on={draft.allowAT} onClick={() => upd({ allowAT: !draft.allowAT })}>
            Tout Atout
          </Toggle>
          <Toggle on={draft.allowCoinche} onClick={() => upd({ allowCoinche: !draft.allowCoinche })}>
            Coinche / Surcoinche
          </Toggle>
          <Toggle
            on={draft.coincheEndsGame}
            onClick={() => upd({ coincheEndsGame: !draft.coincheEndsGame })}
          >
            La coinche fait gagner la partie
          </Toggle>
        </div>
      </Field>

      <button
        onClick={() => {
          startNewGame(draft);
          onClose();
        }}
        className="mt-5 w-full rounded-xl bg-yellow-400 py-2.5 font-bold text-emerald-950 hover:bg-yellow-300"
      >
        Nouvelle partie
      </button>
    </Overlay>
  );
}

function Row({ label, value, bold }: { label: string; value: string | number; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-white/70">{label}</span>
      <span className={bold ? "font-bold tabular-nums" : "tabular-nums"}>{value}</span>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <p className="mb-1.5 text-xs uppercase tracking-wide text-white/50">{label}</p>
      {children}
    </div>
  );
}
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex-1 rounded-lg px-2 py-1.5 text-sm font-semibold",
        active ? "bg-yellow-400 text-emerald-950" : "bg-white/10 text-white hover:bg-white/20",
      ].join(" ")}
    >
      {children}
    </button>
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
      className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
    >
      <span>{children}</span>
      <span
        className={[
          "h-5 w-9 rounded-full p-0.5 transition",
          on ? "bg-yellow-400" : "bg-white/20",
        ].join(" ")}
      >
        <span
          className={[
            "block h-4 w-4 rounded-full bg-white transition",
            on ? "translate-x-4" : "",
          ].join(" ")}
        />
      </span>
    </button>
  );
}
