import React, { useContext } from "react";
import Login from "../Components/Login/Login";
import Signup from "../Components/Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nopage from "../Components/Nopage/Nopage";
import Loggedin from "../Components/Loggedin/Loggedin";
import { LoginContext } from "../Contexts/LoginContext";

export default function Allroutes() {
  const {isLoggedin,setIsloggedIn} = useContext(LoginContext)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Nopage />} />
          {
            isLoggedin && 
          <Route path="/loggedin" element={<Loggedin />} />
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}
