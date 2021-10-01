import React, { useEffect, useState } from "react";

import CheckFormFields from "../../../../commons/forms/CheckFormFields";
import ConfirmModal from "../../../../commons/ConfirmModal";
import MdEditor from "../../../../commons/forms/MdEditor";
import projectConstraints from "../projectConstraints";
import ProjectListContainer from "./ProjectListContainer";
import ProjectTechnos from "../ProjectTechnos";
import ToasterDisplay from "../../../../../helpers/ToasterDisplay";

import { checkIfTechnoIsInProject } from "../../../service/technos";
import { updateListOfProjects, updateProjectTechnos } from "../../../service/projects";
import { newProjectTechno, removeProjectTechno } from "../../../controllers/technoController";
import { deleteProject, getAllProjects, updateOneField } from "../../../controllers/projectController";

const ProjectList = () => {
  const [deleteProjectId, setDeleteProjectId] = useState("");
  const [labelToDelete, setlabelToDelete] = useState("");
  const [projects, setProjects] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [updatedField, setUpdatedField] = useState({});

  // Fetch projects on page load
  useEffect(() => {
    getAllProjects()
      .then((projects) => setProjects(projects))
      .catch((err) => console.error(err) || ToasterDisplay("Erreur lors de la récupération des projets", "fail"));
  }, []);

  // Define if a show more container is displayed
  const handleShowMoreContent = (id) => {
    setCurrentProjectId(currentProjectId === id ? null : id);
  };

  //--------------------------------------------- Description editing handlers -------------------------------//
  //----------------------------------------------------------------------------------------------------------//

  const DescriptionElt = (props) => {
    return (
      <div className="edit-descr-wrapper">
        <form onSubmit={(e) => submitDescription(e, props.value)}>
          <fieldset className="edit-descr-container">
            <MdEditor
              value={props.value}
              setValue={props.setValue}
              error={updatedField.label === "description" ? updatedField.error : ""}
              label="Modifier la description du projet"
              isRequired
            />
            <div className="submit-container">
              <button type="submit" className="submit-button">
                Enregistrer les modifications
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  };

  const submitDescription = (e, value) => {
    e.preventDefault(e);
    if (!value)
      return setUpdatedField({ label: "description", id: currentProjectId, error: "Ce champs ne peut être vide !" });
    return updateAsyncProjectField(currentProjectId, "description", value);
  };

  //--------------------------------------------- Techno Switcher --------------------------------------------//
  //----------------------------------------------------------------------------------------------------------//
  const TechnoSwitcher = (props) => {
    return (
      <ProjectTechnos
        selectedTechnos={props.technoIds}
        toggleSelectedTechnos={(e) => toggleSelectedTechnos(e, props.technoIds)}
      />
    );
  };

  // Decide if a project techno is added or removed on click and triggers an action based on
  const toggleSelectedTechnos = (e, technos) => {
    const clickedTechnoId = Number(e.target.id);
    const technoIsInProject = checkIfTechnoIsInProject(projects, currentProjectId, clickedTechnoId);
    if (technos.length === 1 && technoIsInProject)
      return ToasterDisplay("Au moins une techno doit être sélectionnée !", "fail");
    technoIsInProject
      ? removeTechnoFromProject(currentProjectId, clickedTechnoId)
      : addTechnoInProject(currentProjectId, clickedTechnoId);
  };

  // Remove a techno on the current modified project
  const removeTechnoFromProject = (projectId, technoId) =>
    removeProjectTechno(projectId, technoId)
      .then(
        (technos) =>
          ToasterDisplay("Techno retirée !", "success", { position: "bottom-left", duration: 1500 }) &&
          setProjects(updateProjectTechnos(projects, projectId, technos))
      )
      .catch((err) => console.error(err) && ToasterDisplay("Erreur lors du retrait de la techno du projet !", "fail"));

  // Add a techno on the current modified project
  const addTechnoInProject = (projectId, technoId) =>
    newProjectTechno(projectId, technoId)
      .then(
        (technos) =>
          ToasterDisplay("Techno ajoutée !", "success", { position: "bottom-left", duration: 1500 }) &&
          setProjects(updateProjectTechnos(projects, projectId, technos))
      )
      .catch((err) => console.error(err) && ToasterDisplay("Erreur lors de l'ajout de la techno au projet", "fail"));

  //---------------------------------------- Update Fields handlers  ---------------------------------------//
  //--------------------------------------------------------------------------------------------------------//

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
    updateOneField(id, { key, value })
      .then((updatedProject) => {
        const updateProjects = updateListOfProjects(projects, updatedProject);
        ToasterDisplay("Mise à jour réussie !", "success", { duration: 1500, position: "bottom-left" });
        setUpdatedField({});
        setProjects(updateProjects);
      })
      .catch(
        (err) =>
          console.error(err) || ToasterDisplay("Une erreur est survenue lors de la mise à jour du champ !", "fail")
      );
  };

  //--------------------------------------------- Delete project  ------------------------------------------//
  //--------------------------------------------------------------------------------------------------------//

  // Set delete modal statements and show it
  const displayDeleteModal = (id, label) => {
    setDeleteProjectId(id);
    setlabelToDelete(label);
    setShowDeleteModal(true);
  };

  const deleteCurrentProject = (e) => {
    deleteProject(e.target.dataset.id)
      .then((res) => {
        ToasterDisplay("Le projet a été supprimé avec succès !");
        setProjects(res);
      })
      .catch((err) => console.error(err) && ToasterDisplay("Erreur lors de la suppression du projet !", "fail"));
    setShowDeleteModal(false);
  };

  return (
    <div className="project-list-container">
      <ProjectListContainer
        projects={projects}
        keyPressHandler={keyPressHandler}
        displayDeleteModal={displayDeleteModal}
        handleChange={handleChange}
        DescriptionElt={DescriptionElt}
        TechnoSwitcher={TechnoSwitcher}
        currentProjectId={currentProjectId}
        handleShowMoreContent={handleShowMoreContent}
        updatedField={updatedField}
        setUpdatedField={setUpdatedField}
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
          validate={deleteCurrentProject}
        />
      )}
    </div>
  );
};

export default ProjectList;
