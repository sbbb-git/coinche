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
  const init = useGame((s) => s.init);
  const stop = useGame((s) => s.stop);
  const go = useNav((s) => s.go);

  // Lance l'orchestration des IA pour la partie en cours (sans la réinitialiser).
  useEffect(() => {
    init();
    return () => stop();
  }, [init, stop]);

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col overflow-y-auto">
      <ScorePanel onMenu={() => setMenu(true)} onHome={() => go("home")} />
      <Table />
      <CoinchePrompt />
      <BiddingPanel />
      <CoachBar />
      <HandFan />

      <DealResultModal />
      <GameOverModal />
      {menu && <MenuSheet onClose={() => setMenu(false)} />}
    </div>
  );
}
