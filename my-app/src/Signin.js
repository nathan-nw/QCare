import React from "react";
import "./Signin.css";
import QCareLogo from "./images/IMG_6188.png"; // Import the PNG file
import Icon from "./images/icon.png"
import Decor from "./images/IMG_0384.png";



export default function Signin() {
  return (
    <div className="signin-container">
      <div className="signin-top">
        <img src={QCareLogo} alt="QCare logo" className="signin-logo" />
      </div>
      <div className="icon-middle">
        <img src={Icon} alt="icon" className="icon-logo" />
      </div>
      <div className="signin-bottom">
        <h1 className="signin-header">Enter Patient ID</h1>
        <input
          type="text"
          placeholder="Patient ID"
          className="signin-input"
          aria-label="Patient ID"
        />
        <button className="signin-button">Sign In</button>
      </div>
      <div className="decor-bottom">
        <img src={Decor} alt="decor" className="decor-logo" />
      </div>
    </div>
  );
}
