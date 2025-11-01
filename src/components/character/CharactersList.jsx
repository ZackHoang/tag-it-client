import styles from "./characters-list.module.css";

export default function CharactersList({ characters }) {
    return (
        <div className={styles.targets}>
            {characters.map((char, index) => {
                return <figure key={index}>
                    <img src={char.image}></img>
                    <figcaption>{char.name}</figcaption>
                </figure>
            })}
        </div>
    )
}