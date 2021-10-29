import React, { useEffect } from "react";

import Typed from "typed.js";

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
  fadeOutDelay: 500
};

const SlideList = [
  {
    textPosition: "text-left",
    pre: "Hello world",
    title: "Bonjour, moi c'est Jérôme !<br />",
    transition: "je suis un .....",
    title2: `<span>Développeur Web <span />`,
    description:
      "Je suis attiré par le domaine de l'informatique depuis mon plus jeune âge. Après un début de carrière dans la restauration et la livraison, j'ai décidé de me donner les moyens de réaliser mon rêve de gamin... faire du développement mon métier !",
    description2:
      "Je suis actuellement à la recherche d'une entreprise afin d'effectuer une alternance de développeur / concepteur d'applications PHP/React.JS chez Simplon.co."
  }
];

const Presentation = () => {
  useEffect(() => {
    new Typed(document.getElementById("text-anim"), options);
  }, []);

  return (
    <div className="slider-wrapper">
      {SlideList.map((value, index) => (
        <div
          className="slide slider-paralax slider-style-3 d-flex align-items-center justify-content-center bg_image"
          key={index}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 ">
                <div className={`inner ${value.textPosition}`}>
                  {value.pre && <span>{value.pre}</span>}
                  {value.title && <h1 className="title" dangerouslySetInnerHTML={{ __html: value.title }}></h1>}
                  {value.transition && <span>{value.transition}</span>}
                  {value.title2 && (
                    <>
                      <h1 className="title d-inline" dangerouslySetInnerHTML={{ __html: value.title2 }} />
                      <h1 className="title d-inline">
                        <span className="text-anim" id="text-anim" />
                      </h1>
                    </>
                  )}
                  {value.description && (
                    <>
                      <p className="description">{value.description}</p>
                      <p className="description2">{value.description2}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Presentation;
