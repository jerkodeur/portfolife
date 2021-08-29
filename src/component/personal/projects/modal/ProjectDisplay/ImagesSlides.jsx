import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Thumbnail from "./Thumbnail";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImagesSlides = ({ nbImages, prefix, bgColor }) => {
  const [selected, setSelected] = useState(1);
  const [imgName, setImgName] = useState("");

  const handleSelect = (index) => {
    return setSelected(index);
  };

  const switchImage = (e) => {
    const id = e.target.name;
    if (id === "down") {
      if (selected - 1 === 0) {
        return setSelected(nbImages);
      } else {
        return setSelected(selected - 1);
      }
    } else {
      if (selected + 1 > nbImages) {
        return setSelected(1);
      } else {
        return setSelected(selected + 1);
      }
    }
  };

  useEffect(() => {
    const image = require(`../../../../../../public/assets/images/projects/${prefix}/${prefix}_img_${selected}.png`);
    setImgName(image);
    document.documentElement.style.setProperty("--bg-slider", bgColor);
  }, [selected, bgColor, prefix]);

  return (
    <div className="main-slider">
      <div className="img-control">
        <div className="left-control">
          <FaChevronLeft
            size="3em"
            onClick={(e) => switchImage(e)}
            name="down"
          />
        </div>
        <div className="img-container">
          {<img src={imgName} alt={prefix + selected} />}
        </div>
        <div className="right-control">
          <FaChevronRight
            size="3em"
            onClick={(e) => switchImage(e)}
            name="up"
          />
        </div>
      </div>
      <div className="miniatures-container">
        {[...Array(nbImages)].map((item, index) => {
          const image = require(`../../../../../../public/assets/images/projects/${prefix}/${prefix}_img_${
            index + 1
          }.png`);
          return (
            <Thumbnail
              image={image}
              handleSelect={handleSelect}
              selected={selected}
              key={index}
              id={index + 1}
            />
          );
        })}
      </div>
      <div className="breadcrumb-img">
        <small onClick={(e) => switchImage(e)} name="down">
          Précédente
        </small>
        <span> ✠ </span>
        <small onClick={(e) => switchImage(e)} name="up">
          Suivante
        </small>
      </div>
    </div>
  );
};

ImagesSlides.propTypes = {
  bgColor: PropTypes.string.isRequired,
  nbImages: PropTypes.number.isRequired,
  prefix: PropTypes.string.isRequired
};

export default ImagesSlides;
