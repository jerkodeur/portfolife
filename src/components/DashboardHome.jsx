import React from "react";

import { Route, useRouteMatch } from "react-router";

import Home from "@dashboard/Home";
import Navbar from "@dashboard/Navbar";
import ProjectList from "@dashboard/pages/projects/list/ProjectList";
import ProjectCreate from "@dashboard/pages/projects/new/ProjectCreate";
import Sidebar from "@dashboard/Sidebar";

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
