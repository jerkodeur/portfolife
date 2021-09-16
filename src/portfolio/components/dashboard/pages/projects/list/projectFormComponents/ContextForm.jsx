import React from "react";

import propTypes from "prop-types";
import Input from "../../../../../commons/forms/Input";

const ContextForm = ({ formErrors, handleForm, formDatas }) => {
  const { context, contextUrl } = formDatas;
  return (
    <fieldset className={(formErrors.context || formErrors.contextUrl) && "error"}>
      <legend>Contexte du projet</legend>
      {/* Context */}
      <Input
        error={formErrors.context}
        id="context"
        isRequired
        label="Contexte"
        placeholder="Entreprise ou école ou a été réalisé le projet"
        setValue={(e) => handleForm(e)}
        value={context}
      />
      {/* Context url */}
      <Input
        error={formErrors.contextUrl}
        id="contextUrl"
        label="Lien de l'établissement"
        placeholder="Lien de l'établissement du contexte"
        type="url"
        setValue={(e) => handleForm(e)}
        value={contextUrl}
      />
    </fieldset>
  );
};

ContextForm.propTypes = {
  formDatas: propTypes.shape({
    context: propTypes.string.isRequired,
    contextUrl: propTypes.string
  }).isRequired,
  formErrors: propTypes.objectOf(propTypes.string),
  handleForm: propTypes.func.isRequired
};

export default ContextForm;
