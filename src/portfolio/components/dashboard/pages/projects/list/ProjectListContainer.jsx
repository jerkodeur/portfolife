import React, { Fragment } from "react";
import propTypes from "prop-types";

import ShowMoreContent from "./ShowMoreContent";

import { FaChevronCircleDown, FaChevronCircleUp, FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";

import Input from "../../../../commons/forms/Input";

const ProjectListContainer = ({
  displayDeleteModal,
  handleChange,
  handleShowMoreContent,
  keyPressHandler,
  projects,
  setUpdatedField,
  showMoreContent,
  toggleSelectedTechnos,
  updatedField
}) => {
  const formatLink = (url) => {
    const urlRegex = /(https?:\/\/(www\.)?)(.{10})/g;
    let urlFormated = url.replace(urlRegex, "$3");
    return urlFormated;
  };

  return (
    <div className="project-list-container">
      <form onSubmit={(e) => e.preventDefault(e)}>
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
                const { mainDatas, technos } = project;
                const {
                  active,
                  background,
                  // context,
                  // context_url: contextUrl,
                  // date,
                  // description,
                  id,
                  img_prefix: imgPrefix,
                  nb_images: nbImages,
                  // priority,
                  short_description: shortDescription,
                  title,
                  url_github: urlGithub,
                  url_test: urlTest,
                  ...rest
                } = mainDatas;
                return (
                  <Fragment key={id}>
                    <tr>
                      <td>
                        <FaChevronCircleDown onClick={() => handleShowMoreContent(id)} />
                      </td>
                      {/* Title */}
                      <td onClick={() => setUpdatedField({ label: "title", id, value: title })}>
                        {updatedField.label === "title" && updatedField.id === id ? (
                          <Input
                            autoFocus
                            displayError={false}
                            error={updatedField.error}
                            id="title"
                            onBlur={() => setUpdatedField({})}
                            onKeyPress={keyPressHandler}
                            placeholder="titre"
                            setValue={(e) => setUpdatedField({ label: "title", id, value: e.target.value })}
                            value={updatedField.value ?? undefined}
                          />
                        ) : (
                          title
                        )}
                      </td>
                      {/* short description */}
                      <td onClick={() => setUpdatedField({ label: "shortDescription", id, value: shortDescription })}>
                        {updatedField.label === "shortDescription" && updatedField.id === id ? (
                          <Input
                            autoFocus
                            displayError={false}
                            error={updatedField.error}
                            id="shortDescription"
                            onBlur={() => setUpdatedField({})}
                            onKeyPress={keyPressHandler}
                            placeholder="Description courte"
                            setValue={(e) => setUpdatedField({ label: "shortDescription", id, value: e.target.value })}
                            value={updatedField.value ?? undefined}
                          />
                        ) : (
                          shortDescription
                        )}
                      </td>
                      {/* github url */}
                      <td onClick={() => setUpdatedField({ label: "urlGithub", id, value: urlGithub })}>
                        {updatedField.label === "urlGithub" && updatedField.id === id ? (
                          <Input
                            autoFocus
                            displayError={false}
                            error={updatedField.error}
                            id="urlGithub"
                            onBlur={() => setUpdatedField({})}
                            onKeyPress={keyPressHandler}
                            placeholder="Url Github"
                            setValue={(e) => setUpdatedField({ label: "urlGithub", id, value: e.target.value })}
                            type="url"
                            value={updatedField.value ?? undefined}
                          />
                        ) : (
                          urlGithub && formatLink(urlGithub)
                        )}
                      </td>
                      {/* project preview url */}
                      <td onClick={() => setUpdatedField({ label: "urlTest", id, value: urlTest })}>
                        {updatedField.label === "urlTest" && updatedField.id === id ? (
                          <Input
                            autoFocus
                            displayError={false}
                            error={updatedField.error}
                            id="urlTest"
                            onBlur={() => setUpdatedField({})}
                            onKeyPress={keyPressHandler}
                            placeholder="Url preview"
                            setValue={(e) => setUpdatedField({ label: "urlTest", id, value: e.target.value })}
                            type="url"
                            value={updatedField.value ?? undefined}
                          />
                        ) : (
                          urlTest && formatLink(urlTest)
                        )}
                      </td>

                      {/* Number of images */}
                      <td onClick={() => setUpdatedField({ label: "nbImages", id, value: nbImages.toString() })}>
                        {updatedField.label === "nbImages" && updatedField.id === id ? (
                          <Input
                            autoFocus
                            displayError={false}
                            id="nbImages"
                            error={updatedField.error}
                            min={0}
                            max={20}
                            onBlur={() => setUpdatedField({})}
                            onKeyPress={keyPressHandler}
                            setValue={(e) =>
                              setUpdatedField({ label: "nbImages", id, value: parseInt(e.target.value) })
                            }
                            type="number"
                            defaultValue={0}
                            value={parseInt(updatedField.value) ?? undefined}
                          />
                        ) : (
                          nbImages
                        )}
                      </td>
                      {/* image prefix  */}
                      <td onClick={() => setUpdatedField({ label: "imgPrefix", id, value: imgPrefix })}>
                        {updatedField.label === "imgPrefix" && updatedField.id === id ? (
                          <Input
                            autoFocus
                            displayError={false}
                            error={updatedField.error}
                            id="imgPrefix"
                            onBlur={() => setUpdatedField({})}
                            onKeyPress={keyPressHandler}
                            placeholder="Préfixe images"
                            setValue={(e) => setUpdatedField({ label: "imgPrefix", id, value: e.target.value })}
                            value={updatedField.value ?? undefined}
                          />
                        ) : (
                          imgPrefix
                        )}
                      </td>
                      <td>
                        <Input
                          autoFocus
                          dataId={id}
                          displayError={false}
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
                    {showMoreContent && showMoreContent === id && (
                      <ShowMoreContent datas={{ ...rest, id, title, technos, toggleSelectedTechnos }} />
                    )}
                  </Fragment>
                );
              })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

ProjectListContainer.propTypes = {
  displayDeleteModal: propTypes.func.isRequired,
  handleChange: propTypes.func.isRequired,
  handleShowMoreContent: propTypes.func.isRequired,
  keyPressHandler: propTypes.func.isRequired,
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
  ),
  setUpdatedField: propTypes.func.isRequired,
  showMoreContent: propTypes.number,
  toggleSelectedTechnos: propTypes.func.isRequired,
  updatedField: propTypes.shape({
    id: propTypes.number,
    value: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.array]),
    error: propTypes.string
  }).isRequired
};

export default ProjectListContainer;
