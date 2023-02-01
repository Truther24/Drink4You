import React from 'react'
import "../style/Register.css"
import { useNavigate } from "react-router-dom";


function Register() {

  const navigate = useNavigate();

  function getData(event) {
    event.preventDefault()
    console.log(event.target.username.value)
    console.log(event.target.email.value)
    console.log(event.target.password.value)
    addUserToDatabase(event)
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
        passowrd: `${event.target.password.value}`
      })
    }


    const response = await fetch(`https://localhost:7090/add-user`, requestOption)
    const responseData = await response.json();
    if (responseData.status === 400) {
      alert("not good")
    }
    else {
      navigate("/login")

    }

  }



  return (
    <>
      <br />
      <br />

      <br />

      <div className="form">
        <form onSubmit={getData}>

          <div className="inline"></div>
          <label htmlFor="username"><b>username</b></label>
          <input type="text" placeholder="username" name="username" id="user" required></input>
          <div />

          <div className="inline"></div>
          <label htmlFor="email"><b>Email</b></label>
          <input type="email" placeholder="Email" name="email" id="email" required></input>
          <div />

          <div className="inline"></div>
          <label htmlFor="password"><b>Password</b></label>
          <input type="text" placeholder="Password" name="password" id="pass" required></input>
          <div />

          <div className="btn">
            <button type="submit"> Register </button>
          </div>
        </form>
      </div>

    </>
  )
}

export default Register