import { useEffect, useState } from "react";

export function useSubmitCoords(url, { x, y, imageWidth, imageHeight }) {
    const [data, setData] = useState({
        x: x,
        y: y,
        imageWidth: imageWidth,
        imageHeight: imageHeight
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState({});

    const submitCoords = ({ x, y, imageWidth, imageHeight }) => {
        console.log(url);
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                x: x,
                y: y,
                browser_image_width: imageWidth,
                browser_image_height: imageHeight
            })
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Server error")
                }
                return response.json()
            })
            .then((response) => setRes(response.data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        submitCoords(data);
    }

    return { onSubmit, data, setData, res, error, loading }
}