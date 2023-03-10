import "../style/App.css";
import jwtDecode from "jwt-decode";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import AddDrink from "./AddDrink";

const IsAdmin = ({logout}) => {
    const cookies = new Cookies();
    const token = cookies.get("userToken");
    const decoded = jwtDecode(token);
    // setDecodedToken(decoded);
    // console.log(
    //     Array.isArray(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
    // );

    


    const page = (
        <>
            <ul
                className="navBarUser"
                style={{ position: "relative", left: "2%" }}
            >
                <Link to="/user">User Profile</Link>
                <div style={{ dispaly: "inline" }}>
                    <Link style={{ cursor: "default" }}>
                        <p>Logged in as&nbsp;</p>

                        <p style={{ color: "orange" }}>
                            {cookies.get("userName")}
                        </p>
                    </Link>
                </div>
                <Link onClick={logout}>Logout</Link>
            </ul>
        </>
    );

    const pageAsAdmin = (
        <>
            <ul
                className="navBarUser"
                style={{ position: "relative", left: "2%" }}
            >
                <Link to="/user">User Profile</Link>
                <div style={{ dispaly: "inline" }}>
                    <Link style={{ cursor: "default" }}>
                        <p>Logged in as&nbsp;</p>

                        <p style={{ color: "orange" }}>
                            {cookies.get("userName")}
                        </p>
                    </Link>
                </div>
                <Link onClick={logout}>Logout</Link>
                <Link to="/addDrink">Add Drink</Link>
            </ul>
        </>
    );

    if (Array.isArray(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])) {
        return pageAsAdmin;
    }
    return page;

};

export default function Navbar() {
    const [decodedToken, setDecodedToken] = useState({});
    const cookies = new Cookies();

    const navigate = useNavigate();

    function Logout() {
        cookies.remove("userToken");
        cookies.remove("userName");
        navigate("/");
        window.location.reload(true);
    }

    useEffect(() => {}, []);

    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                Drink4You
            </Link>

            {!(cookies.get("userToken") == undefined) ? <IsAdmin logout={Logout} /> : null}

            <ul
                className="rightNav"
                style={{ position: "relative", left: "45%" }}
            >
                <CustomLink to="/register">Register</CustomLink>

                {!(cookies.get("userToken") == undefined) ? (
                    <></>
                ) : (
                    <CustomLink to="/login">Login</CustomLink>
                )}

                <CustomLink to="/categories">Categories</CustomLink>
                <CustomLink to="/about">About</CustomLink>
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}
