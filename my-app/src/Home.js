import React from "react";
import "./home.css";

export default function Home() {
  return (
    <div className="home">
      <h1>Patient Number:</h1>
      <div className="columns">
        <div className="home-container">
          <div className="container-header">
            <h1>Est Wait time</h1>
          </div>
          <div className="container-content">
            <p>Additional information here</p>
          </div>
        </div>
        <div className="home-container">
          <div className="container-header">
            <h1>Queue</h1>
          </div>
          <div className="container-content">
            <p>Additional queue details</p>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="home-container">
          <div className="container-header">
            <h1>Current Patients</h1>
          </div>
          <div className="container-content">
            <p>Details about current patients</p>
          </div>
        </div>
        <div className="home-container">
          <div className="container-header">
            <h1>Staff Information</h1>
          </div>
          <div className="container-content">
            <p>Details about staff</p>
          </div>
        </div>
      </div>
    </div>
  );
}
