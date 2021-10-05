import React, { Component } from "react";

import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import { FaLinkedin, FaGithub, FaAddressCard } from "react-icons/fa";

import ToasterDisplay from "@components/commons/ToasterDisplay";

import contactImg from "@images/about/about-6.jpg";

class Contact extends Component {
  state = {
    rnName: "",
    rnEmail: "",
    rnSubject: "",
    rnMessage: "",
    errors: [],
    textIcon: ""
  };

  handleSubmit = (event) => {
    this.setState({ errors: [] });
    event.preventDefault(event);

    const { rnName, rnEmail, rnSubject, rnMessage } = this.state;
    const fields = [{ rnName: rnName }, { rnEmail: rnEmail }, { rnSubject: rnSubject }, { rnMessage: rnMessage }];
    const errors = [];
    fields.map((field) => {
      const key = Object.keys(field);
      const value = Object.values(field);

      const emailRegEx = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

      if (value[0].length === 0) {
        errors.push({ [key[0]]: "empty" });
      } else if (key[0] === "rnEmail" && !emailRegEx.test(value)) {
        errors.push({ [key[0]]: "syntax" });
      }
      return this.setState({ errors: errors });
    });
    if (errors.length === 0) {
      const templateId = "porfolife_message";

      this.sendFeedback(templateId, {
        subject: this.state.rnSubject,
        message: this.state.rnMessage,
        contact_name: this.state.rnName,
        reply_to: this.state.rnEmail,
        contact_mail: this.state.rnEmail
      });
    } else {
      return ToasterDisplay("Des erreurs ont été détectées !", "fail");
    }
  };

  getTextIcon = (text) => {
    return this.setState({ textIcon: text });
  };

  sendFeedback = (templateId, variables) => {
    init("user_6OIcVDaq2eGBjk8PV1KBA");
    emailjs
      .send("gmail", templateId, variables)
      .then((res) => {
        this.setState({
          rnEmail: "",
          rnMessage: "",
          rnSubject: "",
          rnName: ""
        });
        return ToasterDisplay("Votre message a bien été envoyé !");
      })
      .catch(() => ToasterDisplay("Une erreur est survenue, veuillez réessayer ou contacter l'administrateur", "fail"));
  };

  handleFormErrors = (field) => {
    let message;
    let message2;

    switch (field) {
      case "rnName":
        message = "Veuillez renseigner votre nom";
        break;

      case "rnEmail":
        message = "Votre adresse e-mail est nécessaire";
        message2 = "Le format de l'adresse e-mail n'est pas valide";
        break;

      case "rnSubject":
        message = "Veuillez renseigner un sujet à votre message";
        break;

      case "rnMessage":
        message = "Le champ message est obligatoire";
        break;

      default:
        break;
    }

    const error = this.state.errors.filter((value) => Object.keys(value)[0] === field);

    if (error.length > 0) {
      if (field === "rnEmail") {
        const empty = Object.values(error).filter((value) => Object.values(value).includes("empty"));
        return empty.length > 0 ? message : message2;
      } else {
        return message;
      }
    }
  };

  render() {
    return (
      <div className="contact-form">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-12 col-xl-7 order-2 order-lg-1">
              <div className="section-title text-center mb--50 mt--60">
                <h2 className="title">Me contacter</h2>
                <div className="contact-icons">
                  <span
                    onMouseOver={() => this.getTextIcon("Voir mon profil Linkedin")}
                    onMouseOut={() => this.getTextIcon("")}
                  >
                    <a
                      href="https://www.linkedin.com/in/j%C3%A9r%C3%B4me-poti%C3%A9/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin size="60" />
                    </a>
                  </span>
                  <span
                    onMouseOver={() => this.getTextIcon("Voir mon dépôt Github")}
                    onMouseOut={() => this.getTextIcon("")}
                  >
                    <a
                      href="https://github.com/jerkodeur"
                      title="voir mon dépôt Github"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub size="60" />
                    </a>
                  </span>
                  <span
                    onMouseOver={() => this.getTextIcon("Télécharger mon CV")}
                    onMouseOut={() => this.getTextIcon("")}
                  >
                    <a href="@files/Potié Jérôme - Développeur Web.pdf" download>
                      <FaAddressCard size="60" />
                    </a>
                  </span>
                </div>
                <div className="icons-descr">{this.state.textIcon}</div>
                <p className="description">
                  Je suis disponible pour un entretien téléphonique au: <a href="tel:0660814774">06.60.81.47.74</a> ou
                  par mail:
                  <a href="mailto:jerome.potie@gmail.com"> jerome.potie@gmail.com</a>{" "}
                </p>
              </div>
              <div className="form-wrapper">
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor="item01">Nom *</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.rnName}
                    onChange={(e) => {
                      this.setState({ rnName: e.target.value });
                    }}
                    placeholder="Quel est votre nom"
                  />
                  <small className="form-errors">{this.handleFormErrors("rnName")}</small>

                  <label htmlFor="item02">E-mail *</label>
                  <input
                    type="text"
                    name="email"
                    id="mail"
                    value={this.state.rnEmail}
                    onChange={(e) => {
                      this.setState({ rnEmail: e.target.value });
                    }}
                    placeholder="Adresse e-mail à laquelle je pourrais vous joindre"
                  />
                  <small className="form-errors">{this.handleFormErrors("rnEmail")}</small>

                  <label htmlFor="item03">Sujet *</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={this.state.rnSubject}
                    onChange={(e) => {
                      this.setState({ rnSubject: e.target.value });
                    }}
                    placeholder="Indiquez le sujet de votre message"
                  />
                  <small className="form-errors">{this.handleFormErrors("rnSubject")}</small>

                  <label htmlFor="item04">Message *</label>
                  <textarea
                    type="text"
                    id="message"
                    name="message"
                    value={this.state.rnMessage}
                    onChange={(e) => {
                      this.setState({ rnMessage: e.target.value });
                    }}
                    placeholder="Inscrivez ici le contenu de votre message"
                  />
                  <small className="form-errors">{this.handleFormErrors("rnMessage")}</small>

                  <div className="m-auto w-100 text-center">
                    <button
                      className="rn-button-style--2 btn-solid"
                      type="submit"
                      value="submit"
                      name="submit"
                      id="mc-embedded-subscribe"
                    >
                      Envoyer
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-xl-5 order-1 order-lg-2 mt--125 img-contact">
              <div className="thumbnail">
                <img src={contactImg} alt="contact" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Contact;
