import React from "react";
import "./Signin.css";

import logo from "./images/QCare.png";
export default function Signin() {
  return (
    <div className="signin-container">
      <img src={logo} className="signin-logo" alt="logo" />
      <h1 className="signin-header">ENTER PATIENT ID</h1>
      <input type="text" placeholder="Patient ID" className="signin-input" />
      <button className="signin-button">Sign In</button>
    </div>
  );
}
