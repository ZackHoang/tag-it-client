import styles from "./notification.module.css"

export default function Notification({ message, isFound }) {
    const correct = isFound ? styles.correct : styles.incorrect;

    return <div className={`${styles.notification} ${correct}`}>
        <p>{message}</p>
    </div>
}