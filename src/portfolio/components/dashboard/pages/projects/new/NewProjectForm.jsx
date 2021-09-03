import React from "react";

import propTypes from "prop-types";

import Input from "../../../../commons/forms/Input";
import MdEditor from "../../../../commons/forms/MdEditor";
import ProjectTechnos from "./ProjectTechnos";

const NewProjectForm = ({
  submitForm,
  formErrors,
  formDatas,
  handleForm,
  setFormDatas,
  mdDescription,
  setMdDescription,
  toggleSelectedTechnos
}) => {
  return (
    <form onSubmit={submitForm}>
      <fieldset>
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
      <fieldset>
        <legend>Contexte du projet</legend>
        {/* Context */}
        <Input
          error={formErrors.context}
          id="context"
          isRequired
          label="Contexte"
          placeholder="Entreprise ou école ou a été réalisé le projet"
          setValue={(e) => handleForm(e)}
          value={formDatas.context}
        />
        {/* Context url */}
        <Input
          error={formErrors.contextUrl}
          id="contextUrl"
          label="Lien de l'établissement"
          placeholder="Lien de l'établissement du contexte"
          type="url"
          setValue={(e) => handleForm(e)}
          value={formDatas.contextUrl}
        />
      </fieldset>
      <fieldset className="multiple-fields-wrapper">
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
      <fieldset className="multiple-fields-wrapper">
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
        {/* thumbmail images background color */}
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
          onChange={() =>
            setFormDatas({ ...formDatas, active: !formDatas.active })
          }
        />
        <span className="slider round"></span>
      </label>
      <label htmlFor="active">Publier le projet ?</label>
      <div className="submit-container">
        <button type="submit" className="submit-button">
          Ajouter le projet
        </button>
      </div>
    </form>
  );
};

NewProjectForm.prototype = {
  submitForm: propTypes.func.isRequired,
  formErrors: propTypes.objectOf(propTypes.string),
  formDatas: propTypes.shape.isRequired,
  handleForm: propTypes.func.isRequired,
  setFormDatas: propTypes.func.isRequired,
  mdDescription: propTypes.string,
  setMdDescription: propTypes.func.isRequired,
  toggleSelectedTechno: propTypes.func.isRequired
};

export default NewProjectForm;
