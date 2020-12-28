import React from "react"
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'

import ProgressBdd from "../../blocks/progressbar/ProgressBdd"
import ProgressMain from "../../blocks/progressbar/ProgressMain"
import ProgressLanguage from "../../blocks/progressbar/ProgressLanguage"
import ProgressOther from "../../blocks/progressbar/ProgressOther"

const TabsTwo = (props) => {

    const
        tab1 = "Frameworks",
        tab2 = "Langages",
        tab3 = "Base de données",
        tab4 = "Autres",
        tab5 = "Mon parcours"

    const {tabStyle} = props

    return (
        <div>
            {/* Start Tabs Area */}
            <div className="tabs-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 ">
                            <Tabs>
                                <TabList className={`${tabStyle}`}>
                                    <Tab>{tab1}</Tab>
                                    <Tab>{tab2}</Tab>
                                    <Tab>{tab3}</Tab>
                                    <Tab>{tab4}</Tab>
                                    <Tab>{tab5}</Tab>
                                </TabList>

                                <TabPanel>
                                    <ProgressMain />
                                </TabPanel>

                                <TabPanel>
                                    <ProgressLanguage />
                                </TabPanel>

                                <TabPanel>
                                    <ProgressBdd />
                                </TabPanel>

                                <TabPanel>
                                    <ProgressOther />
                                </TabPanel>

                                <TabPanel>
                                    <div className="single-tab-content">
                                        <ul>
                                            <li>
                                                <a href="https://bluesquare.io/" target="_blank" rel="noopener noreferrer">
                                                    Bluesquare.io </a>
                                                    - Développeur Web / Web Mobile (stage)
                                                <br />
                                                    [Septembre à Décembre 2020]<br />
                                                    ✠ <small>Refonte d'un site français reconnu de chasseur de têtes = [ <b>SCSS</b> / <b>ReactJs</b> / <b>Laravel</b> ] => Implémenter de nouvelles fonctionnalités dynamiques en React, créer des animations, améliorer et déboguer l'interface graphique.</small><br />
                                                    ✠ <small>R&D = Développer un centre d'aide pour les clients de l'agence => [<b>PHP</b>, <b>Laravel</b>, <b>InertiaJs</b>, <b>VueJs</b>, <b>TailWindCSS</b>]</small>
                                            </li>
                                            <li>
                                                <a href="https://www.wildcodeschool.com/fr-FR" target="_blank" rel="noopener noreferrer">
                                                    Wild Code School </a>
                                                    - Formation au titre professionnel de développeur Web / Web Mobile
                                                <br />
                                                    [Mars à Juillet 2020]
                                            </li>
                                        </ul>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Tabs Area */}
        </div>
    )
}



export default TabsTwo