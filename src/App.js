import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Colleges from "./pages/Colleges";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CoursesDetails";
import Admissions from "./pages/Admissions";
import CollegeDetails from "./pages/CollegeDetails";
import AdmissionDetails from "./pages/AdmissionDetails";
import ContactDetails from "./pages/ContactDetails";
import SeatMatrix from "./pages/SeatMatrix";
import FacilitiesDetails from "./pages/FacilitiesDetails";
import PlacementDetails from "./pages/PlacementDetails";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import StudentPortal from "./pages/StudentPortal";
import RatingForm from "./pages/RatingForm";
import ReviewForm from "./pages/ReviewForm";
import BrochureUploadForm from "./pages/BrochureUploadForm";
import ReviewsPage from "./pages/ReviewsPage";
import RatingsPage from "./pages/RatingsPage";
import Logout from "./pages/Logout"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  // Sync auth state across tabs
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Handle logout from any component
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    window.location.href = "/#/login";
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Public Route Component
  const PublicRoute = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} handleLogout={handleLogout} />}
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login setIsAuthenticated={setIsAuthenticated} />
            </PublicRoute>
          } 
        />
        <Route path="/student" element={<StudentPortal />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/colleges" element={<ProtectedRoute><Colleges /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/courses/:collegeCode" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
        <Route path="/admissions" element={<ProtectedRoute><Admissions /></ProtectedRoute>} />
        <Route path="/college/:collegeCode" element={<ProtectedRoute><CollegeDetails /></ProtectedRoute>} />
        <Route path="/admission/:collegeCode" element={<ProtectedRoute><AdmissionDetails /></ProtectedRoute>} />
        <Route path="/contacts/:collegeCode" element={<ProtectedRoute><ContactDetails /></ProtectedRoute>} />
        <Route path="/seatmatrix/:collegeCode" element={<ProtectedRoute><SeatMatrix /></ProtectedRoute>} />
        <Route path="/facilities/:collegeCode" element={<ProtectedRoute><FacilitiesDetails /></ProtectedRoute>} />
        <Route path="/placements/:collegeCode" element={<ProtectedRoute><PlacementDetails /></ProtectedRoute>} />
        <Route path="/student-rating" element={<RatingForm />} />
        <Route path="/review/:collegeCode?" element={<ProtectedRoute><ReviewForm /></ProtectedRoute>} />
        <Route path="/brochure-upload/:collegeCode?" element={<ProtectedRoute><BrochureUploadForm /></ProtectedRoute>} />
        <Route path="/reviews" element={<ProtectedRoute><ReviewsPage /></ProtectedRoute>} />
        <Route path="/ratings" element={<ProtectedRoute><RatingsPage /></ProtectedRoute>} />
        
        {/* New logout route */}
        <Route 
          path="/logout" 
          element={
            <ProtectedRoute>
              <Logout handleLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;