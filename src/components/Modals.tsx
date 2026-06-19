import { useEffect, useState } from "react";
import { useGame } from "../state/store";
import { AiLevel, PlayProfile, Settings, winnerTeam } from "../engine/game";

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
  useEffect(() => {
    if (!onClose) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
      onClick={onClose ? () => onClose() : undefined}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
        className={[
          "animate-pop w-full rounded-2xl bg-emerald-950 p-5 shadow-2xl ring-1 ring-emerald-700",
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
  if (game.phase !== "dealScored" || !game.lastResult || !game.contract) return null;

  const r = game.lastResult;
  const takerName = game.settings.playerNames[game.contract.taker];

  return (
    <Overlay label="Résultat de la donne">
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
    <Overlay label="Fin de partie">
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

type Tab = "interface" | "jeu" | "ia" | "comptage";
const TABS: { id: Tab; label: string }[] = [
  { id: "interface", label: "Interface" },
  { id: "jeu", label: "Jeu" },
  { id: "ia", label: "IA" },
  { id: "comptage", label: "Comptage" },
];

export function MenuSheet({ onClose }: { onClose: () => void }) {
  const game = useGame((s) => s.game);
  const startNewGame = useGame((s) => s.startNewGame);
  const updateSettings = useGame((s) => s.updateSettings);
  const [draft, setDraft] = useState<Settings>(game.settings);
  const [tab, setTab] = useState<Tab>("interface");

  const upd = (p: Partial<Settings>) => setDraft({ ...draft, ...p });
  const updP = (p: Partial<PlayProfile>) => setDraft({ ...draft, profile: { ...draft.profile, ...p } });

  return (
    <Overlay wide onClose={onClose} label="Réglages">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Réglages</h2>
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="grid h-11 w-11 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div role="tablist" aria-label="Sections des réglages" className="mt-3 flex gap-1 rounded-lg bg-black/30 p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            role="tab"
            aria-selected={tab === t.id}
            className={[
              "flex-1 rounded-md py-2.5 text-sm font-semibold transition",
              tab === t.id ? "bg-yellow-400 text-emerald-950" : "text-white/80 hover:bg-white/10",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-3 max-h-[55vh] space-y-3 overflow-y-auto pr-1">
        {tab === "interface" && (
          <>
            <Seg
              label="Vitesse de jeu"
              value={draft.gameSpeed}
              options={[
                ["lent", "Lent"],
                ["normal", "Normal"],
                ["rapide", "Rapide"],
              ]}
              onChange={(v) => upd({ gameSpeed: v as Settings["gameSpeed"] })}
            />
            <Seg
              label="Sens de jeu"
              value={draft.sensHoraire ? "h" : "a"}
              options={[
                ["a", "Anti-horaire"],
                ["h", "Horaire"],
              ]}
              onChange={(v) => upd({ sensHoraire: v === "h" })}
            />
            <Seg
              label="Rangement des cartes"
              value={draft.cardSort}
              options={[
                ["asc", "Croissant"],
                ["desc", "Décroissant"],
              ]}
              onChange={(v) => upd({ cardSort: v as Settings["cardSort"] })}
            />
            <Toggle on={draft.fourColors} onClick={() => upd({ fourColors: !draft.fourColors })}>
              Jeu 4 couleurs (daltoniens)
            </Toggle>
            <Toggle on={draft.sound} onClick={() => upd({ sound: !draft.sound })}>
              Effets sonores
            </Toggle>
            <Toggle on={draft.haptics} onClick={() => upd({ haptics: !draft.haptics })}>
              Vibrations (iPhone)
            </Toggle>
            <Toggle on={draft.autoPlaySingle} onClick={() => upd({ autoPlaySingle: !draft.autoPlaySingle })}>
              Jeu automatique (1 seule carte jouable)
            </Toggle>
            <Toggle on={draft.preselectPlayable} onClick={() => upd({ preselectPlayable: !draft.preselectPlayable })}>
              Présélectionner les cartes jouables
            </Toggle>
            <Toggle on={draft.showLiveScores} onClick={() => upd({ showLiveScores: !draft.showLiveScores })}>
              Afficher les scores en cours de donne
            </Toggle>
          </>
        )}

        {tab === "jeu" && (
          <>
            <Seg
              label="Points par partie"
              value={String(draft.targetScore)}
              options={[
                ["1000", "1000"],
                ["1500", "1500"],
                ["2000", "2000"],
              ]}
              onChange={(v) => upd({ targetScore: Number(v) })}
            />
            <Toggle on={draft.allowNT} onClick={() => upd({ allowNT: !draft.allowNT })}>
              Autoriser le Sans Atout
            </Toggle>
            <Toggle on={draft.allowAT} onClick={() => upd({ allowAT: !draft.allowAT })}>
              Autoriser le Tout Atout
            </Toggle>
            <Toggle on={draft.beloteAtToutAtout} onClick={() => upd({ beloteAtToutAtout: !draft.beloteAtToutAtout })}>
              Belote/Rebelote à Tout Atout
            </Toggle>
            <Toggle on={draft.pisserObligatoire} onClick={() => upd({ pisserObligatoire: !draft.pisserObligatoire })}>
              Obligation de pisser à l'atout
            </Toggle>
            <Toggle on={draft.allowCoinche} onClick={() => upd({ allowCoinche: !draft.allowCoinche })}>
              Autoriser la Coinche
            </Toggle>
            <Toggle on={draft.allowSurcoinche} onClick={() => upd({ allowSurcoinche: !draft.allowSurcoinche })}>
              Autoriser la Surcoinche
            </Toggle>
            <Toggle on={draft.coincheEndsGame} onClick={() => upd({ coincheEndsGame: !draft.coincheEndsGame })}>
              La coinche fait gagner la partie
            </Toggle>
          </>
        )}

        {tab === "ia" && (
          <>
            <Seg
              label="Niveau de l'IA"
              value={draft.aiLevel}
              options={[
                ["easy", "Facile"],
                ["medium", "Moyen"],
                ["hard", "Difficile"],
                ["expert", "Expert"],
              ]}
              onChange={(v) => upd({ aiLevel: v as AiLevel })}
            />
            {draft.aiLevel === "expert" && (
              <Seg
                label="Force de l'Expert (simulation)"
                value={draft.expertDepth}
                options={[
                  ["rapide", "Rapide"],
                  ["normal", "Normal"],
                  ["fort", "Fort"],
                ]}
                onChange={(v) => upd({ expertDepth: v as Settings["expertDepth"] })}
              />
            )}
            <Slider
              label="Style"
              left="Prudent"
              right="Offensif"
              value={draft.profile.aggressiveness}
              onChange={(v) => updP({ aggressiveness: v })}
            />
            <Seg
              label="Appels du partenaire"
              value={draft.profile.appels}
              options={[
                ["directs", "Directs"],
                ["indirects", "Indirects"],
                ["aucun", "Aucun"],
              ]}
              onChange={(v) => updP({ appels: v as PlayProfile["appels"] })}
            />
            <Seg
              label="Système d'enchères"
              value={draft.profile.systemeEncheres}
              options={[
                ["simple", "Simple"],
                ["graux", "Graux"],
              ]}
              onChange={(v) => updP({ systemeEncheres: v as PlayProfile["systemeEncheres"] })}
            />
            <Toggle on={draft.profile.jeuAuxAs} onClick={() => updP({ jeuAuxAs: !draft.profile.jeuAuxAs })}>
              Jeu aux as (sortir les as)
            </Toggle>
            <Toggle on={draft.profile.entameAtoutValet} onClick={() => updP({ entameAtoutValet: !draft.profile.entameAtoutValet })}>
              Entamer atout avec le valet s'il l'a
            </Toggle>
            <Toggle on={draft.profile.conventionAnnonce100} onClick={() => updP({ conventionAnnonce100: !draft.profile.conventionAnnonce100 })}>
              Annoncer 100 après un 80 (si Valet + 9)
            </Toggle>
            <Toggle on={draft.profile.appelBelote} onClick={() => updP({ appelBelote: !draft.profile.appelBelote })}>
              Annonce de la belote/rebelote
            </Toggle>
          </>
        )}

        {tab === "comptage" && (
          <>
            <Toggle on={draft.roundToTen} onClick={() => upd({ roundToTen: !draft.roundToTen })}>
              Arrondir les scores à la dizaine
            </Toggle>
            <Toggle on={draft.contractCanSucceedIfDefenseMore} onClick={() => upd({ contractCanSucceedIfDefenseMore: !draft.contractCanSucceedIfDefenseMore })}>
              Réussir même si la défense fait plus
            </Toggle>
            <Toggle on={draft.beloteCountsToSucceed} onClick={() => upd({ beloteCountsToSucceed: !draft.beloteCountsToSucceed })}>
              La belote compte pour réussir un contrat
            </Toggle>
            <Toggle on={draft.beloteCountsToFail} onClick={() => upd({ beloteCountsToFail: !draft.beloteCountsToFail })}>
              La belote compte pour faire chuter un contrat
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
          Appliquer
        </button>
        <button
          onClick={() => {
            startNewGame(draft);
            onClose();
          }}
          className="flex-1 rounded-xl bg-yellow-400 py-2.5 font-bold text-emerald-950 hover:bg-yellow-300"
        >
          Nouvelle partie
        </button>
      </div>
      <p className="mt-2 text-center text-[11px] text-white/50">
        « Appliquer » garde la partie en cours (effet dès la prochaine donne) · « Nouvelle partie » redistribue.
      </p>
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
              "flex-1 rounded-lg px-2 py-2 text-sm font-semibold transition",
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
  const word =
    value <= 0.2 ? "Très prudent" : value < 0.45 ? "Prudent" : value < 0.55 ? "Équilibré" : value < 0.8 ? "Offensif" : "Très offensif";
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-white/60">{label}</p>
        <span className="text-xs font-semibold text-yellow-300">{word}</span>
      </div>
      <div className="flex min-h-11 items-center">
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={value}
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
