import { useEffect, useState } from "react";

export function useTime() {
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API}/time`)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Server error");
                }
                return response.json()
            })
            .then((response) => setData(response.data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [])

    return { data, error, loading }
}