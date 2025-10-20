import { useParams } from "react-router-dom";
import styles from "./game.module.css";
import data from "../../data";
import { useRef, useState } from "react";

export default function Game() {
  const { game } = useParams();
  const [click, setClick] = useState(false);
  const imageRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({
    x: null,
    y: null,
  });
  const gameIndex = parseInt(game[game.length - 1]) - 1;

  const handlePopUp = async (e) => {
    const mousePosition = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    console.log(mousePosition);
    setClick(!click);
    setMousePosition(mousePosition);
  };

  return (
    <div id={styles.game}>
      <div className={styles.targets}>
        {data[gameIndex].targets.map((char, index) => {
          return (
            <figure key={index}>
              <img src={char.image} />
              <figcaption>{char.name}</figcaption>
            </figure>
          );
        })}
      </div>
      <div id={styles.imageContainer}>
        <img
          className={styles.mainImage}
          src={data[gameIndex].image}
          alt="main game image"
          ref={imageRef}
          onMouseDown={handlePopUp}
        ></img>
        {click && (
          <form
            style={{ left: mousePosition.x, top: mousePosition.y }}
            className={styles.popUp}
            aria-label="selection"
          >
            {data[gameIndex].targets.map((char, index) => {
              return (
                <div className={styles.selection} key={index}>
                  <input type="radio" id={char.name} value={char.name} name="choice"></input>
                  <img src={char.image}></img>
                  <label htmlFor={char.name}>{char.name}</label>
                </div>
              )
            })}
            <button type="submit">Confirm</button>
          </form>
        )}
      </div>
    </div>
  );
}
