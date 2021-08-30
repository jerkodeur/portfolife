import React, { useState } from "react";

import propTypes from "prop-types";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const MdEditor = (props) => {
  const { value, setValue, errors, isRequired, id, label } = props;

  const [selectedTab, setSelectedTab] = useState("write");
  // const [value, setValue] = useState(placeholder);

  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label} {isRequired && " *"}
      </label>
      <ReactMde
        minEditorHeight="350"
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ReactMarkdown source={markdown} />)
        }
      />
      {errors && <small className="container-error">Ce champ est requis</small>}
    </div>
  );
};

MdEditor.propTypes = {
  errors: propTypes.arrayOf(propTypes.string),
  label: propTypes.string,
  isRequired: propTypes.bool.isRequired,
  setValue: propTypes.func.isRequired,
  value: propTypes.string
};

export default MdEditor;
