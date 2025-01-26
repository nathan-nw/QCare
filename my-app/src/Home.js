import React, { useEffect } from "react";
import "./home.css"; // Add CSS styles in a separate file
import QCareLogo from "./images/IMG_2000.png"; // Replace with your actual logo path
import { useNavigate } from "react-router-dom";
import People from "./images/Group.png";

import { FaHeartPulse } from "react-icons/fa6";
import { FaBoltLightning } from "react-icons/fa6";
import { SlSpeech } from "react-icons/sl";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function PatientDashboard({ patientData, setPatientData }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!patientData) {
      navigate("/Signin"); // Navigate to SignIn if patientData is null
    }
  }, [patientData, navigate]);
 

  if (!patientData) {
    return null; // Prevent rendering if patientData is null
  }

  const extractedId = patientData.id.split("_")[1];


  const triageElapsed = patientData.triage_category;

  console.log(triageElapsed);

  var triage = "upcoming", diagnostics = "upcoming", waiting = "upcoming", treatment = "upcoming", discharge = "upcoming";

  if(triageElapsed >= 5){
    discharge = "completed";
  } 
  if(triageElapsed >= 4){
    treatment = "completed";
  }
  if(triageElapsed >= 3){ 
    waiting = "completed";
  }
  if(triageElapsed >= 2){
    diagnostics = "completed";
  }
  if(triageElapsed >= 1){
    triage = "completed"; 
  }

  console.log(triage, diagnostics, waiting, treatment, discharge);

    const timelineSteps = [
      { id: 1, name: "Triage", status: triage },
      { id: 2, name: "Diagnostics", status: diagnostics },
      { id: 3, name: "Waiting Period", status: waiting },
      { id: 4, name: "Treatment", status: treatment },
      { id: 5, name: "Discharge", status: discharge },
    ];



  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <img src={QCareLogo} alt="QCare Logo" className="logo" />
        <div className="greeting">
          <h2>Hello,</h2>
          <h1>
            Patient <span className="highlight-id">{extractedId}</span>
          </h1>
        </div>
        <div className="hospital-status">
          <span>Hospital Status</span>
          <button className="status-button">Normal</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
      <div className="path-progress-container">
    <div className="Peoplepic">
      <img src={People} alt="People" className="People" />
    </div>
        {/* Path Progress */}
        <section className="path-progress">
          <h3>Your Path</h3>
          <div className="timeline-container-vertical">
            {timelineSteps.map((step, index) => (
              <div key={step.id} className="timeline-step-vertical">
                {/* Outer Circle */}
                <div
                  className={`timeline-outer-circle ${
                    step.status == "completed"
                      ? "completed"
                      : step.status == "current"
                      ? "current"
                      : "upcoming"
                  }`}
                ></div>

                {/* Connecting Line */}
                {index < timelineSteps.length - 1 && (
                  <div
                    className={`timeline-line-vertical ${
                      step.status == "completed" ? "completed" : "upcoming"
                    }`}
                  ></div>
                )}

                {/* Step Info */}
                <div className="timeline-step-info">
                  <p className="timeline-step-name">{step.name}</p>
                  {step.time && <p className="timeline-time">{step.time}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
        </div>  

        {/* Metrics Section */}
        <section className="metrics">
          <div className="metric wait-time">
            <h1 className="labwork-title">
              <FaHeartPulse className="icon-large" /> Lab Work
            </h1>
            <p>
              <span className="highlight">{patientData.status.investigations.labs}</span>
            </p>
          </div>
          <div className="metric queue">
            <h1 className="queue-title">
              <FaBoltLightning className="icon-large" /> Queue
            </h1>
            <p>
              <span className="highlight">{patientData.queue_position.category}</span> in line
            </p>
          </div>
          <div className="metric map">
            <h1 className="map-title">Map</h1>
            <div className="icon">
              <FaMapMarkedAlt className="icon-xlarge-map" />
            </div>
          </div>
          <div className="metric questions">
            <h1 className="question-title">Questions?</h1>
            <div className="icon">
              <SlSpeech className="icon-xlarge-q" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}