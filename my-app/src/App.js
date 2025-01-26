import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import Home from "./Home";
import Qbuddy from "./Qbuddy";
import TestFetch from "./testFetch"; // Correctly imported
import Data from "./Data";

export default function App() {
  const [patientData, setPatientData] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/Signin"
          element={
            <Signin patientData={patientData} setPatientData={setPatientData} />
          }
        />
        <Route
          path="/"
          element={
            <Home patientData={patientData} setPatientData={setPatientData} />
          }
        />
        <Route path="/Qbuddy" element={<Qbuddy />} />
        <Route
          path="/Data"
          element={
            <Data patientData={patientData} setPatientData={setPatientData} />
          }
        />
        <Route
          path="/testFetch"
          element={
            <TestFetch
              patientData={patientData}
              setPatientData={setPatientData}
            />
          }
        />
      </Routes>
    </Router>
  );
}
