import React, { useState } from "react";

import propTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";

import EditFormDescription from "../projectForms/EditFormDescription";
import FormContext from "../projectForms/FormContext";
import ShowProjectImages from "./ShowProjectImages";
import ShowTechnos from "../../../../Homepage/projects/modal/ProjectDisplay/ShowTechnos.jsx";

import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";

registerLocale("fr", fr);

const ShowMoreContent = ({ datas, keyPressHandler, updatedField, setUpdatedField }) => {
  const [formErrors, setFormErrors] = useState({});

  const { context, context_url: contextUrl, date, description, id, technos, toggleSelectedTechnos } = datas;
  const [startDate, setStartDate] = useState(new Date(date));
  const [showTab, setShowTab] = useState("preview");

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
        <div className="breadcrumb-project">
          <span
            className={`${showTab === "preview" && "selected"} description`}
            onClick={() => showTab !== "preview" && setShowTab("preview")}
          >
            Aperçu
          </span>
          <span
            className={`${showTab === "edit" && "selected"}`}
            onClick={() => showTab !== "edit" && setShowTab("edit")}
          >
            Édition
          </span>
          <span
            className={`${showTab === "imgPreview" && "selected"}`}
            onClick={() => showTab !== "imgPreview" && setShowTab("imgPreview")}
          >
            Images
          </span>
        </div>
        {showTab === "preview" && (
          <div className="markdown-descr-preview">
            <ShowTechnos technos={technos} />
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        )}
        {showTab === "edit" && (
          <EditFormDescription
            technos={technos}
            toggleSelectedTechnos={toggleSelectedTechnos}
            handleClassError={handleClassError}
          />
        )}
        {showTab === "imgPreview" && <ShowProjectImages />}
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
