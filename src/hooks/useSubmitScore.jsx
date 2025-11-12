export default function useSubmitScore() {
    const postScore = (name) => {
        fetch(`${import.meta.env.VITE_API}/score`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name
            }),
            credentials: "include",
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Sever Error");
                }
                return response.json();
            })
    }

    return { postScore }
}