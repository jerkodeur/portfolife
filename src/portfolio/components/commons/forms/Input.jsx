import React from "react";

import propTypes from "prop-types";

const Input = (props) => {
  const { errors, type, setValue, isRequired, id, placeholder, label } = props;

  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label} {isRequired && " *"}
      </label>
      <input
        type={type}
        id={id}
        className="form-control"
        placeholder={placeholder}
        onChange={setValue}
      />
      {errors && <small className="container-error">Ce champ est requis</small>}
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  isRequired: "false"
};

Input.propTypes = {
  errors: propTypes.arrayOf(propTypes.string),
  id: propTypes.string.isRequired,
  placeholder: propTypes.string,
  label: propTypes.string,
  isRequired: propTypes.bool.isRequired,
  setValue: propTypes.func.isRequired,
  type: propTypes.string.isRequired
};

export default Input;
