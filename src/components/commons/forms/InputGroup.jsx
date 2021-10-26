import React from "react";

import Input from "@components/commons/forms/Input";
import propTypes from "prop-types";

const InputGroup = ({ errors, datas, fields, handleDatas, options }) =>
  fields.map((field) => (
    <Input
      error={errors[field.id]}
      key={field.id}
      setValue={(e) => handleDatas(e)}
      value={datas[field.id]}
      {...field}
      {...options}
    />
  ));

InputGroup.propTypes = {
  datas: propTypes.shape().isRequired,
  fields: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      label: propTypes.string,
      placeholder: propTypes.string,
      type: propTypes.string,
      isRequired: propTypes.bool.isRequired,
      min: propTypes.number,
      max: propTypes.number
    })
  ),
  errors: propTypes.objectOf(propTypes.string),
  handleDatas: propTypes.func.isRequired
};
export default InputGroup;
