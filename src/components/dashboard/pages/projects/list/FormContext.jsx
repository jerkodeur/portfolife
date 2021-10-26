import React from "react";

import propTypes from "prop-types";
import Input from "@components/commons/forms/Input";
import { contextFormFields } from "../new/projectFields";
import FieldsetSectionContainer from "@commons/forms/FieldsetSectionContainer";

const FormContext = ({ formErrors, handleForm, formDatas, keyPressHandler, setUpdatedField, updatedField }) => {
  const { label, value, error } = updatedField;

  formErrors[label] = error;

  return (
    <>
      <FieldsetSectionContainer
        className="multiple-fields-wrapper"
        errors={contextFormFields.some((el) => formErrors[el.id])}
      >
        {contextFormFields.map((field) => (
          <Input
            onBlur={() => setUpdatedField.set({ ...updatedField, value: formDatas[field.id], error: null })}
            onKeyPress={keyPressHandler}
            error={formErrors[field.id]}
            key={field.id}
            setValue={(e) => handleForm(e)}
            value={label === field.id ? value : formDatas[field.id]}
            {...field}
          />
        ))}
      </FieldsetSectionContainer>
    </>
  );
};

FormContext.defaultProps = {
  formErrors: {},
  updatedField: {}
};

FormContext.propTypes = {
  formDatas: propTypes.shape({
    context: propTypes.string,
    contextUrl: propTypes.string
  }).isRequired,
  formErrors: propTypes.objectOf(propTypes.string),
  handleForm: propTypes.func.isRequired,
  setUpdatedField: propTypes.object.isRequired,
  updatedField: propTypes.shape()
};

export default FormContext;
