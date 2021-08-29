import React from "react";

import { Route, useRouteMatch } from "react-router";

import Home from "./Home";
import Navbar from "./Navbar";
import ProjectList from "./pages/projects/ProjectList";
import NewProject from "./pages/projects/NewProject";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const { path } = useRouteMatch();
  return (
    <div className="dashboard">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <main className="main-container">
          <Route exact path={`${path}/`} component={Home} />
          <Route path={`${path}/projects`} component={ProjectList} />
          <Route path={`${path}/new-project`} component={NewProject} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
