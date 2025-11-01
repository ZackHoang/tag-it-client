import styles from "./find-char-form.module.css";

export default function FindCharForm({ characters, mousePosition }) {
    return (
        <form
            style={{ left: mousePosition.x, top: mousePosition.y }}
            className={styles.popUp}
            aria-label="selection"
        >
            {characters.map((char, index) => {
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
    )
}