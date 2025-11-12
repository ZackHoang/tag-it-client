import { useState } from "react";
import useSubmitScore from "../../hooks/useSubmitScore";
import useTotalTime from "../../hooks/useTotalTime"

export default function ScoreForm() {
    const [name, setName] = useState("");
    const { data, error, loading } = useTotalTime();
    const { postScore } = useSubmitScore();

    console.log(data);

    if (error) return <h2>{error}</h2>
    if (loading) return <h2>Loading...</h2>

    return (
        <>
            <h2>Time</h2>
            <p>{data}</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                postScore(name);
            }}>
                <h3>Save Your Score</h3>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}