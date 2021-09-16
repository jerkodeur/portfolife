import React from "react";

import propTypes from "prop-types";

const ShowMoreContent = ({ datas }) => {
  const convertDate = (rawDate) => {
    const extractDate = new Date(rawDate).toLocaleString();
    const dateRegex = /([0-9]{2}.){2}[0-9]{4}/g;
    return extractDate.match(dateRegex)[0];
  };
  const { context, context_url: contextUrl, date, description, id, technos, title } = datas;

  return (
    <tr className="show-more-container">
      <td colSpan="10">
        <h3>{title}</h3>
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
    ).isRequired,
    title: propTypes.string.isRequired
  })
};

export default ShowMoreContent;
