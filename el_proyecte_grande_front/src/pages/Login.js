import "../style/Register.css"
import cocktail from "../images/ash-edmonds-fsI-_MRsic0-unsplash.jpg";
import { Cookies } from 'react-cookie';
import { useNavigate } from "react-router-dom"
import React, { useEffect } from "react";



function Login() {



  const navigate = useNavigate();


  const cookies = new Cookies();

  function checkData(event) {
    event.preventDefault()
    checkForUser(event)
  }

  const checkForUser = async (data)=>{
    const requestOption = {
        method: "POST",
        credentials: "same-origin",
        headers: {
            Authorization: "Bearer " + cookies.get("userToken"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: `${data.target.username.value}`,
            password: `${data.target.password.value}`,
            StrIngredients: []
        }),
    };

    const response = await fetch(`https://localhost:7090/login`, requestOption)
    const responseData = await response.json(); 
    console.log(responseData)
    
    if (responseData.status===400) {
      alert("not good")
    }
    else {
      cookies.set("userToken", responseData.message)
      console.log(cookies.get('userToken'))
      cookies.set("userName", responseData.identityUsers[0].userName)
      console.log(cookies.get('userName'))
      navigate('/')
      window.location.reload(true);

      
    }

  }

  useEffect(() => {
    const container = document.querySelector("#registerContainer");
    container.classList.add("show");
  }, []);


  return (
    <>
      <div id="cocktailImage" style={{ backgroundImage: `url(${cocktail})`,width: "100%",
          padding: "0px",
          height: "100%",
          display: "block",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          fontSize: 30, }}>
        <div id="registerContainer">
          <div className="brown-div"></div>
          <div className="form" style={{ color: "white" }}>
            <form onSubmit={checkData}>
              <div className="inline"></div>
              <label htmlFor="Username">
                <b>Username</b>
              </label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                id="user"
                required
              ></input>
              <div />

              <div className="inline"></div>
              <label htmlFor="Password">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="pass"
                required
              ></input>
              <div />

              <div className="btn">
                <button type="submit" id="registerButton">
                  {" "}
                  Login{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login