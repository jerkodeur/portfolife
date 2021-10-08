import React from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import CareerContainer from "./CareerContainer";
import ProgressBdd from "./progressBars/ProgressBdd";
import ProgressLanguage from "./progressBars/ProgressLanguage";
import ProgressMain from "./progressBars/ProgressMain";
import ProgressOther from "./progressBars/ProgressOther";

import { steps } from "./AboutInfos";

const AboutTabs = () => {
  const tabs = [
    {
      id: 1,
      name: "En vedette",
      component: <ProgressMain />
    },
    {
      id: 2,
      name: "Langages",
      component: <ProgressLanguage />
    },
    {
      id: 3,
      name: "BDD",
      component: <ProgressBdd />
    },
    {
      id: 4,
      name: "Autres",
      component: <ProgressOther />
    },
    {
      id: 5,
      name: "Mon parcours",
      component: <CareerContainer steps={steps} />
    }
  ];

  return (
    <div className="tabs-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 ">
            <Tabs>
              <TabList className="tab-style--1">
                {tabs.map((tab) => (
                  <Tab key={tab.id}>{tab.name}</Tab>
                ))}
              </TabList>
              {tabs.map((tab) => (
                <TabPanel key={tab.id}>{tab.component}</TabPanel>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTabs;
