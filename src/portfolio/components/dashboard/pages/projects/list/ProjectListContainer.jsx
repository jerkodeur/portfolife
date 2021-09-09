import React from "react";
import propTypes from "prop-types";

import { FaChevronCircleDown, FaChevronCircleUp, FaEdit, FaTrashAlt } from "react-icons/fa";

import Input from "../../../../commons/forms/Input";

const ProjectListContainer = ({ projects, handleChange, displayDeleteModal }) => {
  const formatLink = (url) => {
    const urlRegex = /(https?:\/\/(www\.)?)(.{10})/g;
    let urlFormated = url.replace(urlRegex, "$3");
    return urlFormated;
  };

  return (
    <div className="project-list-container">
      <h1>Liste des projets</h1>
      <table>
        <thead>
          <tr className="project-main-categories">
            <th colSpan="4">Informations principales</th>
            <th colSpan="3">Images</th>
            <th rowSpan="2">Star</th>
            <th rowSpan="2">Actions</th>
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
        <tbody>
          {projects &&
            Array.from(projects).map((project) => {
              const { mainDatas } = project;
              const {
                active,
                background,
                context,
                context_url: contextUrl,
                date,
                description,
                id,
                img_prefix: imgPrefix,
                nb_images: nbImages,
                priority,
                short_description: shortDescription,
                title,
                url_github: urlGithub,
                url_test: urlTest,
                ...rest
              } = mainDatas;
              const extractDate = new Date(date).toLocaleString();
              const dateRegex = /([0-9]{2}.){2}[0-9]{4}/g;
              const convertDate = extractDate.match(dateRegex)[0];
              return (
                <tr key={id}>
                  <td>{title}</td>
                  <td>{shortDescription}</td>
                  <td>{urlGithub && formatLink(urlGithub)}</td>
                  <td>{urlTest && formatLink(urlTest)}</td>
                  <td>{nbImages}</td>
                  <td>{imgPrefix}</td>
                  <td>
                    <Input
                      dataId={id}
                      id="background"
                      type="color"
                      setValue={(e) => handleChange(e)}
                      value={background ?? ""}
                    />
                  </td>
                  <td>
                    <label className="switch">
                      <input
                        data-id={id}
                        type="checkbox"
                        value={active}
                        checked={active && "checked"}
                        id="active"
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td className="actions">
                    <span>
                      <FaEdit />
                    </span>
                    <span>
                      <FaTrashAlt onClick={() => displayDeleteModal(id, title)} />
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

ProjectListContainer.propTypes = {
  displayDeleteModal: propTypes.func.isRequired,
  handleChange: propTypes.func.isRequired,
  projects: propTypes.arrayOf(
    propTypes.shape({
      mainDatas: propTypes.shape({
        active: propTypes.oneOf([0, 1]),
        background: propTypes.string.isRequired,
        context: propTypes.string.isRequired,
        context_url: propTypes.string,
        description: propTypes.string.isRequired,
        id: propTypes.number.isRequired,
        img_prefix: propTypes.string,
        nb_images: propTypes.number.isRequired,
        short_description: propTypes.string.isRequired,
        title: propTypes.string.isRequired,
        url_github: propTypes.string,
        url_test: propTypes.string
      }).isRequired,
      technos: propTypes.arrayOf(
        propTypes.shape({
          id: propTypes.number.isRequired,
          image_name: propTypes.string.isRequired,
          name: propTypes.string.isRequired
        }).isRequired
      ).isRequired
    })
  )
};

export default ProjectListContainer;
