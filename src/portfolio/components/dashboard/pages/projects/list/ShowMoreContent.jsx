import React, { useState } from "react";

import propTypes from "prop-types";

import ProjectTechnos from "../ProjectTechnos";

const ShowMoreContent = ({ datas }) => {
  const [formErrors, setFormErrors] = useState({});

  const { context, context_url: contextUrl, date, description, id, technos, title, toggleSelectedTechnos } = datas;

  const convertDate = (rawDate) => {
    const extractDate = new Date(rawDate).toLocaleString();
    const dateRegex = /([0-9]{2}.){2}[0-9]{4}/g;
    return extractDate.match(dateRegex)[0];
  };

  const technoIds = technos.reduce((ids, currentTechno) => {
    ids.push(currentTechno.id);
    return ids;
  }, []);

  const handleClassError = (array) => {
    return array.reduce((acc, curr) => {
      return formErrors[curr] ? true : acc;
    }, false);
  };

  return (
    <tr className="show-more-container">
      <td colSpan="10">
        <h3>{title}</h3>
        <ProjectTechnos
          selectedTechnos={technoIds}
          toggleSelectedTechnos={toggleSelectedTechnos}
          error={formErrors.technos}
          handleClassError={handleClassError}
        />
      </td>
    </tr>
  );
};

ShowMoreContent.propTypes = {
  datas: propTypes.shape({
    id: propTypes.number.isRequired,
    context: propTypes.string.isRequired,
    context_url: propTypes.string,
    date: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    technos: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.number.isRequired,
        name: propTypes.string.isRequired,
        image_name: propTypes.string.isRequired
      }).isRequired
    ).isRequired,
    title: propTypes.string.isRequired,
    toggleSelectedTechnos: propTypes.func.isRequired
  })
};

export default ShowMoreContent;
