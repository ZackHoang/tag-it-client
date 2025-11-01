import { useParams } from "react-router-dom";
import styles from "./game.module.css";
import { useRef, useState } from "react";
import { useGame } from "../../hooks/useGame";
import CharactersList from "../../components/character/CharactersList";
import FindCharForm from "../../components/find-char-form/FindCharForm";
import { useTime } from "../../hooks/useTime";

export default function Game() {
  const { id } = useParams();
  const { game, error, loading } = useGame(id);
  const { data } = useTime();
  console.log(data);
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

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>{error}</h1>

  return (
    <section id={styles.game}>
      <CharactersList
        characters={game.characters}>
      </CharactersList>
      <div id={styles.imageContainer}>
        <img
          className={styles.mainImage}
          src={game.image}
          alt="main game image"
          ref={imageRef}
          onMouseDown={handlePopUp}
        ></img>
        {click && <FindCharForm
          characters={game.characters}
          mousePosition={mousePosition}
          mainImageRef={imageRef}>
        </FindCharForm>}
      </div>
    </section>
  );
}
