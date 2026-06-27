import { useRef, useState } from "react";
import { review } from "../review";
import { CONTACT_EMAIL, SITE_URL } from "../config";
import { notify } from "../notify";
import { useFocusTrap } from "../app/useFocusTrap";
import { useT } from "../i18n";

type Step = "ask" | "love" | "meh";

/** Demande de notation à deux temps (pattern classique « rating gate »).
 *  Apparaît une seule fois, après quelques parties, sur un moment calme (accueil). */
// Le consentement a-t-il déjà été tranché ? (sinon le bandeau RGPD occupe le bas)
function consentDecided(): boolean {
  try {
    return !!localStorage.getItem("cookie-consent");
  } catch {
    return true;
  }
}

export function RatePrompt() {
  const t = useT();
  // On n'apparaît pas tant que le bandeau de consentement est là (même zone, bas).
  const [visible, setVisible] = useState(() => review.shouldAsk() && consentDecided());
  const [step, setStep] = useState<Step>("ask");
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, visible);
  if (!visible) return null;

  const close = () => {
    review.markAsked();
    setVisible(false);
  };
  const done = () => {
    review.markDone();
    setVisible(false);
  };

  const share = async () => {
    const data = { title: "Coincheur", text: t("rate.shareText"), url: SITE_URL };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(`${data.text} ${SITE_URL}`);
        notify.show(t("rate.copiedTitle"), t("rate.copiedBody"));
      }
    } catch {
      /* annulé */
    }
    done();
  };

  const writeUs = () => {
    if (CONTACT_EMAIL) {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t("rate.shareSubject"))}`;
    }
    done();
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={t("rate.aria")}
        className="animate-pop mx-auto max-w-md rounded-2xl bg-emerald-950 p-4 shadow-2xl ring-1 ring-emerald-700"
      >
        {step === "ask" && (
          <>
            <p className="text-center font-bold">{t("rate.ask")}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setStep("love")}
                className="min-h-11 flex-1 rounded-xl bg-yellow-400 font-bold text-emerald-950 hover:bg-yellow-300"
              >
                {t("rate.yes")}
              </button>
              <button
                onClick={() => setStep("meh")}
                className="min-h-11 flex-1 rounded-xl bg-white/10 font-semibold text-white/85 hover:bg-white/20"
              >
                {t("rate.no")}
              </button>
            </div>
            <button
              onClick={close}
              className="mt-1 flex min-h-11 w-full items-center justify-center text-xs text-white/55 hover:text-white/85"
            >
              {t("rate.later")}
            </button>
          </>
        )}

        {step === "love" && (
          <>
            <p className="text-center font-bold">{t("rate.loveTitle")}</p>
            <p className="mt-1 text-center text-xs text-white/60">{t("rate.loveDesc")}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={share}
                className="min-h-11 flex-1 rounded-xl bg-yellow-400 font-bold text-emerald-950 hover:bg-yellow-300"
              >
                {t("rate.share")}
              </button>
              <button onClick={close} className="min-h-11 flex-1 rounded-xl bg-white/10 font-semibold hover:bg-white/20">
                {t("rate.later")}
              </button>
            </div>
          </>
        )}

        {step === "meh" && (
          <>
            <p className="text-center font-bold">{t("rate.mehTitle")}</p>
            <p className="mt-1 text-center text-xs text-white/60">{t("rate.mehDesc")}</p>
            <div className="mt-3 flex gap-2">
              {CONTACT_EMAIL ? (
                <button
                  onClick={writeUs}
                  className="min-h-11 flex-1 rounded-xl bg-yellow-400 font-bold text-emerald-950 hover:bg-yellow-300"
                >
                  {t("rate.contact")}
                </button>
              ) : (
                <button onClick={done} className="min-h-11 flex-1 rounded-xl bg-yellow-400 font-bold text-emerald-950">
                  {t("rate.thanks")}
                </button>
              )}
              <button onClick={close} className="min-h-11 flex-1 rounded-xl bg-white/10 font-semibold hover:bg-white/20">
                {t("rate.later")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
