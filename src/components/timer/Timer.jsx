import { useEffect, useState } from "react";
import { convertSeconds } from "../../utils/convertMiliseconds";

export default function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const key = setInterval(() => {
            setSeconds((s) => s + 1);
        }, 1000);
        return () => {
            clearInterval(key);
        }
    }, []);

    return (
        <p>
            {convertSeconds(seconds)}
        </p>
    )
}