import React, { useEffect } from "react";

import propTypes from "prop-types";

import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

import ImageSlides from "./ProjectDisplay/ImagesSlides";
import MarkdownDescription from "./ProjectDisplay/MarkdownDescription";
import ProjectFooter from "./ProjectDisplay/ProjectFooter";
import ShowTechnos from "./ProjectDisplay/ShowTechnos";
import TabsLayout from "./ProjectDisplay/TabsLayout";

import { useTabs } from "@helpers/customHooks";

const ViewProjectModal = (props) => {
  const { mainDatas, technos, background } = props.project;
  const { isShowed, hideModal } = props;

  const [showTab, setshowTab] = useTabs();

  useEffect(() => {
    document.documentElement.style.setProperty("--bg-slider", background);
  }, [background]);

  return (
    <div>
      <Modal
        className="project-modal"
        show={isShowed}
        onHide={() => {
          setshowTab.reset();
          hideModal();
        }}
        size="xl"
        scrollable={true}
      >
        <ModalHeader>
          <ModalTitle>
            {mainDatas && mainDatas.title}
            <span onClick={hideModal}>X</span>
          </ModalTitle>
          <TabsLayout showTab={showTab} setshowTab={setshowTab.set} />
        </ModalHeader>
        <ModalBody>
          {showTab === 0 ? (
            <div className="main-description">
              <ShowTechnos technos={technos} />
              {mainDatas && <MarkdownDescription description={mainDatas.description} />}
            </div>
          ) : (
            <ImageSlides nbImages={mainDatas.nb_images} prefix={mainDatas.img_prefix} bgColor={mainDatas.background} />
          )}
        </ModalBody>
        {mainDatas && (mainDatas.url_test || mainDatas.url_github) && (
          <ModalFooter>
            <ProjectFooter project={mainDatas} />
          </ModalFooter>
        )}
      </Modal>
    </div>
  );
};

ViewProjectModal.propTypes = {
  isShowed: propTypes.bool.isRequired,
  hideModal: propTypes.func.isRequired,
  project: propTypes.shape({
    mainDatas: propTypes.shape({
      background: propTypes.string.isRequired,
      description: propTypes.string.isRequired,
      img_prefix: propTypes.string.isRequired,
      nb_images: propTypes.number.isRequired,
      title: propTypes.string.isRequired,
      url_github: propTypes.string,
      url_test: propTypes.string
    }).isRequired,
    technos: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.number.isRequired,
        image_name: propTypes.string.isRequired,
        name: propTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired
};
export default ViewProjectModal;
