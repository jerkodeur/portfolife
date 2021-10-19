import React, { useState, useEffect, useCallback } from "react";

import PropTypes from "prop-types";

import Thumbnail from "./Thumbnail";

import { useSlider } from "@helpers/customHooks";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImagesSlides = ({ nbImages, prefix, bgColor }) => {
  document.documentElement.style.setProperty("--bg-slider", bgColor);
  const [selectedImg, setSelectedImg] = useSlider(1, nbImages);
  const [imgName, setImgName] = useState("");

  const displayImage = useCallback(() => {
    const image = require(`@images/projects/${prefix}/${prefix}_img_${selectedImg}.png`);
    return setImgName(image);
  }, [selectedImg, prefix]);

  useEffect(() => {
    displayImage();
    return () => displayImage();
  }, [displayImage]);

  return (
    <div className="main-slider">
      <div className="img-control">
        <div className="left-control">
          <FaChevronLeft size="3em" onClick={() => setSelectedImg.down()} />
        </div>
        <div className="img-container">{<img src={imgName} alt={prefix + selectedImg} />}</div>
        <div className="right-control">
          <FaChevronRight size="3em" onClick={() => setSelectedImg.up()} />
        </div>
      </div>
      <div className="miniatures-container">
        {[...Array(nbImages)].map((_, index) => {
          const image = require(`@images/projects/${prefix}/${prefix}_img_${index + 1}.png`);
          return (
            <Thumbnail
              image={image}
              toggleImg={setSelectedImg.set}
              selectedImg={selectedImg}
              key={index}
              id={index + 1}
            />
          );
        })}
      </div>
      <div className="breadcrumb-img">
        <small onClick={() => setSelectedImg.down()}>Précédente</small>
        <span> ✠ </span>
        <small onClick={() => setSelectedImg.up()}>Suivante</small>
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
