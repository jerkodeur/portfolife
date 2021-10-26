import React from "react";

import ContactContainer from "./contact/ContactContainer";
import InfoContact from "./contact/InfoContact";

import contactImg from "@images/contact.jpg";

const Contact = () => (
  <div className="contact-form">
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-xl-7 order-2 order-lg-1">
          <InfoContact />
          <ContactContainer />
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

export default Contact;
