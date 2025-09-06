import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <h1>TagIt</h1>
            <div>
                <Link to="/">Home</Link>
                <Link to="/leaderboard">Leaderboard</Link>
            </div>
        </header>
    )
}