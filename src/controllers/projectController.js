import { request } from "@service/requests";

export const getAllProjects = () =>
  request("get", "/projects")
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

export const deleteProject = (projectId) =>
  request("delete", `/projects/${projectId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

export const updateOneField = (projectId, params) =>
  request("put", `/projects/async/${projectId}`, params)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
