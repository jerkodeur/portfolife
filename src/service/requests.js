import axios from "axios";

const token = sessionStorage.getItem("token");

export const request = (type, url, params) =>
  axios({
    method: type,
    url: url,
    data: params,
    headers: { Authorization: `Bearer: ${token}` }
  });
