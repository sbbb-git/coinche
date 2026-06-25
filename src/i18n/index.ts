// i18n léger (FR/EN). `t("clé")` via le hook useT(), langue persistée + auto-détectée.
// Migration progressive : toute clé absente retombe sur le français (puis sur la clé),
// donc rien ne casse pendant qu'on traduit l'app écran par écran.
import { create } from "zustand";

export type Lang = "fr" | "en";
const KEY = "coincheur.lang";

function detect(): Lang {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "en" || v === "fr") return v;
  } catch {
    /* ignore */
  }
  if (typeof navigator !== "undefined" && /^en/i.test(navigator.language || "")) return "en";
  return "fr";
}

type Dict = Record<string, string>;

const FR: Dict = {
  // Accueil
  "home.tagline": "Jouer & progresser à la Coinche",
  "home.hi": "Salut {name},",
  "home.offline": "100 % jouable hors-ligne",
  "home.about": "À propos",
  "home.legal": "Confidentialité · CGU",
  "tile.play": "Jouer",
  "tile.play.d": "Une partie contre 3 IA paramétrables",
  "tile.train": "S'entraîner",
  "tile.train.d": "Exercices, leçons et guides",
  "tile.mygames": "Mes parties",
  "tile.mygames.d": "Analyse coup par coup de tes décisions",
  "tile.stats": "Progression",
  "tile.stats.d": "Ton niveau et tes statistiques",
  "tile.counter": "Compteur",
  "tile.counter.d": "Marquer les points d'une partie avec de vraies cartes",
  "tile.account": "Compte",
  "tile.account.d": "Ton profil, sur cet appareil",
  "daily.title": "Défi du jour",
  "daily.todo": "La même donne pour tous. À toi de jouer !",
  "daily.done": "Fait ✅, reviens demain",
  "daily.streak": "série",
  // Réglages
  "settings.language": "Langue",
};

const EN: Dict = {
  "home.tagline": "Play & improve at Coinche",
  "home.hi": "Hi {name},",
  "home.offline": "100% playable offline",
  "home.about": "About",
  "home.legal": "Privacy · Terms",
  "tile.play": "Play",
  "tile.play.d": "A game against 3 configurable AIs",
  "tile.train": "Train",
  "tile.train.d": "Exercises, lessons and guides",
  "tile.mygames": "My games",
  "tile.mygames.d": "Move-by-move analysis of your decisions",
  "tile.stats": "Progress",
  "tile.stats.d": "Your level and stats",
  "tile.counter": "Counter",
  "tile.counter.d": "Score a game played with real cards",
  "tile.account": "Account",
  "tile.account.d": "Your profile, on this device",
  "daily.title": "Daily challenge",
  "daily.todo": "Same deal for everyone. Your turn!",
  "daily.done": "Done ✅, come back tomorrow",
  "daily.streak": "streak",
  "settings.language": "Language",
};

const DICTS: Record<Lang, Dict> = { fr: FR, en: EN };

export function translate(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  let s = DICTS[lang][key] ?? FR[key] ?? key;
  if (vars) for (const k of Object.keys(vars)) s = s.replace(`{${k}}`, String(vars[k]));
  return s;
}

interface LangStore {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export const useLang = create<LangStore>((set) => ({
  lang: detect(),
  setLang: (lang) => {
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") document.documentElement.lang = lang;
    set({ lang });
  },
}));

/** Hook : renvoie une fonction `t` liée à la langue courante (re-render au changement). */
export function useT() {
  const lang = useLang((s) => s.lang);
  return (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);
}
