import React, { useEffect } from "react";
import "./home.css"; // Add CSS styles in a separate file
import QCareLogo from "./images/IMG_2000.png"; // Replace with your actual logo path
import { useNavigate } from "react-router-dom";

export default function PatientDashboard({ patientData, setPatientData }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!patientData) {
      navigate("/Signin"); // Navigate to SignIn if patientData is null
    }
  }, [patientData, navigate]);

  const timelineSteps = [
    { id: 1, name: "Triage", status: "completed" },
    { id: 2, name: "Diagnostics", status: "completed" },
    { id: 3, name: "Waiting Period", status: "current" },
    { id: 4, name: "Treatment", status: "upcoming" },
    { id: 5, name: "Discharge", status: "upcoming" },
  ];

  if (!patientData) {
    return null; // Prevent rendering if patientData is null
  }

  const extractedId = patientData.id.split("_")[1];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <img src={QCareLogo} alt="QCare Logo" className="logo" />
        <div className="greeting">
          <h2>Hello,</h2>
          <h1>
            Patient <span className="highlight">{extractedId}</span>
          </h1>
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
          <div className="timeline-container-vertical">
            {timelineSteps
              .slice()
              .reverse() // Reverse the order to start with Discharge at the top
              .map((step, index) => (
                <div key={step.id} className="timeline-step-vertical">
                  {/* Outer Circle */}
                  <div
                    className={`timeline-outer-circle ${
                      step.status === "completed"
                        ? "completed"
                        : step.status === "current"
                        ? "current"
                        : "upcoming"
                    }`}
                  >
                    {/* Inner Circle */}
                    <div
                      className={`timeline-inner-circle ${
                        step.status === "current" ? "current" : ""
                      }`}
                    ></div>
                  </div>

                  {/* Step Name and Time */}
                  <div className="timeline-step-info">
                    <p className="timeline-step-name">{step.name}</p>
                    {step.time && <p className="timeline-time">{step.time}</p>}
                  </div>

                  {/* Connecting Line */}
                  {index < timelineSteps.length - 1 && (
                    <div
                      className={`timeline-line-vertical ${
                        step.status === "completed" ? "completed" : "upcoming"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
          </div>
        </section>

        {/* Metrics Section */}
        <section className="metrics">
          <div className="metric wait-time">
            <h3>Wait Time</h3>
            <p>
              <span className="highlight">15</span> min
            </p>
          </div>
          <div className="metric queue">
            <h3>Queue</h3>
            <p>
              <span className="highlight">24</span> in line
            </p>
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