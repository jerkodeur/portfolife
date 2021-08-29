import React from 'react'

import { Link, useRouteMatch } from 'react-router-dom';

const Navbar = () => {
    const { url } = useRouteMatch();
    let user = localStorage.getItem('pseudo').toLowerCase() ;
    user = user[0].toUpperCase() + user.slice(1);

    return(
        <nav className="navbar">
            <h2>
                <Link to={`${url}`}>{user} Dashboard</Link>
            </h2>
        </nav>
    )
}

export default Navbar
