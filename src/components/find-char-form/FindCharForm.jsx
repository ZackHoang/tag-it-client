import { useParams } from "react-router-dom";
import { useSubmitCoords } from "../../hooks/useSubmitCoords";
import styles from "./find-char-form.module.css";
import { useEffect, useState } from "react";
import Marker from "../marker/Marker";

export default function FindCharForm({ characters, mousePosition, imageRef, setMessage, markers, setMarkers, setIsEveryoneFound, setIsFound }) {
    const { id } = useParams();
    const [currentChar, setCurrentChar] = useState("");
    const handleCharChange = (e) => {
        setCurrentChar(e.target.value);
    }
    const { submitCoords, data, error, loading } = useSubmitCoords();

    useEffect(() => {
        if (loading === true) {
            setMessage("Loading...")
        } else if (data.message !== null) {
            if (data.message === "You have found everyone") {
                setIsEveryoneFound(true);
            } else if (data.message.includes("You found")) {
                setMarkers(
                    [
                        ...markers,
                        {
                            x: mousePosition.x,
                            y: mousePosition.y
                        }
                    ]
                );
                setIsFound(true);
            } else if (data.message === "Try Again!") {
                setIsFound(false);
            }
            setMessage(data.message);
        } else {
            setMessage(error.message);
        }
    }, [data])

    return (
        <form
            style={{ left: mousePosition.x, top: mousePosition.y }}
            className={styles.popUp}
            aria-label="selection"
            onSubmit={(event) => {
                event.preventDefault();
                submitCoords(
                    id,
                    currentChar,
                    mousePosition.x,
                    mousePosition.y,
                    imageRef.current.width,
                    imageRef.current.height
                );
            }}
        >
            {characters.map((char, index) => {
                return (
                    <div className={styles.selection} key={index}>
                        <input
                            type="radio"
                            id={char.name}
                            value={char.name}
                            name="choice"
                            onChange={handleCharChange}
                            checked={currentChar === char.name}
                        ></input>
                        <img src={char.image}></img>
                        <label htmlFor={char.name}>{char.name}</label>
                    </div>
                );
            })}
            <button type="submit">Confirm</button>
        </form>
    )
}