import styles from "./game-card.module.css";
import { Link } from "react-router-dom";

export default function GameCard({image, game, source}) {
  return (
    <article className={styles.gameCard}>
      <img className={styles.gameImage} src={image}></img>
      <Link to={game}>Play</Link>
      <a href={source}>Source</a>
    </article>
  );
}
