import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import WelcomePage from "./components/WelcomePage";
import PrivateRoute from "./components/PrivateRoute";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";



function App() {

  // color theme

  const lightTheme = createTheme({
    palette: {
      background: {
        default: '#ffffff', // Light mode background color
      },
      text: {
        primary: '#333333', // Light mode text color
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      background: {
        default: '#121212', // Dark mode background color
      },
      text: {
        primary: '#ffffff', // Dark mode text color
      },
    },
  });
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme) {
      setDarkMode(storedTheme === 'dark');
    }
  })
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const root = document.documentElement;

    // Update the custom properties based on the mode
    if (localStorage.getItem('darkMode') == "dark") {
      root.style.setProperty('--background-color', lightTheme.palette.background.default);
      root.style.setProperty('--text-color', lightTheme.palette.text.primary);
    } else {
      root.style.setProperty('--background-color', darkTheme.palette.background.default);
      root.style.setProperty('--text-color', darkTheme.palette.text.primary);
    }
  };
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<PrivateRoute><WelcomePage /></PrivateRoute>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>

  );
}

export default App;
