import React, { Fragment } from "react";

import propTypes from "prop-types";

import Input from "@components/commons/forms/Input";
import ShowMoreContent from "./ShowMoreContent";

import { FaChevronCircleDown, FaChevronCircleUp, FaEdit, FaTrashAlt } from "react-icons/fa";
import { asyncProjectFields } from "./asyncProjectFields";
import { camelToSnakeCase, formatLink } from "@helpers/helpers";

const ProjectListContent = ({
  displayDeleteModal,
  projects,
  currentProjectId,
  updatedField,
  handleShowMoreContent,
  setUpdatedField,
  keyPressHandler,
  handleChange,
  ...props
}) =>
  Array.from(projects).map((project) => {
    const { mainDatas, technos } = project;
    const { id, context, context_url, date, description } = mainDatas;
    const isCurrent = currentProjectId === id;
    return (
      <Fragment key={id}>
        <tr>
          <td className={isCurrent ? "selected" : undefined}>
            {isCurrent ? (
              <FaChevronCircleUp onClick={() => handleShowMoreContent(null)} />
            ) : (
              <FaChevronCircleDown onClick={() => handleShowMoreContent(id)} />
            )}
          </td>
          {asyncProjectFields.map((field, index) => {
            const { id: fieldID, placeholder: fieldPlaceholder, ...rest } = field;
            const idInSnakeCase = camelToSnakeCase(fieldID);
            const value = mainDatas[idInSnakeCase] ? mainDatas[idInSnakeCase] : "";
            return (
              <td
                onClick={() => setUpdatedField.set({ label: field.id, id, value })}
                className={isCurrent && index === 0 ? "selected" : undefined}
                key={fieldID}
              >
                {updatedField.label === field.id && updatedField.id === id ? (
                  <Input
                    autoFocus
                    displayError={false}
                    error={updatedField.error}
                    id={fieldID}
                    onBlur={setUpdatedField.reset}
                    onKeyPress={keyPressHandler}
                    placeholder={fieldPlaceholder}
                    setValue={(e) => setUpdatedField.set({ label: field.id, id, value: e.target.value })}
                    value={updatedField.value ?? undefined}
                    {...rest}
                  />
                ) : field.type === "url" ? (
                  formatLink(value)
                ) : (
                  value
                )}
              </td>
            );
          })}
          <td>
            <Input
              dataId={id}
              displayError={false}
              id="background"
              type="color"
              setValue={(e) => handleChange(e)}
              value={mainDatas.background ?? ""}
            />
          </td>
          <td>
            <label className="switch">
              <input
                data-id={id}
                type="checkbox"
                value={mainDatas.active}
                checked={mainDatas.active && "checked"}
                id="active"
                onChange={(e) => handleChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </td>
          <td className="actions">
            <span>
              <FaEdit />
            </span>
            <span>
              <FaTrashAlt onClick={() => displayDeleteModal(id, mainDatas.title)} />
            </span>
          </td>
        </tr>
        {isCurrent && (
          <ShowMoreContent
            datas={{ id, context, context_url, date, description, technos }}
            keyPressHandler={keyPressHandler}
            setUpdatedField={setUpdatedField}
            updatedField={updatedField}
            {...props}
          />
        )}
      </Fragment>
    );
  });

ProjectListContent.propTypes = {
  currentProjectId: propTypes.number,
  displayDeleteModal: propTypes.func.isRequired,
  handleChange: propTypes.func.isRequired,
  handleShowMoreContent: propTypes.func.isRequired,
  keyPressHandler: propTypes.func.isRequired,
  projects: propTypes.arrayOf(
    propTypes.shape({
      mainDatas: propTypes.shape({
        active: propTypes.oneOf([0, 1]),
        background: propTypes.string.isRequired,
        context: propTypes.string.isRequired,
        context_url: propTypes.string,
        date: propTypes.string.isRequired,
        description: propTypes.string.isRequired,
        id: propTypes.number.isRequired,
        img_prefix: propTypes.string,
        nb_images: propTypes.number.isRequired,
        short_description: propTypes.string.isRequired,
        title: propTypes.string.isRequired,
        url_github: propTypes.string,
        url_test: propTypes.string
      }).isRequired,
      technos: propTypes.arrayOf(propTypes.shape().isRequired).isRequired
    })
  ),
  setUpdatedField: propTypes.object.isRequired,
  updatedField: propTypes.shape({
    id: propTypes.number,
    value: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.array]),
    error: propTypes.string
  }).isRequired
};

export default ProjectListContent;
