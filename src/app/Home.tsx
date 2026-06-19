import { useNav, View } from "./nav";
import { storage } from "../storage";

const TILES: { view: View; emoji: string; title: string; desc: string }[] = [
  { view: "play", emoji: "🃏", title: "Jouer", desc: "Une partie contre 3 IA paramétrables" },
  { view: "exercises", emoji: "🎯", title: "S'entraîner", desc: "Exercices d'enchères et de jeu, avec correction" },
  { view: "mygames", emoji: "🔍", title: "Mes parties", desc: "Analyse coup par coup de tes décisions" },
  { view: "review", emoji: "📊", title: "Review IA", desc: "Analyse globale de la stratégie sur des milliers de donnes" },
  { view: "lessons", emoji: "🎓", title: "Leçons", desc: "Apprendre pas à pas, des règles aux conventions" },
  { view: "guides", emoji: "📖", title: "Guides", desc: "Que faire, dans quelle situation" },
  { view: "stats", emoji: "📈", title: "Progression", desc: "Tes statistiques d'entraînement" },
  { view: "account", emoji: "👤", title: "Compte", desc: "Ton profil, sur cet appareil" },
];

export function Home() {
  const go = useNav((s) => s.go);
  const name = storage.loadProfile().name;
  return (
    <div className="safe-top safe-bottom mx-auto flex h-full w-full max-w-md flex-col px-5 py-4">
      <header className="mb-4 shrink-0 text-center">
        <h1 className="text-3xl font-black tracking-tight">
          Coin<span className="text-yellow-400">cheur</span>
        </h1>
        <p className="mt-1 text-sm text-white/70">
          {name && name !== "Vous" ? `Salut ${name} — ` : ""}Jouer & progresser à la Coinche
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
        {TILES.map((t) => (
          <button
            key={t.view}
            onClick={() => go(t.view)}
            className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 text-left shadow ring-1 ring-white/10 transition hover:bg-white/15 active:scale-[0.99]"
          >
            <span className="text-3xl" aria-hidden>
              {t.emoji}
            </span>
            <span className="min-w-0">
              <span className="block text-lg font-bold">{t.title}</span>
              <span className="block text-sm text-white/65">{t.desc}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="shrink-0 pt-3 text-center">
        <p className="text-[11px] text-white/55">100 % hors-ligne · vos données restent sur l'appareil</p>
        <div className="mt-1 flex justify-center gap-1">
          <button
            onClick={() => go("about")}
            className="flex min-h-11 items-center rounded-lg px-4 text-xs font-semibold text-white/70 hover:bg-white/10"
          >
            À propos
          </button>
          <button
            onClick={() => go("legal")}
            className="flex min-h-11 items-center rounded-lg px-4 text-xs font-semibold text-white/70 hover:bg-white/10"
          >
            Confidentialité · CGU
          </button>
        </div>
      </div>
    </div>
  );
}
