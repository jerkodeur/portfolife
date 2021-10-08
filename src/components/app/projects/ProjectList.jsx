import React, { useState, useEffect } from "react";
import propTypes from "prop-types";

import ToasterDisplay from "@components/commons/ToasterDisplay";
import ViewProjectModal from "./modal/ViewProjectModal";

import { getAllProjects } from "@controllers/projectController";

const ProjectList = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState(false);
  const [projects, setProjects] = useState();
  const [isDisplay, setIsDisplay] = useState("description");

  const toggleModal = (project) => {
    document.documentElement.style.setProperty("--bg-slider", project.mainDatas.background);
    setSelectedModal(project);
    setShowModal(true);
  };

  const toogleDisplay = (isDefault = "description") => {
    isDisplay === "description" || !isDefault ? setIsDisplay("gallery") : setIsDisplay("description");
  };

  const hideModal = () => {
    document.documentElement.style.setProperty("--bg-slider", "rgba(244, 245, 240, 0.561)");
    setIsDisplay("description");
    setShowModal(false);
  };

  useEffect(() => {
    getAllProjects()
      .then((projects) => setProjects(projects))
      .catch((err) => console.error(err) && ToasterDisplay("Erreur lors de la récupération des projets", "fail"));
  }, []);

  return (
    <>
      {projects &&
        projects.map((project, index) => {
          const { title, url_test, img_prefix, short_description, id, context, context_url } = project.mainDatas;

          const image = `/assets/images/projects/${img_prefix}/${img_prefix}_preview.png`;
          // Define the preview css image variable for each project
          document.documentElement.style.setProperty(`--preview-img-${index}`, `url(${image})`);

          const technoList = project.technos
            .reduce((technos, currTechno) => {
              technos.push(currTechno.name);
              return technos;
            }, [])
            .join(" / ");

          return (
            index < item && (
              <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={id}>
                <div className="portfolio text-center mt--40">
                  <div className="thumbnail-inner">
                    <div className={`thumbnail image-${index}`}></div>
                    <div className={`bg-blr-image image-${index}`}></div>
                  </div>
                  <div className="content">
                    <div className="inner">
                      <h5>
                        <a href={context_url || void 0} target={context_url && '"_blank"'}>
                          {context}
                        </a>
                      </h5>
                      <p>{technoList}</p>
                      <h4>
                        <a href={url_test || void 0} target={url_test && "_blank"}>
                          {title}
                        </a>
                      </h4>
                      <p>{short_description}</p>
                      <div className="portfolio-button">
                        <button type="button" className="rn-btn" onClick={() => toggleModal(project)}>
                          Voir en détail
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <ViewProjectModal
                  show={showModal}
                  onHide={() => hideModal()}
                  isDisplay={isDisplay}
                  toogleDisplay={() => toogleDisplay()}
                  project={selectedModal}
                />
              </div>
            )
          );
        })}
    </>
  );
};

ProjectList.propTypes = {
  item: propTypes.number.isRequired
};

export default ProjectList;
