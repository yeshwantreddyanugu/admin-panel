import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import "../style/BrochureUploadForm.css"; 

const BrochureUploadForm = () => {
  const { collegeCode } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    collegeCode: collegeCode || "",
    image: null,
  });

  useEffect(() => {
    if (collegeCode) {
      setFormData(prev => ({ ...prev, collegeCode }));
    }
  }, [collegeCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      alert("Please select an image to upload.");
      return;
    }

    const data = new FormData();
    data.append("collegeCode", formData.collegeCode);
    data.append("image", formData.image);

    try {
      const response = await axios.post("https://api.lytortech.com/admin/save/brocher", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.status === 200) {
        alert("Brochure uploaded successfully!");
        navigate('/'); // Return to home after successful upload
      }
    } catch (error) {
      console.error("Error uploading brochure:", error);
      alert("Failed to upload brochure.");
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to review page
  };

  return (
    <div className="brochure-upload-container">
      <div className="brochure-upload-form">
        <h2>Upload College Brochure</h2>
        
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>College Code:</label>
            <input
              type="text"
              name="collegeCode"
              placeholder="College Code"
              value={formData.collegeCode}
              onChange={handleChange}
              required
              readOnly={!!collegeCode}
            />
          </div>

          <div className="form-group">
            <label>Brochure Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Upload Brochure
          </button>
        </form>
      </div>
    </div>
  );
};

export default BrochureUploadForm;