import React, { Component } from "react";
import "../style/User.css";

export class User extends Component {
  render() {
    return (
      <div id="user-page">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <div className="card">
          <div id="left-text">
            <br />
            <img src="img.jpg" alt="John" style={{ width: "100%" }} />
            <h1>John Doe</h1>
            <p className="title">CEO &amp; Founder, Example</p>
            <p>Harvard University</p>

            <br />

            <p>
              <button className="user-button">Contact</button>
            </p>
          </div>
          <div id="right-text">
            <br />
            <img src="img.jpg" alt="John" style={{ width: "100%" }} />
            <h1>John Doe</h1>
            <p className="title">CEO &amp; Founder, Example</p>
            <p>Harvard University</p>

            <br />

            <p>
              <button className="user-button">Contact</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
