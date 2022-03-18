import React from "react";
import mainLogo from '../../Assets/Logo.png'
import { Link } from "react-router-dom";
import './Signup.scss'

export default function Signup() {
  return (
    <div className="SignupComponent">
      <div className="Signup">
        <div className="mainLogo">
          <img className="mainLogoImage" src={mainLogo} alt="fireSpot" />
        </div>
        <div className="signupHeading">
          <h2>Create Account</h2>
        </div>
        <div className="signupComponents">
          <div className="inputComponent">
            <input placeholder="Email" type="text" />
          </div>
          <div className="inputComponent">
            <input placeholder="Name" type="text" />
          </div>
          <div className="inputComponent">
            <input placeholder="Password" type="password" />
          </div>
          <div className="inputComponent">
            <input placeholder="Renter Password" type="password" />
          </div>
          <div className="inputComponent">
            <input placeholder="Phone Number" type="text" />
          </div>
          <div className="buttonComponent">
            <button> Signup</button>
          </div>
        </div>
      </div>
      <div className="SwitchToSignup">
        <div className="heading">
          <h3>Old User?</h3>
        </div>
        <div className="paragraph">
          <p>To keep connected with us</p>
          <p>please login with your personal info.</p>
        </div>
        <div className="buttonComponent">
          <Link to="/">
            <button>Sign in</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
