import React, { useState } from "react";
import { useHandleObjectForm, useToaster } from "@helpers/customHooks";

import CheckFormFields from "@helpers/CheckFormFields";
import ContactForm from "./ContactForm";

import { sendEmail } from "@service/sendEmail";
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
        return useToaster.success("Votre message a bien été envoyé !");
      })
      .catch(() => useToaster.fail("Une erreur est survenue, veuillez réessayer ou contacter l'administrateur"));
  };

  const handleFormErrors = () => {
    const fieldsToCheck = ["name", "email", "subject", "message"].reduce((object, currentField) => {
      object[currentField] = contactConstraints[currentField];
      object[currentField].value = formContent[currentField];
      return object;
    }, {});
    const errorfields = CheckFormFields(fieldsToCheck);
    if (Object.values(errorfields).some((el) => el)) {
      useToaster.fail("Le projet n'a pas été ajouté, des erreurs ont été détectées !");
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
