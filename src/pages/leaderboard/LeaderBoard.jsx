import useAllScores from "../../hooks/useAllScores"

export default function LeaderBoard() {
    const { scores, error, loading } = useAllScores();

    if (error) return <h2>{error}</h2>
    if (loading) return <h2>Loading...</h2>

    return (
        <>
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Time</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => {
                        return <tr key={index}>
                            <td>{score.name}</td>
                            <td>{score.time}</td>
                            <td>{new Date(score.date).toLocaleString()}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}