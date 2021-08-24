import React, {Component} from 'react';

import Typed from "typed.js";

class Presentation extends Component {

    componentDidMount() {
        const options = {
            strings: ["Mobile", "Fullstack"],
            typeSpeed: 125,
            backSpeed: 50,
            startDelay: 1000,
            backDelay: 2500,
            smartBackspace: true,
            loop: true,
            loopCount: Infinity,
            showCursor: false,
            fadeOut: true,
            fadeOutClass: "typed-fade-out",
            fadeOutDelay: 500,
        };
        // this.el refers to the <span> in the render() method
        this.typed = new Typed(this.el, options);
    }

    render() {
        const SlideList = [
            {
                textPosition: "text-left",
                category: "Hello world",
                title: "Bonjour, moi c'est Jérôme !<br />",
                transition: "je suis un .....",
                title2: `<span>Développeur Web <span />`,
                description:
                "Je suis attiré par le domaine de l'informatique depuis mon plus jeune âge. Après un début de carrière dans la restauration et la livraison, j'ai décidé de me donner les moyens de réaliser mon rêve de gamin... faire du développement mon métier !",
                description2: "Je suis actuellement à la recherche d'une entreprise afin d'effectuer une alternance de développeur / concepteur d'applications PHP/React.JS chez Simplon.co.",
                buttonText: "",
                buttonLink: "",
            },
        ];

        return (
            <div className="slider-wrapper">
                {
                    SlideList.map((value, index) => (
                        <div className="slide personal-portfolio-slider slider-paralax slider-style-3 d-flex align-items-center justify-content-center bg_image bg_image--33"
                            key={index}
                        >
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 ">
                                        <div className={`inner ${value.textPosition}`}>
                                            {value.category ? <span>{value.category}</span> : ""}
                                            {value.title ? (
                                                <h1
                                                    className="title"
                                                    dangerouslySetInnerHTML={{ __html: value.title }}
                                                ></h1>
                                            ) : (
                                                ""
                                            )}
                                            {value.transition ? <span>{value.transition}</span> : ""}
                                            {value.title2 ? (
                                                <>
                                                    <h1
                                                        className="title d-inline"
                                                        dangerouslySetInnerHTML={{ __html: value.title2 }}
                                                    />
                                                    <h1 className="title d-inline">
                                                        <span
                                                            className="text-anim"
                                                            ref={(el) => {
                                                                this.el = el;
                                                            }}
                                                        />
                                                    </h1>
                                                </>
                                            ) : (
                                                ""
                                            )}
                                            {value.description ? (
                                                <>
                                                    <p className="description">{value.description}</p>
                                                    <p className="description2">{value.description2}</p>
                                                </>
                                            ) : (
                                                ""
                                            )}
                                            {value.buttonText ? (
                                                <div className="slide-btn">
                                                    <a
                                                        className="rn-button-style--2 btn-primary-color"
                                                        href={`${value.buttonLink}`}
                                                    >
                                                        {value.buttonText}
                                                    </a>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default Presentation;