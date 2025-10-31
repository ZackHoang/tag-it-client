import GameCard from "../../components/game-card/GameCard";
import { useAllGames } from "../../hooks/useAllGames";
import styles from './home.module.css';

export default function Home() {
  const { games, error, loading } = useAllGames();

  const gamesList = games.map((game, index) => {
    return <GameCard
      key={index}
      image={game.image}
      game={`game/${game.id}`}
      source={game.source}>
    </GameCard>
  });

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>{error}</h1>

  return (
    <section id={styles.container}>
      {gamesList}
    </section>
  );
}
