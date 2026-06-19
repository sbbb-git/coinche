import { useNav } from "./app/nav";
import { Home } from "./app/Home";
import { PlayScreen } from "./app/PlayScreen";
import { ExercisesScreen } from "./training/ExercisesScreen";
import { ReviewMyGamesScreen } from "./training/ReviewMyGamesScreen";
import { ReviewGlobalScreen } from "./training/ReviewGlobalScreen";
import { LessonsScreen } from "./training/LessonsScreen";
import { GuidesScreen } from "./training/GuidesScreen";
import { StatsScreen } from "./training/StatsScreen";
import { AccountScreen } from "./app/AccountScreen";

export default function App() {
  const view = useNav((s) => s.view);

  switch (view) {
    case "play":
      return <PlayScreen />;
    case "exercises":
      return <ExercisesScreen />;
    case "mygames":
      return <ReviewMyGamesScreen />;
    case "review":
      return <ReviewGlobalScreen />;
    case "lessons":
      return <LessonsScreen />;
    case "guides":
      return <GuidesScreen />;
    case "stats":
      return <StatsScreen />;
    case "account":
      return <AccountScreen />;
    default:
      return <Home />;
  }
}
