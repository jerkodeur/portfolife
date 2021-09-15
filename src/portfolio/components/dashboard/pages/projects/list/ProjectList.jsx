import React, { useEffect, useState } from "react";

import axios from "axios";

import CheckFormFields from "../../../../commons/forms/CheckFormFields";
import ConfirmModal from "../../../../commons/ConfirmModal";
import projectConstraints from "../projectConstraints";
import ProjectListContainer from "./ProjectListContainer";
import ToasterDisplay from "../../../../../helpers/ToasterDisplay";

const ProjectList = () => {
  const [projects, setProjects] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState("");
  const [labelToDelete, setlabelToDelete] = useState("");
  const [updatedField, setUpdatedField] = useState({});

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

  const handleChange = (e) => {
    const key = e.target.id;
    let value = e.target.value;
    if (key === "active") value = value === "0" ? 1 : 0;
    return updateAsyncProjectField(e.target.dataset.id, key, value);
  };

  const displayDeleteModal = (id, label) => {
    setDeleteProjectId(id);
    setlabelToDelete(label);
    setShowDeleteModal(true);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      handleUpdatedField();
    }
  };

  const handleUpdatedField = (e) => {
    const fieldToCheck = {};
    fieldToCheck[updatedField.label] = projectConstraints[updatedField.label];
    fieldToCheck[updatedField.label].value = updatedField.value;

    // Verify if errors
    const errorfield = CheckFormFields(fieldToCheck);
    if (Object.values(errorfield).some((el) => el)) {
      setUpdatedField({ ...updatedField, error: errorfield[updatedField.label] });
      return ToasterDisplay(`Impossible de modifier la valeur, ${errorfield[updatedField.label]} `, "fail");
    }
    const { id, label, value } = updatedField;
    return updateAsyncProjectField(id, label, value);
  };

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
        ToasterDisplay("Mise à jour réussie !");
        setUpdatedField({});
        setProjects(updateProjects);
      })
      .catch(
        (err) =>
          console.log(err.response.data.message) ||
          ToasterDisplay("Une erreur est survenue lors de la mise à jour du champ !", "fail")
      );
  };

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
    <>
      <ProjectListContainer
        projects={projects}
        handleChange={handleChange}
        displayDeleteModal={displayDeleteModal}
        keyPressHandler={keyPressHandler}
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
          validate={deleteProject}
        />
      )}
    </>
  );
};

export default ProjectList;
