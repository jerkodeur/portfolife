import React from "react";

import propTypes from "prop-types";

import FieldsetSectionContainer from "@commons/forms/FieldsetSectionContainer";
import InputGroup from "@commons/forms/InputGroup";
import MdEditor from "@components/commons/forms/MdEditor";
import ProjectTechnos from "../technos/ProjectTechnos";

import { contextFormFields, imageFormFields, linkFormFields, MainFormFields } from "./projectFields";

const ProjectFormContainer = ({
  formErrors,
  formDatas,
  handleClassError,
  handleForm,
  mdDescription,
  setFormDatas,
  setMdDescription,
  submitForm,
  toggleSelectedTechnos
}) => (
  <form onSubmit={submitForm} className="form-container">
    {/* Main section  */}
    <FieldsetSectionContainer errors={MainFormFields.some((el) => formErrors[el.id])} name="Informations générales">
      <InputGroup errors={formErrors} datas={formDatas} handleDatas={handleForm} fields={MainFormFields} />
      <MdEditor
        value={mdDescription}
        setValue={setMdDescription}
        error={formErrors.mdDescription}
        label="description du projet"
        isRequired
      />
    </FieldsetSectionContainer>

    {/* Context section  */}
    <FieldsetSectionContainer
      errors={contextFormFields.some((el) => formErrors[el.id])}
      name="Contexte du projet"
      className="multiple-fields-wrapper"
    >
      <InputGroup errors={formErrors} datas={formDatas} handleDatas={handleForm} fields={contextFormFields} />
    </FieldsetSectionContainer>

    {/* Links section */}
    <FieldsetSectionContainer
      errors={linkFormFields.some((el) => formErrors[el.id])}
      name="Liens du projet"
      className="multiple-fields-wrapper"
    >
      <InputGroup errors={formErrors} datas={formDatas} handleDatas={handleForm} fields={linkFormFields} />
    </FieldsetSectionContainer>

    {/* Images section */}
    <FieldsetSectionContainer
      errors={imageFormFields.some((el) => formErrors[el.id])}
      name="Images"
      className="multiple-fields-wrapper"
    >
      <InputGroup errors={formErrors} datas={formDatas} handleDatas={handleForm} fields={imageFormFields} />
    </FieldsetSectionContainer>

    {/* Technos section */}
    <ProjectTechnos
      handleClassError={handleClassError}
      errors={formErrors.technos}
      selectedTechnos={formDatas.technos}
      toggleSelectedTechnos={toggleSelectedTechnos}
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

ProjectFormContainer.prototype = {
  addProject: propTypes.func.isRequired,
  formErrors: propTypes.objectOf(propTypes.string),
  formDatas: propTypes.shape.isRequired,
  handleClassError: propTypes.func.isRequired,
  handleForm: propTypes.func.isRequired,
  mdDescription: propTypes.string,
  setFormDatas: propTypes.func.isRequired,
  setMdDescription: propTypes.func.isRequired,
  submitForm: propTypes.func.isRequired,
  toggleSelectedTechno: propTypes.func.isRequired
};

export default ProjectFormContainer;
