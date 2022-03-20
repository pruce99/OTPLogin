import React from "react";
import { useAuth, logout } from "../Login/Authenticate";
import { useNavigate } from "react-router-dom";

export default function Loggedin(props) {
  const currentUser = useAuth();
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/")
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <div>Loggedin as {currentUser?.email}</div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

