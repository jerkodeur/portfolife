import { useState } from "react";

export const useBoolean = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const updateValue = {
    on: () => setValue(true),
    off: () => setValue(false),
    toggle: (oldValue) => !oldValue
  };

  return [value, updateValue];
};
