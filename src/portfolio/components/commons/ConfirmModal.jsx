import React from "react";

import Modal from "react-bootstrap/Modal";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

import propTypes from "prop-types";

const ConfirmModal = ({ className, dataId, handleClose, message, show, title, validate }) => (
  <div>
    <Modal
      className={`confirm-modal ${className && className}`}
      show={show}
      onHide={() => handleClose()}
      size="md"
      scrollable={true}
    >
      <ModalHeader closeButton>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>{message}</ModalBody>

      <ModalFooter>
        <button className="btn btn-danger" onClick={(e) => validate(e)} data-id={dataId && dataId}>
          Confirmer la suppression
        </button>
      </ModalFooter>
    </Modal>
  </div>
);

ConfirmModal.propTypes = {
  className: propTypes.string,
  dataId: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
  dataLabel: propTypes.string.isRequired,
  handleClose: propTypes.func.isRequired,
  show: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
  message: propTypes.string.isRequired,
  validate: propTypes.func.isRequired
};

export default ConfirmModal;
