import React, { Component } from "react";
import { Helmet } from "react-helmet";

class PageHelmet extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Potié Jérôme || Développeur Web || Mon portfolio </title>
          <meta
            name="description"
            content="Trydo – Multipurpose React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Trydo React Template will create that various landing Template, Creative Agency, And Corporate Website ."
          />
        </Helmet>
      </React.Fragment>
    );
  }
}

export default PageHelmet;
