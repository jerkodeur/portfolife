import React from "react";
import PropTypes from "prop-types";

const Thumbnail = ({ image, selectedImg, toggleImg, id }) => {
  return (
    <div className="miniature" onClick={() => toggleImg(id)}>
      <img className={selectedImg === id ? "selected" : undefined} src={image} alt={"slide" + selectedImg} />
    </div>
  );
};

Thumbnail.propTypes = {
  toggleImg: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  selectedImg: PropTypes.number.isRequired
};

export default Thumbnail;
