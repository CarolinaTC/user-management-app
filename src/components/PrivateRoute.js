import React from "react";
import { Navigate, Route } from "react-router-dom";


// render the children on screen if you are authenticate, if not return a redirect login page
const PrivateRoute = ({ children }) => {
  console.log('children', children)
  console.log('storage', localStorage.token)
  if (localStorage.token === undefined) {
    return (
      <Navigate to="/login" />
    );
  } else {
    return (
      children
    );
  }
};

export default PrivateRoute;
