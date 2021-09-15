import React, { useState } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";

import ToasterDisplay from "../../../../helpers/ToasterDisplay";
import ProjectForm from "./new/ProjectForm";
import CheckFormFields from "../../../commons/forms/CheckFormFields";

const ProjectCreateAndEdit = () => {
  const history = useHistory();
  const token = sessionStorage.getItem("token");

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
    const constraints = {
      date: {
        value: formDatas.date,
        required: true,
        regex: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        type: ["string"]
      },
      title: {
        value: formDatas.title,
        required: true,
        type: ["string"]
      },
      shortDescription: {
        value: formDatas.shortDescription,
        required: true,
        type: ["string"]
      },
      mdDescription: {
        value: mdDescription,
        required: true,
        type: ["string"]
      },
      context: {
        value: formDatas.context,
        required: true,
        type: ["string"]
      },
      contextUrl: {
        value: formDatas.contextUrl,
        regex: /(https?):\/\/[a-z0-9\/:%_+.,#?!@&=-]+/,
        type: ["string"]
      },
      urlGithub: {
        value: formDatas.urlGithub,
        regex: /(https?):\/\/[a-z0-9\/:%_+.,#?!@&=-]+/,
        type: ["string"]
      },
      urlTest: {
        value: formDatas.urlTest,
        regex: /(https?):\/\/[a-z0-9\/:%_+.,#?!@&=-]+/,
        type: ["string"]
      },
      imgPrefix: {
        value: formDatas.imgPrefix,
        required: true,
        type: ["string"]
      },
      background: {
        value: formDatas.background,
        required: true,
        regex: /^#(?:[0-9a-fA-F]{3}){1,2}$/
      },
      nbImages: {
        required: true,
        value: Number(formDatas.nbImages),
        type: ["number"],
        range: [0, 20]
      },
      technos: {
        value: formDatas.technos,
        required: true,
        type: ["object"],
        length: 1
      },
      active: {
        value: formDatas.active,
        type: ["boolean"]
      }
    };
    const errorfields = CheckFormFields(constraints);
    if (Object.values(errorfields).some((el) => el)) {
      ToasterDisplay("Le projet n'a pas été ajouté, des erreurs ont été détectées !", "fail");
      return setFormErrors(errorfields);
    }

    axios
      .post(
        "/projects/",
        { ...formDatas, description: mdDescription },
        {
          headers: {
            authorization: "Bearer: " + token
          }
        }
      )
      .then(() => {
        setMdDescription("");
        ToasterDisplay("Le projet a été ajouté avec succès");
        history.push("/dashboard/projects");
      })
      .catch(
        (err) =>
          console.log(err.response) ||
          ToasterDisplay("Une erreur est survenue lors de l'ajout du nouveau projet", "fail")
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
