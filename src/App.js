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
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme) {
      setDarkMode(storedTheme === 'dark');
    }
  })

  return (
    <ThemeProvider theme={localStorage.getItem('darkMode') == "dark" ? darkTheme : lightTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<PrivateRoute><WelcomePage /></PrivateRoute>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>

    </ThemeProvider >
  );
}

export default App;
