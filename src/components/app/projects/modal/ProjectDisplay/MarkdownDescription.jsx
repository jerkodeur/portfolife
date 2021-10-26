import React from "react";
import propTypes from "prop-types";

import ReactMarkdown from "react-markdown";

const MarkdownDescription = ({ description }) => {
  return (
    <div className="project-description">
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  );
};

MarkdownDescription.propTypes = {
  description: propTypes.string.isRequired
};
export default MarkdownDescription;
