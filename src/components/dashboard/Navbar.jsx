import React from "react";

import { Link, useRouteMatch } from "react-router-dom";
import propTypes from "prop-types";

const Navbar = ({ closeConnexion }) => {
  const { url } = useRouteMatch();

  return (
    <nav className="navbar">
      <h2>
        <Link to={`${url}`}>{localStorage.getItem("pseudo")} Dashboard</Link>
      </h2>
      <div>
        <button type="button" className="btn btn-danger" onClick={closeConnexion}>
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

Navbar.propTypes = {
  closeConnexion: propTypes.func.isRequired
};

export default Navbar;
