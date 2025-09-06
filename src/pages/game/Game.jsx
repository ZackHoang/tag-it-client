import { useParams } from "react-router-dom";
import styles from "./game.module.css";
import data from "../../data";
import { useRef, useState } from "react";
import useMousePosition from "../../hooks/useMousePosition";

export default function Game() {
  const { game } = useParams();
  const [click, setClick] = useState(false);
  const mousePosition = useMousePosition();
  const dialogRef = useRef(null);
  const gameIndex = parseInt(game[game.length - 1]) - 1;

  const handleModal = async () => {
    setClick(!click);
    console.log(dialogRef);
    console.log(mousePosition);
  };

  return (
    <>
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
      <img
        className={styles.mainImage}
        src={data[gameIndex].image}
        onClick={handleModal}
      ></img>
      {click && (
        <div
          style={{ left: mousePosition.x, top: mousePosition.y }}
          ref={dialogRef}
          className={styles.popUp}
        >
          Mouse is clicked!
        </div>
      )}
    </>
  );
}
