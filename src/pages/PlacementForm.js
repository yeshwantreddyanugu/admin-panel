import React, { useState } from "react";

const PlacementForm = ({ collegeCode, onPlacementAdded, onBack }) => {
  const [formData, setFormData] = useState({
    collegeCode: collegeCode || "",
    year: "",
    placementPercentage: "",
    highestPackage: "",
    averagePackage: "",
    topRecruiters: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/placements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Placement details submitted successfully!");
        onPlacementAdded(); // Move to the Facilities Form
      }
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Placement Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="collegeCode" placeholder="College Code" value={formData.collegeCode} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" step="0.01" name="placementPercentage" placeholder="Placement Percentage" value={formData.placementPercentage} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" step="0.01" name="highestPackage" placeholder="Highest Package (LPA)" value={formData.highestPackage} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" step="0.01" name="averagePackage" placeholder="Average Package (LPA)" value={formData.averagePackage} onChange={handleChange} className="w-full p-2 border rounded" required />
          <textarea name="topRecruiters" placeholder="Top Recruiters (comma separated)" value={formData.topRecruiters} onChange={handleChange} className="w-full p-2 border rounded" required />
  
          {/* Buttons Section with new styling */}
          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
          <button 
              type="button" 
              onClick={onBack} 
              style={{ flex: 1, padding: "10px", backgroundColor: "gray", color: "white", border: "none", cursor: "pointer" }}
            >
              Back
            </button>
            <button 
              type="submit" 
              style={{ flex: 1, padding: "10px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}
            >
              Submit
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default PlacementForm;
