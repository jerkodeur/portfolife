import React from "react";

import { FiX, FiMenu } from "react-icons/fi";

const HamburgerMenu = () => {
  const menuTrigger = () => document.querySelector(".header-wrapper").classList.toggle("menu-open");
  const CLoseMenuTrigger = () => document.querySelector(".header-wrapper").classList.remove("menu-open");

  return (
    <>
      <div className="humberger-menu d-block d-lg-none pl--20">
        <span onClick={menuTrigger} className="menutrigger text-white">
          <FiMenu />
        </span>
      </div>
      <div className="close-menu d-block d-lg-none">
        <span onClick={CLoseMenuTrigger} className="closeTrigger">
          <FiX />
        </span>
      </div>
    </>
  );
};

export default HamburgerMenu;
