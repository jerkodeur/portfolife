import React from "react";

const Toast = ({ content, styleType }) => (
  <div>
    <div className={styleType}>{content}</div>
  </div>
);

export default Toast;
