import React, { useContext } from "react";
import { useAuth, logout } from "../Login/Authenticate";
import { useNavigate } from "react-router-dom";
import "./Loggedin.scss";
import { LoginContext } from "../../Contexts/LoginContext";

export default function Loggedin(props) {
  const {isLoggedin,setIsloggedIn} = useContext(LoginContext)
  const currentUser = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setIsloggedIn(false)
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div style={{marginLeft:"20px", marginTop:"20px"}}>
      {currentUser?.email ? (
        <div>
          <h3>
            Logged in as <b>{currentUser?.email}</b>
          </h3>
        </div>
      ) : (
        <div>Logged In using your phone number</div>
      )}
      <div className="buttonComponent">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
