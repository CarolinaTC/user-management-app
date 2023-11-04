import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import WelcomePage from "./components/WelcomePage";



function App() {

  const [currentPage, setCurrentPage] = useState("");
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </Router>

      {/*      {currentPage === "login" ? <Login /> : <SignUp />} */}
    </div>
  );
}

export default App;
