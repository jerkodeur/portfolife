import React, { useState, useEffect } from "react";

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
  const [displayConnectionForm, setDisplayConnectionForm] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const [pseudo, setPseudo] = useState("");

  useEffect(() => {
    setPseudo(isConnect ? sessionStorage.getItem("pseudo") : "");
    setDisplayConnectionForm(false);
  }, [isConnect]);

  const switchConnectionForm = (bool) => {
    setDisplayConnectionForm(bool);
  };

  const switchConnection = (bool) => {
    setIsConnect(bool);
  };

  return (
    <>
      <Helmet pageTitle="Personal Portfolio" />
      <Header color="color-black" isConnect={isConnect} switchConnection={setIsConnect} pseudo={pseudo} />

      <Presentation />
      {displayConnectionForm && <ConnectForm switchConnexion={switchConnection} displayForm={switchConnectionForm} />}
      <ScrollableAnchor id={"about"}>
        <div className="about-area about-position-top pb--60  bg_color--3">
          <AboutMe isConnect={isConnect} displayForm={switchConnectionForm} />
        </div>
      </ScrollableAnchor>

      {/* Start Portfolio Area */}
      <ScrollableAnchor id={"project"}>
        <div className="portfolio-area pb--60 bg_color--7">
          <Projects />
        </div>
      </ScrollableAnchor>
      {/* End Portfolio Area */}

      {/* Start Portfolio Area */}
      <ScrollableAnchor id={"contact"}>
        <div className="portfolio-area pb--120 bg_color--1">
          <Contact />
        </div>
      </ScrollableAnchor>
      {/* End Portfolio Area */}

      {/* <FooterTwo /> */}

      {/* Start Back To Top */}
      <div className="backto-top">
        <ScrollToTop showUnder={160} duration={1500}>
          <FiChevronUp />
        </ScrollToTop>
      </div>
      {/* End Back To Top */}
    </>
  );
};

export default PersonalPortfolio;
