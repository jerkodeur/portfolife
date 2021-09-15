import React, { useEffect, useState } from "react";

import axios from "axios";
import ToasterDisplay from "../../../../../helpers/ToasterDisplay";
import ConfirmModal from "../../../../commons/ConfirmModal";
import ProjectListContainer from "./ProjectListContainer";

const ProjectList = () => {
  const [projects, setProjects] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState("");
  const [labelToDelete, setlabelToDelete] = useState("");
  const [updatedField, setUpdatedField] = useState({ label: "imgPrefix", id: 11, error: "", value: "" });

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

  useEffect(() => console.log("project update"), [projects]);

  const handleChange = (e) => {
    const key = e.target.id;
    let value = e.target.value;
    if (key === "active") value = value === "0" ? 1 : 0;
    axios
      .patch(
        `/projects/async/${e.target.dataset.id}`,
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
            project.mainDatas[key] = value;
          }
          acc.push(project);
          return acc;
        }, []);
        setProjects(updateProjects);
      })
      .catch(
        (err) =>
          console.log(err.response) ||
          ToasterDisplay("Une erreur est survenue lors de la mise à jour du champ !", "fail")
      );
  };

  const displayDeleteModal = (id, label) => {
    setDeleteProjectId(id);
    setlabelToDelete(label);
    setShowDeleteModal(true);
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
      .catch((err) => console.log(err.response) || ToasterDisplay("Erreur lors de la suppression du projet !", "fail"));
    setShowDeleteModal(false);
  };

  return (
    <>
      <ProjectListContainer
        projects={projects}
        handleChange={handleChange}
        displayDeleteModal={displayDeleteModal}
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
