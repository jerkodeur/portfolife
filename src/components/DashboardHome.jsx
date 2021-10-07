import React from "react";

import { useConnexion } from "@helpers/customHooks";
import { Route, useRouteMatch } from "react-router";

import Home from "@dashboard/Home";
import Navbar from "@dashboard/Navbar";
import ProjectCreate from "@dashboard/pages/projects/new/ProjectCreate";
import ProjectList from "@dashboard/pages/projects/list/ProjectList";
import Sidebar from "@dashboard/Sidebar";

const DashboardHome = () => {
  const { path } = useRouteMatch();
  const [, setIsconnect] = useConnexion(localStorage.getItem("token") ? true : false);

  return (
    <div className="dashboard">
      <Navbar closeConnexion={setIsconnect.off} />
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
