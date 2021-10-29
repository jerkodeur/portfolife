import React from "react";
import { Redirect, Route } from "react-router";
import jwt from "jsonwebtoken";
import { useToaster, useConnexion } from "../helpers/customHooks";

const AdminRoute = ({ children, ...rest }) => {
  const [, setConnection] = useConnexion();
  let token = localStorage.getItem("token");
  let decodedToken = jwt.decode(token);
  let currentDate = new Date();

  const NotAuthorize = (type, location = "/") => {
    if (type === "expired") {
      setConnection.off("Vous avez été déconnecté par le serveur!");
      return useToaster.fail("Temps de connexion dépassé, merci de vous reconnecter");
    } else {
      useToaster.fail("Accès non autorisée !!!");
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location }
          }}
        />
      );
    }
  };

  const isTokenValid = token && decodedToken.exp * 1000 > currentDate.getTime();
  const isAuthenticated = localStorage.getItem("role") === "superadmin" && localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuthenticated && isTokenValid
          ? children
          : token && !isTokenValid
          ? NotAuthorize("expired", location)
          : NotAuthorize("unauthorized", location);
      }}
    />
  );
};

export default AdminRoute;
