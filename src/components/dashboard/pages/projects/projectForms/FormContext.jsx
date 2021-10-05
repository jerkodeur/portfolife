import React from "react";

import propTypes from "prop-types";
import Input from "@components/commons/forms/Input";

const FormContext = ({ formErrors, handleForm, formDatas, keyPressHandler, updatedField }) => {
  const { context, contextUrl } = formDatas;
  const { label, value, error } = updatedField;

  formErrors[label] = updatedField && error;

  return (
    <fieldset
      className={`multiple-fields-wrapper ${formErrors.context || formErrors.contextUrl ? "error" : undefined}`}
    >
      <legend>Contexte du projet</legend>
      {/* Context */}
      <Input
        onKeyPress={keyPressHandler}
        error={formErrors.context}
        id="context"
        isRequired
        label="Contexte"
        placeholder="Entreprise ou école ou a été réalisé le projet"
        setValue={(e) => handleForm(e)}
        value={label === "context" ? value : context}
      />
      {/* Context url */}
      <Input
        onKeyPress={keyPressHandler}
        error={formErrors.contextUrl}
        id="contextUrl"
        label="Lien de l'établissement"
        placeholder="Lien de l'établissement du contexte"
        type="url"
        setValue={(e) => handleForm(e)}
        value={label === "contextUrl" ? value : contextUrl}
      />
    </fieldset>
  );
};

FormContext.defaultProps = {
  formErrors: {},
  updatedField: {}
};

FormContext.propTypes = {
  formDatas: propTypes.shape({
    context: propTypes.string,
    contextUrl: propTypes.string
  }).isRequired,
  formErrors: propTypes.objectOf(propTypes.string),
  handleForm: propTypes.func.isRequired,
  updatedField: propTypes.shape()
};

export default FormContext;
