// i18n léger (FR/EN). `t("clé")` via le hook useT(), langue persistée + auto-détectée.
// Migration progressive : toute clé absente retombe sur le français (puis sur la clé),
// donc rien ne casse pendant qu'on traduit l'app écran par écran.
//
// Les chaînes sont réparties par "namespace" (un fichier par domaine d'écran) puis
// fusionnées ici. Ça permet de traduire chaque écran sans toucher à un fichier
// monolithique. Pour ajouter des clés : créer/éditer un module dans ./strings/.
import { create } from "zustand";
import { core } from "./strings/core";
import { play } from "./strings/play";
import { train } from "./strings/train";
import { common } from "./strings/common";

export type Lang = "fr" | "en";
const KEY = "coincheur.lang";

function detect(): Lang {
  // ?lang=en (depuis les pages SEO anglaises) : on PERSISTE le choix et on nettoie
  // l'URL, pour que la langue tienne sans action de l'utilisateur.
  try {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "fr") {
      try {
        localStorage.setItem(KEY, q);
      } catch {
        /* ignore */
      }
      try {
        const u = new URL(location.href);
        u.searchParams.delete("lang");
        history.replaceState(null, "", u.pathname + u.search + u.hash);
      } catch {
        /* ignore */
      }
      return q;
    }
  } catch {
    /* ignore */
  }
  try {
    const v = localStorage.getItem(KEY);
    if (v === "en" || v === "fr") return v;
  } catch {
    /* ignore */
  }
  if (typeof navigator !== "undefined" && /^en/i.test(navigator.language || "")) return "en";
  return "fr";
}

export type Dict = Record<string, string>;
/** Un namespace fournit ses tables FR et EN. */
export interface Namespace {
  fr: Dict;
  en: Dict;
}

const NAMESPACES: Namespace[] = [core, play, train, common];

function merge(lang: Lang): Dict {
  const out: Dict = {};
  for (const ns of NAMESPACES) Object.assign(out, ns[lang]);
  return out;
}

const FR = merge("fr");
const EN = merge("en");
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

/** Langue courante hors composant React (moteur, store). */
export function currentLang(): Lang {
  return useLang.getState().lang;
}

/** Hook : renvoie une fonction `t` liée à la langue courante (re-render au changement). */
export function useT() {
  const lang = useLang((s) => s.lang);
  return (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);
}
