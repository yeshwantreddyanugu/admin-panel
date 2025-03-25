import { useState, useEffect } from "react";
import "../style/AddCourse.css"; // Import the CSS file

const AddCourse = ({ collegeCode, existingCourseData, onCourseAdded, onBack }) => {
  const [course, setCourse] = useState(existingCourseData || {
    collegeCode: collegeCode || "",
    name: "",
    level: "UG",
    specialization: "",
    totalSeats: "",
    lateralEntryAvailable: false,
  });

  useEffect(() => {
    if (existingCourseData) {
      setCourse(existingCourseData); // Restore previous data
    }
  }, [existingCourseData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.lytortech.com/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });

      if (response.ok) {
        onCourseAdded(course); // Pass data to parent before switching forms
      } else {
        alert("❌ Failed to add course. Please check backend logs.");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      alert("⚠️ Error: Unable to connect to the backend.");
    }
  };

  return (
    <div className="add-course-container">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit} className="add-course-form">
        <input type="text" name="collegeCode" value={course.collegeCode} readOnly />
        <input type="text" name="name" value={course.name} onChange={handleChange} placeholder="Course Name" required />
        <select name="level" value={course.level} onChange={handleChange}>
          <option value="UG">UG</option>
          <option value="PG">PG</option>
        </select>
        <input type="text" name="specialization" value={course.specialization} onChange={handleChange} placeholder="Specialization" required />
        <input type="number" name="totalSeats" value={course.totalSeats} onChange={handleChange} placeholder="Total Seats" required />
        <label className="checkbox-label">
          <input type="checkbox" name="lateralEntryAvailable" checked={course.lateralEntryAvailable} onChange={handleChange} />
          Lateral Entry Available
        </label>
        <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
          <button type="button" onClick={onBack} style={{ flex: 1, padding: "10px", backgroundColor: "gray", color: "white", border: "none", cursor: "pointer" }}>Back</button>
          <button type="submit" style={{ flex: 1, padding: "10px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
