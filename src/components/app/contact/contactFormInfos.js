export const contactFormFields = [
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

export const contactConstraints = {
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
