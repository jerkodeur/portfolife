import { request } from "@service/requests";

export const newProjectTechno = (projectId, technoId) =>
  request("post", `/projects/${projectId}/addTechno/${technoId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

export const removeProjectTechno = (projectId, technoId) =>
  request("delete", `/projects/${projectId}/technos/${technoId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
