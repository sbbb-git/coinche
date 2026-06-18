import { useEffect, useState } from "react";
import { useGame } from "./state/store";
import { ScorePanel } from "./components/ScorePanel";
import { Table } from "./components/Table";
import { HandFan } from "./components/HandFan";
import { BiddingPanel } from "./components/BiddingPanel";
import { DealResultModal, GameOverModal, MenuSheet } from "./components/Modals";

export default function App() {
  const [menu, setMenu] = useState(false);
  const init = useGame((s) => s.init);
  const stop = useGame((s) => s.stop);

  // Lance l'orchestration des IA pour la partie déjà initialisée (sans la réinitialiser).
  useEffect(() => {
    init();
    return () => stop();
  }, [init, stop]);

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col">
      <ScorePanel onMenu={() => setMenu(true)} />
      <Table />
      <BiddingPanel />
      <HandFan />

      <DealResultModal />
      <GameOverModal />
      {menu && <MenuSheet onClose={() => setMenu(false)} />}
    </div>
  );
}
