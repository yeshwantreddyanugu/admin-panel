import React, { useState } from "react";
import "../style/PhotoUploadForm.css"; // Import the CSS file

const PhotoUploadForm = ({ collegeCode, onUploadComplete }) => {
  const [url, setUrl] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("collegeCode", collegeCode);
    formData.append("url", url);
    images.forEach((image) => formData.append("images", image));

    setLoading(true);
    try {
      const response = await fetch("http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/save/images", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Photos uploaded successfully!");
        setUrl("");
        setImages([]);
        if (onUploadComplete) {
          console.log("✅ Upload complete! Navigating to Home...");
          onUploadComplete(); // Navigate to Home
        }
      } else {
        alert("Failed to upload photos.");
      }
    } catch (error) {
      console.error("Error uploading photos:", error);
      alert("An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="photo-upload-container">
      <div className="photo-upload-form">
        <h2>Upload Additional Photos</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>College Code:</label>
          <input type="text" value={collegeCode} disabled />

          <label>Website URL:</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />

          <label>Upload Multiple Images:</label>
          <input type="file" accept="image/*" multiple onChange={handleFileChange} />

          {images.length > 0 && (
            <div className="image-preview-container">
              <p>Selected Images:</p>
              <div className="image-preview-grid">
                {images.map((image, index) => (
                  <div key={index} className="image-preview">
                    <img src={URL.createObjectURL(image)} alt="Selected" />
                    <button type="button" className="remove-btn" onClick={() => handleRemoveImage(index)}>
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} className="upload-btn">
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhotoUploadForm;
