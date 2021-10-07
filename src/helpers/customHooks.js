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
      ToasterDisplay(`Déconnexion effectuée, à bientôt ${pseudo} !`);
      setValue(false);
      history.push("/");
    },
    on: (token) => {
      localStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("pseudo", jwt.decode(token).pseudo);
      ToasterDisplay(`Bienvenue ${jwt.decode(token).pseudo}, tu es bien connecté !`);
      setValue(true);
    }
  };

  return [value, updateValue];
};
