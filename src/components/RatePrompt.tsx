import { useState } from "react";
import { review } from "../review";
import { CONTACT_EMAIL, storeUrl } from "../config";
import { notify } from "../notify";

type Step = "ask" | "love" | "meh";

/** Demande de notation à deux temps (pattern classique « rating gate »).
 *  Apparaît une seule fois, après quelques parties, sur un moment calme (accueil). */
export function RatePrompt() {
  const [visible, setVisible] = useState(() => review.shouldAsk());
  const [step, setStep] = useState<Step>("ask");
  if (!visible) return null;

  const close = () => {
    review.markAsked();
    setVisible(false);
  };
  const done = () => {
    review.markDone();
    setVisible(false);
  };

  const rate = () => {
    const url = storeUrl();
    if (url) window.open(url, "_blank", "noopener");
    else notify.show("Merci 💛", "Bientôt sur les stores — ta note comptera !");
    done();
  };

  const writeUs = () => {
    if (CONTACT_EMAIL) {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Avis Coincheur")}`;
    }
    done();
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div className="animate-pop mx-auto max-w-md rounded-2xl bg-emerald-950 p-4 shadow-2xl ring-1 ring-emerald-700">
        {step === "ask" && (
          <>
            <p className="text-center font-bold">Tu aimes Coincheur ? 🃏</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setStep("love")}
                className="min-h-11 flex-1 rounded-xl bg-yellow-400 font-bold text-emerald-950 hover:bg-yellow-300"
              >
                😍 Oui !
              </button>
              <button
                onClick={() => setStep("meh")}
                className="min-h-11 flex-1 rounded-xl bg-white/10 font-semibold text-white/85 hover:bg-white/20"
              >
                😕 Bof
              </button>
            </div>
            <button onClick={close} className="mt-2 w-full py-1 text-xs text-white/50 hover:text-white/80">
              Plus tard
            </button>
          </>
        )}

        {step === "love" && (
          <>
            <p className="text-center font-bold">Génial ! Tu laisses une note ? ⭐</p>
            <p className="mt-1 text-center text-xs text-white/60">Ça aide vraiment à faire connaître l'app.</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={rate}
                className="min-h-11 flex-1 rounded-xl bg-yellow-400 font-bold text-emerald-950 hover:bg-yellow-300"
              >
                ⭐ Noter
              </button>
              <button onClick={close} className="min-h-11 flex-1 rounded-xl bg-white/10 font-semibold hover:bg-white/20">
                Plus tard
              </button>
            </div>
          </>
        )}

        {step === "meh" && (
          <>
            <p className="text-center font-bold">Désolé ! Qu'est-ce qu'on améliore ?</p>
            <p className="mt-1 text-center text-xs text-white/60">Ton retour nous aide à progresser.</p>
            <div className="mt-3 flex gap-2">
              {CONTACT_EMAIL ? (
                <button
                  onClick={writeUs}
                  className="min-h-11 flex-1 rounded-xl bg-yellow-400 font-bold text-emerald-950 hover:bg-yellow-300"
                >
                  ✉️ Nous écrire
                </button>
              ) : (
                <button onClick={done} className="min-h-11 flex-1 rounded-xl bg-yellow-400 font-bold text-emerald-950">
                  Merci !
                </button>
              )}
              <button onClick={close} className="min-h-11 flex-1 rounded-xl bg-white/10 font-semibold hover:bg-white/20">
                Plus tard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
