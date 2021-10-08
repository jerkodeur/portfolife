import React, { useState } from "react";

import CheckFormFields from "@helpers/CheckFormFields";
import projectConstraints from "../projectConstraints";
import ProjectForm from "./ProjectFormContainer";
import ToasterDisplay from "@components/commons/ToasterDisplay";

import { useHistory } from "react-router-dom";
import { addOneProject } from "@controllers/projectController";

const ProjectCreateAndEdit = () => {
  const history = useHistory();

  const [formErrors, setFormErrors] = useState({});
  const [formDatas, setFormDatas] = useState({
    background: "#ffffff",
    active: false,
    technos: []
  });
  const [mdDescription, setMdDescription] = useState();

  const toggleSelectedTechnos = (e) => {
    const techno = Number(e.target.id);
    !formDatas.technos.includes(techno)
      ? setFormDatas({
          ...formDatas,
          technos: [...formDatas.technos, techno]
        })
      : setFormDatas({
          ...formDatas,
          technos: [...formDatas.technos].filter((el) => el !== techno)
        });
  };

  const handleClassError = (array) => {
    return array.reduce((acc, curr) => {
      return formErrors[curr] ? true : acc;
    }, false);
  };

  const handleForm = (e) => {
    setFormDatas({ ...formDatas, [e.target.id]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault(e);
    return addProject();
  };

  const addProject = () => {
    const formFieldsToCheck = [
      "date",
      "title",
      "shortDescription",
      "context",
      "contextUrl",
      "urlGithub",
      "urlTest",
      "mdDescription",
      "imgPrefix",
      "background",
      "nbImages",
      "technos",
      "active"
    ];

    // Create an object with project fieds contraints and the corresponding state values
    const fieldsToCheck = formFieldsToCheck.reduce((object, currentField) => {
      object[currentField] = projectConstraints[currentField];
      if (currentField === "mdDescription") {
        object[currentField].value = mdDescription;
      } else {
        object[currentField].value = formDatas[currentField];
      }
      return object;
    }, {});

    // Verify if errors
    const errorfields = CheckFormFields(fieldsToCheck);
    if (Object.values(errorfields).some((el) => el)) {
      ToasterDisplay("Le projet n'a pas été ajouté, des erreurs ont été détectées !", "fail");
      return setFormErrors(errorfields);
    }

    // If not persist the project in database and return to the projects list page
    addOneProject({ ...formDatas, description: mdDescription })
      .then(() => {
        setMdDescription("");
        ToasterDisplay("Le projet a été ajouté avec succès");
        history.push("/dashboard/projects");
      })
      .catch(
        (err) => console.log(err) && ToasterDisplay("Une erreur est survenue lors de l'ajout du nouveau projet", "fail")
      );
  };
  return (
    <div className="project-form-container">
      <h1>Création d'un nouveau projet</h1>
      <ProjectForm
        submitForm={submitForm}
        formErrors={formErrors}
        formDatas={formDatas}
        handleClassError={handleClassError}
        handleForm={handleForm}
        setFormDatas={setFormDatas}
        mdDescription={mdDescription}
        setMdDescription={setMdDescription}
        toggleSelectedTechnos={toggleSelectedTechnos}
      />
    </div>
  );
};

export default ProjectCreateAndEdit;
