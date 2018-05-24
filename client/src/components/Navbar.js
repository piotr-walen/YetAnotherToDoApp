import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ authenticated, user }) => {
    console.log(authenticated);
    const authComponents = authenticated ? (
        <div>
            <div>
                <Link to="/logout">link to /logout/</Link>
            </div>
        </div>
    ) : (
        <div>
            <div>
                <Link to="/login">link to /login/</Link>
            </div>
            <div>
                <Link to="/register">link to /register/</Link>
            </div>
        </div>
    );

    const navigationComponents = (
        <div>
            <div>
                <Link to="/">link to /</Link>
            </div>
        </div>
    );

    return (
        <div>
            {navigationComponents}
            {authComponents}
        </div>
    );
};

export default Navbar;
