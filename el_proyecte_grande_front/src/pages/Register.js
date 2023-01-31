import React from 'react'
import "../style/Register.css"

function Register() {
  return (
    <>
    <br/>
    <br/>

    <br/>

    <div className="form">
            <div className="inline"></div>
            <label for="email"><b>username</b></label>
            <input type="text" placeholder="username" name="email" id="email" required></input>
            <div/>
            <div className="inline"></div>

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Email" name="email" id="email" required></input>
            <div/>

            <div className="inline"></div>
            <label for="email"><b>Password</b></label>
            <input type="text" placeholder="Password" name="email" id="email" required></input>
            <div/>
            <div className="btn">
            <button type="button" > Register </button>
            </div>
    </div>      

    </>
  )
}

export default Register