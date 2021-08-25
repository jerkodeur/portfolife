import React from 'react'
import {FaMobile} from 'react-icons/fa'

const ProjectFooter = ({project}) => {
    const view = require('../../../../../../public/assets/images/icons/www.svg')
    const gitHub = require('../../../../../../public/assets/images/icons/github.png')


    return (
        <div className="project-footer">
            { project.url_test &&
                <a href={project.url_test && project.url_test} target="_blank" rel="noopener noreferrer">
                    <img src={view} alt='Voir le site' />
                    <span>Voir une démo</span>
                    <span className="small-descr">Démo</span>
                </a>
            }
            { project.url_github &&
                <a href={project.url_github && project.url_github} target="_blank" rel="noopener noreferrer" className="pl-5">
                    <img src={gitHub} alt='voir mon github' />
                    <span>Voir sur Github</span>
                    <span className="small-descr">Github</span>
                </a>
            }
        </div>
    )
}

export default ProjectFooter