import React, { useState } from "react";

import Axios from "axios";
import jwt from "jsonwebtoken";
import Proptypes from "prop-types";
import { FaWindowClose } from "react-icons/fa";

import ToasterDisplay from "@components/commons/ToasterDisplay";

const ConnectForm = ({ activeConnexion, hideConnectForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = (e) => {
    e.preventDefault(e);
    Axios.post("/admins", { email, password })
      .then((res) => {
        const token = res.headers["x-access-token"];

        sessionStorage.clear();
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("pseudo", jwt.decode(token).pseudo);
        ToasterDisplay(`Bienvenue ${jwt.decode(token).pseudo}, tu es bien connecté !`);
        hideConnectForm();
        return activeConnexion();
      })
      .catch((err) => {
        setEmail("");
        setPassword("");
        return ToasterDisplay(`Une erreur est survenue, le serveur a répondu: '${err.response.data.message}'`, "fail");
      });
  };

  return (
    <div className="connect-container">
      <div className="title">
        <h2>Interface de connexion:</h2>
        <div className="icon" onClick={hideConnectForm}>
          <FaWindowClose size="30" />
        </div>
      </div>
      <form onSubmit={(e) => e.preventDefault(e)}>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" onClick={handleForm} className="btn btn-warning">
          Connexion
        </button>
      </form>
    </div>
  );
};

ConnectForm.propTypes = {
  activeConnexion: Proptypes.func.isRequired,
  hideConnectForm: Proptypes.func.isRequired
};

export default ConnectForm;
