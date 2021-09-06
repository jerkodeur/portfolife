import React from "react";

import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

const Toast = ({ message, className }) => (
  <div>
    <div className={`toaster-${className}`}>{message}</div>
  </div>
);

const defaultOptions = {
  position: "top-right",
  duration: 5000
};
const ToasterDisplay = (message, type = "success", options = defaultOptions) => {
  return toaster.notify(<Toast className={type} message={message} />, options);
};

export default ToasterDisplay;
