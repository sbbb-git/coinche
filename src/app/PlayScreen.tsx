import { useEffect, useState } from "react";
import { useGame } from "../state/store";
import { useNav } from "./nav";
import { ScorePanel } from "../components/ScorePanel";
import { Table } from "../components/Table";
import { HandFan } from "../components/HandFan";
import { BiddingPanel, CoinchePrompt } from "../components/BiddingPanel";
import { CoachBar } from "../components/CoachBar";
import { DealResultModal, GameOverModal, MenuSheet } from "../components/Modals";

export function PlayScreen() {
  const [menu, setMenu] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const init = useGame((s) => s.init);
  const stop = useGame((s) => s.stop);
  const phase = useGame((s) => s.game.phase);
  const go = useNav((s) => s.go);

  // Lance l'orchestration des IA pour la partie en cours (sans la réinitialiser).
  useEffect(() => {
    init();
    return () => stop();
  }, [init, stop]);

  const inProgress = phase === "playing" || phase === "bidding";
  const onHome = () => (inProgress ? setConfirmLeave(true) : go("home"));

  return (
    <div className="safe-x mx-auto flex h-full w-full max-w-3xl flex-col overflow-y-auto">
      <ScorePanel onMenu={() => setMenu(true)} onHome={onHome} />
      <Table />
      <CoinchePrompt />
      <BiddingPanel />
      <CoachBar />
      <HandFan />

      <DealResultModal />
      <GameOverModal />
      {menu && <MenuSheet onClose={() => setMenu(false)} />}
      {confirmLeave && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setConfirmLeave(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-pop w-full max-w-sm rounded-2xl bg-emerald-950 p-5 text-center shadow-2xl ring-1 ring-emerald-700"
          >
            <p className="font-bold">Quitter la partie ?</p>
            <p className="mt-1 text-sm text-white/70">Pas de panique : tu pourras la reprendre là où tu t'es arrêté.</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setConfirmLeave(false)}
                className="min-h-11 flex-1 rounded-xl bg-white/10 font-semibold hover:bg-white/20"
              >
                Continuer
              </button>
              <button
                onClick={() => {
                  setConfirmLeave(false);
                  go("home");
                }}
                className="min-h-11 flex-1 rounded-xl bg-yellow-400 font-bold text-emerald-950 hover:bg-yellow-300"
              >
                Quitter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
