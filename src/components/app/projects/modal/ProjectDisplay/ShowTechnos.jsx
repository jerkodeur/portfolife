import React from "react";

import { imageExist } from "@handlers/images";
import { useToaster } from "@helpers/customHooks";

import notFoundImg from "@images/technos/notfound.png";

const ShowTechnos = ({ technos }) => (
  <div className="display-technos">
    {technos.map((techno, index) => {
      let img = "";

      try {
        imageExist("technos", techno.image_name);
        img = require(`@images/technos/${techno.image_name}`);
      } catch (e) {
        process.env.REACT_APP_ENV === "dev" &&
          useToaster.fail("Image inconnue détectée", { position: "bottom-left", duration: 2500 });
      }
      return <img src={img || notFoundImg} alt={techno.name} title={techno.name} key={index} />;
    })}
  </div>
);

export default ShowTechnos;
