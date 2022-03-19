import React, { useState } from "react";
import mainLogo from "../../Assets/Logo.png";
import "./Login.scss";
import app from "./Authenticate";
import { Link } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import ModalBox from "../ModalBox/ModalBox";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSignInSubmit = (e) => {
    configureCaptcha();
    const appVerifier = window.recaptchaVerifier;
    const auth = getAuth(app);
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        handleShow()
        window.confirmationResult = confirmationResult;
        console.log("otp sent");

        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("otp not sent");
      });
  };

  const configureCaptcha = () => {
    const auth = getAuth(app);
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      },
      auth
    );
  };

  const OTPSubmit = () => {
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user))
        alert("User is verified");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  return (
    <div className="LoginComponent">
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
          <div className="orLine">
            <h2 className="orLineHeading">
              <span>OR</span>
            </h2>
          </div>
          <div style={{ marginTop: "20px" }} className="inputComponent">
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              type="text"
            />
          </div>
          <div className="buttonComponent">
            <div id="sign-in-button"></div>
            <button onClick={() => onSignInSubmit()}> Sign in Using OTP </button>
          </div>
        </div>
      </div>
      <div className="SwitchToSignup">
        <div className="heading">
          <h3>New Here?</h3>
        </div>
        <div className="paragraph">
          <p>Sign up and discover a great</p>
          <p>amount of new opportunities</p>
        </div>
        <div className="buttonComponent">
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
        </div>
      </div>
      <ModalBox
        handleShow={handleShow}
        show={show}
        otp={otp}
        setOtp={setOtp}
        handleClose={handleClose}
        OTPSubmit = {OTPSubmit}
      />
    </div>
  );
}
