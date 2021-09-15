import React from "react";
import propTypes from "prop-types";

import { FaChevronCircleDown, FaChevronCircleUp, FaEdit, FaTrashAlt } from "react-icons/fa";

import Input from "../../../../commons/forms/Input";

const ProjectListContainer = ({
  projects,
  handleChange,
  displayDeleteModal,
  updatedField,
  handleUpdatedField,
  setUpdatedField
}) => {
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
                  {/* Title */}
                  <td onClick={() => setUpdatedField({ label: "title", id: id, value: title })}>
                    {updatedField.label === "title" && updatedField.id === id ? (
                      <Input
                        error={updatedField.error}
                        placeholder="titre du projet"
                        id="title"
                        setValue={(e) => setUpdatedField({ label: "title", id: id, value: e.target.value })}
                        value={updatedField.value}
                      />
                    ) : (
                      title
                    )}
                  </td>
                  {/* short description */}
                  <td onClick={() => setUpdatedField({ label: "shortDescription", id: id, value: shortDescription })}>
                    {updatedField.label === "shortDescription" && updatedField.id === id ? (
                      <Input
                        error={updatedField.error}
                        placeholder="description courte du projet (Apparaît dans les vignettes)"
                        id="shortDescription"
                        setValue={(e) => setUpdatedField({ label: "shortDescription", id: id, value: e.target.value })}
                        value={updatedField.value}
                      />
                    ) : (
                      shortDescription
                    )}
                  </td>
                  {/* github url */}
                  <td onClick={() => setUpdatedField({ label: "urlGithub", id: id, value: urlGithub })}>
                    {updatedField.label === "urlGithub" && updatedField.id === id ? (
                      <Input
                        error={updatedField.error}
                        placeholder="Url Github"
                        id="urlGithub"
                        setValue={(e) => setUpdatedField({ label: "urlGithub", id: id, value: e.target.value })}
                        value={updatedField.value}
                        type="url"
                      />
                    ) : (
                      urlGithub && formatLink(urlGithub)
                    )}
                  </td>
                  {/* project preview url */}
                  <td onClick={() => setUpdatedField({ label: "urlTest", id: id, value: urlTest })}>
                    {updatedField.label === "urlTest" && updatedField.id === id ? (
                      <Input
                        error={updatedField.error}
                        placeholder="Url preview"
                        id="urlTest"
                        setValue={(e) => setUpdatedField({ label: "urlTest", id: id, value: e.target.value })}
                        value={updatedField.value}
                        type="url"
                      />
                    ) : (
                      urlTest && formatLink(urlTest)
                    )}
                  </td>

                  {/* Number of images */}
                  <td onClick={() => setUpdatedField({ label: "nbImages", id: id, value: nbImages.toString() })}>
                    {updatedField.label === "nbImages" && updatedField.id === id ? (
                      <Input
                        error={updatedField.error}
                        id="nbImages"
                        setValue={(e) => setUpdatedField({ label: "nbImages", id: id, value: e.target.value })}
                        value={updatedField.value}
                        type="number"
                        min={0}
                        max={20}
                      />
                    ) : (
                      nbImages
                    )}
                  </td>
                  {/* image prefix  */}
                  <td onClick={() => setUpdatedField({ label: "imgPrefix", id: id, value: imgPrefix })}>
                    {updatedField.label === "imgPrefix" && updatedField.id === id ? (
                      <Input
                        error={updatedField.error}
                        id="imgPrefix"
                        placeholder="Ajouter un prefix"
                        setValue={(e) => setUpdatedField({ label: "imgPrefix", id: id, value: e.target.value })}
                        value={updatedField.value}
                      />
                    ) : (
                      imgPrefix
                    )}
                  </td>
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
