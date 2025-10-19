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

  const handleModal = async (e) => {
    const mousePosition = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    }
    console.log(mousePosition);
    setClick(!click);
    setMousePosition(mousePosition);
  };

  return (
    <div id={styles.game}>
      <div className={styles.targets}>
        {data[gameIndex].targets.map((char, index) => {
          return (
            <article key={index}>
              <p>{char.name}</p>
              <img src={char.image} />
            </article>
          );
        })}
      </div>
      <div id={styles.imageContainer}>
        <img
          className={styles.mainImage}
          src={data[gameIndex].image}
          ref={imageRef}
          onMouseDown={handleModal}
        ></img>
        {click && (
          <div
            style={{ left: mousePosition.x, top: mousePosition.y }}
            className={styles.popUp}
          >
            Mouse is clicked!
          </div>
        )}
      </div>
    </div>
  );
}
