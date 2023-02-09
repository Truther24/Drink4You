import React from 'react'
import "../style/Register.css"
import { Cookies } from 'react-cookie';

function Login() {


  const cookies = new Cookies();

  function checkData(event) {
    event.preventDefault()
    checkForUser(event)
  }

  const checkForUser = async (data)=>{
    const requestOption = {
      method: "POST",
      credentials: 'same-origin',
      headers: {
        'Authorization': 'Bearer ' + cookies.get('userToken'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        
        username: `${data.target.username.value}`,
        password: `${data.target.password.value}`
      })
    }

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
      alert("successful login")
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