import React, { useState, useEffect } from "react";
import propTypes from "prop-types";

import ViewProjectModal from "./modal/ViewProjectModal";

import { getAllProjects } from "@controllers/projectController";
import { useToaster, useBoolean } from "@helpers/customHooks";

const ProjectList = ({ items }) => {
  const [showModal, setShowModal] = useBoolean(false);
  const [selectedModal, setSelectedModal] = useState("");
  const [projects, setProjects] = useState();

  const toggleModal = (project) => {
    document.documentElement.style.setProperty("--bg-slider", project.mainDatas.background);
    setSelectedModal(project);
    setShowModal.on();
  };

  useEffect(() => {
    getAllProjects()
      .then((projects) => setProjects(projects))
      .catch((err) => console.error(err) && useToaster.fail("Erreur lors de la récupération des projets"));
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
            index < items && (
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
                {selectedModal && (
                  <ViewProjectModal isShowed={showModal} hideModal={setShowModal.off} project={selectedModal} />
                )}
              </div>
            )
          );
        })}
    </>
  );
};

ProjectList.propTypes = {
  items: propTypes.number.isRequired
};

export default ProjectList;
