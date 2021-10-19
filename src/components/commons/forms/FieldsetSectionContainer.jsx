import React from "react";

import propTypes from "prop-types";

const FieldsetSectionContainer = ({ className, name, errors, children }) => {
  return (
    <fieldset className={`${className} ${errors && "error"}`}>
      <legend>{name}</legend>
      {children}
    </fieldset>
  );
};

FieldsetSectionContainer.propTypes = {
  className: propTypes.string,
  name: propTypes.string,
  errors: propTypes.bool.isRequired
};

export default FieldsetSectionContainer;
