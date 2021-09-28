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

const ShowMoreContent = ({ datas, keyPressHandler, updatedField, setUpdatedField, TechnoSwitcher }) => {
  const [formErrors, setFormErrors] = useState({});

  const { context, context_url: contextUrl, date, description, id, technos } = datas;
  const [startDate, setStartDate] = useState(new Date(date));
  const [mdDescription, setMdDescription] = useState();

  const [showTab, setShowTab] = useState("preview");

  const handleClassError = (array) => {
    return array.reduce((acc, curr) => {
      return formErrors[curr] ? true : acc;
    }, false);
  };

  const handleForm = (e) => setUpdatedField({ id, label: e.target.id, value: e.target.value });
  const submitDescription = (e) => {
    e.preventDefault(e);
    setUpdatedField({ id, label: "description", value: mdDescription });
  };

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
            description={description}
            handleClassError={handleClassError}
            handleDescription={setMdDescription}
            submitDescription={submitDescription}
            technos={technos}
            TechnoSwitcher={TechnoSwitcher}
            id={id}
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
    technos: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.number.isRequired,
        name: propTypes.string.isRequired,
        image_name: propTypes.string.isRequired
      }).isRequired
    ).isRequired
  }),
  setUpdatedField: propTypes.func.isRequired,
  TechnoSwitcher: propTypes.func.isRequired,
  updatedField: propTypes.shape({
    id: propTypes.number,
    value: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.array]),
    error: propTypes.string
  }).isRequired
};

export default ShowMoreContent;
