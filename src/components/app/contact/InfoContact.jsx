import React, { useState } from "react";

import { FaAddressCard, FaGithub, FaLinkedin } from "react-icons/fa";

const InfoContact = () => {
  const [iconDescr, setIconDescr] = useState("");

  return (
    <div className="section-title text-center mb--50 mt--60">
      <h2 className="title">Me contacter</h2>
      <div className="contact-icons">
        <span onMouseOver={() => setIconDescr("Voir mon profil Linkedin")} onMouseOut={() => setIconDescr("")}>
          <a href="https://www.linkedin.com/in/j%C3%A9r%C3%B4me-poti%C3%A9/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size="60" />
          </a>
        </span>
        <span onMouseOver={() => setIconDescr("Voir mon dépôt Github")} onMouseOut={() => setIconDescr("")}>
          <a
            href="https://github.com/jerkodeur"
            title="voir mon dépôt Github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size="60" />
          </a>
        </span>
        <span onMouseOver={() => setIconDescr("Télécharger mon CV")} onMouseOut={() => setIconDescr("")}>
          <a href="@files/Potié Jérôme - Développeur Web.pdf" download>
            <FaAddressCard size="60" />
          </a>
        </span>
      </div>
      <div className="icons-descr">{iconDescr}</div>
      <p className="description">
        Je suis disponible pour un entretien téléphonique au: <a href="tel:0660814774">06.60.81.47.74</a> ou par mail:
        <a href="mailto:jerome.potie@gmail.com"> jerome.potie@gmail.com</a>{" "}
      </p>
    </div>
  );
};

export default InfoContact;
