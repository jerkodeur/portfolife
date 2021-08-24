import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

import ProgressBdd from "../../blocks/progressbar/ProgressBdd";
import ProgressMain from "../../blocks/progressbar/ProgressMain";
import ProgressLanguage from "../../blocks/progressbar/ProgressLanguage";
import ProgressOther from "../../blocks/progressbar/ProgressOther";
import { useState } from "react";

const steps = [
  {
    start: "Mai 2021",
    end: "Août 2021",
    company: "Simplon.co",
    companyUrl: "https://simplon.co/",
    companyTechnos: ["php", "Symfony"],
    title: "Formation développeur back-end PHP Symfony",
    type: "formation",
    missions: []
  },
  {
    start: "Septembre 2020",
    end: "Décembre 2020",
    company: "Bluesquare.io",
    companyUrl: "https://bluesquare.io/",
    companyTechnos: [],
    title: "Développeur Web / Web Mobile (stage)",
    type: "stage",
    missions: [
      {
        description: "Refonte d'un site français reconnu de chasseur de têtes",
        technos: ["Laravel", "ReactJS", "SCSS"],
        features: [
          "Implémenter de nouvelles fonctionnalités dynamiques en React",
          "Créer des animations",
          "Améliorer et déboguer l'interface graphique"
        ]
      },
      {
        description: "Développer un centre d'aide pour les clients de l'agence",
        technos: ["PHP", "VueJS", "Laravel", "InertiaJS", "TailwindCSS"]
      },
    ]
  },
  {
    start: "Mars 2021",
    end: "",
    company: "",
    companyUrl: "",
    companyTechnos: [],
    title: "Obtention du titre de développeur Web / Web Mobile",
    type: "diplôme",
    missions: []
  },
  {
    start: "Mars 2020",
    end: "Juillet 2020",
    company: "Wild Code School",
    companyUrl: "https://www.wildcodeschool.com/fr-FR",
    companyTechnos: ["Javascript", "ReactJS", "NodeJS"],
    title: "Développeur Web / Web Mobile",
    type: "formation",
    missions: []
  },
]

const TabsTwo = (props) => {

  const [tab1, tab2, tab3, tab4, tab5] = [
    "En vedette",
    "Langages",
    "Base de données",
    "Autres",
    "Mon parcours",
  ];

  const getUniqTechnos = (array) => {
    const technos = [];
    array.map(el => technos.push(...el.technos));
    return([...new Set(technos)])
  }

  const { tabStyle } = props;

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
                    <ul className="career-container">
                      {
                        steps.map((step, index) => (
                          <li key={index}>
                            <ul className="sub-carreer">
                              <li className="date">
                                {
                                !step.end ? step.start :
                                  step.start.split(' ')[1] === step.end.split(' ')[1] ?
                                    `De ${step.start.split(' ')[0]} à ${step.end.split(' ')[0]} ${step.end.split(' ')[1]}` :
                                    `De ${step.start} à ${step.end}`
                                }
                              </li>
                              <li className="career-descr">
                                {
                                  step.company === '' ?
                                    <b>{step.title}</b>
                                    :
                                    <>
                                      <a href={step.companyUrl} target="_blank" rel="noopener noreferrer">{step.company}</a> - {' '}{step.title}
                                    </>
                                }
                              </li>
                              {
                                step.missions.length > 0 &&
                                <li className="technos">
                                  {
                                    getUniqTechnos(step.missions).map((techno, index) =>
                                      <span className="techno" key={index}>{techno}</span>
                                    )
                                  }
                                </li>
                              }
                              {
                                step.companyTechnos && step.companyTechnos.length > 0 &&
                                <li className="technos">
                                  {
                                    step.companyTechnos.map((techno, index) =>
                                      <span className="techno" key={index}>{techno}</span>
                                    )
                                  }
                                </li>
                              }
                              {
                                step.missions.length > 0 && step.missions.map((mission, index) =>
                                  <div key={index}>
                                    <li className='description'>
                                      {mission.description}
                                    </li>
                                    {
                                      mission.features && <ul id={`features${index}`}>{mission.features.map((feature, index) => <li className='feature' key={index}>{feature}</li>)}</ul>
                                    }
                                  </div>
                                )
                              }
                            </ul>
                          </li>
                        ))
                      }
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
  );
};

export default TabsTwo;
