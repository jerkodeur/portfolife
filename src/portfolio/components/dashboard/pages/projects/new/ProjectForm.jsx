import React from "react";

import propTypes from "prop-types";

import ContextForm from "../list/projectFormComponents/ContextForm";
import Input from "../../../../commons/forms/Input";
import MdEditor from "../../../../commons/forms/MdEditor";
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
    <fieldset className={handleClassError(["date", "title", "shortDescription", "mdDescription"]) && "error"}>
      <legend>Informations générales</legend>
      {/* project date */}
      <Input
        error={formErrors.date}
        id="date"
        isRequired
        label="Date du projet"
        type="date"
        setValue={(e) => handleForm(e)}
        value={formDatas.date}
      />
      {/* Title */}
      <Input
        error={formErrors.title}
        id="title"
        isRequired
        label="titre"
        placeholder="titre du projet"
        setValue={(e) => handleForm(e)}
        value={formDatas.title}
      />
      {/* short description */}
      <Input
        error={formErrors.shortDescription}
        id="shortDescription"
        isRequired
        label="courte description"
        placeholder="description courte du projet (Apparaît dans les vignettes)"
        setValue={(e) => handleForm(e)}
        value={formDatas.shortDescription}
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
    <ContextForm handleForm={handleForm} formDatas={formDatas} formErrors={formErrors} />
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
        value={formDatas.urlGithub}
      />
      {/* project preview url */}
      <Input
        error={formErrors.urlTest}
        id="urlTest"
        label="Lien vers la page de test"
        placeholder="Insérer le lien de la page de test"
        type="url"
        setValue={(e) => handleForm(e)}
        value={formDatas.urlTest}
      />
    </fieldset>
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
        label="Nombres d'images"
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
