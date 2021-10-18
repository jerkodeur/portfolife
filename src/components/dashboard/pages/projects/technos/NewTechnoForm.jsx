import React from "react";

import propTypes from "prop-types";

import Input from "@components/commons/forms/Input";
import { technoInputs } from "./newTechnoFields";

const NewTechnoForm = ({ hideTechnoForm, errors, newTechno, updateNewTechno, addNewTechno }) => (
  <div id="newTechno">
    <fieldset className="new-techno-container" role="form">
      <legend>
        Ajout d'une nouvelle techno{" "}
        <span title="Fermer" onClick={hideTechnoForm}>
          X
        </span>
      </legend>
      <div className="multiple-fields-wrapper">
        {technoInputs.map((input) => {
          const { id, ...rest } = input;
          return (
            <Input
              key={id}
              id={id}
              error={errors[id] && errors[id]}
              value={newTechno[id]}
              setValue={(e) => updateNewTechno(id, e.target.value)}
              {...rest}
            />
          );
        })}
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
  addNewTechno: propTypes.func.isRequired,
  errors: propTypes.objectOf(propTypes.string),
  hideTechnoForm: propTypes.func.isRequired,
  newTechno: propTypes.shape({
    name: propTypes.string,
    imageName: propTypes.string,
    priority: propTypes.oneOfType([propTypes.number, propTypes.string])
  }),
  updateNewTechno: propTypes.func.isRequired
};

export default NewTechnoForm;
