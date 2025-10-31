import { Children } from "react";
import App from "./App";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import LeaderBoard from "./pages/leaderboard/LeaderBoard";
import Game from "./pages/game/Game";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home></Home> },
      { path: "leaderboard", element: <LeaderBoard></LeaderBoard> },
      { path: "game/:id", element: <Game></Game> }
    ]
  },
];

export default routes