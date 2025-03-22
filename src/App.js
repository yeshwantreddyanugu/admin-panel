import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import PlacementDetails from "./pages/PlacementDetails"; // New Placement Page
import Navbar from "./components/Navbar";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/colleges" element={<Colleges />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:collegeCode" element={<CourseDetails />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/college/:collegeCode" element={<CollegeDetails />} />
                <Route path="/admission/:collegeCode" element={<AdmissionDetails />} />
                <Route path="/contacts/:collegeCode" element={<ContactDetails />} />
                <Route path="/seatmatrix/:collegeCode" element={<SeatMatrix />} />
                <Route path="/facilities/:collegeCode" element={<FacilitiesDetails />} />
                <Route path="/placements/:collegeCode" element={<PlacementDetails />} /> {/* New Route */}
            </Routes>
        </Router>
    );
}

export default App;
