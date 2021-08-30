import React from "react";
import { useState } from "react";

import Input from "../../../commons/forms/Input";

const ProjectForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formDatas, setFormDatas] = useState({});

  const handleForm = (e) => {
    console.log(e.target.id, e.target.value);
    setFormDatas({ ...formDatas, [e.target.id]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault(e);
  };
  console.log(formDatas);
  return (
    <div className="project-form-container">
      <h2>New project</h2>
      <form onSubmit={submitForm}>
        {/* Title */}
        <Input
          errors={formErrors.title}
          id="title"
          isRequired
          label="titre"
          placeholder="titre du projet"
          setValue={(e) => handleForm(e)}
        />

        {/* short description */}
        <Input
          errors={formErrors.short_description}
          id="short_description"
          isRequired
          label="courte description"
          placeholder="description courte du projet (Apparaît dans les vignettes)"
          setValue={(e) => handleForm(e)}
        />
      </form>
    </div>
  );
};

export default ProjectForm;
