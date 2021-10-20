import axios from "axios";

const token = localStorage.getItem("token");

export const request = (url, type = "get", params = {}) =>
  axios({
    method: type,
    url: url,
    data: params,
    headers: { authorization: `Bearer: ${token}` }
  });
