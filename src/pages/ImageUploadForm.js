import React, { useState } from "react";
import PhotoUploadForm from "./PhotoUploadForm";

const ImageUploadForm = ({ collegeCode, onBack, onImageUploadComplete }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPhotoUploadForm, setShowPhotoUploadForm] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image.");
      return;
    }
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("collegeCode", collegeCode);
    formDataToSend.append("image", image);

    try {
      const response = await fetch(
        "http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/save/image",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        alert("✅ Image uploaded successfully!");
        setImage(null);
        setShowPhotoUploadForm(true);
        if (onImageUploadComplete) onImageUploadComplete();
      } else {
        alert("❌ Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error: Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  if (showPhotoUploadForm) {
    return <PhotoUploadForm collegeCode={collegeCode} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Upload College Image</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label className="block mb-2">College Code:</label>
          <input
            type="text"
            name="collegeCode"
            value={collegeCode}
            className="w-full p-2 border rounded mb-3"
            disabled
          />

          <label className="block mb-2">Upload Main Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded mb-3"
            required
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            <button type="button" onClick={onBack} style={{ flex: 1, padding: "10px", backgroundColor: "gray", color: "white", border: "none", cursor: "pointer" }}>Back</button>
            <button type="submit" style={{ flex: 1, padding: "10px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}>Upload</button>
            
          </div>
        </form>
      </div>
    </div>
  );

};

export default ImageUploadForm;
