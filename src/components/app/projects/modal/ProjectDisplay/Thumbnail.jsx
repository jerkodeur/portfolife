import React from "react";
import PropTypes from "prop-types";

const Thumbnail = ({ image, selected, toggleImg, id }) => {
  return (
    <div className="miniature" onClick={() => toggleImg(id)}>
      <img className={selected === id ? "selected" : undefined} src={image} alt={"slide" + selected} />
    </div>
  );
};

Thumbnail.propTypes = {
  toggleImg: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  selected: PropTypes.number.isRequired
};

export default Thumbnail;
