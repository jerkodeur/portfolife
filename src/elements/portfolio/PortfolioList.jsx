import React, { Component } from "react";

const PortfolioListContent = [
    {
        image: 'image-1',
        category: 'React / Laravel / Bootstrap / scss',
        context: 'Bluesquare.io',
        title: 'Refonte du site d\'Urban Linker'
    },
    {
        image: 'image-2',
        category: 'Laravel / Inertia.Js / vue.Js / Tailwind Css',
        context: 'Bluesquare.io',
        title: 'Développement d\'une foire aux questions'
    },
    {
        image: 'image-3',
        category: 'React / Node.Js / Css / Html',
        context: 'Wild Code School',
        title: 'Partager vos moments en toute simplicité !'
    },
    {
        image: 'image-4',
        category: 'React / Node.Js / Css / Html',
        context: 'Wild Code School',
        title: 'Hackaton organisé par Doctolib !'
    },
    {
        image: 'image-5',
        category: 'React / Css / Html',
        context: 'Wild Code School',
        title: 'Profitez du confinement ! Tous nos conseils grosseurs...'
    },
    {
        image: 'image-6',
        category: 'Html / Css / Responsive design',
        context: 'Wild Code School',
        title: 'Ne vous fiez pas aux apparences !'
    }
]

class PortfolioList extends Component{
    render(){
        const {column , stylevariation } = this.props;
        const list = PortfolioListContent.slice(0 , this.props.item);
        return(
            <>
                {list.map((value , index) => (
                    <div className={`${column}`} key={index}>
                        <div className={`portfolio ${stylevariation}`}>
                            <div className="thumbnail-inner">
                                <div className={`thumbnail ${value.image}`}></div>
                                <div className={`bg-blr-image ${value.image}`}></div>
                            </div>
                            <div className="content">
                                <div className="inner">
                                    <p>{value.category}</p>
                                    <h4><a href="/portfolio-details">{value.title}</a></h4>
                                    <div className="portfolio-button">
                                        <a className="rn-btn" href="/portfolio-details">Voir en détail</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        )
    }
}
export default PortfolioList;