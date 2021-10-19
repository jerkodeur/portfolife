import React from "react";

import propTypes from "prop-types";

const TabsLayout = ({ setshowTab, showTab }) => {
  return (
    <div className="project-tabs-layout">
      {["description", "gallery"].map((tab, index) =>
        showTab !== index ? (
          <span onClick={() => setshowTab(index)} className={tab} key={tab}>
            {tab}
          </span>
        ) : (
          <span className={`selected ${tab}`} key={tab}>
            {tab}
          </span>
        )
      )}
    </div>
  );
};

TabsLayout.propTypes = {
  setshowTab: propTypes.func.isRequired,
  showTab: propTypes.number.isRequired
};

export default TabsLayout;
