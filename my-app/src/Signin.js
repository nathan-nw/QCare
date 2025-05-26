import React, {useState} from "react";
import "./Signin.css";
import QCareLogo from "./images/IMG_6188.png"; // Import the PNG file
import Icon from "./images/icon.png"
import Decor from "./images/IMG_0384.png";

import { useNavigate } from "react-router-dom"; 

export default function Signin({ patientData, setPatientData }) {

  const [patientId, setPatientId] = useState(""); // Stores user input for patient ID
  const [error, setError] = useState(null); // Stores any error messages
  
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const submitPatientId = async () => {
    // Call fetchPatientData and redirect upon success
    const isSuccessful = await fetchPatientData();
    if (isSuccessful) {
      navigate("/"); // Redirect to the homepage
    }
  };

  // const fetchPatientData = async () => {
  //   if (!patientId.trim()) {
  //     setError("Patient ID cannot be empty.");
  //     setPatientData(null);
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:5001/qcare-b7741/us-central1/generateMockPatient?patientId=${patientId}`
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.statusText}`);
  //     }

  //     const data = await response.json();
  //     setPatientData(data); // Set the fetched patient data
  //     setError(null); // Clear any previous errors
  //   } catch (err) {
  //     setError(err.message); // Handle error from fetch
  //     setPatientData(null); // Clear patient data if there's an error
  //   }
  // };

  const fetchPatientData = async () => {
    if (!patientId.trim()) {
      setError("Patient ID cannot be empty.");
      setPatientData(null);
      return false;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5001/qcare-b7741/us-central1/generateMockPatient?patientId=${patientId}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setPatientData(data); // Set the fetched patient data
      setError(null); // Clear any previous errors
      return true; // Indicate success
    } catch (err) {
      setError(err.message); // Handle error from fetch
      setPatientData(null); // Clear patient data if there's an error
      return false; // Indicate failure
    }
  };


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
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Enter Patient ID (e.g., anon_1234)"
          className="signin-input"
          aria-label="Patient ID"
        />
        <button className="signin-button" onClick={submitPatientId}>Sign In</button>
        {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          <strong>Error:</strong> {error}
        </p>
      )}
      </div>
     
    </div>
  );
}
