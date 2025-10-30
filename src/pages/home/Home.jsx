// import { Link } from "react-router-dom";
// import styles from "./home.module.css";
import data from "../../data";
import GameCard from "../../components/game-card/GameCard";
// import { useEffect, useState } from "react";

export default function Home() {
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   const fetchGames = async () => {
  //     const response = await fetch();
  //   };

  //   fetchGames();
  // }, []);

  return (
    data &&
    data.map((game, index) => {
      return (
        <GameCard
          key={index}
          image={game.image}
          game={game.id}
          source={game.source}
        />
      );
    })
  );
}
