import React, {useState, useEffect} from 'react'

import Modal from 'react-bootstrap/Modal'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'

import ImageSlides from './ProjectDisplay/ImagesSlides'
import MarkdownDescription from './ProjectDisplay/MarkdownDescription'
import ShowTechnos from './ProjectDisplay/ShowTechnos'

const ViewProjectModal = (props) => {
    const {mainDatas, technos} = props.project
    const {show, onHide, isDisplay, toogleDisplay} = props

    // const [modalDisplay, setModalDisplay,] = useState('description')

    console.log(props)
    return (
        <div>
            <Modal
                className="project-modal"
                show={show}
                onHide={onHide}
                size="xl"
                scrollable={true}
            >
                <ModalHeader>
                    <ModalTitle>
                        {mainDatas && mainDatas.title}
                    </ModalTitle>
                    <div className="breadcrumb-project">
                            { isDisplay !== 'description' ?
                                <span onClick={toogleDisplay}>Description</span>
                                : <span className='selected'>Description</span>
                            }
                            { isDisplay !== 'gallery' ?
                                <span onClick={toogleDisplay}>Galerie photos</span>
                                : <span className='selected'>Galerie photos</span>
                            }
                    </div>
                </ModalHeader>
                <ModalBody>
                        {
                            isDisplay === 'description'
                                ?
                                <div className='main-description'>
                                    <ShowTechnos technos={technos} />
                                    <MarkdownDescription project={props.project} />
                                </div>
                                : <ImageSlides />
                        }
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