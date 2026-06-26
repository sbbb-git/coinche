import { useState } from "react";
import { useNav } from "./nav";
import { useGame } from "../state/store";
import { storage } from "../storage";
import { AiLevel } from "../engine/game";
import { useT } from "../i18n";

const LEVELS: { id: AiLevel; labelKey: string; descKey: string }[] = [
  { id: "easy", labelKey: "welcome.level.easy", descKey: "welcome.level.easy.desc" },
  { id: "medium", labelKey: "welcome.level.medium", descKey: "welcome.level.medium.desc" },
  { id: "hard", labelKey: "welcome.level.hard", descKey: "welcome.level.hard.desc" },
  { id: "expert", labelKey: "welcome.level.expert", descKey: "welcome.level.expert.desc" },
];

export function WelcomeScreen() {
  const go = useNav((s) => s.go);
  const game = useGame((s) => s.game);
  const updateSettings = useGame((s) => s.updateSettings);
  const t = useT();
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
        <button
          onClick={skip}
          className="flex min-h-11 items-center rounded-lg px-3 text-sm text-white/60 hover:bg-white/10 hover:text-white/90"
        >
          {t("welcome.skip")}
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
            <p className="mt-3 text-white/80">{t("welcome.tagline")}</p>
            <ul className="mx-auto mt-6 max-w-xs space-y-2 text-left text-sm text-white/75">
              <li>{t("welcome.bullet.ai")}</li>
              <li>{t("welcome.bullet.exercises")}</li>
              <li>{t("welcome.bullet.analysis")}</li>
              <li>{t("welcome.bullet.offline")}</li>
            </ul>
          </div>
        )}

        {step === 1 && (
          <div className="animate-pop">
            <h2 id="welcome-name-label" className="text-center text-2xl font-bold">
              {t("welcome.nameQuestion")}
            </h2>
            <p className="mt-2 text-center text-sm text-white/70">{t("welcome.nameHint")}</p>
            <input
              autoFocus
              value={name}
              maxLength={16}
              aria-labelledby="welcome-name-label"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setStep(2)}
              placeholder={t("welcome.namePlaceholder")}
              className="mt-5 w-full rounded-xl bg-white/90 px-4 py-3 text-center text-lg font-semibold text-zinc-800 placeholder:text-zinc-400"
            />
          </div>
        )}

        {step === 2 && (
          <div className="animate-pop">
            <h2 className="text-center text-2xl font-bold">{t("welcome.levelTitle")}</h2>
            <p className="mt-2 text-center text-sm text-white/70">
              {t("welcome.levelHint")}
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
                  <div className="font-bold">{t(l.labelKey)}</div>
                  <div className={level === l.id ? "text-sm text-emerald-900" : "text-sm text-white/65"}>
                    {t(l.descKey)}
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
              {t("welcome.back")}
            </button>
          )}
          <button
            onClick={() => (step < 2 ? setStep((s) => s + 1) : finish())}
            className="flex-1 rounded-xl bg-yellow-400 py-3 font-bold text-emerald-950 hover:bg-yellow-300"
          >
            {step === 0 ? t("welcome.start") : step === 1 ? t("welcome.continue") : t("welcome.go")}
          </button>
        </div>
      </div>
    </div>
  );
}
