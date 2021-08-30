import React from "react";
import { useState } from "react";

import Axios from "axios";
import jwt from "jsonwebtoken";
import Proptypes from "prop-types";
import toaster from "toasted-notes";
import Toast from "../../commons/Toast";
import { FaWindowClose } from "react-icons/fa";

const ConnectForm = ({ switchConnexion, handleConnexion }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toasterOptions = {
    position: "top-right",
    duration: 5000
  }

  const handleForm = (e) => {
    e.preventDefault(e);
    Axios.post("/admins", { email, password })
      .then((res) => {
        const token = res.headers["x-access-token"]

        localStorage.clear();
        localStorage.setItem("token", token);
        localStorage.setItem("pseudo", jwt.decode(token).pseudo);

        toaster.notify(<Toast style='success' message={`Bienvenue ${jwt.decode(token).pseudo}, tu es bien connecté !`} />, toasterOptions);
        switchConnexion(true);

      })
      .catch((err) => {
        setEmail("");
        setPassword("");

        toaster.notify(<Toast style='fail' message={`Une erreur est survenue, le serveur a répondu: '${err.response.data.message}'`} />, toasterOptions)
      });
  };


  return (
    <div className="connect-container">
      <div className="title">
        <h2>Interface de connexion:</h2>
        <div className="icon" onClick={handleConnexion}>
          <FaWindowClose size="30" />
        </div>
      </div>
      <form>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleForm} className="btn btn-warning">
          Connexion
        </button>
      </form>
    </div>
  );
};

ConnectForm.propTypes = {
  switchConnexion: Proptypes.func.isRequired,
  handleConnexion: Proptypes.func.isRequired
};

export default ConnectForm;
