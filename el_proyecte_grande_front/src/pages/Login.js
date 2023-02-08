import React from 'react'
import "../style/Register.css"

function Login() {


  function checkData(event) {
    event.preventDefault()
    checkForUser(event)
  }

  const checkForUser = async (data)=>{
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        
        username: `${data.target.username.value}`,
        password: `${data.target.password.value}`
      })
    }

    const response = await fetch(`https://localhost:7090/login`, requestOption)
    if (response.ok) {
      alert("successful login")
    }
    else {
      alert("not good")
    }

  }







  return (
    <>
      <br />
      <br />
      <br />
      <div className="form">
        <form onSubmit={checkData}>

          <div className="inline"></div>
          <label htmlFor="username"><b>username</b></label>
          <input type="text" placeholder="username" name="username" id="user" required></input>
          <div />

          <div className="inline"></div>
          <label htmlFor="password"><b>Password</b></label>
          <input type="password" placeholder="Password" name="password" id="pass" required></input>
          <div />

          <div className="btn">
            <button type="submit"> Login </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login