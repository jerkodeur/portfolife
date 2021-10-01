import React from "react";
import { Redirect, Route } from "react-router";

const AdminRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const isAuthenticated = sessionStorage.getItem("pseudo") !== null && sessionStorage.getItem("token") !== null;
        return isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
};

export default AdminRoute;