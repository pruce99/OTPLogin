import React from "react";
import Login from "../Components/Login/Login";
import Signup from "../Components/Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nopage from "../Components/Nopage/Nopage";
import Loggedin from "../Components/Loggedin/Loggedin";

export default function Allroutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Nopage />} />
          <Route path="/loggedin" element={<Loggedin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
