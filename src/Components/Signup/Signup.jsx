import React, { useContext, useState } from "react";
import mainLogo from "../../Assets/Logo.png";
import { Link } from "react-router-dom";
import "./Signup.scss";
import { signup, useAuth } from "../Login/Authenticate";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Contexts/LoginContext";

export default function Signup() {
  const navigate = useNavigate();
  const currentUser = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {isLoggedin,setIsloggedIn} = useContext(LoginContext)

  const emailValidation = () => {
    /* eslint-disable */
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !(!email || regex.test(email) === false);
  };

  const handleClick = async (props) => {
    setLoading(true);
    let allOkay = true;
    if (!emailValidation()) {
      alert("Email Invalid");
      allOkay = false;
    } else if (password.length < 6) {
      alert("Password length is less than 6");
      allOkay = false;
    } else if (password !== repassword) {
      alert("Passwords dont match");
      allOkay = false;
    }
    console.log(allOkay);
    if (allOkay === true) {
      try {
        await signup(email, password);
        setIsloggedIn(true)
        navigate("/loggedin");
      } catch (err) {
        alert(err);
      }
      setLoading(false);
    }
  };

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
          <div className="inputComponent">
            <input
              onChange={(e) => setRepassword(e.target.value)}
              placeholder="Renter Password"
              type="password"
            />
          </div>
          <div className="buttonComponent">
            <button disabled={loading || currentUser} onClick={handleClick}>
              {" "}
              Signup
            </button>
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
