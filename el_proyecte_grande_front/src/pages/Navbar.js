
import "../style/App.css"
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";



export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const cookies = new Cookies();

    

    useEffect(() => {


        
    }, [])


    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                Drink4You
            </Link>
            
            {!(cookies.get('userToken') == undefined)? <div>Logged in as {cookies.get('userName')}</div> : <></>}

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