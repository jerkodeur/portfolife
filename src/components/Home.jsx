import React from "react";
import { useBoolean, useConnexion } from "@helpers/customHooks";

import ScrollableAnchor, { configureAnchors } from "react-scrollable-anchor";
import ScrollToTop from "react-scroll-up";
import { FiChevronUp } from "react-icons/fi";

import AboutMe from "@app/aboutMe/AboutMe";
import ConnectForm from "@app/connexion/ConnectForm";
import Contact from "@app/Contact";
import Header from "@app/Header";
import Helmet from "@components/commons/Helmet";
import Presentation from "@app/Presentation";
import Projects from "@app/projects/Projects";

// Offset all anchors by -60 to account for a fixed header
// and scroll more quickly than the default 400ms
configureAnchors({ offset: -60, scrollDuration: 2000 });

const PersonalPortfolio = () => {
  const [displayConnectForm, setDisplayConnectForm] = useBoolean(false);
  const [isConnected, setIsConnected] = useConnexion(localStorage.getItem("token") ? true : false);

  return (
    <>
      <Helmet pageTitle="Personal Portfolio" />
      <Header isConnected={isConnected} closeConnexion={setIsConnected.off} />

      {/* Start Presentation Area */}
      <Presentation />

      {/* Start Connexion Area */}
      {displayConnectForm && (
        <ConnectForm activeConnexion={setIsConnected.on} hideConnectForm={setDisplayConnectForm.off} />
      )}

      {/* Start AboutMe Area */}
      <ScrollableAnchor id={"about"}>
        <div className="about-area about-position-top pb--60  bg_color--3">
          <AboutMe isConnected={isConnected} showConnectForm={setDisplayConnectForm.on} />
        </div>
      </ScrollableAnchor>

      {/* Start Projects Area */}
      <ScrollableAnchor id={"project"}>
        <div className="portfolio-area pb--60 bg_color--7">
          <Projects />
        </div>
      </ScrollableAnchor>

      {/* Start Contact Area */}
      <ScrollableAnchor id={"contact"}>
        <div className="portfolio-area pb--120 bg_color--1">
          <Contact />
        </div>
      </ScrollableAnchor>

      {/* Start Back To Top */}
      <div className="backto-top">
        <ScrollToTop showUnder={160} duration={1500}>
          <FiChevronUp />
        </ScrollToTop>
      </div>
    </>
  );
};

export default PersonalPortfolio;
