import React, { useState } from "react";
import { useHandleObjectForm } from "../../../helpers/customHooks";

import CheckFormFields from "../../commons/forms/CheckFormFields";
import ContactForm from "./ContactForm";
import ToasterDisplay from "@components/commons/ToasterDisplay";

import { sendEmail } from "../../../service/sendEmail";
import { contactConstraints, contactFormFields } from "./contactFormInfos";

const ContactContainer = () => {
  const [formContent, setFormContent] = useHandleObjectForm({});
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault(e);
    if (handleFormErrors()) return;
    sendEmail("portfolife_message", formContent)
      .then(() => {
        setFormContent.reset();
        setFormErrors({});
        return ToasterDisplay("Votre message a bien été envoyé !");
      })
      .catch(() => ToasterDisplay("Une erreur est survenue, veuillez réessayer ou contacter l'administrateur", "fail"));
  };

  const handleFormErrors = () => {
    const fieldsToCheck = ["name", "email", "subject", "message"].reduce((object, currentField) => {
      object[currentField] = contactConstraints[currentField];
      object[currentField].value = formContent[currentField];
      return object;
    }, {});
    const errorfields = CheckFormFields(fieldsToCheck);
    if (Object.values(errorfields).some((el) => el)) {
      ToasterDisplay("Le projet n'a pas été ajouté, des erreurs ont été détectées !", "fail");
      setFormErrors(errorfields);
      return true;
    }
    return false;
  };

  return (
    <div className="form-wrapper">
      <ContactForm
        handleSubmit={handleSubmit}
        fields={contactFormFields}
        setFormContent={setFormContent}
        content={formContent}
        errors={formErrors}
      />
    </div>
  );
};

export default ContactContainer;
