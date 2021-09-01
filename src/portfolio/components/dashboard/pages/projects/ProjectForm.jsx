import React, { useEffect, useState } from "react";

import axios from "axios";

import Input from "../../../commons/forms/Input";
import MdEditor from "../../../commons/forms/MdEditor";
import toaster from "toasted-notes";
import Toast from "../../../commons/Toast";

const toasterOptions = {
  position: "top-right",
  duration: 5000
};

const ProjectForm = () => {
  const token = localStorage.getItem("token");
  const [formErrors, setFormErrors] = useState({ url_github: ["empty"] });
  const [formDatas, setFormDatas] = useState({
    background: "#ffffff",
    active: false,
    technos: [6]
  });
  const [mdDescription, setMdDescription] = useState();
  const [technos, setTechnos] = useState();
  const [newTechno, setNewTechno] = useState({
    priority: 1
  });
  const [newTechnoFormDisplay, setNewTechnoFormDisplay] = useState(true);

  useEffect(() => {
    axios
      .get("/technos", {
        headers: { authorization: `Bearer: ${token}` }
      })
      .then((res) => setTechnos(res.data))
      .catch(
        (err) =>
          console.log(err.response) ||
          toaster.notify(
            <Toast
              style="fail"
              message="Erreur lors de la récupération des technos"
            />,
            toasterOptions
          )
      );
  }, [token]);

  const handleForm = (e) => {
    setFormDatas({ ...formDatas, [e.target.id]: e.target.value });
  };

  const handleNewTechno = (e) => {
    setNewTechno({ ...newTechno, [e.target.id]: e.target.value });
  };

  const toggleSelectedTechnos = (e) => {
    const techno = Number(e.target.id);
    !formDatas.technos.includes(techno)
      ? setFormDatas({
          ...formDatas,
          technos: [...formDatas.technos, techno]
        })
      : setFormDatas({
          ...formDatas,
          technos: [...formDatas.technos].filter((el) => el !== techno)
        });
  };

  const addNewTechno = () => {
    console.log(newTechno);
  };

  const submitForm = (e) => {
    e.preventDefault(e);
  };

  console.log(formDatas);
  return (
    <div className="project-form-container">
      <h1>Creation d'un nouveau projet</h1>
      <form onSubmit={submitForm}>
        <fieldset>
          <legend>Informations générales</legend>
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
            errors={formErrors.shortDescription}
            id="shortDescription"
            isRequired
            label="courte description"
            placeholder="description courte du projet (Apparaît dans les vignettes)"
            setValue={(e) => handleForm(e)}
            value={formDatas.shortDescription}
          />
          {/* Description */}
          <MdEditor
            value={mdDescription}
            setValue={setMdDescription}
            errors={formErrors.description}
            label="description du projet"
            isRequired
          />
        </fieldset>
        <fieldset>
          <legend>Contexte du projet</legend>
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
            errors={formErrors.contextUrl}
            id="contextUrl"
            label="Lien de l'établissement"
            placeholder="Lien de l'établissement du contexte"
            type="url"
            setValue={(e) => handleForm(e)}
            value={formDatas.contextUrl}
          />
        </fieldset>
        <fieldset className="multiple-fields-wrapper">
          <legend>Liens du projet</legend>
          {/* github url */}
          <Input
            errors={formErrors.urlGithub}
            id="urlGithub"
            label="Lien vers le dépôt github"
            placeholder="Insérer le lien du dépôt github"
            type="url"
            setValue={(e) => handleForm(e)}
            value={formDatas.urlGithub}
          />
          {/* project preview url */}
          <Input
            errors={formErrors.urlTest}
            id="urlTest"
            label="Lien vers la page de test"
            placeholder="Insérer le lien de la page de test"
            type="url"
            setValue={(e) => handleForm(e)}
            value={formDatas.urlTest}
          />
        </fieldset>
        <fieldset className="multiple-fields-wrapper">
          <legend>Images</legend>
          {/* image prefix  */}
          <Input
            errors={formErrors.imgPrefix}
            id="imgPrefix"
            isRequired
            label="Préfixe des images"
            placeholder="Ajouter un prefix"
            setValue={(e) => handleForm(e)}
            value={formDatas.imgPrefix}
          />
          {/* thumbmail images background color */}
          <Input
            errors={formErrors.background}
            id="background"
            label="Couleur de fond carousel d'images"
            type="color"
            setValue={(e) => handleForm(e)}
            value={formDatas.background}
          />
          {/* thumbmail images background color */}
          <Input
            errors={formErrors.nbImages}
            id="nbImages"
            isRequired
            label="Nombres d'images"
            type="number"
            setValue={(e) => handleForm(e)}
            value={formDatas.nbImages}
            min={0}
            max={20}
          />
        </fieldset>
        <fieldset>
          <legend>Technos utilisées dans le projet</legend>
          <ul className="techno-wrapper">
            {technos &&
              technos.map((techno) => {
                return (
                  <li
                    role="button"
                    id={techno.id}
                    key={techno.id}
                    className={
                      formDatas.technos.includes(techno.id) ? "selected" : ""
                    }
                    onClick={toggleSelectedTechnos}
                  >
                    {techno.name}
                  </li>
                );
              })}
            {!newTechnoFormDisplay && (
              <li onClick={() => setNewTechnoFormDisplay(true)} role="link">
                Ajouter une nouvelle techno...
              </li>
            )}
          </ul>
          {newTechnoFormDisplay && (
            <div onSubmit={submitForm} id="newTechno">
              <fieldset className="new-techno-container">
                <legend>
                  Ajout d'une nouvelle techno{" "}
                  <span
                    title="Fermer"
                    onClick={() => setNewTechnoFormDisplay(false)}
                  >
                    X
                  </span>
                </legend>
                <div className="multiple-fields-wrapper">
                  {/* New techno name */}
                  <Input
                    errors={formErrors.newTechno && formErrors.newTechno.name}
                    id="name"
                    label="Nom"
                    placeholder="Nom de la techno"
                    isRequired
                    value={newTechno.name}
                    setValue={(e) => handleNewTechno(e)}
                  />
                  {/* New techno file name */}
                  <Input
                    errors={
                      formErrors.newTechno && formErrors.newTechno.imageName
                    }
                    id="imageName"
                    label="Fichier image"
                    placeholder="image.ext"
                    isRequired
                    value={newTechno.imageName}
                    setValue={(e) => handleNewTechno(e)}
                  />
                  {/* thumbmail images background color */}
                  <Input
                    errors={
                      formErrors.newTechno && formErrors.newTechno.priority
                    }
                    id="priority"
                    isRequired
                    label="Priorité d'affichage"
                    type="number"
                    setValue={(e) => handleNewTechno(e)}
                    value={newTechno.priority}
                    min={1}
                    max={3}
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-dark"
                    type="submit"
                    onClick={addNewTechno}
                  >
                    Valider
                  </button>
                </div>
              </fieldset>
            </div>
          )}
        </fieldset>
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
        <div className="submit-container">
          <button type="submit" className="submit-button">
            Ajouter le projet
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
