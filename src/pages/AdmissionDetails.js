import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AdmissionDetails = () => {
  const { collegeCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [admissionData, setAdmissionData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🚀 useParams() output:", { collegeCode });
    console.log("📦 Data received from location.state:", location.state);

    if (location.state?.college?.admission) {
      console.log("✅ Using data from location.state");
      const admissionInfo = location.state.college.admission;
      setAdmissionData(admissionInfo);
      setEditedData(admissionInfo);
      setLoading(false);
    } else {
      fetchAdmissionDetails();
    }
  }, [collegeCode, location.state]);

  const fetchAdmissionDetails = async () => {
    if (!collegeCode) {
      console.error("❌ collegeCode is undefined! API call skipped.");
      setLoading(false);
      return;
    }

    const apiUrl = `http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/get/admission/${collegeCode}`;
    console.log("🌍 Fetching Admission Details from:", apiUrl);
    
    try {
      const response = await axios.get(apiUrl);
      console.log("✅ API Response:", response.data);

      if (response.data) {
        setAdmissionData(response.data);
        setEditedData(response.data);
      }
    } catch (error) {
      console.error("❌ Error fetching admission details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    console.log("✏️ Editing mode enabled");
    setIsEditing(true);
  };

  const handleChange = (e) => {
    console.log(`🔄 Field changed: ${e.target.name} = ${e.target.value}`);
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!editedData) {
      alert("❌ Cannot save, no data provided!");
      return;
    }
  
    const updateUrl = `http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/update/admission`; // No collegeCode in URL
    console.log("💾 Saving Changes to:", updateUrl);
    
    try {
      await axios.put(updateUrl, editedData); // Send only the body
      console.log("✅ Changes saved successfully");
  
      alert("✅ Changes saved successfully!");
      setAdmissionData(editedData);
      setIsEditing(false);
    } catch (error) {
      console.error("❌ Error saving changes:", error);
      alert("❌ Failed to save changes.");
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admission Details</h2>

      {loading ? (
        <p>⏳ Loading admission details...</p>
      ) : admissionData ? (
        <div className="border p-4 rounded shadow">
          <form>
            {Object.keys(admissionData).length > 0 ? (
              Object.keys(admissionData).map((key) => (
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
                    <span className="ml-2">{admissionData[key]}</span>
                  )}
                </div>
              ))
            ) : (
              <p>No admission data available.</p>
            )}

            {isEditing ? (
              <button
                type="button"
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
            )}
          </form>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
          >
            Back
          </button>
        </div>
      ) : (
        <p>❌ No admission data available.</p>
      )}
    </div>
  );
};

export default AdmissionDetails;
