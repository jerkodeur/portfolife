import React from "react";

import propTypes from "prop-types";

import Input from "../../../../commons/forms/Input";
import MdEditor from "../../../../commons/forms/MdEditor";

const FormMainInfos = ({ formDatas, formErrors, handleForm, handleClassError, mdDescription, setMdDescription }) => {
  const { date, title, shortDescription } = formDatas;
  return (
    <fieldset
      className={handleClassError(["date", "title", "shortDescription", "mdDescription"]) ? "error" : undefined}
    >
      <legend>Informations générales</legend>
      {/* project date */}
      <Input
        error={formErrors.date}
        id="date"
        isRequired
        label="Date du projet"
        type="date"
        setValue={(e) => handleForm(e)}
        value={date}
      />
      {/* Title */}
      <Input
        error={formErrors.title}
        id="title"
        isRequired
        label="titre"
        placeholder="titre du projet"
        setValue={(e) => handleForm(e)}
        value={title}
      />
      {/* short description */}
      <Input
        error={formErrors.shortDescription}
        id="shortDescription"
        isRequired
        label="courte description"
        placeholder="description courte du projet (Apparaît dans les vignettes)"
        setValue={(e) => handleForm(e)}
        value={shortDescription}
      />
      {/* Description */}
      <MdEditor
        value={mdDescription}
        setValue={setMdDescription}
        error={formErrors.mdDescription}
        label="description du projet"
        isRequired
      />
    </fieldset>
  );
};

FormMainInfos.propTypes = {
  formDatas: propTypes.shape({
    date: propTypes.string,
    shortDescription: propTypes.string,
    title: propTypes.string
  }).isRequired,
  formErrors: propTypes.objectOf(propTypes.string),
  handleClassError: propTypes.func.isRequired,
  handleForm: propTypes.func.isRequired,
  mdDescription: propTypes.string,
  setMdDescription: propTypes.func.isRequired
};

export default FormMainInfos;
