import { useEffect, useState } from "react";

export function useAllGames() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API}/games`)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Server Error");
                }
                return response.json()
            })
            .then((response) => {
                console.log(response);
                setGames(response.data)
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false))
    }, [])

    return { games, error, loading }
}