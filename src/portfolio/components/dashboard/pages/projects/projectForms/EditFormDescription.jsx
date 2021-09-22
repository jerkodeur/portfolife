import React from "react";

import propTypes from "prop-types";

import ProjectTechnos from "../ProjectTechnos";

const EditFormDescription = ({ technos, toggleSelectedTechnos, handleClassError }) => {
  const technoIds = technos.reduce((ids, currentTechno) => {
    ids.push(currentTechno.id);
    return ids;
  }, []);

  return (
    <ProjectTechnos
      selectedTechnos={technoIds}
      toggleSelectedTechnos={toggleSelectedTechnos}
      // error={formErrors.technos}
      handleClassError={handleClassError}
    />
  );
};

export default EditFormDescription;
