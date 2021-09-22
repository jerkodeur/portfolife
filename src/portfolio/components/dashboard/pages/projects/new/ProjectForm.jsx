import React from "react";

import propTypes from "prop-types";

import FormLinks from "../list/projectFormComponents/FormLinks";
import FormMainInfos from "../list/projectFormComponents/FormMainInfos";
import FormContext from "../list/projectFormComponents/FormContext";
import Input from "../../../../commons/forms/Input";
import ProjectTechnos from "../ProjectTechnos";

const ProjectForm = ({
  submitForm,
  formErrors,
  formDatas,
  handleClassError,
  handleForm,
  setFormDatas,
  mdDescription,
  setMdDescription,
  toggleSelectedTechnos
}) => (
  <form onSubmit={submitForm}>
    <FormMainInfos
      handleForm={handleForm}
      formDatas={formDatas}
      formErrors={formErrors}
      handleClassError={handleClassError}
      mdDescription={mdDescription}
      setMdDescription={setMdDescription}
    />
    <FormContext handleForm={handleForm} formDatas={formDatas} formErrors={formErrors} />
    <FormLinks handleForm={handleForm} formDatas={formDatas} formErrors={formErrors} />
    <fieldset
      className={`multiple-fields-wrapper ${
        (formErrors.imgPrefix || formErrors.background || formErrors.nbImages) && "error"
      }`}
    >
      <legend>Images</legend>
      {/* image prefix  */}
      <Input
        error={formErrors.imgPrefix}
        id="imgPrefix"
        isRequired
        label="Préfixe des images"
        placeholder="Ajouter un prefix"
        setValue={(e) => handleForm(e)}
        value={formDatas.imgPrefix}
      />
      {/* thumbmail images background color */}
      <Input
        error={formErrors.background}
        id="background"
        label="Couleur de fond carousel d'images"
        type="color"
        setValue={(e) => handleForm(e)}
        value={formDatas.background}
      />
      {/* Number of images */}
      <Input
        error={formErrors.nbImages}
        id="nbImages"
        isRequired
        label="Nb images (min: 1, max: 20)"
        type="number"
        setValue={(e) => handleForm(e)}
        value={formDatas.nbImages}
        min={0}
        max={20}
      />
    </fieldset>
    {/* Technos */}
    <ProjectTechnos
      handleClassError={handleClassError}
      error={formErrors.technos}
      selectedTechnos={formDatas.technos}
      toggleSelectedTechnos={(e) => toggleSelectedTechnos(e)}
    />
    {/* Active */}
    <label className="switch">
      <input
        type="checkbox"
        checked={formDatas.active && "checked"}
        id="active"
        onChange={() => setFormDatas({ ...formDatas, active: !formDatas.active })}
      />
      <span className="slider round"></span>
    </label>
    <label htmlFor="active" className={formErrors.active && "error"}>
      Publier le projet ?
    </label>
    {formErrors.active && <small className="container-error ml-2">{formErrors.active}</small>}
    <div className="submit-container">
      <button type="submit" className="submit-button">
        Ajouter le projet
      </button>
    </div>
  </form>
);

ProjectForm.prototype = {
  addProject: propTypes.func.isRequired,
  submitForm: propTypes.func.isRequired,
  formErrors: propTypes.objectOf(propTypes.string),
  formDatas: propTypes.shape.isRequired,
  handleClassError: propTypes.func.isRequired,
  handleForm: propTypes.func.isRequired,
  setFormDatas: propTypes.func.isRequired,
  mdDescription: propTypes.string,
  setMdDescription: propTypes.func.isRequired,
  toggleSelectedTechno: propTypes.func.isRequired
};

export default ProjectForm;
