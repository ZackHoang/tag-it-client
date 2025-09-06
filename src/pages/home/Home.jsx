// import { Link } from "react-router-dom";
// import styles from "./home.module.css";
import data from "../../data";
import GameCard from "../../components/game-card/GameCard";

export default function Home() {
  return (
    data &&
    data.map((game, index) => {
      return <GameCard key={index} image={game.image} game={game.id} source={game.source} />;
    })
  );
}
