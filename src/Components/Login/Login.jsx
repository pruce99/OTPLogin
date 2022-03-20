import React, { useContext, useState } from "react";
import mainLogo from "../../Assets/Logo.png";
import "./Login.scss";
import app, { login } from "./Authenticate";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import ModalBox from "../ModalBox/ModalBox";
import { LoginContext } from "../../Contexts/LoginContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { isLoggedin, setIsloggedIn } = useContext(LoginContext);

  const emailValidation = () => {
    /* eslint-disable */
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !(!email || regex.test(email) === false);
  };

  const phoneValidation = () => {
    const pregex = /^[0-9]{10}$/g;
    // /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return !(!phoneNumber || pregex.test(phoneNumber) === false);
  };

  const onSignInSubmit = (e) => {
    let allOkay = true;
    if (!phoneValidation()) {
      alert("Enter valid US phone number without country code");
      allOkay = false;
    }
    if (allOkay === true) {
      
      let phone = '+1' + phoneNumber
      console.log(phone)
      configureCaptcha();
      const appVerifier = window.recaptchaVerifier;
      const auth = getAuth(app);
      signInWithPhoneNumber(auth, phone, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          handleShow();
          window.confirmationResult = confirmationResult;
          console.log("otp sent");

          // ...
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("otp not sent");
        });
    }
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
        console.log(JSON.stringify(user));
        setIsloggedIn(true);
        handleClose()
        navigate("/loggedin");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert(error)
      });
  };

  const handleClick = async (props) => {
    let allOkay = true;
    if (!emailValidation()) {
      alert("Email Invalid");
      allOkay = false;
    } else if (password.length < 6) {
      alert("Password length is less than 6");
      allOkay = false;
    }
    console.log(allOkay);
    if (allOkay === true) {
      try {
        await login(email, password);
        setIsloggedIn(true);
        navigate("/loggedin");
      } catch (err) {
        alert(err);
      }
    }
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
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="text"
            />
          </div>
          <div className="inputComponent">
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="buttonComponent">
            <button disabled={loading} onClick={handleClick}>
              {" "}
              Sign in
            </button>
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
            <button onClick={() => onSignInSubmit()}>
              {" "}
              Sign in Using OTP{" "}
            </button>
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
        OTPSubmit={OTPSubmit}
      />
    </div>
  );
}
