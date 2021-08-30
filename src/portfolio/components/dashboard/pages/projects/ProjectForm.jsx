import React from "react";
import { useState } from "react";

import Input from "../../../commons/forms/Input";
import MdEditor from "../../../commons/forms/MdEditor";

const ProjectForm = () => {
  const [formErrors, setFormErrors] = useState({ description: ["empty"] });
  const [formDatas, setFormDatas] = useState({});
  const [mdDescription, setMdDescription] = useState();

  const handleForm = (e) => {
    setFormDatas({ ...formDatas, [e.target.id]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault(e);
  };

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
        {/* Description */}
        <MdEditor
          value={mdDescription}
          setValue={setMdDescription}
          errors={formErrors.description}
          label="description du projet"
          isRequired
        />
      </form>
    </div>
  );
};

export default ProjectForm;
