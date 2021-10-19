import { request } from "@helpers/requests";

export const addOneProject = (datas) =>
  request("/projects/", "post", datas)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

export const deleteProject = (projectId) =>
  request(`/projects/${projectId}`, "delete")
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

export const getAllProjects = () =>
  request("/projects")
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

export const updateOneField = (projectId, params) =>
  request(`/projects/async/${projectId}`, "put", params)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
