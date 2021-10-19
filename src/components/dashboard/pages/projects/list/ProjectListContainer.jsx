import React from "react";

import propTypes from "prop-types";

import { FaPlus, FaEraser } from "react-icons/fa";
import ProjectListContent from "./ProjectListContent";

const ProjectListContainer = ({ projects, ...props }) => {
  return (
    <div className="form-container">
      <h1>Liste des projets</h1>
      <table>
        <thead>
          <tr className="project-main-categories">
            <th rowSpan="2">
              <FaPlus />
            </th>
            <th colSpan="4">Informations principales</th>
            <th colSpan="3">Images</th>
            <th rowSpan="2">Star</th>
            <th rowSpan="2" title="Supprimer le projet">
              <FaEraser size="25" />
            </th>
          </tr>
          <tr className="project-categories">
            <th>Titre</th>
            <th>Description Courte</th>
            <th>Github</th>
            <th>Url de test</th>
            <th>Nb</th>
            <th>Préfixe</th>
            <th>Fond</th>
          </tr>
        </thead>
        <tbody>{projects && <ProjectListContent projects={projects} {...props} />}</tbody>
      </table>
    </div>
  );
};

ProjectListContainer.propTypes = {
  projects: propTypes.arrayOf(propTypes.shape())
};

export default ProjectListContainer;
