import React from "react";

import propTypes from "prop-types";

const Input = (props) => {
  const { value, defaultValue, error, type, setValue, isRequired, id, placeholder, regex, min, max } = props;
  const label = props.label && props.label[0].toUpperCase() + props.label.slice(1).toLowerCase();

  let options = { id, placeholder, type };
  options = type === "number" ? { ...options, min, max } : options;
  options = regex ? { ...options, regex } : options;
  return (
    <div className="form-group">
      <label htmlFor={id} className={error && "error"}>
        {label} {isRequired && " *"}
      </label>
      <input
        value={!value && defaultValue ? defaultValue : value}
        onChange={setValue}
        {...options}
        className={`form-control ${error && "error"}`}
      />
      {error && <small className="container-error">{error}</small>}
    </div>
  );
};

Input.defaultProps = {
  isRequired: false,
  type: "text",
  value: "",
  formatOptions: {
    minLength: 2
  }
};

Input.propTypes = {
  defaultValue: propTypes.any,
  error: propTypes.string,
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
