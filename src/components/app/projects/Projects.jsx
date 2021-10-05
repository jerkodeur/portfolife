import React from "react";

import PortfolioList from "./PortfolioList";

const Projects = () => {
  return (
    <div className="mb--55 mb_sm--0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center service-style--3 mb--30 mb_sm--0">
              <h2 className="title mt--100">Mes projets</h2>
              <p>
                Découvrez ici mes dernières réalisations, ainsi que les projets sur lesquels j'ai été amené à
                collaborer.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <PortfolioList stylevariation="text-center mt--40" column="col-lg-4 col-md-6 col-sm-6 col-12" item="6" />
        </div>
      </div>
    </div>
  );
};

export default Projects;
