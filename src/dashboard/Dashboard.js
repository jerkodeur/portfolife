import React from "react";

import Navbar from "./Navbar";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Navbar />
            <div className="main-layout">
                <nav className="sidebar">Sidebar</nav>
                <main className="main-container">
                    <h1>Dashboard</h1>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
