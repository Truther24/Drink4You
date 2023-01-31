
import "../style/App.css"
import { Link, useMatch, useResolvedPath } from "react-router-dom"


export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                Drink4You
            </Link>

            <ul>
                <CustomLink to="/categories">

                    Categories
                </CustomLink>
                <CustomLink to="/about">About</CustomLink>
                <CustomLink to="/register">Register</CustomLink>
                <CustomLink to="/login">Login</CustomLink>



            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {

    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}