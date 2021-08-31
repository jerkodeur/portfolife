import React from "react";

import propTypes from "prop-types";

const Input = (props) => {
  const {
    value,
    defaultValue,
    errors,
    type,
    setValue,
    isRequired,
    id,
    placeholder,
    label,
    regex,
    min,
    max
  } = props;
  let options = { id, placeholder, type };

  options = type === "number" ? { ...options, min, max } : options;
  options = regex ? { ...options, regex } : options;

  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label} {isRequired && " *"}
      </label>
      <input
        value={!value && defaultValue ? defaultValue : value}
        onChange={setValue}
        {...options}
        className="form-control"
      />
      {errors && <small className="container-error">Ce champ est requis</small>}
    </div>
  );
};

Input.defaultProps = {
  isRequired: false,
  type: "text",
  value: ""
};

Input.propTypes = {
  defaultValue: propTypes.any,
  errors: propTypes.arrayOf(propTypes.string),
  id: propTypes.string.isRequired,
  isRequired: propTypes.bool.isRequired,
  label: propTypes.string,
  min: propTypes.number,
  max: propTypes.number,
  placeholder: propTypes.string,
  regex: propTypes.string,
  setValue: propTypes.func.isRequired,
  type: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number])
};

export default Input;
