import React, { useState } from "react";
import { useHandleObjectForm } from "../../../helpers/customHooks";

import CheckFormFields from "../../commons/forms/CheckFormFields";
import ContactForm from "./ContactForm";
import ToasterDisplay from "@components/commons/ToasterDisplay";

import { sendEmail } from "../../../service/sendEmail";

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
    const formConstraints = {
      name: {
        required: true,
        type: ["string"]
      },
      subject: {
        required: true,
        type: ["string"]
      },
      message: {
        required: true,
        type: ["string"]
      },
      email: {
        required: true,
        type: ["string"],
        regex: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
      }
    };

    const fieldsToCheck = ["name", "email", "subject", "message"].reduce((object, currentField) => {
      object[currentField] = formConstraints[currentField];
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

  const fields = [
    {
      id: "name",
      placeholder: "Merci de renseigner votre nom",
      label: "Nom"
    },
    {
      id: "email",
      placeholder: "Merci d'indiquer l'adresse mail à laquelle je pourrais vous joindre",
      label: "E-mail"
    },
    {
      id: "subject",
      placeholder: "Merci d'indiquez le sujet de votre message",
      label: "Sujet"
    },
    {
      id: "message",
      placeholder: "Merci d'inscrire le contenu de votre message",
      label: "Message"
    }
  ];
  return (
    <div className="form-wrapper">
      <ContactForm
        handleSubmit={handleSubmit}
        fields={fields}
        setFormContent={setFormContent}
        content={formContent}
        errors={formErrors}
      />
    </div>
  );
};

export default ContactContainer;
