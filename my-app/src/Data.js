import React from "react";

function Data({ patientData, setPatientData }) {
    console.log(patientData);
  return (
    <div>
      <h1>{patientData}</h1>
    </div>
  );
}

export default Data;