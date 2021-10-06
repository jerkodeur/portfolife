import React, { useEffect, useState } from "react";

import { Link, useRouteMatch, useHistory } from "react-router-dom";

import ToasterDisplay from "@components/commons/ToasterDisplay";

const Navbar = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [authUser, setAuthUser] = useState("");

  useEffect(() => {
    setAuthUser(localStorage.getItem("pseudo"));
  }, []);

  const deconnectUser = () => {
    localStorage.clear();
    ToasterDisplay(`Déconnexion effectuée, à bientôt ${authUser} !`);
    history.push("/");
  };

  return (
    <nav className="navbar">
      <h2>
        <Link to={`${url}`}>{authUser} Dashboard</Link>
      </h2>
      <div>
        <button type="button" className="btn btn-danger" onClick={deconnectUser}>
          Déconnexion
        </button>
        <Link to="/">
          <button type="button" className="btn btn-warning">
            Quitter
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
