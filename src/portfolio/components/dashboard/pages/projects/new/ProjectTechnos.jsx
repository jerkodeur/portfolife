import React, { useState, useEffect } from "react";

import axios from "axios";
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
    name: "",
    imageName: "",
    priority: "1"
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
    console.log(newTechno);
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
