import React from "react";

import propTypes from "prop-types";
import Input from "../../../../../commons/forms/Input";

const FormLinks = ({ formErrors, handleForm, formDatas }) => {
  const { urlGithub, urlTest } = formDatas;
  return (
    <fieldset className={`multiple-fields-wrapper ${(formErrors.urlGithub || formErrors.urlTest) && "error"}`}>
      <legend>Liens du projet</legend>
      {/* github url */}
      <Input
        error={formErrors.urlGithub}
        id="urlGithub"
        label="Lien vers le dépôt github"
        placeholder="Insérer le lien du dépôt github"
        type="url"
        setValue={(e) => handleForm(e)}
        value={urlGithub}
      />
      {/* project preview url */}
      <Input
        error={formErrors.urlTest}
        id="urlTest"
        label="Lien vers la page de test"
        placeholder="Insérer le lien de la page de test"
        type="url"
        setValue={(e) => handleForm(e)}
        value={urlTest}
      />
    </fieldset>
  );
};

FormLinks.propTypes = {
  formDatas: propTypes.shape({
    urlGithub: propTypes.string,
    urlTest: propTypes.string
  }).isRequired,
  formErrors: propTypes.objectOf(propTypes.string),
  handleForm: propTypes.func.isRequired
};

export default FormLinks;
