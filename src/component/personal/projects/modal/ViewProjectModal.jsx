import React, {useEffect} from 'react'

import Modal from 'react-bootstrap/Modal'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'

import ImageSlides from './ProjectDisplay/ImagesSlides'
import MarkdownDescription from './ProjectDisplay/MarkdownDescription'
import ProjectFooter from './ProjectDisplay/ProjectFooter'
import ShowTechnos from './ProjectDisplay/ShowTechnos'

const ViewProjectModal = (props) => {
    const {mainDatas, technos} = props.project
    const {show, onHide, isDisplay, toogleDisplay} = props

    useEffect(() => {
        document.documentElement.style.setProperty('--bg-slider', props.project.background)
    }, [])

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
                        <span onClick={onHide}>X</span>
                    </ModalTitle>
                    <div className="breadcrumb-project">
                            { isDisplay !== 'description' ?
                                <span onClick={toogleDisplay} className="description">Description</span>
                                : <span className='selected description'>Description</span>
                            }
                            { isDisplay !== 'gallery' ?
                                <span onClick={toogleDisplay} className="gallery">Galerie</span>
                                : <span className='selected gallery'>Galerie</span>
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
                                : <ImageSlides nbImages={mainDatas.nb_images} prefix={mainDatas.img_prefix} bgColor={mainDatas.background} />
                        }
                </ModalBody>
                { props.project.mainDatas && (props.project.mainDatas.url_test || props.project.mainDatas.url_github) &&
                    <ModalFooter>
                        <ProjectFooter project={mainDatas} />
                    </ModalFooter>
                }
            </Modal>
        </div>
    )
}

export default ViewProjectModal