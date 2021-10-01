import React from "react";

import ToasterDisplay from "../../../../../helpers/ToasterDisplay";

import { imageExist } from "../../../../../helpers/helpers";

const ShowTechnos = ({ technos }) => (
  <div className="display-technos">
    {technos.map((techno, index) => {
      let img = "";
      let title = "";

      try {
        imageExist("technos", techno.image_name);
        img = require(`../../../../../../../public/assets/images/technos/${techno.image_name}`);
        title = techno.name;
      } catch (e) {
        img = require("../../../../../../../public/assets/images/technos/notfound.png");
        ToasterDisplay("Image inconnue détectée", "fail", { position: "bottom-left", duration: 2500 });
        title = "Image inconnue !";
      }
      return <img src={img} alt={techno.name} title={title} key={index} />;
    })}
  </div>
);

export default ShowTechnos;
