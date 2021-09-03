import React, { useState, useEffect } from "react";

import axios from "axios";
import CheckFormFields from "../../../../commons/forms/CheckFormFields";
import propTypes from "prop-types";
import toaster from "toasted-notes";
import Toast from "../../../../commons/Toast";

import NewTechnoForm from "./NewTechnoForm";

const toasterOptions = {
  position: "top-right",
  duration: 5000
};

const ProjectTechnos = (props) => {
  const token = localStorage.getItem("token");
  const { selectedTechnos, toggleSelectedTechnos } = props;

  const [formErrors, setFormErrors] = useState({});
  const [newTechnoFormDisplay, setNewTechnoFormDisplay] = useState(false);
  const [technos, setTechnos] = useState();
  const [newTechno, setNewTechno] = useState({
    priority: 1
  });

  const fetchTechnos = () => {
    axios
      .get("/technos", {
        headers: { authorization: `Bearer: ${token}` }
      })
      .then((res) => setTechnos(res.data))
      .catch(
        (err) =>
          console.log(err.response) ||
          toaster.notify(
            <Toast
              className="fail"
              message="Erreur lors de la récupération des technos"
            />,
            toasterOptions
          )
      );
  };

  useEffect(() => {
    fetchTechnos();
    return () => {
      fetchTechnos();
    };
  }, []);

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
      toaster.notify(
        <Toast
          className="fail"
          message="La nouvelle techno n'a pas été ajouté, des erreurs ont été détectées !"
        />,
        toasterOptions
      );
      setFormErrors(errorfields);
    } else {
      const { name, imageName: image_name, priority } = newTechno;
      axios
        .post(
          "/technos/",
          { name, image_name, priority },
          {
            headers: { authorization: `Bearer: ${token}` }
          }
        )
        .then((res) => {
          toaster.notify(
            <Toast
              className="success"
              message={`La techno ${newTechno.name} a bien été ajoutée !`}
            />,
            toasterOptions
          );
          setNewTechno({
            priority: 1
          });
          setNewTechnoFormDisplay(false);
          return fetchTechnos();
        })
        .catch((err) =>
          toaster.notify(
            <Toast
              className="fail"
              message={`Erreur lors de la création de la nouvelle techno, ${err.response.data.message}`}
            />,
            toasterOptions
          )
        );
    }
  };

  return (
    <fieldset>
      <legend>Technos utilisées dans le projet</legend>
      <ul className="techno-wrapper">
        {technos &&
          technos.map((techno) => {
            return (
              <li
                role="button"
                id={techno.id}
                key={techno.id}
                className={
                  selectedTechnos && selectedTechnos.includes(techno.id)
                    ? "selected"
                    : ""
                }
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
      {newTechnoFormDisplay && (
        <NewTechnoForm
          errors={formErrors}
          newTechno={newTechno}
          handleNewTechno={handleNewTechno}
          setNewTechnoFormDisplay={setNewTechnoFormDisplay}
          addNewTechno={addNewTechno}
        />
      )}
    </fieldset>
  );
};

ProjectTechnos.propTypes = {
  selectedTechnos: propTypes.arrayOf(propTypes.number),
  toggleSelectedTechnos: propTypes.func.isRequired
};

export default ProjectTechnos;
