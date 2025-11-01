import { useParams } from "react-router-dom";
import { useSubmitCoords } from "../../hooks/useSubmitCoords";
import styles from "./find-char-form.module.css";
import { useEffect, useRef, useState } from "react";

export default function FindCharForm({ characters, mousePosition, mainImageRef }) {
    const { id } = useParams();
    const [currentChar, setCurrentChar] = useState("");
    const handleCharChange = (e) => {
        setCurrentChar(e.target.value);
    }
    const imageRef = useRef(null);
    const { onSubmit, data, setData, res, error, loading } = useSubmitCoords(
        `${import.meta.env.VITE_API}/games/${id}/${currentChar}`,
        {
            x: mousePosition.x,
            y: mousePosition.y,
            imageWidth: mainImageRef.current.width,
            imageHeight: mainImageRef.current.height
        }
    );

    useEffect(() => {
        setData({
            ...data,
            x: mousePosition.x,
            y: mousePosition.y,
        });
        console.log(res);
    }, [res, mousePosition])

    return (
        <form
            style={{ left: mousePosition.x, top: mousePosition.y }}
            className={styles.popUp}
            aria-label="selection"
            onSubmit={onSubmit}
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
                        <img src={char.image} ref={imageRef}></img>
                        <label htmlFor={char.name}>{char.name}</label>
                    </div>
                );
            })}
            <button type="submit">Confirm</button>
        </form>
    )
}