import { useParams } from "react-router-dom";
import { useSubmitCoords } from "../../hooks/useSubmitCoords";
import styles from "./find-char-form.module.css";
import { useEffect, useState } from "react";

export default function FindCharForm({ characters, mousePosition, imageRef, setMessage }) {
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
                submitCoords(
                    event,
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