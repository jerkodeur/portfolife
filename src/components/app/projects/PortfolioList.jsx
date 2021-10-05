import React, { useState, useEffect } from "react";

import Axios from "axios";

import ViewProjectModal from "./modal/ViewProjectModal";

const PortfolioList = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState(false);
  const [projects, setProjects] = useState();
  const [isDisplay, setIsDisplay] = useState("description");

  const { column, stylevariation } = props;

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
    Axios.get("/projects")
      .then((datas) => setProjects(datas.data))
      .catch((error) => console.log("une erreur est survenue", error));
  }, []);

  return (
    <>
      {projects &&
        projects.map((project, index) => {
          const { title, url_test, img_prefix, short_description, id, context, context_url } = project.mainDatas;

          const image = `/assets/images/projects/${img_prefix}/${img_prefix}_preview.png`;
          // Define the preview css image variable for each project
          document.documentElement.style.setProperty(`--preview-img-${index}`, `url(${image})`);
          let technoList = "";
          // fetch the five main techno to display
          project.technos.map((techno, index) => {
            if (index < 5) {
              technoList += techno.name + " / ";
            }
            return technoList;
          });
          technoList = technoList.slice(0, technoList.length - 2);

          return (
            index < 6 && (
              <div className={`${column}`} key={id}>
                <div className={`portfolio ${stylevariation}`}>
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
                        <a className="rn-btn" onClick={() => toggleModal(project)}>
                          Voir en détail
                        </a>
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
export default PortfolioList;
