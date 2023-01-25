const NavbarComponent = () => {
    return (
        <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item pr-3 pb-3">
                    <a href="/" className="nav-link">Home Page</a>
                </li>
                <li className="nav-item pr-3 pb-3">
                    <a href="/create" className="nav-link">write an article</a>
                </li>
            </ul>
        </nav>
    )
}

export default NavbarComponent;