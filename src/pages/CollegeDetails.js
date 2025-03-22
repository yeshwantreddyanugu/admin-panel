import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CollegeDetails = () => {
  const { collegeCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [college, setCollege] = useState(location.state?.college || null);
  const [loading, setLoading] = useState(!college);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    if (!college) {
      const fetchCollegeDetails = async () => {
        try {
          const response = await axios.get(`http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/get/college/${collegeCode}`);
          setCollege(response.data);
          setUpdatedData(response.data);
        } catch (error) {
          console.error("Error fetching college details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCollegeDetails();
    } else {
      setUpdatedData(college);
    }
  }, [college, collegeCode]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/update/college`, 
        { ...updatedData, collegeCode } // Ensure collegeCode is included in the request body
      );

      if (response.status === 200) {
        alert("College details updated successfully!");
        setCollege(updatedData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating college details:", error);
      alert("Failed to update college details.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="text-center text-lg font-bold mt-4">College Details Loading...</div>;
  }

  if (!college) {
    return <div className="text-center text-red-600 text-lg font-bold mt-4">College not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h4 className="text-2xl font-bold mb-4">
        <p><strong>Name: {isEditing ? (
          <input type="text" name="name"  value={updatedData.name} onChange={handleChange} className="border p-1" />
        ) : (
          college.name
        )}</strong></p>
      </h4>

      <p><strong>College Code:</strong> {college.collegeCode}</p>

      <p><strong>Location:</strong> {isEditing ? (
        <input type="text" name="location"  value={updatedData.location} onChange={handleChange} className="border p-1" />
      ) : (
        college.location || "N/A"
      )}</p>

      <p><strong>Contact:</strong> {isEditing ? (
        <input type="text" name="contact" value={updatedData.contact} onChange={handleChange} className="border p-1" />
      ) : (
        college.contact || "N/A"
      )}</p>

      <p><strong>Facilities:</strong> {isEditing ? (
        <input type="text" name="facilities" value={updatedData.facilities} onChange={handleChange} className="border p-1" />
      ) : (
        college.facilities || "N/A"
      )}</p>

<p><strong>Courses Offered:</strong> {isEditing ? (
  <input type="text" name="courses" value={updatedData.courses} onChange={handleChange} className="border p-1" />
) : (
  Array.isArray(college.courses) ? college.courses.join(", ") : college.courses || "N/A"
)}</p>


      {isEditing ? (
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-1 mt-2 rounded hover:bg-green-600 mr-2">
          Save Changes
        </button>
      ) : (
        <button onClick={handleEditClick} className="bg-blue-500 text-white px-4 py-1 mt-2 rounded hover:bg-blue-600 mr-2">
          Edit
        </button>
      )}

      <button onClick={handleBack} className="bg-gray-500 text-white px-4 py-1 mt-2 rounded hover:bg-gray-600">
        Back
      </button>
    </div>
  );
};

export default CollegeDetails;
