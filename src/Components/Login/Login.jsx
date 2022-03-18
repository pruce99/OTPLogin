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
    </div>
  );
}
