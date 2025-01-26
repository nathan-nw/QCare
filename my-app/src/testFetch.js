import React, { useState } from "react";

function TestFetch (patientData, setPatientData) {
  // const [patientData, setPatientData] = useState(null); 
  const [patientId, setPatientId] = useState(""); // Stores user input for patient ID
  const [error, setError] = useState(null); // Stores any error messages

  const fetchPatientData = async () => {
    if (!patientId.trim()) {
      setError("Patient ID cannot be empty.");
      setPatientData(null);
      return;
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
    } catch (err) {
      setError(err.message); // Handle error from fetch
      setPatientData(null); // Clear patient data if there's an error
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", textAlign: "center" }}>
      <h1>Fetch Patient Data</h1>
      <p>Enter the Patient ID below to fetch their information from the backend.</p>
      {/* Input field for Patient ID */}
      <input
        type="text"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        placeholder="Enter Patient ID (e.g., anon_1234)"
        style={{
          padding: "10px",
          width: "80%",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <br />
      {/* Button to trigger fetch */}
      <button
        onClick={fetchPatientData}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Fetch Data
      </button>

      {/* Display errors, if any */}
      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          <strong>Error:</strong> {error}
        </p>
      )}

      {/* Display fetched patient data */}
      {patientData && Object.keys(patientData).length > 0 && (
  <div style={{ marginTop: "20px", textAlign: "left" }}>
    <h3>Patient Data:</h3>
    <p><strong>ID:</strong> {patientData.id || "N/A"}</p>
    <p><strong>Arrival Time:</strong> {patientData.arrival_time || "N/A"}</p>
    {patientData.queue_position ? (
      <>
        <p>
          <strong>Queue Position:</strong> Global -{" "}
          {patientData.queue_position.global || "N/A"}, Category -{" "}
          {patientData.queue_position.category || "N/A"}
        </p>
      </>
    ) : (
      <p><strong>Queue Position:</strong> Not available</p>
    )}
    <p><strong>Status:</strong> {patientData.status?.current_phase || "N/A"}</p>
    <p><strong>Time Elapsed:</strong> {patientData.time_elapsed || "N/A"} mins</p>
    <p><strong>Triage Category:</strong> {patientData.triage_category || "N/A"}</p>
  </div>
)}
    </div>
  );
};

export default TestFetch;