import { useParams } from "react-router-dom";
import styles from "./game.module.css";
import data from "../../data";
import {  useState } from "react";

export default function Game() {
  const { game } = useParams();
  const [click, setClick] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: null,
    y: null
  });
  const gameIndex = parseInt(game[game.length - 1]) - 1;

  const handleModal = async (e) => {
    setClick(!click);
    setMousePosition({
      x: e.clientX, 
      y: e.clientY
    })
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
        onMouseDown={handleModal}
      ></img>
      {click && (
        <div
          style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
          className={styles.popUp}
        >
          Mouse is clicked!
        </div>
      )}
    </>
  );
}
