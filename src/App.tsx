import { useNav } from "./app/nav";
import { Home } from "./app/Home";
import { PlayScreen } from "./app/PlayScreen";
import { ExercisesScreen } from "./training/ExercisesScreen";
import { ReviewGlobalScreen } from "./training/ReviewGlobalScreen";
import { GuidesScreen } from "./training/GuidesScreen";
import { StatsScreen } from "./training/StatsScreen";

export default function App() {
  const view = useNav((s) => s.view);

  switch (view) {
    case "play":
      return <PlayScreen />;
    case "exercises":
      return <ExercisesScreen />;
    case "review":
      return <ReviewGlobalScreen />;
    case "guides":
      return <GuidesScreen />;
    case "stats":
      return <StatsScreen />;
    default:
      return <Home />;
  }
}
