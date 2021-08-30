import React from "react";

const ShowTechnos = ({ technos }) => (
  <div className="display-technos">
    {technos.map((techno, index) => {
      const img = require(`../../../../../../../public/assets/images/technos/${techno.image_name}`);
      return (
        <img src={img} alt={techno.name} title={techno.name} key={index} />
      );
    })}
  </div>
);

export default ShowTechnos;
