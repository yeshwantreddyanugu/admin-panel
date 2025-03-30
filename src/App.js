import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/student" element={<StudentPortal />} />

        {/* Protected routes */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/colleges" element={isAuthenticated ? <Colleges /> : <Navigate to="/login" replace />} />
        <Route path="/courses" element={isAuthenticated ? <Courses /> : <Navigate to="/login" replace />} />
        <Route path="/courses/:collegeCode" element={isAuthenticated ? <CourseDetails /> : <Navigate to="/login" replace />} />
        <Route path="/admissions" element={isAuthenticated ? <Admissions /> : <Navigate to="/login" replace />} />
        <Route path="/college/:collegeCode" element={isAuthenticated ? <CollegeDetails /> : <Navigate to="/login" replace />} />
        <Route path="/admission/:collegeCode" element={isAuthenticated ? <AdmissionDetails /> : <Navigate to="/login" replace />} />
        <Route path="/contacts/:collegeCode" element={isAuthenticated ? <ContactDetails /> : <Navigate to="/login" replace />} />
        <Route path="/seatmatrix/:collegeCode" element={isAuthenticated ? <SeatMatrix /> : <Navigate to="/login" replace />} />
        <Route path="/facilities/:collegeCode" element={isAuthenticated ? <FacilitiesDetails /> : <Navigate to="/login" replace />} />
        <Route path="/placements/:collegeCode" element={isAuthenticated ? <PlacementDetails /> : <Navigate to="/login" replace />} />
        <Route path="/student-rating" element={<RatingForm />} />
        <Route path="/review/:collegeCode?" element={<ReviewForm />} />
        <Route path="/brochure-upload/:collegeCode?" element={<BrochureUploadForm />} />

        <Route path="/reviews" element={isAuthenticated ? <ReviewsPage /> : <Navigate to="/login" replace />} />
        <Route path="/ratings" element={isAuthenticated ? <RatingsPage /> : <Navigate to="/login" replace />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;