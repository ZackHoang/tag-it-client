import { useEffect, useState } from "react";

export function useSubmitCoords() {
    const [data, setData] = useState({
        message: null
    });
    const [error, setError] = useState({
        message: null
    });
    const [loading, setLoading] = useState(false);

    const submitCoords = (id, currentChar, x, y, imageWidth, imageHeight) => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API}/games/${id}/${currentChar}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                x: x,
                y: y,
                browser_image_width: imageWidth,
                browser_image_height: imageHeight
            }),
            credentials: "include"
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Server error")
                }
                return response.json()
            })
            .then((response) => { console.log(response); setData(response.data) })
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }

    return { submitCoords, data, error, loading }
}