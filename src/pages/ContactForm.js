import React, { useState, useEffect } from "react";
import ImageUploadForm from "./ImageUploadForm";

const ContactForm = ({ collegeCode, onContactAdded, onBack }) => {
  console.log("🛠️ onBack received in ContactForm:", onBack); // Debugging

  const [formData, setFormData] = useState({
    collegeCode: collegeCode || "",
    email: "",
    phone: "",
    googleMapsLink: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/contacts?collegeCode=${collegeCode}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFormData(data[0]); // Load existing contact details if available
        }
      })
      .catch((error) => console.error("❌ Error fetching contacts:", error));
  }, [collegeCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api.lytortech.com/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Contact details saved successfully!");
        setIsSubmitted(true);
      } else {
        alert("❌ Failed to save contact details");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("An error occurred while saving contact details.");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return <ImageUploadForm collegeCode={collegeCode} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Contact Details Form</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">College Code:</label>
          <input type="text" name="collegeCode" value={formData.collegeCode} className="w-full p-2 border rounded mb-3" disabled />
  
          <label className="block mb-2">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
  
          <label className="block mb-2">Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
  
          <label className="block mb-2">Google Maps Link:</label>
          <input type="text" name="googleMapsLink" value={formData.googleMapsLink} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
  
          {/* Added Address Field */}
          <label className="block mb-2">Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            rows="3"
            required
          />
  
          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            <button 
              type="button" 
              onClick={() => {
                if (typeof onBack === "function") {
                  console.log("🔙 Back button clicked: Navigating back to Admission Form...");
                  onBack();
                } else {
                  console.error("⚠️ onBack is not a function!");
                }
              }} 
              style={{ flex: 1, padding: "10px", backgroundColor: "gray", color: "white", border: "none", cursor: "pointer" }}
            >
              Back
            </button>
            <button 
              type="submit" 
              style={{ flex: 1, padding: "10px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
