import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CourseDetails = () => {
  const { collegeCode } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/get/courses/${collegeCode}`);
      console.log("API Response Data:", response.data); 
      setCourseData(response.data);
      setEditedData(response.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...editedData, // Spread existing data
        collegeCode,   // Ensure collegeCode is included in the request body
      };
  
      const response = await axios.put("http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/update/course", payload);
      
      if (response.status === 200) {
        alert("Course updated successfully!");
        setCourseData(editedData);
        setIsEditing(false);
      } else {
        alert("Failed to update course. Please try again.");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course.");
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Course Details - {collegeCode}</h2>

      {courseData ? (
        isEditing ? (
          <div>
            <div className="mb-4">
              <label className="block font-semibold">Course Name:</label>
              <input
                type="text"
                name="name"
                value={editedData.name || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Specialization:</label>
              <input
                type="text"
                name="specialization"
                value={editedData.specialization || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Level:</label>
              <input
                type="text"
                name="level"
                value={editedData.level || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Total Seats:</label>
              <input
                type="number"
                name="totalSeats"
                value={editedData.totalSeats || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold">Lateral Entry Available:</label>
              <select
                name="lateralEntryAvailable"
                value={editedData.lateralEntryAvailable}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-2"><strong>Course Name:</strong> {courseData.name || "N/A"}</p>
            <p className="mb-2"><strong>Specialization:</strong> {courseData.specialization || "N/A"}</p>
            <p className="mb-2"><strong>Level:</strong> {courseData.level || "N/A"}</p>
            <p className="mb-2"><strong>Total Seats:</strong> {courseData.totalSeats || "N/A"}</p>
            <p className="mb-2"><strong>Lateral Entry Available:</strong> {courseData.lateralEntryAvailable ? "Yes" : "No"}</p>

            <button onClick={handleEdit} className="bg-green-600 text-white px-4 py-2 rounded">
              Edit
            </button>
          </div>
        )
      ) : (
        <p>Loading course details...</p>
      )}

      <button onClick={() => navigate(-1)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
        Back
      </button>
    </div>
  );
};

export default CourseDetails;
