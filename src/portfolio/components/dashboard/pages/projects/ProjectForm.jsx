import React from "react";
import { useState } from "react";

import Input from "../../../commons/forms/Input";
import MdEditor from "../../../commons/forms/MdEditor";

const ProjectForm = () => {
  const [formErrors, setFormErrors] = useState({ url_github: ["empty"] });
  const [formDatas, setFormDatas] = useState({
    background: "#ffffff",
    active: false
  });
  const [mdDescription, setMdDescription] = useState();

  const handleForm = (e) => {
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
          value={formDatas.title}
        />
        {/* short description */}
        <Input
          errors={formErrors.short_description}
          id="short_description"
          isRequired
          label="courte description"
          placeholder="description courte du projet (Apparaît dans les vignettes)"
          setValue={(e) => handleForm(e)}
          value={formDatas.short_description}
        />
        {/* Context */}
        <Input
          errors={formErrors.context}
          id="context"
          isRequired
          label="Contexte"
          placeholder="Entreprise ou école ou a été réalisé le projet"
          setValue={(e) => handleForm(e)}
          value={formDatas.context}
        />
        {/* Context url */}
        <Input
          errors={formErrors.context_url}
          id="context_url"
          label="Lien de l'établissement"
          placeholder="Lien de l'établissement du contexte"
          type="url"
          setValue={(e) => handleForm(e)}
          value={formDatas.context_url}
        />
        {/* github url */}
        <Input
          errors={formErrors.url_github}
          id="url_github"
          label="Lien vers le dépôt github"
          placeholder="Insérer le lien du dépôt github"
          type="url"
          setValue={(e) => handleForm(e)}
          value={formDatas.url_github}
        />
        {/* project preview url */}
        <Input
          errors={formErrors.url_test}
          id="url_test"
          label="Lien vers la page de test"
          placeholder="Insérer le lien de la page de test"
          type="url"
          setValue={(e) => handleForm(e)}
          value={formDatas.url_test}
        />
        {/* project date */}
        <Input
          errors={formErrors.date}
          id="date"
          isRequired
          label="Date du projet"
          type="date"
          setValue={(e) => handleForm(e)}
          value={formDatas.date}
        />
        {/* image prefix  */}
        <Input
          errors={formErrors.img_prefix}
          id="img_prefix"
          isRequired
          label="Préfixe des images (même nom que le dossier du projet)"
          placeholder="Ajouter un prefix"
          setValue={(e) => handleForm(e)}
          value={formDatas.img_prefix}
        />
        {/* thumbmail images background color */}
        <Input
          errors={formErrors.background}
          id="background"
          label="Couleur de fond (Sera utilisé pour le carousel d'image)"
          type="color"
          setValue={(e) => handleForm(e)}
          value={formDatas.background}
        />
        {/* thumbmail images background color */}
        <Input
          errors={formErrors.nb_images}
          id="nb_images"
          label="Nombres d'images"
          type="number"
          setValue={(e) => handleForm(e)}
          value={formDatas.nb_images}
          min={0}
          max={20}
        />
        {/* Active */}
        <label className="switch">
          <input
            type="checkbox"
            checked={formDatas.active && "checked"}
            id="active"
            onChange={() =>
              setFormDatas({ ...formDatas, active: !formDatas.active })
            }
          />
          <span className="slider round"></span>
        </label>
        <label htmlFor="active">Publier le projet ?</label>
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
