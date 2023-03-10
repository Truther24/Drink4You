import React, { useEffect } from "react";
import "../style/Register.css";

import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Logout() {
    const cookies = new Cookies();
    
    const navigate = useNavigate();

    useEffect(() => {
    logout()
},[])

    const logout = () => {
        cookies.remove("userToken");
        cookies.remove("userName");
        navigate("/");
        window.location.reload(true);
    }
  
  
    return (
        <>
        </>
    )
}

export default Logout;
