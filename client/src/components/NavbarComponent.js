// import { Link, withRouter } from "react-router-dom"
import { withRouter } from "react-router-dom"
import { getUser, logout } from "../services/authorize"

const NavbarComponent = (history) => {
    return (
        <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item pr-3 pt-3 pb-3">
                    {/* <Link to="/" className="nav-link">Home Page</Link> */}
                    <a href="/" className="nav-link">Home Page</a>
                </li>

                {!getUser() && (
                    <li className="nav-item pr-3 pt-3 pb-3">
                        {/* <Link to="/login" className="nav-link">Login</Link> */}
                        <a href="/login" className="nav-link">Login</a>
                    </li>
                )}
                {getUser() && (
                    <li className="nav-item pr-3 pt-3 pb-3">
                        {/* <Link to="/create" className="nav-link">write an article</Link> */}
                        <a href="/create" className="nav-link">write an article</a>
                    </li>
                )}
                {getUser() && (
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <button className="nav-link" onClick={() => logout(() => history.push("/"))}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default withRouter(NavbarComponent);