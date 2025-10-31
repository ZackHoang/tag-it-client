import { useParams } from "react-router-dom";
import styles from "./game.module.css";
import { useRef, useState } from "react";
import { useGame } from "../../hooks/useGame";

export default function Game() {
  const { id } = useParams();
  const { game, error, loading } = useGame(id);
  console.log(game);
  const [click, setClick] = useState(false);
  const imageRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({
    x: null,
    y: null,
  });

  const handlePopUp = async (e) => {
    const mousePosition = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    console.log(mousePosition);
    setClick(!click);
    setMousePosition(mousePosition);
  };

  const charactersList = game.characters.map((char, index) => {
    return <figure key={index}>
      <img src={char.image} />
      <figcaption>{char.name}</figcaption>
    </figure>
  });

  const findCharForm = () => {
    return <form
      style={{ left: mousePosition.x, top: mousePosition.y }}
      className={styles.popUp}
      aria-label="selection"
    >
      {game && game.characters.map((char, index) => {
        return (
          <div className={styles.selection} key={index}>
            <input
              type="radio"
              id={char.name}
              value={char.name}
              name="choice"
            ></input>
            <img src={char.image}></img>
            <label htmlFor={char.name}>{char.name}</label>
          </div>
        );
      })}
      <button type="submit">Confirm</button>
    </form>
  }

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>{error}</h1>

  return (
    <section id={styles.game}>
      <div className={styles.targets}>
        {charactersList}
      </div>
      <div id={styles.imageContainer}>
        <img
          className={styles.mainImage}
          src={game.image}
          alt="main game image"
          ref={imageRef}
          onMouseDown={handlePopUp}
        ></img>
        {click && findCharForm}
      </div>
    </section>
  );
}
