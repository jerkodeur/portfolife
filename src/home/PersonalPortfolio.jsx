import React, { Component } from "react";

import Helmet from "../component/common/Helmet";
import { FiChevronUp } from "react-icons/fi";
import ScrollableAnchor, { configureAnchors } from "react-scrollable-anchor";
import ScrollToTop from "react-scroll-up";

import ContactOne from "../elements/contact/ContactOne";
import Header from "../component/header/HeaderThree";
import PortfolioList from "../elements/portfolio/PortfolioList";
import AboutMe from '../component/personal/AboutMe'
import Presentation from '../component/personal/Presentation'

// Offset all anchors by -60 to account for a fixed header
// and scroll more quickly than the default 400ms
configureAnchors({ offset: -60, scrollDuration: 2000 });
class PersonalPortfolio extends Component {

  render() {

    return (
      <>
        <Helmet pageTitle="Personal Portfolio" />
        <Header logo="symbol-light" color="color-black" />

        <Presentation />

        <ScrollableAnchor id={"about"}>
          <AboutMe />
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
            <div className="portfolio-sacousel-inner mb--55 mb_sm--0">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-title text-center service-style--3 mb--30 mb_sm--0">
                      <h2 className="title mt--100">Mes projets</h2>
                      <p>
                        Découvrez ici mes dernières réalisations, ainsi que les
                        projets sur lesquels j'ai été amené à collaborer.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <PortfolioList
                    stylevariation="text-center mt--40"
                    column="col-lg-4 col-md-6 col-sm-6 col-12"
                    item="6"
                  />
                </div>
                {/* <div className="row">
                    <div className="col-lg-12">
                        <div className="view-more-btn mt--60 mt_sm--30 text-center">
                            <a className="rn-button-style--2 btn-solid" href="/blog"><span>En voir plus</span></a>
                        </div>
                    </div>
                </div> */}
              </div>
            </div>
          </div>
        </ScrollableAnchor>
        {/* End Portfolio Area */}

        {/* Start Portfolio Area */}
        <ScrollableAnchor id={"contact"}>
          <div className="portfolio-area pb--120 bg_color--1">
            <ContactOne />
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
  }
}

export default PersonalPortfolio;
