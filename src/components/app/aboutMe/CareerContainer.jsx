import React from "react";

import propTypes from "prop-types";

const getUniqTechnos = (array) => {
  const technos = array.reduce((technos, currElt) => {
    technos.push(...currElt.technos);
    return technos;
  }, []);
  return [...new Set(technos)];
};

const CareerContainer = ({ steps }) => (
  <div className="single-tab-content">
    <ul className="career-container">
      {steps.map((step, index) => (
        <li key={index}>
          <ul className="sub-carreer">
            <li className="date">
              {!step.end
                ? step.start
                : step.start.split(" ")[1] === step.end.split(" ")[1]
                ? `De ${step.start.split(" ")[0]} à ${step.end.split(" ")[0]} ${step.end.split(" ")[1]}`
                : `De ${step.start} à ${step.end}`}
            </li>
            <li className="career-descr">
              {step.company === "" ? (
                <b>{step.title}</b>
              ) : (
                <>
                  <a href={step.companyUrl} target="_blank" rel="noopener noreferrer">
                    {step.company}
                  </a>{" "}
                  - {step.title}
                </>
              )}
            </li>
            {step.missions.length > 0 && (
              <li className="technos">
                {getUniqTechnos(step.missions).map((techno, index) => (
                  <span className="techno" key={index}>
                    {techno}
                  </span>
                ))}
              </li>
            )}
            {step.companyTechnos && step.companyTechnos.length > 0 && (
              <li className="technos">
                {step.companyTechnos.map((techno, index) => (
                  <span className="techno" key={index}>
                    {techno}
                  </span>
                ))}
              </li>
            )}
            {step.missions.length > 0 &&
              step.missions.map((mission, index) => (
                <div key={index}>
                  <li className="description">{mission.description}</li>
                  {mission.features && (
                    <ul id={`features${index}`}>
                      {mission.features.map((feature, index) => (
                        <li className="feature" key={index}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
);

CareerContainer.propTypes = {
  steps: propTypes.arrayOf(
    propTypes.shape({
      start: propTypes.string.isRequired,
      end: propTypes.string,
      company: propTypes.string,
      companyUrl: propTypes.string,
      companyTechnos: propTypes.arrayOf(propTypes.string),
      title: propTypes.string.isRequired,
      type: propTypes.string.isRequired,
      missions: propTypes.arrayOf(
        propTypes.shape({
          description: propTypes.string.isRequired,
          technos: propTypes.arrayOf(propTypes.string).isRequired,
          features: propTypes.arrayOf(propTypes.string)
        })
      )
    })
  )
};
export default CareerContainer;
