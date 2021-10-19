import React, { Component } from "react";
import ReactDOM from "react-dom";

import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import AdminRoute from "@service/AdminRoute";

import "./index.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Home layout
import Home from "@components/Home";

// Dashboard
import Dashboard from "@components/DashboardHome";

// Element Layout
import error404 from "@components/error404";

// Define default back url
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

class Root extends Component {
  render() {
    return (
      <BrowserRouter basename={"/"}>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
          <AdminRoute path={`${process.env.PUBLIC_URL}/dashboard`}>
            <Dashboard />
          </AdminRoute>

          <Route path={`${process.env.PUBLIC_URL}/404`} component={error404} />
          <Route component={error404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.register();
