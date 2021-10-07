import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Proptypes from "prop-types";

import AboutTabs from "./AboutTabs";

const AboutMe = ({ isConnected, showConnectForm }) => {
  const [aboutImg, setAboutImg] = useState();

  const description =
    "En reconversion dans le domaine du développement Web et Web mobile, j'ai effectué une formation intensive à la Wild Code School, école spécialisée dans le numérique dans laquelle j'ai fait mes premières armes en Javascript (React / NodeJs). À la suite de mon stage dans l'agence Bluesquare.io, et après avoir obtenu mon titre professionnel, j'ai suivi une nouvelle formation de 3 mois en PHP / Symfony à Simplon.co. Je souhaite à présent réaliser une alternance afin de passer le titre de concepteur/développeur d'applications, ce qui me permettra d'acquérir une expérience suffisante pour démarrer ma nouvelle carrière de développeur.";

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
                <p className="description">{description}</p>
              </div>
              <div className="row mt--30 tab-container">
                <AboutTabs tabStyle="tab-style--1" />
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
