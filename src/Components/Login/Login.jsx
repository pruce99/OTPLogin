import React from "react";
import mainLogo from "../../Assets/Logo.png";
import "./Login.scss";

export default function Login() {
  return (
    <div className="Login">
      <div className="mainLogo">
        <img className="mainLogoImage" src={mainLogo} alt="fireSpot" />
      </div>
      <div className="loginHeading">
        <h2>Login to Your Account</h2>
      </div>
      <div className="loginComponents">
        <div className="inputComponent">
          <input placeholder="Email" type="text" />
        </div>
        <div className="inputComponent">
          <input placeholder="Password" type="password" />
        </div>
        <div className="buttonComponent">
          <button> Sign in</button>
        </div>
      </div>
    </div>
  );
}
