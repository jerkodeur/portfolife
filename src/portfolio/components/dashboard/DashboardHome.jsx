import React from "react";

import { Route, useRouteMatch } from "react-router";

import Home from "./Home";
import Navbar from "./Navbar";
import ProjectList from "./pages/projects/list/ProjectList";
import ProjectCreate from "./pages/projects/ProjectCreate";
import Sidebar from "./Sidebar";

const DashboardHome = () => {
  const { path } = useRouteMatch();

  return (
    <div className="dashboard">
      <Navbar />
      <Sidebar />
      <main className="main-container">
        <Route exact path={`${path}/`}>
          <Home />
        </Route>
        <Route path={`${path}/projects`} component={ProjectList} />
        <Route path={`${path}/new-project`} component={ProjectCreate} />
      </main>
    </div>
  );
};

export default DashboardHome;
