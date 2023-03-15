import React, { useEffect } from "react";
import "../style/Register.css";
import cocktail from "../images/ash-edmonds-fsI-_MRsic0-unsplash.jpg";

import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  function getData(event) {
    event.preventDefault();
    console.log(event.target.username.value);
    console.log(event.target.email.value);
    console.log(event.target.password.value);
    addUserToDatabase(event);
  }

  const addUserToDatabase = async (event) => {
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: `${event.target.email.value}`,
        username: `${event.target.username.value}`,
        password: `${event.target.password.value}`
      })
    }


    const response = await fetch(`https://localhost:7090/add-user`, requestOption)
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status === 400) {
      alert("not good")
    }
    else {
      navigate("/login")
    }

  }
  

  useEffect(() => {
    const container = document.querySelector("#registerContainer");
    container.classList.add("show");
  }, []);

  return (
    <div
      id="cocktailImage"
      style={{
        backgroundImage: `url(${cocktail})`,
        width: "100%",
        padding: "0px",
        height: "100%",
        display: "block",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        fontSize: 30,
      }}
    >
      <div id="registerContainer">
        <div className="brown-div"></div>
        <div className="form" style={{ color: "white" }}>
          <form onSubmit={getData}>
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
            <label htmlFor="Email">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              required
            ></input>
            <div />

            <div className="inline"></div>
            <label htmlFor="Password">
              <b>Password</b>
            </label>
            <input
              type="text"
              placeholder="Password"
              name="password"
              id="pass"
              required
            ></input>
            <div />

            <div className="btn">
              <button type="submit" id="registerButton">
                {" "}
                Register{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
