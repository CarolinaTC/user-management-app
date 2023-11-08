/* This component is to ensure that certain routes or components are only accessible to authenticated users. 
If a user is not authenticated, they are redirected to the login page. 
If they are authenticated, they have access to the protected content defined by the children prop.  */

import React from "react";
import { Navigate } from "react-router-dom";

// render the children on screen if you are authenticate, if not return a redirect login page
const PrivateRoute = ({ children }) => {
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
