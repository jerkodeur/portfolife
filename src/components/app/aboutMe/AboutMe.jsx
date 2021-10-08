import React, { useEffect, useState } from "react";

import Proptypes from "prop-types";

import AboutTabs from "./AboutTabs";
import { myDescription } from "./AboutInfos";

const AboutMe = ({ isConnected, showConnectForm }) => {
  const [aboutImg, setAboutImg] = useState();

  useEffect(() => {
    const prefix = "/assets/images/about/shooting_";
    const random = Math.ceil(Math.random() * 11);
    setAboutImg(`${prefix}${random}.jpg`);
  }, []);

  return (
    <div className="about-wrapper">
      <div className="container">
        <div className="row row--20">
          <div className="col-lg-5 justify-content-center align-items-end">
            <div className="thumbnail">
              <img src={aboutImg} alt="About Images" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about-inner inner pt--100">
              <div className="section-title">
                <h2 className="title">
                  À propos de {!isConnected ? <span onClick={showConnectForm}> moi</span> : "moi"}
                </h2>
                <p className="description">{myDescription}</p>
              </div>
              <div className="row mt--30 tab-container">
                <AboutTabs />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AboutMe.propTypes = {
  isConnected: Proptypes.bool.isRequired,
  showConnectForm: Proptypes.func.isRequired
};

export default AboutMe;
