import { useNav, View } from "./nav";
import { storage } from "../storage";
import { useDaily } from "../state/daily";
import { AdSlot } from "../components/AdSlot";

const TILES: { view: View; emoji: string; title: string; desc: string }[] = [
  { view: "play", emoji: "🃏", title: "Jouer", desc: "Une partie contre 3 IA paramétrables" },
  { view: "exercises", emoji: "🎯", title: "S'entraîner", desc: "Exercices, leçons et guides" },
  { view: "mygames", emoji: "🔍", title: "Mes parties", desc: "Analyse coup par coup de tes décisions" },
  { view: "review", emoji: "📊", title: "Review IA", desc: "Analyse globale de la stratégie sur des milliers de donnes" },
  { view: "stats", emoji: "📈", title: "Progression", desc: "Ton niveau et tes statistiques" },
  { view: "compteur", emoji: "🧮", title: "Compteur", desc: "Marquer les points d'une partie avec de vraies cartes" },
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

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pb-24">
        <DailyCard onClick={() => go("daily")} />
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

      <AdSlot placement="home" className="mt-2 shrink-0" />

      <div className="shrink-0 pt-3 text-center">
        <p className="text-[11px] text-white/55">100 % jouable hors-ligne</p>
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

/** Carte « Défi du jour » mise en avant (rituel quotidien, façon puzzle). */
function DailyCard({ onClick }: { onClick: () => void }) {
  const daily = useDaily((s) => s.state);
  const done = useDaily((s) => s.doneToday());
  return (
    <button
      onClick={onClick}
      aria-label={`Défi du jour. ${done ? "Complété aujourd'hui." : "À jouer."} Série : ${daily.streak} jours.`}
      className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-sky-600/80 to-emerald-600/80 p-4 text-left shadow ring-1 ring-white/15 transition hover:brightness-110 active:scale-[0.99]"
    >
      <span className="text-3xl" aria-hidden>
        🗓️
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-bold">Défi du jour</span>
        <span className="block text-sm text-white/85">
          {done ? "Fait ✅ — reviens demain" : "La même donne pour tous. À toi de jouer !"}
        </span>
      </span>
      <span className="shrink-0 text-right">
        <span className="block text-xl font-black tabular-nums text-yellow-300">🔥 {daily.streak}</span>
        <span className="block text-[10px] text-white/70">série</span>
      </span>
    </button>
  );
}
