import React from "react";

import "toasted-notes/src/styles.css";

const Toast = ({ message, className }) => (
  <div>
    <div className={`toaster-${className}`}>{message}</div>
  </div>
);

export default Toast;
