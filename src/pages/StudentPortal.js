// src/components/StudentPortal.js
import React from 'react';
import { Link } from 'react-router-dom';

const StudentPortal = () => {
  return (
    <div className="student-portal">
      <h2>Student Portal</h2>
      <p>Welcome to the student portal. Here you can access student-specific features.</p>
      <Link to="/login" className="back-link">
        Back to Admin Login
      </Link>
    </div>
  );
};

export default StudentPortal;