import React from "react";

import ReactMarkdown from "react-markdown";

const MarkdownDescription = (props) => {
  const { mainDatas } = props.project;
  const { description } = mainDatas;

  return (
    <div className="project-description">
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  );
};

export default MarkdownDescription;
