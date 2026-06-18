import { useState } from "react";
import { ScorePanel } from "./components/ScorePanel";
import { Table } from "./components/Table";
import { HandFan } from "./components/HandFan";
import { BiddingPanel } from "./components/BiddingPanel";
import { DealResultModal, GameOverModal, MenuSheet } from "./components/Modals";

export default function App() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="flex h-full flex-col">
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
