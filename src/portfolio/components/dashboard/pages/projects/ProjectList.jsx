import React, { useEffect } from "react";

import axios from "axios";

const ProjectList = () => {
  useEffect(() => {
    axios
      .get("/projects")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  return <div>Liste des projets</div>;
};

export default ProjectList;
