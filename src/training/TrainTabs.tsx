import { useNav, View } from "../app/nav";

const TABS: { view: View; label: string }[] = [
  { view: "exercises", label: "🎯 Exercices" },
  { view: "lessons", label: "🎓 Leçons" },
  { view: "guides", label: "📖 Guides" },
];

/** Barre d'onglets partagée : Exercices / Leçons / Guides forment un seul espace
 *  « S'entraîner » (au lieu de 3 rubriques séparées sur l'accueil). */
export function TrainTabs({ current }: { current: View }) {
  const go = useNav((s) => s.go);
  // Chaque onglet NAVIGUE vers un écran distinct → c'est une navigation, pas un
  // pattern tab/tabpanel (d'où `nav` + `aria-current` plutôt que role=tab).
  return (
    <nav aria-label="S'entraîner" className="mb-3 flex gap-1 rounded-lg bg-black/30 p-1">
      {TABS.map((t) => (
        <button
          key={t.view}
          aria-current={current === t.view ? "page" : undefined}
          onClick={() => current !== t.view && go(t.view)}
          className={[
            "min-h-11 flex-1 rounded-md py-2 text-sm font-semibold transition",
            current === t.view ? "bg-yellow-400 text-emerald-950" : "text-white/80 hover:bg-white/10",
          ].join(" ")}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}
