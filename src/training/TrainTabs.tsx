import { useNav, View } from "../app/nav";
import { useT } from "../i18n";

const TABS: { view: View; labelKey: string }[] = [
  { view: "exercises", labelKey: "tabs.exercises" },
  { view: "lessons", labelKey: "tabs.lessons" },
  { view: "guides", labelKey: "tabs.guides" },
];

/** Barre d'onglets partagée : Exercices / Leçons / Guides forment un seul espace
 *  « S'entraîner » (au lieu de 3 rubriques séparées sur l'accueil). */
export function TrainTabs({ current }: { current: View }) {
  const go = useNav((s) => s.go);
  const t = useT();
  // Chaque onglet NAVIGUE vers un écran distinct → c'est une navigation, pas un
  // pattern tab/tabpanel (d'où `nav` + `aria-current` plutôt que role=tab).
  return (
    <nav aria-label={t("tabs.aria.train")} className="mb-3 flex gap-1 rounded-lg bg-black/30 p-1">
      {TABS.map((tab) => (
        <button
          key={tab.view}
          aria-current={current === tab.view ? "page" : undefined}
          onClick={() => current !== tab.view && go(tab.view)}
          className={[
            "min-h-11 flex-1 rounded-md py-2 text-sm font-semibold transition",
            current === tab.view ? "bg-yellow-400 text-emerald-950" : "text-white/80 hover:bg-white/10",
          ].join(" ")}
        >
          {t(tab.labelKey)}
        </button>
      ))}
    </nav>
  );
}
