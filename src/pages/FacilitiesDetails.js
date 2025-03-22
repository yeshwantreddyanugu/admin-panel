import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const FacilitiesDetails = () => {
  const { collegeCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [facilitiesData, setFacilitiesData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.college?.facilities) {
      setFacilitiesData(location.state.college.facilities);
      setEditedData(location.state.college.facilities);
      setLoading(false);
    } else {
      fetchFacilitiesDetails();
    }
  }, [collegeCode, location.state]);

  const fetchFacilitiesDetails = async () => {
    if (!collegeCode) return;

    try {
      const response = await axios.get(`http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/get/facilities/${collegeCode}`);
      if (response.data) {
        setFacilitiesData(response.data);
        setEditedData(response.data);
      }
    } catch (error) {
      console.error("Error fetching facilities details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault(); // Prevent page refresh or navigation
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!collegeCode) {
      alert("College code is missing!");
      return;
    }

    try {
      const response = await axios.put(
        `http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/update/facilities`,
        {
          collegeCode,  // Ensure collegeCode is sent in the request body
          ...editedData
        }
      );

      if (response.status === 200) {
        alert("Changes saved successfully!");
        setFacilitiesData(editedData);
        setIsEditing(false);
      } else {
        alert("Failed to save changes. Please try again.");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes.");
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Facilities Details</h2>

      {loading ? (
        <p>Loading facilities details...</p>
      ) : facilitiesData ? (
        <div className="border p-4 rounded shadow">
          <form>
            {Object.keys(facilitiesData).map((key) => (
              <div key={key} className="mb-2">
                <label className="font-bold">{key}:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name={key}
                    value={editedData[key] || ""}
                    onChange={handleChange}
                    className="border p-2 w-full"
                  />
                ) : (
                  <span className="ml-2">{facilitiesData[key]}</span>
                )}
              </div>
            ))}

            {isEditing ? (
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                Save Changes
              </button>
            ) : (
              <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                Edit
              </button>
            )}
          </form>

          <button onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded mt-2">
            Back
          </button>
        </div>
      ) : (
        <p>No facilities data available.</p>
      )}
    </div>
  );
};

export default FacilitiesDetails;
