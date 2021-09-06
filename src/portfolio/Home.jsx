import React, { useState, useEffect } from "react";

import ScrollableAnchor, { configureAnchors } from "react-scrollable-anchor";
import ScrollToTop from "react-scroll-up";
import { FiChevronUp } from "react-icons/fi";

import AboutMe from "./components/Homepage/aboutMe/AboutMe";
import ConnectForm from "./components/Homepage/connexion/ConnectForm";
import Contact from "./components/Homepage/Contact";
import Header from "./components/Homepage/Header";
import Helmet from "../component/common/Helmet";
import Presentation from "./components/Homepage/Presentation";
import Projects from "./components/Homepage/projects/Projects";

// Offset all anchors by -60 to account for a fixed header
// and scroll more quickly than the default 400ms
configureAnchors({ offset: -60, scrollDuration: 2000 });

const PersonalPortfolio = () => {
  const [displayConnection, setDisplayConnection] = useState(false);
  const [isConnect, setIsConnect] = useState(false);

  const pseudo = sessionStorage.getItem("pseudo");

  useEffect(() => {
    isConnect && setDisplayConnection(false);
  }, [isConnect]);

  useEffect(() => {
    pseudo && setIsConnect(true);
  }, [pseudo]);

  const handleConnexion = () => {
    !isConnect && setDisplayConnection(!displayConnection);
  };

  const switchConnexion = (bool) => {
    setIsConnect(bool);
  };

  return (
    <>
      <Helmet pageTitle="Personal Portfolio" />
      <Header color="color-black" isConnect={isConnect} switchConnexion={switchConnexion} />

      <Presentation />
      {displayConnection && <ConnectForm switchConnexion={switchConnexion} handleConnexion={handleConnexion} />}
      <ScrollableAnchor id={"about"}>
        <div className="about-area about-position-top pb--60  bg_color--3">
          <AboutMe toogleConnexion={handleConnexion} />
        </div>
      </ScrollableAnchor>

      {/* Start Brand Area */}
      {/* <div className="rn-brand-area pb--90 bg_color--1">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="section-title text-center service-style--3 mb--30">
							<h2 className="title">My Best Client</h2>
							<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12 mt--40 mt_sm--5 mt_md--5">
						<Brand branstyle="branstyle--2" />
					</div>
				</div>
			</div>
					</div> */}
      {/* End Brand Area */}

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
