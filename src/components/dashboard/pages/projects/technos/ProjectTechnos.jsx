import React, { useState, useEffect } from "react";

import propTypes from "prop-types";

import NewTechnoForm from "./NewTechnoForm";

import { addOneTechno } from "@controllers/technoController";
import { checkTechnoFields } from "./newTechnoFields";
import { useFetchTechnos } from "@helpers/customFetchHooks";
import { useToaster, useBoolean, useHandleObjectForm } from "@helpers/customHooks";

const ProjectTechnos = (props) => {
  const { selectedTechnos, toggleSelectedTechnos, errors } = props;
  const [technoFormErrors, setTechnoFormErrors] = useState({});
  const [newTechnoFormDisplay, setNewTechnoFormDisplay] = useBoolean(false);
  const [technos, fetchTechnos] = useFetchTechnos();
  const [newTechno, setNewTechno] = useHandleObjectForm();

  useEffect(() => {
    fetchTechnos();
  }, [fetchTechnos]);

  const addNewTechno = () => {
    const errorfields = checkTechnoFields(newTechno, technos);

    if (Object.values(errorfields).some((el) => el)) {
      useToaster.fail("La nouvelle techno n'a pas été ajouté, des erreurs ont été détectées !");
      setTechnoFormErrors(errorfields);
    } else {
      const { name, imageName: image_name } = newTechno;
      addOneTechno({ name, image_name, priority: 1 })
        .then(() => {
          useToaster.success(`La techno ${newTechno.name} a bien été ajoutée !`);

          setNewTechnoFormDisplay.off();
          return fetchTechnos();
        })
        .catch((err) => console.log(err) && useToaster.fail(`Erreur lors de la création de la nouvelle techno`));
    }
  };

  return (
    <fieldset className={errors ? "error" : undefined}>
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
          <li onClick={() => setNewTechnoFormDisplay.on()} role="link">
            Ajouter une nouvelle techno...
          </li>
        )}
      </ul>
      {errors && <small className={`container-error ${errors && "mt-3"}`}>Aucune techno n'a été sélectionnée !</small>}
      {newTechnoFormDisplay && (
        <NewTechnoForm
          addNewTechno={addNewTechno}
          errors={technoFormErrors}
          hideTechnoForm={setNewTechnoFormDisplay.off}
          newTechno={newTechno}
          updateNewTechno={setNewTechno.update}
        />
      )}
    </fieldset>
  );
};

ProjectTechnos.defaultProps = {
  error: ""
};

ProjectTechnos.propTypes = {
  errors: propTypes.string,
  selectedTechnos: propTypes.arrayOf(propTypes.number),
  toggleSelectedTechnos: propTypes.func.isRequired
};

export default ProjectTechnos;
