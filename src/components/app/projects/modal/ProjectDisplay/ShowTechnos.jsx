import React from "react";

import ToasterDisplay from "@components/commons/ToasterDisplay";

import { imageExist } from "@handlers/images";
import notFoundImg from "@images/technos/notfound.png";

const ShowTechnos = ({ technos }) => (
  <div className="display-technos">
    {technos.map((techno, index) => {
      let img = "";
      let title = "";

      try {
        imageExist("technos", techno.image_name);
        img = require(`@images/technos/${techno.image_name}`);
        title = techno.name;
      } catch (e) {
        ToasterDisplay("Image inconnue détectée", "fail", { position: "bottom-left", duration: 2500 });
        title = "Image inconnue !";
      }
      return <img src={img || notFoundImg} alt={techno.name} title={title} key={index} />;
    })}
  </div>
);

export default ShowTechnos;
