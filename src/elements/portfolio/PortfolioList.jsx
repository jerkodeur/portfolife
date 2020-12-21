import React, {useState, useEffect} from "react"

import Axios from 'axios'

import ViewProjectModal from "../modal/ViewProjectModal"

const PortfolioListContent = [
    {
        image: 'image-1',
        description: "Participation à la refonte du site, développement de fonctionnalités",
        category: 'React / Laravel / Bootstrap / scss',
        context: 'Bluesquare.io',
        title: 'Urban Linker',
        projectUrl: '',
        contextUrl: 'https://bluesquare.io/'
    },
    {
        image: 'image-2',
        description: "Création d'un centre d'aide destinés aux clients de l'agence",
        category: 'Laravel / Inertia.Js / vue.Js / Tailwind Css',
        context: 'Bluesquare.io',
        title: 'Hello',
        projectUrl: '',
        contextUrl: 'https://bluesquare.io/'
    },
    {
        image: 'image-3',
        description: "Partagez vos moments en toute simplicité grâce à cette aplication 100% mobile",
        category: 'React / Node.Js / Css / Html',
        context: 'Wild Code School',
        title: 'Tiny Happy',
        projectUrl: 'https://tinyhappy.netlify.app/',
        contextUrl: 'https://www.wildcodeschool.com/fr-FR'
    },
    {
        image: 'image-4',
        description: "Hackaton organisé par Doctolib !",
        category: 'React / Node.Js / Css / Html',
        context: 'Wild Code School',
        title: 'MyMedsMonitoring',
        projectUrl: 'https://mymedsmedication.netlify.app/',
        contextUrl: 'https://www.wildcodeschool.com/fr-FR'
    },
    {
        image: 'image-5',
        description: "Profitez du confinement ! Découvrez tout nos conseils grosseurs...",
        category: 'React / JavaScript / Css / Html',
        context: 'Wild Code School',
        title: 'HowToBeFat',
        projectUrl: 'https://jerko-folio.netlify.app/static/media/www.bf206f8a.svg',
        contextUrl: 'https://www.wildcodeschool.com/fr-FR'
    },
    {
        image: 'image-6',
        description: "Ne vous fiez pas aux apparences !",
        category: 'Html / Css / Responsive design',
        context: 'Wild Code School',
        title: 'DrakeRPorter',
        projectUrl: 'https://jerkodeur.github.io/DrakeRporter/',
        contextUrl: 'https://www.wildcodeschool.com/fr-FR'
    }
]

const PortfolioList = (props) => {

    const [showModal, setShowModal] = useState(false)
    const [selectedModal, setSelectedModal] = useState(false)
    const [projects, setProjects] = useState()

    const {column, stylevariation} = props
    const list = PortfolioListContent.slice(0, props.item)

    const toggleModal = (value) => {
        setSelectedModal(value)
        setShowModal(true)
    }

    useEffect(() => {
        Axios.get('/projects')
            .then(datas => setProjects(datas.data))
            .catch(error => console.log('une erreur est survenue', error))
    }, [])

    return (
        <>
            {projects && projects.map((value, index) => {
                const {title, description, url_github, url_test, img_prefix, nb_images, short_description, date, id, context, context_url} = value.mainDatas
                const image = `assets/images/projects/${img_prefix}/${img_prefix}_preview.png`
                let root = document.documentElement
                root.style.setProperty(`--preview-img-${index}`, `url(${image})`)
                let technoList = ''
                value.technos.map((techno, index) => {
                    if(index < 5){
                        technoList += techno.name + ' / '
                    }
                    return technoList
                })
                technoList = technoList.slice(0,technoList.length -2)

                return index < 6 &&(
                    <div className={`${column}`} key={id}>
                        <div className={`portfolio ${stylevariation}`}>
                            <div className="thumbnail-inner">
                                <div className={`thumbnail image-${index}`}></div>
                                <div className={`bg-blr-image image-${index}`}></div>
                            </div>
                            <div className="content">
                                <div className="inner">
                                    <h5><a href={context_url || void (0)} target={context_url && '"_blank"'}>{context}</a></h5>
                                    <p>{technoList}</p>
                                    <h4><a href={url_test || void (0)} target={url_test && "_blank"}>{title}</a></h4>
                                    <p>{short_description}</p>
                                    <div className="portfolio-button">
                                        <a className="rn-btn" onClick={() => toggleModal(value)}>Voir en détail</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ViewProjectModal
                            show={showModal}
                            onHide={() => setShowModal(false)}
                            values={selectedModal}
                        />
                    </div>
                )
            })}
        </>
    )

}
export default PortfolioList