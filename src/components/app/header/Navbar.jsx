import React from "react";

import propTypes from "prop-types";
import { NavLink } from "react-router-dom";

import Scrollspy from "react-scrollspy";

const Navbar = ({ isConnected }) => (
  <nav className="mainmenunav d-lg-block ml--50">
    <Scrollspy className="mainmenu" items={["about", "project", "contact"]} currentClassName="is-current" offset={-200}>
      <li>
        <a href="#about">À propos de moi</a>
      </li>
      <li>
        <a href="#project">Mes projets</a>
      </li>
      <li>
        <a href="#contact">Me contacter</a>
      </li>
      {isConnected && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </Scrollspy>
  </nav>
);

Navbar.propTypes = {
  isConnected: propTypes.bool.isRequired
};

export default Navbar;
