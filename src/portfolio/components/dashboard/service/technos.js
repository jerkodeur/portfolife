export const checkIfTechnoIsInProject = (projects, currentProjectId, technoId) =>
  projects.reduce((acc, curr) => {
    if (curr.mainDatas.id === currentProjectId) {
      return (acc = curr.technos.filter((techno) => techno.id === technoId).length > 0 && true);
    }
    return acc;
  }, false);
