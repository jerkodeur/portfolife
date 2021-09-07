import React, { useEffect, useState } from "react";

import axios from "axios";
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
  console.log({ projects });
  return (
    <div className="project-list-container">
      <h1>Liste des projets</h1>
      <table>
        <thead>
          <tr className="project-main-categories">
            <th rowSpan="2">Date</th>
            <th colSpan="4">Informations principales</th>
            <th colSpan="2">Contexte</th>
            <th colSpan="3">Images</th>
            <th rowSpan="2">Actif</th>
          </tr>
          <tr className="project-categories">
            <th>Titre</th>
            <th>Description Courte</th>
            <th>Github</th>
            <th>Url de test</th>
            <th>Descriptif</th>
            <th>Lien</th>
            <th>Nb</th>
            <th>Préfixe</th>
            <th>Background</th>
          </tr>
        </thead>
        {/* <tbody>{projects && projects.map((project) => {
          const length = project.length
          return (
            tr>t
          )
        })}</tbody> */}
      </table>
    </div>
  );
};

export default ProjectList;
