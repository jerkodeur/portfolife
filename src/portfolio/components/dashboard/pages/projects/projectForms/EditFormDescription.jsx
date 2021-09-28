import React from "react";

import propTypes from "prop-types";

import MdEditor from "../../../../commons/forms/MdEditor";

const EditFormDescription = ({
  description,
  handleClassError,
  handleDescription,
  id,
  submitDescription,
  technos,
  TechnoSwitcher
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
          <TechnoSwitcher technoIds={technoIds} />
        </div>
      </form>
    </div>
  );
};

EditFormDescription.propTypes = {
  description: propTypes.string.isRequired,
  handleClassError: propTypes.func.isRequired,
  handleDescription: propTypes.func.isRequired,
  id: propTypes.number.isRequired,
  submitDescription: propTypes.func.isRequired,
  technos: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      image_name: propTypes.string.isRequired
    }).isRequired
  ).isRequired,
  TechnoSwitcher: propTypes.func.isRequired
};

export default EditFormDescription;
