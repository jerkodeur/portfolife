import React, { useState } from "react";

import propTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";

import FormContext from "./projectFormComponents/FormContext";
import ProjectTechnos from "../ProjectTechnos";

import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";

registerLocale("fr", fr);

const ShowMoreContent = ({ datas, keyPressHandler, updatedField, setUpdatedField }) => {
  const [formErrors, setFormErrors] = useState({});

  const { context, context_url: contextUrl, date, description, id, technos, title, toggleSelectedTechnos } = datas;
  const [startDate, setStartDate] = useState(new Date(date));

  const convertDate = (rawDate) => {
    const extractDate = new Date(rawDate).toLocaleString();
    const dateRegex = /([0-9]{2}.){2}[0-9]{4}/g;
    return extractDate.match(dateRegex)[0];
  };

  const technoIds = technos.reduce((ids, currentTechno) => {
    ids.push(currentTechno.id);
    return ids;
  }, []);

  const handleClassError = (array) => {
    return array.reduce((acc, curr) => {
      return formErrors[curr] ? true : acc;
    }, false);
  };

  const handleForm = (e) => setUpdatedField({ id, label: e.target.id, value: e.target.value });

  return (
    <tr className="show-more-container">
      <td colSpan="10">
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMMM yyyy"
            locale="fr"
            showMonthYearPicker
            showFullMonthYearPicker
            className="calendar"
            maxDate={new Date()}
          />
        </div>
        <FormContext
          formDatas={{ context, contextUrl }}
          handleForm={handleForm}
          keyPressHandler={keyPressHandler}
          updatedField={updatedField}
        />
        {/* <ProjectTechnos
          selectedTechnos={technoIds}
          toggleSelectedTechnos={toggleSelectedTechnos}
          error={formErrors.technos}
          handleClassError={handleClassError}
        /> */}
        <div className="breadcrumb-project">
          <span className="selected description">Aperçu</span>
          <span>Édition</span>
          <span>Images</span>
        </div>
        <div className="markdown-descr-preview">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </td>
    </tr>
  );
};

ShowMoreContent.propTypes = {
  datas: propTypes.shape({
    id: propTypes.number.isRequired,
    context: propTypes.string.isRequired,
    context_url: propTypes.string,
    date: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    setUpdatedField: propTypes.func.isRequired,
    technos: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.number.isRequired,
        name: propTypes.string.isRequired,
        image_name: propTypes.string.isRequired
      }).isRequired
    ).isRequired,
    title: propTypes.string.isRequired,
    toggleSelectedTechnos: propTypes.func.isRequired,
    updatedField: propTypes.string.isRequired
  })
};

export default ShowMoreContent;
