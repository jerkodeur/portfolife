import React, {useState} from 'react'


import Modal from 'react-bootstrap/Modal'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'

const ViewProjectModal = (props) => {
    const {title} = props.values

    const [mainDisplay, setMainDisplay] = useState('description')

    return (
        <div>
            <Modal
                className="project-modal"
                show={props.show}
                onHide={props.onHide}
                size="xl"
                centered={true}
            >
                <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="breadcrumb-project col-12 text-center">
                        { mainDisplay !== 'description' ?
                            <span onClick={() => setMainDisplay('description')}>Description</span>
                            : <span className='selected'>Description</span>
                        }
                        <span className="breadcrumb-separator"> ✠ </span>
                        { mainDisplay !== 'gallery' ?
                            <span onClick={() => setMainDisplay('gallery')}>Galerie photos</span>
                            : <span className='selected'>Galerie photos</span>
                        }
                    </div>
                    <div>
                        Slide avec les images
                    </div>
                    <div>
                        Miniatures
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div>
                        Différents lien vers le projet
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ViewProjectModal