import React, { useEffect, useState } from "react";

import axios from "axios";

import Input from "../../../commons/forms/Input";
import ToasterDisplay from "../../../../helpers/ToasterDisplay";

const ProjectList = () => {
  const [projects, setProjects] = useState({});

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
          if (project.mainDatas.id === res.data.updated[0].id) {
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

  return (
    <div className="project-list-container">
      <h1>Liste des projets</h1>
      <table>
        <thead>
          <tr className="project-main-categories">
            <th colSpan="4">Informations principales</th>
            <th colSpan="3">Images</th>
            <th rowSpan="2">Actif</th>
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
                    {/* {background} */}
                  </td>
                  <td>
                    <label className="switch">
                      <input
                        data-id={id}
                        type="checkbox"
                        value={active}
                        checked={active && "checked"}
                        id="active"
                        onClick={(e) => handleChange(e)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
