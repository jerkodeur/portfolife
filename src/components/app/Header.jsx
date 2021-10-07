import React from "react";

import propTypes from "prop-types";

import Navbar from "./header/Navbar";
import Social from "./header/Social";
import HamburgerMenu from "./header/HamburgerMenu";

import { FaUserSlash } from "react-icons/fa";

const Header = ({ isConnected, closeConnexion }) => {
  window.addEventListener("scroll", function () {
    const value = window.scrollY;
    if (value > 100) {
      document.querySelector(".header--fixed") && document.querySelector(".header--fixed").classList.add("sticky");
    } else {
      document.querySelector(".header--fixed") && document.querySelector(".header--fixed").classList.remove("sticky");
    }
  });

  const elements = document.querySelectorAll(".has-droupdown > a");
  for (const i in elements) {
    if (elements.hasOwnProperty(i)) {
      elements[i].onclick = function () {
        this.parentElement.querySelector(".submenu").classList.toggle("active");
        this.classList.toggle("open");
      };
    }
  }

  return (
    <header className={"header-area header-style-two header--fixed color-black"}>
      <div className="header-wrapper">
        {/* Home page links */}
        <div className="header-left d-flex align-items-center">
          <Navbar isConnected={isConnected} />
        </div>

        {/* Right header side  */}
        <div className="header-right">
          <span className="link">
            {isConnected && <FaUserSlash size="20" className="text-warning ml-3" onClick={closeConnexion} />}
          </span>
          {/* Social icons */}
          <Social />
          <div className="header-btn">
            <a className="rn-btn dark-color" href="@files/Potié Jérôme - Développeur Web Fullstack.pdf" download>
              <span>Télécharger mon CV</span>
            </a>
          </div>

          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isConnected: propTypes.bool.isRequired,
  closeConnexion: propTypes.func.isRequired
};

export default Header;
