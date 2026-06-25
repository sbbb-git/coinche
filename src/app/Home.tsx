import { useNav, View } from "./nav";
import { storage } from "../storage";
import { useDaily } from "../state/daily";
import { AdSlot } from "../components/AdSlot";
import { useT } from "../i18n";

const TILES: { view: View; emoji: string; key: string }[] = [
  { view: "play", emoji: "🃏", key: "play" },
  { view: "exercises", emoji: "🎯", key: "train" },
  { view: "mygames", emoji: "🔍", key: "mygames" },
  { view: "stats", emoji: "📈", key: "stats" },
  { view: "compteur", emoji: "🧮", key: "counter" },
  { view: "account", emoji: "👤", key: "account" },
];

export function Home() {
  const go = useNav((s) => s.go);
  const t = useT();
  const name = storage.loadProfile().name;
  return (
    <div className="safe-top safe-bottom mx-auto flex h-full w-full max-w-md flex-col px-5 py-4">
      <header className="mb-4 shrink-0 text-center">
        <h1 className="text-3xl font-black tracking-tight">
          Coin<span className="text-yellow-400">cheur</span>
        </h1>
        <p className="mt-1 text-sm text-white/70">
          {name && name !== "Vous" ? `${t("home.hi", { name })} ` : ""}
          {t("home.tagline")}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pb-24">
        <DailyCard onClick={() => go("daily")} />
        {TILES.map((tile) => (
          <button
            key={tile.view}
            onClick={() => go(tile.view)}
            className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 text-left shadow ring-1 ring-white/10 transition hover:bg-white/15 active:scale-[0.99]"
          >
            <span className="text-3xl" aria-hidden>
              {tile.emoji}
            </span>
            <span className="min-w-0">
              <span className="block text-lg font-bold">{t(`tile.${tile.key}`)}</span>
              <span className="block text-sm text-white/65">{t(`tile.${tile.key}.d`)}</span>
            </span>
          </button>
        ))}
      </div>

      <AdSlot placement="home" className="mt-2 shrink-0" />

      <div className="shrink-0 pt-3 text-center">
        <p className="text-[11px] text-white/55">{t("home.offline")}</p>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          <a
            href="/apprendre-la-coinche.html"
            className="flex min-h-11 items-center rounded-lg px-4 text-xs font-semibold text-white/70 hover:bg-white/10"
          >
            {t("home.learn")}
          </a>
          <button
            onClick={() => go("about")}
            className="flex min-h-11 items-center rounded-lg px-4 text-xs font-semibold text-white/70 hover:bg-white/10"
          >
            {t("home.about")}
          </button>
          <button
            onClick={() => go("legal")}
            className="flex min-h-11 items-center rounded-lg px-4 text-xs font-semibold text-white/70 hover:bg-white/10"
          >
            {t("home.legal")}
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
  const t = useT();
  return (
    <button
      onClick={onClick}
      aria-label={`${t("daily.title")} (${t("daily.streak")} ${daily.streak})`}
      className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-sky-600/80 to-emerald-600/80 p-4 text-left shadow ring-1 ring-white/15 transition hover:brightness-110 active:scale-[0.99]"
    >
      <span className="text-3xl" aria-hidden>
        🗓️
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-bold">{t("daily.title")}</span>
        <span className="block text-sm text-white/85">{done ? t("daily.done") : t("daily.todo")}</span>
      </span>
      <span className="shrink-0 text-right">
        <span className="block text-xl font-black tabular-nums text-yellow-300">🔥 {daily.streak}</span>
        <span className="block text-[10px] text-white/70">{t("daily.streak")}</span>
      </span>
    </button>
  );
}
