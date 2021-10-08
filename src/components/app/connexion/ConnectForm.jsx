import React, { useState } from "react";

import propTypes from "prop-types";
import { FaWindowClose } from "react-icons/fa";

import { adminAuthentication } from "../../../controllers/userController";
import { useToaster } from "@helpers/customHooks";

const ConnectForm = ({ activeConnexion, hideConnectForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = (e) => {
    e.preventDefault(e);
    adminAuthentication({ email, password })
      .then((res) => {
        activeConnexion(res.headers["x-access-token"]);
        hideConnectForm();
      })
      .catch((err) => {
        setEmail("");
        setPassword("");
        return useToaster.fail(`Une erreur est survenue, le serveur a répondu: ${err.message}`);
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
  activeConnexion: propTypes.func.isRequired,
  hideConnectForm: propTypes.func.isRequired
};

export default ConnectForm;
