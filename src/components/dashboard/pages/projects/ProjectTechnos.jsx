import React, { useState, useEffect, useCallback } from "react";

import propTypes from "prop-types";

import CheckFormFields from "@components/commons/forms/CheckFormFields";
import NewTechnoForm from "./projectForms/NewTechnoForm";
import ToasterDisplay from "@components/commons/ToasterDisplay";

import { getAllTechnos, addOneTechno } from "@controllers/technoController";

const ProjectTechnos = (props) => {
  const { selectedTechnos, toggleSelectedTechnos, error } = props;
  const [technoFormErrors, setTechnoFormErrors] = useState({});
  const [newTechnoFormDisplay, setNewTechnoFormDisplay] = useState(false);
  const [technos, setTechnos] = useState();
  const [newTechno, setNewTechno] = useState({});

  const fetchTechnos = useCallback(() => {
    getAllTechnos()
      .then((technos) => setTechnos(technos))
      .catch((err) => console.log(err) && ToasterDisplay("Erreur lors de la récupération des technos", "fail"));
  }, [setTechnos]);

  useEffect(() => {
    fetchTechnos();
  }, [fetchTechnos]);

  const handleNewTechno = (e) => {
    setNewTechno({ ...newTechno, [e.target.id]: e.target.value });
  };

  const addNewTechno = () => {
    const constraints = {
      name: {
        value: newTechno.name,
        required: true,
        uniq: [true, technos.map((techno) => techno.name)]
      },
      imageName: {
        value: newTechno.imageName,
        required: true,
        uniq: [true, technos.map((techno) => techno.image_name)]
      },
      priority: {
        value: Number(newTechno.priority),
        required: true,
        regex: /^[1-3]{1}$/,
        type: ["number"]
      }
    };

    const errorfields = CheckFormFields(constraints);

    if (Object.values(errorfields).some((el) => el)) {
      ToasterDisplay("La nouvelle techno n'a pas été ajouté, des erreurs ont été détectées !", "fail");

      setTechnoFormErrors(errorfields);
    } else {
      const { name, imageName: image_name } = newTechno;
      addOneTechno({ name, image_name, priority: 1 })
        .then(() => {
          ToasterDisplay(`La techno ${newTechno.name} a bien été ajoutée !`);

          setNewTechnoFormDisplay(false);
          return fetchTechnos();
        })
        .catch((err) => console.log(err) && ToasterDisplay(`Erreur lors de la création de la nouvelle techno`, "fail"));
    }
  };

  return (
    <fieldset className={error ? "error" : undefined}>
      <legend>Technos utilisées dans le projet</legend>
      <ul className="techno-wrapper">
        {technos &&
          technos.map((techno) => {
            return (
              <li
                role="button"
                id={techno.id}
                key={techno.id}
                className={selectedTechnos && selectedTechnos.includes(techno.id) ? "selected" : ""}
                onClick={toggleSelectedTechnos}
              >
                {techno.name}
              </li>
            );
          })}
        {!newTechnoFormDisplay && (
          <li onClick={() => setNewTechnoFormDisplay(true)} role="link">
            Ajouter une nouvelle techno...
          </li>
        )}
      </ul>
      {error && <small className={`container-error ${error && "mt-3"}`}>Aucune techno n'a été sélectionnée !</small>}
      {newTechnoFormDisplay && (
        <NewTechnoForm
          errors={technoFormErrors}
          newTechno={newTechno}
          handleNewTechno={handleNewTechno}
          setNewTechnoFormDisplay={setNewTechnoFormDisplay}
          addNewTechno={addNewTechno}
        />
      )}
    </fieldset>
  );
};

ProjectTechnos.defaultProps = {
  error: ""
};

ProjectTechnos.propTypes = {
  error: propTypes.string,
  selectedTechnos: propTypes.arrayOf(propTypes.number),
  toggleSelectedTechnos: propTypes.func.isRequired
};

export default ProjectTechnos;
