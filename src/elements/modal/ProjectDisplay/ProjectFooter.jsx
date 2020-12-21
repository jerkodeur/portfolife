import React from 'react'

const ProjectFooter = ({project}) => {
    const view = require('../../../../public/assets/images/icons/www.svg')
    const gitHub = require('../../../../public/assets/images/icons/github.png')


    return (
        <div className="project-footer">
            { project.url_test &&
            <a href={project.url_test && project.url_test} alt="voir le site" target="_blank" >
                <img src={view}/>
                Voir une démo
            </a>
            }
            { project.url_github &&
                <a href={project.url_github && project.url_github} alt="voir le dépôt github" target="_blank" className="pl-5">
                    <img src={gitHub}/>
                    Voir le code
                </a>
            }
        </div>
    )
}

export default ProjectFooter