import React from "react";

import propTypes from "prop-types";

import MdEditor from "../../../../commons/forms/MdEditor";
import ProjectTechnos from "../ProjectTechnos";

const EditFormDescription = ({
  description,
  handleClassError,
  handleDescription,
  submitDescription,
  technos,
  toggleSelectedTechnos
}) => {
  const technoIds = technos.reduce((ids, currentTechno) => {
    ids.push(currentTechno.id);
    return ids;
  }, []);

  return (
    <div className="edit-descr-wrapper">
      <form onSubmit={submitDescription}>
        <fieldset className="edit-descr-container">
          <MdEditor
            value={description}
            setValue={handleDescription}
            // error={formErrors.mdDescription}
            label="Modifier la description du projet"
            isRequired
          />

          <div className="submit-container">
            <button type="submit" className="submit-button">
              Enregistrer les modifications
            </button>
          </div>
        </fieldset>
        <div className="techno-wrapper">
          <ProjectTechnos
            selectedTechnos={technoIds}
            toggleSelectedTechnos={toggleSelectedTechnos}
            // error={formErrors.technos}
            handleClassError={handleClassError}
          />
        </div>
      </form>
    </div>
  );
};

EditFormDescription.propTypes = {
  description: propTypes.string.isRequired,
  handleClassError: propTypes.func.isRequired,
  handleDescription: propTypes.func.isRequired,
  submitDescription: propTypes.func.isRequired,
  technos: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      image_name: propTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleSelectedTechnos: propTypes.func.isRequired
};

export default EditFormDescription;
