import React from "react";
import Header from "@app/Header";

const error404 = () => (
  <>
    <Header headerPosition="header--transparent" color="color-white" logo="logo-light" />
    {/* Start Page Error  */}
    <div className="error-page-inner bg_color--4">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner">
              <h1 className="title theme-gradient">404!</h1>
              <h3 className="sub-title">Page inexistante</h3>
              <span>La page que vous recherchez n'a pas été trouvée.</span>
              <div className="error-button">
                <a className="rn-button-style--2 btn-solid" href="/">
                  Revenir sur la page d'accueil
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Page Error  */}
  </>
);

export default error404;
