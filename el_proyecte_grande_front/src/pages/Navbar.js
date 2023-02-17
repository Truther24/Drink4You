
import "../style/App.css"
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";




export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const cookies = new Cookies();

  const navigate = useNavigate();


    function Logout(){
        cookies.remove('userToken')
        cookies.remove('userName')
        navigate('/')
        window.location.reload(true);
    }

    useEffect(() => {


        
    }, [])


    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                Drink4You
            </Link>
            
            {!(cookies.get('userToken') == undefined)? 
            <ul className="navBarUser" style={{position:'relative', left:'2%'}}>
            <Link to="/user">User Profile</Link>
            <div style={{dispaly:'inline'}}>
                <Link style={{cursor:'default'}}>
                <p>

                Logged in as&nbsp;
                </p>

                <p style={{color:'orange'}}>
                {cookies.get('userName')}
                
                </p>
                </Link>
                
            </div>
            <Link onClick={Logout}>Logout</Link>
            </ul>
             : <></>}


            <ul className="rightNav" style={{position:'relative', left:'45%'}}>
                <CustomLink to="/register">Register</CustomLink>

                {!(cookies.get('userToken') == undefined)? 
            <></>
             : <CustomLink to="/login">Login</CustomLink>}
                
                <CustomLink to="/categories">

                    Categories
                </CustomLink>
                <CustomLink to="/about">About</CustomLink>



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