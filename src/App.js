import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import WelcomePage from "./components/WelcomePage";

//import UserContextProvider from './context/UserContext';

function App() {
  // Default page as login
  const [currentPage, setCurrentPage] = useState("login");
  return (
    <div>

      {currentPage === "login" ? <Login /> : <SignUp />}
    </div>
  );
}

export default App;
