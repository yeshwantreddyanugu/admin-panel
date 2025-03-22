import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SeatMatrix = () => {
  const { collegeCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [seatMatrixData, setSeatMatrixData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.college?.seatMatrix) {
      setSeatMatrixData(location.state.college.seatMatrix);
      setEditedData(location.state.college.seatMatrix);
      setLoading(false);
    } else {
      fetchSeatMatrixDetails();
    }
  }, [collegeCode, location.state]);

  const fetchSeatMatrixDetails = async () => {
    if (!collegeCode) return;

    try {
      const response = await axios.get(`http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/get/seat-matrix/${collegeCode}`);
      if (response.data) {
        setSeatMatrixData(response.data);
        setEditedData(response.data);
      }
    } catch (error) {
      console.error("Error fetching seat matrix details:", error);
      alert("Failed to fetch seat matrix details.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!collegeCode) {
      alert("College code is missing!");
      return;
    }
  
    try {
      const payload = { ...editedData, collegeCode }; // Ensure collegeCode is in request body
      const response = await axios.put(
        "http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/update/seat-matrix", 
        payload
      );
  
      if (response.status === 200) {
        alert("Changes saved successfully!");
        setSeatMatrixData(editedData);
        setIsEditing(false);
      } else {
        alert("Failed to save changes.");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes.");
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Seat Matrix Details</h2>

      {loading ? (
        <p>Loading seat matrix details...</p>
      ) : seatMatrixData ? (
        <div className="border p-4 rounded shadow">
          <form>
            {Object.keys(seatMatrixData).map((key) => (
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
                  <span className="ml-2">{seatMatrixData[key]}</span>
                )}
              </div>
            ))}

            {isEditing ? (
              <button type="button" onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                Save Changes
              </button>
            ) : (
              <button type="button" onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                Edit
              </button>
            )}
          </form>

          <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded mt-2">
            Back
          </button>
        </div>
      ) : (
        <p>No seat matrix data available.</p>
      )}
    </div>
  );
};

export default SeatMatrix;
