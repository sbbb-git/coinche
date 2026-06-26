import { useEffect, useRef, useState } from "react";
import { APP_VERSION } from "../version";
import { useFocusTrap } from "../app/useFocusTrap";
import { useT } from "../i18n";

// « Quoi de neuf » : affiché UNE fois aux utilisateurs qui reviennent après une
// mise à jour (jamais au tout premier lancement).
const SEEN_KEY = "coincheur.seenVersion.v1";

const CHANGE_KEYS: string[] = [
  "whatsnew.change.daily",
  "whatsnew.change.progress",
  "whatsnew.change.coach",
  "whatsnew.change.offline",
];

export function WhatsNew() {
  const t = useT();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(SEEN_KEY);
      if (seen === null) {
        localStorage.setItem(SEEN_KEY, APP_VERSION); // 1er lancement : pas de modale
      } else if (seen !== APP_VERSION) {
        setShow(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, show);
  if (!show) return null;
  const close = () => {
    try {
      localStorage.setItem(SEEN_KEY, APP_VERSION);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))]"
      onClick={close}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={t("whatsnew.title")}
        onClick={(e) => e.stopPropagation()}
        className="animate-pop max-h-[88dvh] w-full max-w-sm overflow-y-auto rounded-2xl bg-emerald-950 p-5 shadow-2xl ring-1 ring-emerald-700"
      >
        <p className="text-center text-lg font-black">{t("whatsnew.titleStar")}</p>
        <p className="mb-3 text-center text-xs text-white/55">{t("whatsnew.version", { version: APP_VERSION })}</p>
        <ul className="space-y-2 text-sm text-white/85">
          {CHANGE_KEYS.map((c, i) => (
            <li key={i} className="rounded-lg bg-white/5 p-2">
              {t(c)}
            </li>
          ))}
        </ul>
        <button
          onClick={close}
          className="mt-4 min-h-11 w-full rounded-xl bg-yellow-400 font-bold text-emerald-950 hover:bg-yellow-300"
        >
          {t("whatsnew.ok")}
        </button>
      </div>
    </div>
  );
}
