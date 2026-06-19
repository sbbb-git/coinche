import { useState } from "react";
import { useNav } from "./nav";
import { useGame } from "../state/store";
import { storage } from "../storage";
import { AiLevel } from "../engine/game";

const LEVELS: { id: AiLevel; label: string; desc: string }[] = [
  { id: "easy", label: "Facile", desc: "Pour découvrir, l'IA joue simplement." },
  { id: "medium", label: "Moyen", desc: "Joue correctement, bon pour apprendre." },
  { id: "hard", label: "Difficile", desc: "Anticipe et calcule (mini-simulation)." },
  { id: "expert", label: "Expert", desc: "IA Monte-Carlo, redoutable." },
];

export function WelcomeScreen() {
  const go = useNav((s) => s.go);
  const game = useGame((s) => s.game);
  const updateSettings = useGame((s) => s.updateSettings);
  const [step, setStep] = useState(0);
  const [name, setName] = useState(() => storage.loadProfile().name.replace(/^Vous$/, ""));
  const [level, setLevel] = useState<AiLevel>("medium");

  const finish = () => {
    const clean = name.trim() || "Vous";
    storage.saveProfile({ name: clean });
    const pn = game.settings.playerNames;
    updateSettings({ ...game.settings, aiLevel: level, playerNames: [clean, pn[1], pn[2], pn[3]] });
    storage.setOnboarded();
    go("home");
  };
  const skip = () => {
    storage.setOnboarded();
    go("home");
  };

  return (
    <div className="safe-top safe-bottom mx-auto flex h-full w-full max-w-md flex-col px-6 py-6">
      <div className="flex justify-end">
        <button onClick={skip} className="text-sm text-white/50 hover:text-white/80">
          Passer
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        {step === 0 && (
          <div className="animate-pop text-center">
            <div className="mb-4 text-6xl" aria-hidden>
              🃏
            </div>
            <h1 className="text-4xl font-black">
              Coin<span className="text-yellow-400">cheur</span>
            </h1>
            <p className="mt-3 text-white/80">Jouer à la Coinche contre des IA et progresser.</p>
            <ul className="mx-auto mt-6 max-w-xs space-y-2 text-left text-sm text-white/75">
              <li>🎴 Parties contre des IA paramétrables</li>
              <li>🎯 Exercices d'enchères et de jeu, avec correction</li>
              <li>🔍 Analyse de tes parties façon coach</li>
              <li>📵 100 % hors-ligne, sans pub</li>
            </ul>
          </div>
        )}

        {step === 1 && (
          <div className="animate-pop">
            <h2 className="text-center text-2xl font-bold">Comment t'appelles-tu ?</h2>
            <p className="mt-2 text-center text-sm text-white/70">Ton nom à la table.</p>
            <input
              autoFocus
              value={name}
              maxLength={16}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setStep(2)}
              placeholder="Ton prénom"
              className="mt-5 w-full rounded-xl bg-white/90 px-4 py-3 text-center text-lg font-semibold text-zinc-800"
            />
          </div>
        )}

        {step === 2 && (
          <div className="animate-pop">
            <h2 className="text-center text-2xl font-bold">Niveau des adversaires</h2>
            <p className="mt-2 text-center text-sm text-white/70">
              Tu pourras le changer à tout moment dans les réglages.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLevel(l.id)}
                  aria-pressed={level === l.id}
                  className={[
                    "rounded-xl p-3 text-left ring-1 transition",
                    level === l.id
                      ? "bg-yellow-400 text-emerald-950 ring-yellow-300"
                      : "bg-white/8 text-white ring-white/10 hover:bg-white/12",
                  ].join(" ")}
                >
                  <div className="font-bold">{l.label}</div>
                  <div className={level === l.id ? "text-sm text-emerald-900" : "text-sm text-white/65"}>
                    {l.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <div className="mb-3 flex justify-center gap-2">
          {[0, 1, 2].map((k) => (
            <div
              key={k}
              className={`h-2 w-2 rounded-full ${k === step ? "bg-yellow-400" : "bg-white/25"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 rounded-xl bg-white/10 py-3 font-semibold text-white hover:bg-white/20"
            >
              Retour
            </button>
          )}
          <button
            onClick={() => (step < 2 ? setStep((s) => s + 1) : finish())}
            className="flex-1 rounded-xl bg-yellow-400 py-3 font-bold text-emerald-950 hover:bg-yellow-300"
          >
            {step === 0 ? "Commencer" : step === 1 ? "Continuer" : "C'est parti !"}
          </button>
        </div>
      </div>
    </div>
  );
}
