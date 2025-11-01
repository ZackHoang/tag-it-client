import { useEffect, useState } from "react";

export function useGame(id) {
    const [game, setGame] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API}/games/${id}`)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Server Error");
                }
                return response.json()
            })
            .then((response) => {
                setGame(response.data);
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false))
    }, [])

    return { game, error, loading }
}