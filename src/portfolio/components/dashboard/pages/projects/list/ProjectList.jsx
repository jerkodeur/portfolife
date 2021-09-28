import React, { useEffect, useState } from "react";

import axios from "axios";

import CheckFormFields from "../../../../commons/forms/CheckFormFields";
import ConfirmModal from "../../../../commons/ConfirmModal";
import projectConstraints from "../projectConstraints";
import ProjectListContainer from "./ProjectListContainer";
import ProjectTechnos from "../ProjectTechnos";
import ToasterDisplay from "../../../../../helpers/ToasterDisplay";

const ProjectList = () => {
  const token = sessionStorage.getItem("token");
  const [deleteProjectId, setDeleteProjectId] = useState("");
  const [labelToDelete, setlabelToDelete] = useState("");
  const [projects, setProjects] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMoreContent, setShowMoreContent] = useState(null);
  const [updatedField, setUpdatedField] = useState({});

  // Fetch projects on page load
  useEffect(() => {
    axios
      .get("/projects", {
        headers: {
          authorization: "Bearer: " + sessionStorage.getItem("token")
        }
      })
      .then((res) => setProjects(res.data))
      .catch(
        (err) => console.log(err.response) || ToasterDisplay("Erreur lors de la récupération des projets", "fail")
      );
  }, []);

  // Set delete modal statements and show it
  const displayDeleteModal = (id, label) => {
    setDeleteProjectId(id);
    setlabelToDelete(label);
    setShowDeleteModal(true);
  };

  // Define if a show more container is displayed
  const handleShowMoreContent = (id) => {
    setShowMoreContent(showMoreContent === id ? null : id);
  };

  // Decide if a project techno is added or removed on click and triggers an action based on
  const toggleSelectedTechnos = (e, technos) => {
    const clickedTechnoId = Number(e.target.id);
    const technoIsInProject = projects.reduce((acc, curr) => {
      if (curr.mainDatas.id === showMoreContent) {
        return (acc = curr.technos.filter((techno) => techno.id === clickedTechnoId).length > 0 && true);
      }
      return acc;
    }, false);
    if (technos.length === 1 && technoIsInProject)
      return ToasterDisplay("Au moins une techno doit être sélectionnée !", "fail");
    technoIsInProject
      ? removeTechnoFromProject(showMoreContent, clickedTechnoId)
      : addTechnoInProject(showMoreContent, clickedTechnoId);
  };

  // const handleClassError = (array) => {
  //   return array.reduce((acc, curr) => {
  //     return updatedField.error ? true : acc;
  //   }, false);
  // };

  const TechnoSwitcher = (props) => {
    return (
      <ProjectTechnos
        selectedTechnos={props.technoIds}
        toggleSelectedTechnos={(e) => toggleSelectedTechnos(e, props.technoIds)}
      />
    );
  };

  // Add a techno on the current modified project
  const addTechnoInProject = (projectId, technoId) => {
    axios
      .post(
        `/projects/${projectId}/addTechno`,
        { technoId: technoId },
        {
          headers: { authorization: `Bearer: ${token}` }
        }
      )
      .then(
        (res) =>
          ToasterDisplay("Techno ajoutée !", "success", { position: "bottom-left", duration: 1500 }) &&
          updateProjectTechnos(projectId, res.data)
      )
      .catch(
        (err) =>
          console.log(err.response.data.message) &&
          ToasterDisplay("Erreur lors de l'ajout d'une nouvelle techno au projet", "fail")
      );
  };

  // Remove a techno on the current modified project
  const removeTechnoFromProject = (projectId, technoId) => {
    axios
      .delete(`/projects/${projectId}/technos/${technoId}`, {
        headers: { authorization: `Bearer: ${token}` }
      })
      .then(
        (res) =>
          ToasterDisplay("Techno retirée !", "success", { position: "bottom-left", duration: 1500 }) &&
          updateProjectTechnos(projectId, res.data)
      )
      .catch(
        (err) =>
          console.log(err.response.data.message) &&
          ToasterDisplay("Erreur lors du retrait de la techno du projet !", "fail")
      );
  };

  // Change the state with the updated technos
  const updateProjectTechnos = (projectId, technos) => {
    const updatedProjects = projects.reduce((acc, curr) => {
      if (curr.mainDatas.id === projectId) {
        curr = { ...curr, technos };
      }
      acc.push(curr);
      return acc;
    }, []);
    setProjects(updatedProjects);
  };

  // Manage the key pressed for trigger one specific field update
  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      handleUpdatedField(e);
    }
  };

  // Verify if errors on the updated field, if not call the updated function
  const handleUpdatedField = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    const fieldToCheck = {};

    fieldToCheck[key] = projectConstraints[key];
    fieldToCheck[key].value = value;

    // Verify if errors
    const errorfield = CheckFormFields(fieldToCheck);
    if (Object.values(errorfield).some((el) => el)) {
      setUpdatedField({ ...updatedField, error: errorfield[key] });
      return ToasterDisplay(`Impossible de modifier la valeur, ${errorfield[key]} `, "fail");
    }
    const { id } = updatedField;
    return updateAsyncProjectField(id, key, value);
  };

  // handle the asynchrone one project field change
  const handleChange = (e) => {
    const key = e.target.id;
    let value = e.target.value;
    if (key === "active") value = value === "0" ? 1 : 0;
    return updateAsyncProjectField(e.target.dataset.id, key, value);
  };

  // Request the server to update the selected field
  const updateAsyncProjectField = (id, key, value) => {
    axios
      .patch(
        `/projects/async/${id}`,
        { key, value },
        {
          headers: {
            authorization: "Bearer: " + sessionStorage.getItem("token")
          }
        }
      )
      .then((res) => {
        const updateProjects = Array.from(projects).reduce((acc, project) => {
          if (project.mainDatas.id === res.data.mainDatas.id) {
            project.mainDatas = res.data.mainDatas;
          }
          acc.push(project);
          return acc;
        }, []);
        ToasterDisplay("Mise à jour réussie !", "success", { duration: 1500, position: "bottom-left" });
        setUpdatedField({});
        setProjects(updateProjects);
      })
      .catch(
        (err) =>
          console.log(err.response.data.message) ||
          ToasterDisplay("Une erreur est survenue lors de la mise à jour du champ !", "fail")
      );
  };

  // Request the server to delete a project
  const deleteProject = (e) => {
    axios
      .delete(`/projects/${e.target.dataset.id}`, {
        headers: {
          authorization: "Bearer: " + sessionStorage.getItem("token")
        }
      })
      .then((res) => {
        ToasterDisplay("Le projet a été supprimé avec succès !");
        setProjects(res.data);
      })
      .catch(
        (err) =>
          console.log(err.response.data.message) || ToasterDisplay("Erreur lors de la suppression du projet !", "fail")
      );
    setShowDeleteModal(false);
  };

  return (
    <div className="project-list-container">
      <ProjectListContainer
        displayDeleteModal={displayDeleteModal}
        handleChange={handleChange}
        handleShowMoreContent={handleShowMoreContent}
        keyPressHandler={keyPressHandler}
        projects={projects}
        setUpdatedField={setUpdatedField}
        showMoreContent={showMoreContent}
        TechnoSwitcher={TechnoSwitcher}
        updatedField={updatedField}
      />
      {showDeleteModal && (
        <ConfirmModal
          className="danger"
          dataId={deleteProjectId}
          dataLabel={labelToDelete}
          handleClose={() => setShowDeleteModal(false)}
          message={`Êtes-vous sûr de vouloir supprimer le projet ${labelToDelete}?`}
          show={showDeleteModal}
          title={`Suppression du projet ${labelToDelete}`}
          validate={deleteProject}
        />
      )}
    </div>
  );
};

export default ProjectList;
