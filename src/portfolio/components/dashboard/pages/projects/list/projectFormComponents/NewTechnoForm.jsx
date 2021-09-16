import React from "react";

import Input from "../../../../../commons/forms/Input";
import propTypes from "prop-types";

const NewTechnoForm = ({ setNewTechnoFormDisplay, errors, newTechno, handleNewTechno, addNewTechno }) => (
  <div id="newTechno">
    <fieldset className="new-techno-container" role="form">
      <legend>
        Ajout d'une nouvelle techno{" "}
        <span title="Fermer" onClick={() => setNewTechnoFormDisplay(false)}>
          X
        </span>
      </legend>
      <div className="multiple-fields-wrapper">
        {/* Techno name */}
        <Input
          error={errors.name && errors.name}
          id="name"
          label="Nom"
          placeholder="Nom de la techno"
          isRequired
          value={newTechno.name}
          setValue={(e) => handleNewTechno(e)}
        />
        {/* Image file name */}
        <Input
          error={errors.imageName && errors.imageName}
          id="imageName"
          label="Fichier image"
          placeholder="image.ext"
          isRequired
          value={newTechno.imageName}
          setValue={(e) => handleNewTechno(e)}
        />
        {/* display priority */}
        <Input
          error={errors.priority && errors.priority}
          id="priority"
          isRequired
          label="Priorité d'affichage"
          type="number"
          setValue={(e) => handleNewTechno(e)}
          value={newTechno.priority}
          min={1}
          max={3}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-dark" type="button" onClick={addNewTechno}>
          Valider
        </button>
      </div>
    </fieldset>
  </div>
);

NewTechnoForm.propTypes = {
  setNewTechnoFormDisplay: propTypes.func.isRequired,
  errors: propTypes.objectOf(propTypes.string),
  newTechno: propTypes.shape({
    name: propTypes.string,
    imageName: propTypes.string,
    priority: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired
  }),
  handleNewTechno: propTypes.func.isRequired,
  addNewTechno: propTypes.func.isRequired
};

export default NewTechnoForm;
