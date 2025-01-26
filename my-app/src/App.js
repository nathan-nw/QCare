import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import Home from "./Home";
import Qbuddy from "./Qbuddy";
import TestFetch from "./testFetch"; // Correctly imported

export default function App() {
  const [patientData, setPatientData] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/Signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route path="/Qbuddy" element={<Qbuddy />} />
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