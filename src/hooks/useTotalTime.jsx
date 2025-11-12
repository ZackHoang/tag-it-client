import { useEffect, useState } from "react";

export default function useTotalTime() {
    const [data, setData] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API}/total-time`, {
            credentials: 'include'
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Server Error");
                }
                return response.json();
            })
            .then((response) => { console.log(response); setData(response.data.total_time) })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false))
    }, [])

    return { data, error, loading }
}