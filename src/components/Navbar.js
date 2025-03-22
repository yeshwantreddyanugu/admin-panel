import React from "react";
import { Link } from "react-router-dom";
import "./../styles.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/colleges">Colleges</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/admissions">Admissions</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
