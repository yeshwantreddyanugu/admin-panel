import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PlacementDetails = () => {
  const { collegeCode } = useParams();
  const navigate = useNavigate();
  const [placements, setPlacements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (collegeCode) {
      fetchPlacements();
    }
  }, [collegeCode]);

  const fetchPlacements = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching placements for collegeCode:", collegeCode);
      const response = await axios.get(`http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/get/placements/${collegeCode}`);

      console.log("Raw Response Data:", response.data);
      if (!response.data || Object.keys(response.data).length === 0) {
        console.warn("No placement data received from backend.");
        setError("No placement data available.");
        setPlacements(null);
      } else {
        setPlacements(response.data);
        setFormData(response.data); // Set initial form data for editing
      }
    } catch (error) {
      console.error("Error fetching placement details:", error);
      setError("Failed to fetch placement details.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
        const response = await axios.put(
            "http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/update/placement", // Fix: No collegeCode in URL
            formData // Send the full object in the request body
        );
        
        setPlacements(formData);
        setIsEditing(false);
        console.log("Update successful:", response.data);
    } catch (error) {
        console.error("Error updating placement details:", error);
        setError("Failed to update placement details.");
    }
};


return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Placement Details for {collegeCode}
      </h2>
  
      {loading ? (
        <p className="text-gray-600">Loading placement details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : placements ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(placements).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="font-semibold text-gray-700">
                  <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  />
                ) : (
                  <p className="border p-2 rounded bg-gray-100">{placements[key]}</p>
                )}
              </div>
            ))}
          </div>
  
          <div className="mt-6 flex justify-between">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No placement data available for this college.</p>
      )}
    </div>
  );
  
};

export default PlacementDetails;
