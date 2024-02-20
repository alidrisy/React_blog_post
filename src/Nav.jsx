import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const Nav = ({ search, setSearch }) => {
    return (
        <nav className="Nav">
            <form onSubmit={(e) => e.preventDefault} className="searchForm">
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/post">Post</Link>
                </li>
                <li>
                    <Link to="/signup">Regester</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
