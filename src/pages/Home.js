import React, { useState } from "react";
import AddCourse from "./AddCourse";
import SeatMatrixForm from "./SeatMatrixForm";
import PlacementForm from "./PlacementForm";
import FacilitiesForm from "./FacilitiesForm";
import AdmissionForm from "./AdmissionForm";
import ContactForm from "./ContactForm";
import ImageUploadForm from "./ImageUploadForm";
import PhotosUploadForm from "./PhotoUploadForm";
import "../style/Home.css";

const Home = () => {
  const [showCollegeForm, setShowCollegeForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showSeatMatrixForm, setShowSeatMatrixForm] = useState(false);
  const [showPlacementForm, setShowPlacementForm] = useState(false);
  const [showFacilitiesForm, setShowFacilitiesForm] = useState(false);
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showImageUploadForm, setShowImageUploadForm] = useState(false);
  const [showPhotosUploadForm, setShowPhotosUploadForm] = useState(false);

  const [college, setCollege] = useState({
    name: "",
    collegeCode: "",
    universityAffiliation: "",
    accreditation: "",
    type: "",
    location: "",
    yearOfEstablishment: "",
    officialWebsite: "",
  });

  const [collegeCode, setCollegeCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCollege({ ...college, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://api.lytortech.com/admin/colleges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(college),
      });

      if (response.ok) {
        setMessage("College added successfully!");
        setCollegeCode(college.collegeCode);
        setShowCollegeForm(false);
        setShowCourseForm(true);
      } else {
        setMessage("Failed to add college. Check backend logs.");
      }
    } catch (error) {
      console.error("Error adding college:", error);
      setMessage("Error: Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Move console.log ABOVE the return statement
  console.log("🔎 showContactForm:", showContactForm);
  console.log("🔎 onBack function:", typeof (() => { setShowContactForm(false); setShowAdmissionForm(true); }) === "function" ? "Function exists" : "Undefined");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Admin Panel</h1>

      {!showCourseForm &&
        !showSeatMatrixForm &&
        !showPlacementForm &&
        !showFacilitiesForm &&
        !showAdmissionForm &&
        !showContactForm &&
        !showImageUploadForm &&
        !showPhotosUploadForm && (
          <button onClick={() => setShowCollegeForm(!showCollegeForm)}>
            {showCollegeForm ? "Cancel" : "Add College"}
          </button>
        )}

      {message && <p style={{ color: "green" }}>{message}</p>}

      {showCollegeForm && !showCourseForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <input type="text" name="name" placeholder="College Name" value={college.name} onChange={handleChange} required />
          <input type="text" name="collegeCode" placeholder="College Code" value={college.collegeCode} onChange={handleChange} required />
          <input type="text" name="universityAffiliation" placeholder="University Affiliation" value={college.universityAffiliation} onChange={handleChange} />
          <input type="text" name="accreditation" placeholder="Accreditation" value={college.accreditation} onChange={handleChange} />
          <input type="text" name="type" placeholder="Type (Govt/Private)" value={college.type} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={college.location} onChange={handleChange} required />
          <input type="number" name="yearOfEstablishment" placeholder="Year of Establishment" value={college.yearOfEstablishment} onChange={handleChange} required />
          <input type="url" name="officialWebsite" placeholder="Official Website" value={college.officialWebsite} onChange={handleChange} />
          <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
        </form>
      )}

      {showCourseForm && <AddCourse collegeCode={collegeCode} onCourseAdded={() => { setShowCourseForm(false); setShowSeatMatrixForm(true); }} onBack={() => { setShowCourseForm(false); setShowCollegeForm(true); }} />}

      {showSeatMatrixForm && <SeatMatrixForm collegeCode={collegeCode} onSeatMatrixAdded={() => { setShowSeatMatrixForm(false); setShowPlacementForm(true); }} onBack={() => { setShowSeatMatrixForm(false); setShowCourseForm(true); }} />}

      {showPlacementForm && (
        <PlacementForm 
          collegeCode={collegeCode} 
          onPlacementAdded={() => { setShowPlacementForm(false); setShowFacilitiesForm(true); }} 
          onBack={() => { setShowPlacementForm(false); setShowSeatMatrixForm(true); }} 
        />
      )}

      {showFacilitiesForm && (
        <FacilitiesForm 
          collegeCode={collegeCode} 
          onFacilitiesAdded={() => { setShowFacilitiesForm(false); setShowAdmissionForm(true); }} 
          onBack={() => { setShowFacilitiesForm(false); setShowPlacementForm(true); }} 
        />
      )}

      {showAdmissionForm && (
        <AdmissionForm 
          collegeCode={collegeCode} 
          onAdmissionAdded={() => { setShowAdmissionForm(false); setShowContactForm(true); }} 
          onBack={() => { setShowAdmissionForm(false); setShowFacilitiesForm(true); }} 
        />
      )}

      {showContactForm && (
        <ContactForm 
          collegeCode={collegeCode} 
          onContactAdded={() => { 
            console.log("✅ onContactAdded function called! Navigating to Image Upload Form...");
            setShowContactForm(false); 
            setShowImageUploadForm(true); 
          }} 
          onBack={() => { 
            console.log("🔙 Navigating back to Admission Form...");
            setShowContactForm(false);  
            setShowAdmissionForm(true);  
          }} 
        />
      )}

      {showImageUploadForm && (
        <ImageUploadForm 
          collegeCode={collegeCode} 
          onImageUploadComplete={() => { 
            console.log("✅ Image uploaded successfully! Navigating to Photos Upload Form...");
            setShowImageUploadForm(false); 
            setShowPhotosUploadForm(true); 
          }} 
          onBack={() => { 
            console.log("⬅ Navigating back to Contact Form...");
            setShowImageUploadForm(false);  
            setShowContactForm(true);  
          }} 
        />
      )}

{showPhotosUploadForm && (
  <PhotosUploadForm 
    collegeCode={collegeCode} 
    onUploadComplete={() => { 
      console.log("🏠 Navigating back to Home Page after successful photo upload...");
      setShowPhotosUploadForm(false);
    }} 
  />
)}

    </div>
  );
};

export default Home;
