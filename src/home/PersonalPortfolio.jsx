import React, {Component, Fragment} from "react"

import Helmet from "../component/common/Helmet"
import {FiChevronUp} from "react-icons/fi"
import ScrollableAnchor, {configureAnchors} from 'react-scrollable-anchor'
import ScrollToTop from 'react-scroll-up'
import Typed from 'typed.js'

import ContactOne from "../elements/contact/ContactOne"
import Header from "../component/header/HeaderThree"
import PortfolioList from "../elements/portfolio/PortfolioList"
import TabTwo from "../elements/tab/TabTwo"

// Offset all anchors by -60 to account for a fixed header
// and scroll more quickly than the default 400ms
configureAnchors({offset: -60, scrollDuration: 2000})
class PersonalPortfolio extends Component {

    state = {
        aboutImg: this.getAboutImage()
    }

    componentDidMount () {
        const options = {
            strings: ['Mobile', 'Fullstack'],
            typeSpeed: 125,
            backSpeed: 50,
            startDelay: 1000,
            backDelay: 2500,
            smartBackspace: true,
            loop: true,
            loopCount: Infinity,
            showCursor: false,
            fadeOut: true,
            fadeOutClass: 'typed-fade-out',
            fadeOutDelay: 500,
        }
        // this.el refers to the <span> in the render() method
        this.typed = new Typed(this.el, options)
    }

    getAboutImage() {
        const prefix = '/assets/images/about/shooting_'
        const random = Math.ceil(Math.random() * 11)
        return `${prefix}${random}.jpg`
    }

    render () {
        let title = 'À propos de moi',
            description = "En reconversion dans le domaine du développement Web et Web mobile, j'ai suivi une formation intensive à la Wild Code School, école spécialisée dans les métiers de la tech et du numérique. Aujourd'hui, suite à mon stage dans l'agence Bluesquare.io, je suis en recherche active afin de décrocher mon premier job dans ma nouvelle vie de dev."

        const SlideList = [
            {
                textPosition: 'text-left',
                category: 'Hello world',
                title: 'Bonjour, moi c\'est Jérôme !<br />',
                transition: 'je suis un .....',
                title2: `<span>Développeur Web <span />`,
                description: "Je suis attiré par le domaine de l'informatique depuis mon plus jeune âge. Après un début de carrière dans la restauration et la livraison, j'ai décidé de me donner les moyens de réaliser mon rêve de gamin... faire du développement mon métier !",
                buttonText: '',
                buttonLink: ''
            }
        ]

        return (
            <Fragment>
                <Helmet pageTitle="Personal Portfolio" />
                    <Header logo="symbol-light" color="color-black" />

                {/* Start Slider Area   */}
                <div className="slider-wrapper">
                    {/* Start Single Slide */}
                    {SlideList.map((value, index) => (
                        <div className="slide personal-portfolio-slider slider-paralax slider-style-3 d-flex align-items-center justify-content-center bg_image bg_image--33" key={index}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 ">
                                        <div className={`inner ${value.textPosition}`}>
                                            {value.category ? <span>{value.category}</span> : ''}
                                            {value.title ? <h1 className="title" dangerouslySetInnerHTML={{__html: value.title}}></h1> : ''}
                                            {value.transition ? <span>{value.transition}</span> : ''}
                                            {value.title2 ?
                                                <div className="">
                                                    <h1 className="title d-inline" dangerouslySetInnerHTML={{__html: value.title2}} />
                                                    <h1 className='title d-inline'>
                                                        <span
                                                            ref={(el) => {this.el = el}}
                                                        />
                                                    </h1>
                                                </div>
                                                : ''}
                                            {value.description ? <p className="description">{value.description}</p> : ''}
                                            {value.buttonText ? <div className="slide-btn"><a className="rn-button-style--2 btn-primary-color" href={`${value.buttonLink}`}>{value.buttonText}</a></div> : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* End Single Slide */}
                </div>
                {/* End Slider Area   */}

                {/* Start About Area */}
                <ScrollableAnchor id={'about'}>
                    <div className="about-area about-position-top pb--60  bg_color--3">
                        <div className="about-wrapper">
                            <div className="container">
                                <div className="row row--20 align-items-end ">
                                    <div className="col-lg-5 justify-content-center align-items-end">
                                        <div className="thumbnail">
                                            <img className="w-100" src={this.state.aboutImg} alt="About Images" />
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="about-inner inner pt--100">
                                            <div className="section-title">
                                                <h2 className="title">{title}</h2>
                                                <p className="description">{description}</p>
                                            </div>
                                            <div className="row mt--30 tab-container">
                                                <TabTwo tabStyle="tab-style--1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollableAnchor>
                {/* End About Area */}

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
                <ScrollableAnchor id={'project'}>
                    <div className="portfolio-area pb--60 bg_color--7">
                        <div className="portfolio-sacousel-inner mb--55 mb_sm--0">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="section-title text-center service-style--3 mb--30 mb_sm--0">
                                            <h2 className="title mt--100">Mes projets</h2>
                                            <p>Découvrez ici mes dernières réalisations, ainsi que les projets sur lesquels j'ai été amené à collaborer.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <PortfolioList stylevariation="text-center mt--40" column="col-lg-4 col-md-6 col-sm-6 col-12" item="6" />
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

                <ScrollableAnchor id={'contact'}>
                    <div className="portfolio-area pb--120 bg_color--1">
                        <ContactOne />
                    </div>
                </ScrollableAnchor>
                {/* End Portfolio Area */}

                {/* <FooterTwo /> */}

                {/* Start Back To Top */}
                <div className="backto-top">
                    <ScrollToTop showUnder={160} duration={1500} >
                        <FiChevronUp />
                    </ScrollToTop>
                </div>
                {/* End Back To Top */}
            </Fragment>
        )
    }
}

export default PersonalPortfolio