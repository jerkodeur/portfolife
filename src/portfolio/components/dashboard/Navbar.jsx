import React from "react";

import { Link, useRouteMatch, useHistory } from "react-router-dom";

const Navbar = () => {
  let history = useHistory();
  const { url } = useRouteMatch();

  let user = localStorage.getItem("pseudo").toLowerCase();
  user = user[0].toUpperCase() + user.slice(1);

  const deconnexion = () => {
    localStorage.clear();
    history.push("/");
  }

  return (
    <nav className="navbar">
      <h2>
        <Link to={`${url}`}>{user} Dashboard</Link>
      </h2>
      <div>
        <button type="button" className="btn btn-danger" onClick={() => deconnexion()}>Déconnexion</button>
        <Link to='/'><button type="button" className="btn btn-warning">Quitter</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;
