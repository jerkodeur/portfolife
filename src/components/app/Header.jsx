import React from "react";

import { NavLink } from "react-router-dom";
import propTypes from "prop-types";
import Scrollspy from "react-scrollspy";
import ToasterDisplay from "@components/commons/ToasterDisplay";

import { FaLinkedinIn, FaGithub, FaUserSlash } from "react-icons/fa";
import { FiX, FiMenu } from "react-icons/fi";

const SocialShare = [
  { Social: <FaGithub size="20" />, link: "https://github.com/jerkodeur" },
  {
    Social: <FaLinkedinIn size="20" />,
    link: "https://www.linkedin.com/in/j%C3%A9r%C3%B4me-poti%C3%A9/"
  }
];
const Header = ({ color = "default-color", isConnect, closeConnexion }) => {
  const menuTrigger = () => document.querySelector(".header-wrapper").classList.toggle("menu-open");

  const CLoseMenuTrigger = () => document.querySelector(".header-wrapper").classList.remove("menu-open");

  const disconnnect = () => {
    const pseudo = localStorage.getItem("pseudo");
    localStorage.clear();
    ToasterDisplay(`Au revoir ${pseudo}, tu as bien été déconnecté !`);
    return closeConnexion();
  };

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
    <header className={`header-area header-style-two header--fixed ${color}`}>
      <div className="header-wrapper">
        <div className="header-left d-flex align-items-center">
          <nav className="mainmenunav d-lg-block ml--50">
            <Scrollspy
              className="mainmenu"
              items={["about", "project", "contact"]}
              currentClassName="is-current"
              offset={-200}
            >
              <li>
                <a href="#about">À propos de moi</a>
              </li>
              <li>
                <a href="#project">Mes projets</a>
              </li>
              <li>
                <a href="#contact">Me contacter</a>
              </li>
              {isConnect && (
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
              )}
            </Scrollspy>
          </nav>
        </div>
        <div className="header-right">
          <div className="social-share-inner">
            <ul className="social-share social-style--2 color-theme d-flex justify-content-start liststyle">
              {SocialShare.map((val, i) => (
                <li key={i}>
                  <a href={`${val.link}`} target="_blank" rel="noopener noreferrer">
                    {val.Social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <span className="link">
            {isConnect && <FaUserSlash size="20" className="text-warning ml-3" onClick={disconnnect} />}
          </span>

          <div className="header-btn">
            <a className="rn-btn dark-color" href="@files/Potié Jérôme - Développeur Web Fullstack.pdf" download>
              <span>Télécharger mon CV</span>
            </a>
          </div>
          {/* Start Humberger Menu  */}
          <div className="humberger-menu d-block d-lg-none pl--20">
            <span onClick={menuTrigger} className="menutrigger text-white">
              <FiMenu />
            </span>
          </div>
          {/* End Humberger Menu  */}
          <div className="close-menu d-block d-lg-none">
            <span onClick={CLoseMenuTrigger} className="closeTrigger">
              <FiX />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  color: propTypes.string,
  isConnect: propTypes.bool.isRequired,
  closeConnexion: propTypes.func.isRequired,
  pseudo: propTypes.string
};

export default Header;
