import React, { useState } from "react";

import propTypes from "prop-types";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const MdEditor = (props) => {
  const { value, setValue, error, isRequired, label } = props;
  const [selectedTab, setSelectedTab] = useState("write");

  return (
    <div className="form-group">
      <label className={error ? "error" : undefined}>
        {label} {isRequired && " *"}
      </label>
      <ReactMde
        className="error"
        minEditorHeight="350"
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) => Promise.resolve(<ReactMarkdown source={markdown} />)}
      />
      {error && <small className="container-error">{error}</small>}
    </div>
  );
};

MdEditor.propTypes = {
  error: propTypes.string,
  label: propTypes.string,
  isRequired: propTypes.bool.isRequired,
  setValue: propTypes.func.isRequired,
  value: propTypes.string
};

export default MdEditor;
