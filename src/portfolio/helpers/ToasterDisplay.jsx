import React from "react";

import Toast from "../components/commons/Toast";
import toaster from "toasted-notes";

const defaultOptions = {
  position: "top-right",
  duration: 5000
};
const ToasterDisplay = (message, type = "success", options = defaultOptions) => {
  return toaster.notify(<Toast className={type} message={message} />, options);
};

export default ToasterDisplay;
