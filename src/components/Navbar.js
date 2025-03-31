import React from "react";
import { Link } from "react-router-dom";
import "./../styles.css";

const Navbar = ({ handleLogout }) => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/colleges">Colleges</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/admissions">Admissions</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        <li><Link to="/ratings">Ratings</Link></li>
        
        {/* Logout Button */}
        <li>
        <button
  onClick={handleLogout}
  className="logout-btn"
  aria-label="Logout"
  style={{
    backgroundColor: '#ff4444',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginLeft: '1rem'
  }}
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff0000'}
  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff4444'}
>
  Logout
</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;