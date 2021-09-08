import React, { useEffect, useState } from "react";

import axios from "axios";
import { FaChevronCircleDown, FaChevronCircleUp, FaEdit, FaTrashAlt } from "react-icons/fa";

import Input from "../../../commons/forms/Input";
import ToasterDisplay from "../../../../helpers/ToasterDisplay";
import ConfirmModal from "../../../commons/ConfirmModal";

const ProjectList = () => {
  const [projects, setProjects] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState("");
  const [labelToDelete, setlabelToDelete] = useState("");

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

  useEffect(() => console.log("projects update"), [projects]);

  const formatLink = (url) => {
    const urlRegex = /(https?:\/\/(www\.)?)(.{10})/g;
    let urlFormated = url.replace(urlRegex, "$3");
    return urlFormated;
  };

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
                title,
                short_description: shortDescription,
                description,
                url_github: urlGithub,
                url_test: urlTest,
                context,
                context_url: contextUrl,
                nb_images: nbImages,
                background,
                priority,
                id,
                date,
                img_prefix: imgPrefix,
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
