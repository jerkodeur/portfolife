import React from "react";

import propTypes from "prop-types";

import Input from "@commons/forms/Input";

const ContactForm = ({ handleSubmit, setFormContent, fields, content, errors }) => (
  <form onSubmit={handleSubmit}>
    {fields.map((field) => (
      <Input
        error={errors[field.id]}
        key={field.id}
        id={field.id}
        placeholder={field.placeholder}
        value={content[field.id]}
        setValue={(e) => setFormContent.update(`${field.id}`, e.target.value)}
        isRequired={!field.isRequired ?? true}
        label={field.label}
      />
    ))}

    <div className="m-auto w-100 text-center">
      <button className="rn-button-style--2 btn-solid" type="submit" id="mc-embedded-subscribe">
        Envoyer
      </button>
    </div>
  </form>
);

ContactForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  fields: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      label: propTypes.string.isRequired,
      placeholder: propTypes.string.isRequired,
      value: propTypes.string,
      isRequired: propTypes.bool,
      error: propTypes.string
    }).isRequired
  ).isRequired,
  setFormContent: propTypes.object.isRequired
};

export default ContactForm;
