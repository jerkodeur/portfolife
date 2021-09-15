import React from "react";

import propTypes from "prop-types";

const Input = (props) => {
  const {
    autoFocus,
    value,
    defaultValue,
    displayError,
    error,
    type,
    setValue,
    isRequired,
    id,
    placeholder,
    regex,
    min,
    max,
    dataId,
    onKeyPress,
    onBlur
  } = props;
  const label = props.label && props.label[0].toUpperCase() + props.label.slice(1).toLowerCase();

  let options = { id, placeholder, type, onKeyPress, onBlur, autoFocus };
  options = type === "number" ? { ...options, min, max } : options;
  options = regex ? { ...options, regex } : options;
  return (
    <div className="form-group">
      <label htmlFor={id} className={error && "error"}>
        {label} {isRequired && " *"}
      </label>
      <input
        data-id={dataId && dataId}
        value={!value && defaultValue ? defaultValue : value}
        onChange={setValue}
        {...options}
        className={`form-control ${error && "error"}`}
      />
      {error && displayError && <small className="container-error">{error}</small>}
    </div>
  );
};

Input.defaultProps = {
  displayError: true,
  isRequired: false,
  type: "text",
  value: "",
  formatOptions: {
    minLength: 2
  }
};

Input.propTypes = {
  autoFocus: propTypes.bool,
  dataId: propTypes.number,
  defaultValue: propTypes.any,
  displayError: propTypes.bool.isRequired,
  error: propTypes.string,
  id: propTypes.string.isRequired,
  isRequired: propTypes.bool.isRequired,
  label: propTypes.string,
  min: propTypes.number,
  max: propTypes.number,
  onBlur: propTypes.func,
  onKeyPress: propTypes.func,
  placeholder: propTypes.string,
  regex: propTypes.string,
  setValue: propTypes.func.isRequired,
  type: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number])
};

export default Input;
