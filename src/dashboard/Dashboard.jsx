import React from "react";

import { Route, useRouteMatch } from "react-router";

import Home from "./pages/projects/Home";
import Navbar from "./Navbar";
import ProjectList from "./pages/projects/List";
import ProjectNew from "./pages/projects/New";
import Sidebar  from "./Sidebar";

const Dashboard = () => {
    const { path} = useRouteMatch();
    return (
        <div className="dashboard">
            <Navbar />
            <div className="main-layout">
                <Sidebar />
                <main className="main-container">
                        <Route exact path={`${path}/`} component={Home} />
                        <Route path={`${path}/projects`} component={ProjectList} />
                        <Route path={`${path}/new-project`} component={ProjectNew} />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
