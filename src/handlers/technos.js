export const checkIfTechnoIsInProject = (projects, currentProjectId, technoId) =>
  projects.reduce((acc, curr) => {
    if (curr.mainDatas.id === currentProjectId) {
      return (acc = curr.technos.filter((techno) => techno.id === technoId).length > 0 && true);
    }
    return acc;
  }, false);

export const getTechnoIds = (arrayOfTechnos) =>
  arrayOfTechnos.reduce((ids, currentTechno) => {
    ids.push(currentTechno.id);
    return ids;
  }, []);
