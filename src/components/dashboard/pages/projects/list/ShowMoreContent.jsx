import React, { useState } from "react";

import DatePicker from "react-datepicker";
import propTypes from "prop-types";
import ReactMarkdown from "react-markdown";

import FormContext from "../projectForms/FormContext";
import ShowProjectImages from "./ShowProjectImages";
import ShowTechnos from "@app/projects/modal/ProjectDisplay/ShowTechnos.jsx";

import { useTabs } from "@helpers/customHooks";
import { getTechnoIds } from "@handlers/technos";

import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";

registerLocale("fr", fr);

const ShowMoreContent = ({ datas, DescriptionElt, keyPressHandler, updatedField, setUpdatedField, TechnoSwitcher }) => {
  const { context, context_url: contextUrl, date, description, id, technos } = datas;

  const [mdDescription, setMdDescription] = useState(description);
  const [showTab, setShowTab] = useTabs("preview");
  const [startDate, setStartDate] = useState(new Date(date));

  const handleForm = (e) => setUpdatedField.set({ id, label: e.target.id, value: e.target.value });

  return (
    <tr className="show-more-container">
      <td colSpan="10">
        <div>
          <DatePicker
            className="calendar"
            dateFormat="MMMM yyyy"
            locale="fr"
            maxDate={new Date()}
            onChange={(date) => setStartDate(date)}
            selected={startDate}
            showFullMonthYearPicker
            showMonthYearPicker
          />
        </div>
        <div className="context-layout">
          <FormContext
            formDatas={{ context, contextUrl }}
            handleForm={handleForm}
            keyPressHandler={keyPressHandler}
            setUpdatedField={setUpdatedField}
            updatedField={updatedField}
          />
        </div>

        <div className="project-tabs-layout">
          <span
            className={`${showTab === "preview" && "selected"} description`}
            onClick={() => setShowTab.set("preview")}
          >
            Aperçu
          </span>
          <span className={`${showTab === "edit" && "selected"}`} onClick={() => setShowTab.set("edit")}>
            Édition
          </span>
          <span className={`${showTab === "imgPreview" && "selected"}`} onClick={() => setShowTab.set("imgPreview")}>
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
          <>
            <DescriptionElt value={mdDescription} setValue={setMdDescription} />
            <div className="techno-wrapper">
              <TechnoSwitcher technoIds={getTechnoIds(technos)} />
            </div>
          </>
        )}
        {showTab === "imgPreview" && <ShowProjectImages />}
      </td>
    </tr>
  );
};

ShowMoreContent.propTypes = {
  datas: propTypes.shape({
    context: propTypes.string.isRequired,
    context_url: propTypes.string,
    date: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
    technos: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.number.isRequired,
        name: propTypes.string.isRequired,
        image_name: propTypes.string.isRequired
      }).isRequired
    ).isRequired
  }),
  DescriptionElt: propTypes.func.isRequired,
  setUpdatedField: propTypes.object.isRequired,
  TechnoSwitcher: propTypes.func.isRequired,
  updatedField: propTypes.shape({
    id: propTypes.number,
    value: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.array]),
    error: propTypes.string
  }).isRequired
};

export default ShowMoreContent;
