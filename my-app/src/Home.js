import React from "react";
import "./home.css"; // Add CSS styles in a separate file
import QCareLogo from "./images/IMG_2000.png"; // Replace with your actual logo path

export default function PatientDashboard() {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <img src={QCareLogo} alt="QCare Logo" className="logo" />
        <div className="greeting">
          <h2>Hello,</h2>
          <h1>Patient <span className="highlight">1036</span></h1>
        </div>
        <div className="hospital-status">
          <span>Hospital Status</span>
          <button className="status-button">Normal</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Path Progress */}
        <section className="path-progress">
          <h3>Your Path</h3>
          <ul>
            <li>
              <span>Discharge</span>
              <span className="status incomplete">Incomplete</span>
            </li>
            <li>
              <span>Treatment</span>
              <span className="status incomplete">Incomplete</span>
            </li>
            <li>
              <span>Waiting Period</span>
              <span className="time">9:40 pm</span>
            </li>
            <li>
              <span>Diagnostics</span>
              <span className="time">9:10 pm</span>
            </li>
            <li>
              <span>Triage</span>
              <span className="time">8:51 pm</span>
            </li>
          </ul>
        </section>

        {/* Metrics Section */}
        <section className="metrics">
          <div className="metric wait-time">
            <h3>Wait Time</h3>
            <p><span className="highlight">15</span> min</p>
          </div>
          <div className="metric queue">
            <h3>Queue</h3>
            <p><span className="highlight">24</span> in line</p>
          </div>
          <div className="metric map">
            <h3>Map</h3>
            <div className="icon">🗺️</div>
          </div>
          <div className="metric questions">
            <h3>Questions?</h3>
            <div className="icon">💬</div>
          </div>
        </section>
      </main>
    </div>
  );
}