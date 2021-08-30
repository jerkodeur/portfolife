import React from "react";

import axios from "axios";
import { useEffect } from "react";

const ProjectForm = () => {

  useEffect(() => {
    axios.get('/projects')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }, [])

  return <div>New project</div>;
};

export default ProjectForm