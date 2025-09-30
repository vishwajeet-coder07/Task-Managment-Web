import React from "react";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Task Management App</h1>
            <ul className="nav-links">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Profile</li>
                <li>Logout</li>
            </ul>
        </nav>
    );
};

export default Navbar;
