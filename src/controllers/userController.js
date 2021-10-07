import { request } from "@service/requests";

export const adminAuthentication = ({ email, password }) =>
  request("/admins", "post", { email, password })
    .then((res) => res)
    .catch((err) => {
      throw new Error(err);
    });
