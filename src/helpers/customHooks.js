import { useState } from "react";
import { useHistory } from "react-router";
import jwt from "jsonwebtoken";
import ToasterDisplay from "@components/commons/ToasterDisplay";

export const useBoolean = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const updateValue = {
    on: () => setValue(true),
    off: () => setValue(false),
    toggle: (oldValue) => !oldValue
  };

  return [value, updateValue];
};

export const useConnexion = (initialValue) => {
  const history = useHistory();
  const [value, setValue] = useState(initialValue);

  const updateValue = {
    off: () => {
      const pseudo = localStorage.getItem("pseudo");
      localStorage.clear();
      useToaster.success(`Déconnexion effectuée, à bientôt ${pseudo} !`);
      setValue(false);
      history.push("/");
    },
    on: (token) => {
      localStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("pseudo", jwt.decode(token).pseudo);
      useToaster.success(`Bienvenue ${jwt.decode(token).pseudo}, tu es bien connecté !`);
      setValue(true);
    }
  };

  return [value, updateValue];
};

export const useHandleObjectForm = ({ initialValue }) => {
  const [datas, setDatas] = useState({ initialValue });
  const updateDatas = {
    update: (key, value) => setDatas({ ...datas, [key]: value }),
    reset: () => setDatas({})
  };

  return [datas, updateDatas];
};

export const useToaster = {
  success: (message, options) => ToasterDisplay(message, "success", options),
  fail: (message, options) => ToasterDisplay(message, "fail", options)
};

export const useCounter = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const updateDatas = {
    up: (step = 1) => setValue(value + step),
    down: (step = 1) => setValue(value - step),
    reset: (value = 0) => setValue(value),
    set: (value) => setValue(value)
  };

  return [value, updateDatas];
};

export const useSlider = (initialValue, maxValue) => {
  const [value, setValue] = useCounter(initialValue);

  const updateDatas = {
    down: () => {
      if (value - 1 === 0) {
        return setValue.set(maxValue);
      } else {
        return setValue.down();
      }
    },
    up: () => {
      if (value + 1 > maxValue) {
        return setValue.set(1);
      } else {
        return setValue.up();
      }
    },
    set: (value) => setValue.set(value)
  };

  return [value, updateDatas];
};
