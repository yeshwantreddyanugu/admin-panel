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
          const response = await axios.get(`https://api.lytortech.com/admin/get/college/${collegeCode}`);
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
        `https://api.lytortech.com/admin/update/college`, 
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
      <h2 className="text-2xl font-bold mb-4">College Details</h2>
      
      <div className="space-y-4">
        {/* Name */}
        <div>
          <strong>Name: </strong>
          {isEditing ? (
            <input 
              type="text" 
              name="name" 
              value={updatedData.name} 
              onChange={handleChange} 
              className="border p-2 w-full rounded"
            />
          ) : (
            college.name || "N/A"
          )}
        </div>
  
        {/* College Code (read-only) */}
        <div>
          <strong>College Code: </strong>
          {college.collegeCode || "N/A"}
        </div>
  
        {/* University Affiliation */}
        <div>
          <strong>University Affiliation: </strong>
          {isEditing ? (
            <input 
              type="text" 
              name="universityAffiliation" 
              value={updatedData.universityAffiliation} 
              onChange={handleChange} 
              className="border p-2 w-full rounded"
            />
          ) : (
            college.universityAffiliation || "N/A"
          )}
        </div>
  
        {/* Accreditation */}
        <div>
          <strong>Accreditation: </strong>
          {isEditing ? (
            <input 
              type="text" 
              name="accreditation" 
              value={updatedData.accreditation} 
              onChange={handleChange} 
              className="border p-2 w-full rounded"
            />
          ) : (
            college.accreditation || "N/A"
          )}
        </div>
  
        {/* Type */}
        <div>
          <strong>Type: </strong>
          {isEditing ? (
            <input 
              type="text" 
              name="type" 
              value={updatedData.type} 
              onChange={handleChange} 
              className="border p-2 w-full rounded"
              placeholder="Govt/Private"
            />
          ) : (
            college.type || "N/A"
          )}
        </div>
  
        {/* Location */}
        <div>
          <strong>Location: </strong>
          {isEditing ? (
            <input 
              type="text" 
              name="location" 
              value={updatedData.location} 
              onChange={handleChange} 
              className="border p-2 w-full rounded"
            />
          ) : (
            college.location || "N/A"
          )}
        </div>
  
        {/* Year of Establishment */}
        <div>
          <strong>Year of Establishment: </strong>
          {isEditing ? (
            <input 
              type="number" 
              name="yearOfEstablishment" 
              value={updatedData.yearOfEstablishment} 
              onChange={handleChange} 
              className="border p-2 w-full rounded"
            />
          ) : (
            college.yearOfEstablishment || "N/A"
          )}
        </div>
  
        {/* Official Website */}
        <div>
          <strong>Official Website: </strong>
          {isEditing ? (
            <input 
              type="url" 
              name="officialWebsite" 
              value={updatedData.officialWebsite} 
              onChange={handleChange} 
              className="border p-2 w-full rounded"
            />
          ) : (
            college.officialWebsite || "N/A"
          )}
        </div>
  
        {/* Tier */}
        <div>
          <strong>Tier: </strong>
          {isEditing ? (
            <select
              name="tier"
              value={updatedData.tier || ''}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="" disabled>Select Tier</option>
              <option value="Tier 1">Tier 1</option>
              <option value="Tier 2">Tier 2</option>
              <option value="Tier 3">Tier 3</option>
            </select>
          ) : (
            college.tier || "N/A"
          )}
        </div>
  
        {/* Recommendation */}
        <div>
          <strong>Recommendation: </strong>
          {isEditing ? (
            <select
              name="recommended"
              value={updatedData.recommended || ''}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="" disabled>Select Recommendation</option>
              <option value="Recommended">Recommended</option>
              <option value="Top College">Top College</option>
            </select>
          ) : (
            college.recommended || "N/A"
          )}
        </div>
  
        {/* Registration Number */}
        <div>
          <strong>Registration Number: </strong>
          {isEditing ? (
            <input 
              type="text" 
              name="registration" 
              value={updatedData.registration} 
              onChange={handleChange} 
              className="border p-2 w-full rounded"
            />
          ) : (
            college.registration || "N/A"
          )}
        </div>
      </div>
  
      <div className="mt-6 space-x-4">
        {isEditing ? (
          <button 
            onClick={handleSave} 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        ) : (
          <button 
            onClick={handleEditClick} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit
          </button>
        )}
        <button 
          onClick={handleBack} 
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CollegeDetails;
