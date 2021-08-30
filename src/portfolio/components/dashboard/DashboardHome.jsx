import React from "react";

import { Route, useRouteMatch } from "react-router";

import Home from "./Home";
import Navbar from "./Navbar";
import ProjectList from "./pages/projects/ProjectList";
import ProjectForm from "./pages/projects/ProjectForm";
import Sidebar from "./Sidebar";

const DashboardHome = () => {
  const { path } = useRouteMatch();
  return (
    <div className="dashboard">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <main className="main-container">
          <Route exact path={`${path}/`}>
            <Home />
          </Route>
          <Route path={`${path}/projects`} component={ProjectList} />
          <Route path={`${path}/new-project`} component={ProjectForm} />
        </main>
      </div>
    </div>
  );
};

export default DashboardHome;
