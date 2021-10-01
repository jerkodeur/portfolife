export const updateListOfProjects = (prevProjects, updatedProject) =>
  Array.from(prevProjects).reduce((acc, project) => {
    if (project.mainDatas.id === updatedProject.mainDatas.id) {
      project.mainDatas = updatedProject.mainDatas;
    }
    acc.push(project);
    return acc;
  }, []);

export const updateProjectTechnos = (projects, currentProjectId, technos) =>
  projects.reduce((acc, curr) => {
    if (curr.mainDatas.id === currentProjectId) {
      curr = { ...curr, technos };
    }
    acc.push(curr);
    return acc;
  }, []);
