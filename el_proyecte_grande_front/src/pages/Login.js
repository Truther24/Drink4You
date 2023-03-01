import React from 'react'
import "../style/Register.css"
import { Cookies } from 'react-cookie';
import { useNavigate } from "react-router-dom"


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


  return (
    <>
      <br />
      <br />
      <br />
      <div className="form" style={{color:'white'}}>
        <form onSubmit={checkData}>

          <div className="inline"></div>
          <label htmlFor="Username"><b>Username</b></label>
          <input type="text" placeholder="Username" name="username" id="user" required></input>
          <div />

          <div className="inline"></div>
          <label htmlFor="Password"><b>Password</b></label>
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