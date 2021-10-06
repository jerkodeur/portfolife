import { request } from "@service/requests";

export const getAllTechnos = () =>
  request("/technos")
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

export const addOneTechno = (datas) =>
  request("/technos/", "post", datas)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

export const newProjectTechno = (projectId, technoId) =>
  request(`/projects/${projectId}/addTechno/${technoId}`, "post")
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

export const removeProjectTechno = (projectId, technoId) =>
  request(`/projects/${projectId}/technos/${technoId}`, "delete")
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
