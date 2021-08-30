import React from "react";

import "toasted-notes/src/styles.css";

const Toast = ({ message, style }) => (
  <div>
    <div className={`toaster-${style}`}>{message}</div>
  </div>
);

export default Toast;
