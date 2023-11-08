import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import WelcomePage from "./components/WelcomePage";
import PrivateRoute from "./components/PrivateRoute";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";



function App() {

  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<PrivateRoute><WelcomePage /></PrivateRoute>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>


  );
}

export default App;
