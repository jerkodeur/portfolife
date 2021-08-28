import React from 'react';

import { NavLink, useRouteMatch } from 'react-router-dom';

const Sidebar = () => {
    const { url } = useRouteMatch();

    return (
        <nav className="sidebar">
            <ul className="category">
                <li className="title">Projects</li>
                <li><NavLink to={`${url}/projects`}>Liste des projets</NavLink></li>
                <li><NavLink to={`${url}/new-project`}>Nouveau Projet</NavLink></li>
            </ul>
        </nav>
    )
}

export default Sidebar
