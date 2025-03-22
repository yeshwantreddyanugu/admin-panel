import React, { useState } from "react";
import "../style/FacilitiesForm.css"

const FacilitiesForm = ({ collegeCode, onFacilitiesAdded, onBack }) => {
  const [facilities, setFacilities] = useState({
    wifi: false,
    library: false,
    hostel: false,
    canteen: false,
    gym: false,
    sports: false,
    medicalFacilities: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFacilities({ ...facilities, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/facilities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeCode, ...facilities }),
      });
      if (response.ok) {
        alert("Facilities saved successfully!");
        onFacilitiesAdded(); // Move to Admission Form
      } else {
        alert("Failed to save facilities");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">College Facilities</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <p className="font-semibold mb-4">College Code: {collegeCode}</p>

        <div className="grid grid-cols-2 gap-6">
          {Object.keys(facilities).map((key) => (
            <label key={key} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg shadow">
              <input type="checkbox" name={key} checked={facilities[key]} onChange={handleChange} className="w-5 h-5" />
              <span className="capitalize text-lg font-medium">{key.replace(/([A-Z])/g, " $1").trim()}</span>
            </label>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button 
            type="button" 
            onClick={onBack} 
            style={{ flex: 1, padding: "12px", backgroundColor: "gray", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}
          >
            Back
          </button>
          <button 
            type="submit" 
            style={{ flex: 1, padding: "12px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );


};

export default FacilitiesForm;
