import { useParams } from "react-router-dom";
import styles from "./game.module.css";
import { useEffect, useRef, useState } from "react";
import { useGame } from "../../hooks/useGame";
import CharactersList from "../../components/character/CharactersList";
import FindCharForm from "../../components/find-char-form/FindCharForm";
// import { useTime } from "../../hooks/useTime";
import Timer from "../../components/timer/Timer";
import Notification from "../../components/notification/Notification";
import Marker from "../../components/marker/Marker";

export default function Game() {
  const { id } = useParams();
  const { game, error, loading } = useGame(id);
  const [click, setClick] = useState(false);
  const [message, setMessage] = useState("");
  const imageRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({
    x: null,
    y: null,
  });
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [message])

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
      <Timer></Timer>
      {message !== null && <Notification message={message}></Notification>}
      <CharactersList
        characters={game.characters}>
      </CharactersList>
      <div id={styles.imageContainer}>
        <img
          className={styles.mainImage}
          src={game.image}
          ref={imageRef}
          alt="main game image"
          onMouseDown={handlePopUp}
        ></img>
        {click && <FindCharForm
          characters={game.characters}
          mousePosition={mousePosition}
          imageRef={imageRef}
          setMessage={setMessage}
          markers={markers}
          setMarkers={setMarkers}
        >
        </FindCharForm>}
        {markers.length > 0 && markers.map((marker, index) => {
          return <Marker x={marker.x} y={marker.y} key={index}></Marker>
        })}
      </div>
    </section>
  );
}
