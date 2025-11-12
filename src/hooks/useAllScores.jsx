import { useEffect, useState } from "react";

export default function useAllScores() {
    const [scores, setScores] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API}/leaderboard`)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Server Error");
                }
                return response.json()
            })
            .then((response) => setScores(response.data))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false))
    })

    return { scores, error, loading }
}