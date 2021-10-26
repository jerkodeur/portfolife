import { request } from "@helpers/requests";

export const adminAuthentication = ({ email, password }) =>
  request("/admins", "post", { email, password })
    .then((res) => res)
    .catch((err) => {
      if (err.response.status === 401) throw new Error("Identifiants incorrects !");
      else throw new Error(`Erreur ${err.response.status}: ${err.response.data.message}`);
    });
