import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  
  // Form visibility states
  const [showCollegeForm, setShowCollegeForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showSeatMatrixForm, setShowSeatMatrixForm] = useState(false);
  const [showPlacementForm, setShowPlacementForm] = useState(false);
  const [showFacilitiesForm, setShowFacilitiesForm] = useState(false);
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showImageUploadForm, setShowImageUploadForm] = useState(false);
  const [showPhotosUploadForm, setShowPhotosUploadForm] = useState(false);

  // College data state
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

  // Handle form input changes
  const handleChange = (e) => {
    setCollege({ ...college, [e.target.name]: e.target.value });
  };

  // Submit college form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://api.lytortech.com/admin/colleges", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(college),
      });

      if (response.ok) {
        setMessage("College added successfully!");
        setCollegeCode(college.collegeCode);
        setShowCollegeForm(false);
        setShowCourseForm(true);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add college");
      }
    } catch (error) {
      console.error("Error adding college:", error);
      setMessage("Error: Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
    window.location.reload();
  };

  // Reset all forms
  const resetForms = () => {
    setShowCollegeForm(false);
    setShowCourseForm(false);
    setShowSeatMatrixForm(false);
    setShowPlacementForm(false);
    setShowFacilitiesForm(false);
    setShowAdmissionForm(false);
    setShowReviewForm(false);
    setShowRatingForm(false);
    setShowContactForm(false);
    setShowImageUploadForm(false);
    setShowPhotosUploadForm(false);
    setCollege({
      name: "",
      collegeCode: "",
      universityAffiliation: "",
      accreditation: "",
      type: "",
      location: "",
      yearOfEstablishment: "",
      officialWebsite: "",
      tier: "",        // new field
      registration: "",
    });
    setCollegeCode("");
  };

  // Determine if we should show the "Add College" button
  const showAddCollegeButton = !showCourseForm && 
    !showSeatMatrixForm && 
    !showPlacementForm && 
    !showFacilitiesForm && 
    !showAdmissionForm && 
    !showReviewForm &&
    !showRatingForm &&
    !showContactForm && 
    !showImageUploadForm && 
    !showPhotosUploadForm;

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        {/* <button 
          onClick={handleLogout} 
          className="logout-button"
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button> */}
      </header>

      <main className="admin-main">
        {showAddCollegeButton && (
          <button 
            onClick={() => {
              resetForms();
              setShowCollegeForm(!showCollegeForm);
            }}
            className="action-button"
          >
            {showCollegeForm ? "Cancel" : "Add College"}
          </button>
        )}

        {message && (
          <p className={`message ${message.includes("success") ? "success" : "error"}`}>
            {message}
          </p>
        )}

        {/* College Form */}
        {showCollegeForm && !showCourseForm && (
          <form onSubmit={handleSubmit} className="college-form">
          <input 
            type="text" 
            name="name" 
            placeholder="College Name" 
            value={college.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="collegeCode" 
            placeholder="College Code" 
            value={college.collegeCode} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="universityAffiliation" 
            placeholder="University Affiliation" 
            value={college.universityAffiliation} 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="accreditation" 
            placeholder="Accreditation" 
            value={college.accreditation} 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="type" 
            placeholder="Type (Govt/Private)" 
            value={college.type} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="location" 
            placeholder="Location" 
            value={college.location} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="number" 
            name="yearOfEstablishment" 
            placeholder="Year of Establishment" 
            value={college.yearOfEstablishment} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="url" 
            name="officialWebsite" 
            placeholder="Official Website" 
            value={college.officialWebsite} 
            onChange={handleChange} 
          />
          
          {/* New Tier Field */}
          <select
            name="tier"
            value={college.tier || ''}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="" disabled>Select Tier</option>
            <option value="Tier 1">Tier 1</option>
            <option value="Tier 2">Tier 2</option>
            <option value="Tier 3">Tier 3</option>
          </select>
        
          {/* New Registration Field */}
          <input 
            type="text" 
            name="registration" 
            placeholder="Registration Number" 
            value={college.registration} 
            onChange={handleChange} 
            required 
          />
        
          <button 
            type="submit" 
            disabled={loading} 
            className="submit-button"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        )}

        {/* Course Form */}
        {showCourseForm && (
          <AddCourse 
            collegeCode={collegeCode} 
            onCourseAdded={() => { 
              setShowCourseForm(false); 
              setShowSeatMatrixForm(true); 
            }} 
            onBack={() => { 
              setShowCourseForm(false); 
              setShowCollegeForm(true); 
            }} 
          />
        )}

        {/* Seat Matrix Form */}
        {showSeatMatrixForm && (
          <SeatMatrixForm 
            collegeCode={collegeCode} 
            onSeatMatrixAdded={() => { 
              setShowSeatMatrixForm(false); 
              setShowPlacementForm(true); 
            }} 
            onBack={() => { 
              setShowSeatMatrixForm(false); 
              setShowCourseForm(true); 
            }} 
          />
        )}

        {/* Placement Form */}
        {showPlacementForm && (
          <PlacementForm 
            collegeCode={collegeCode} 
            onPlacementAdded={() => { 
              setShowPlacementForm(false); 
              setShowFacilitiesForm(true); 
            }} 
            onBack={() => { 
              setShowPlacementForm(false); 
              setShowSeatMatrixForm(true); 
            }} 
          />
        )}

        {/* Facilities Form */}
        {showFacilitiesForm && (
          <FacilitiesForm 
            collegeCode={collegeCode} 
            onFacilitiesAdded={() => { 
              setShowFacilitiesForm(false); 
              setShowAdmissionForm(true); 
            }} 
            onBack={() => { 
              setShowFacilitiesForm(false); 
              setShowPlacementForm(true); 
            }} 
          />
        )}

        {/* Admission, Review, and Rating Forms - Grouped Together */}
        <div className="form-group-row">
          {/* Admission Form */}
          {showAdmissionForm && (
            <div className="form-group-item">
              <AdmissionForm 
                collegeCode={collegeCode} 
                onAdmissionAdded={() => { 
                  setShowAdmissionForm(false); 
                  setShowContactForm(true); 
                }} 
                onBack={() => { 
                  setShowAdmissionForm(false); 
                  setShowFacilitiesForm(true); 
                }} 
              />
            </div>
          )}

          {/* Review Form */}
          {showReviewForm && (
            <div className="form-group-item">
              <div className="form-container">
                <h3>Review Management</h3>
                <form className="review-form">
                  <div className="form-group">
                    <label>College Code:</label>
                    <input type="text" value={collegeCode} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Review Status:</label>
                    <select>
                      <option>Approved</option>
                      <option>Pending</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Featured Review:</label>
                    <textarea placeholder="Enter featured review"></textarea>
                  </div>
                  <div className="button-group">
                    <button 
                      type="button" 
                      className="submit-button"
                      onClick={() => {
                        setShowReviewForm(false);
                        setShowContactForm(true);
                      }}
                    >
                      Save & Continue
                    </button>
                    <button 
                      type="button" 
                      className="back-button"
                      onClick={() => {
                        setShowReviewForm(false);
                        setShowFacilitiesForm(true);
                      }}
                    >
                      Back
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Rating Form */}
          {showRatingForm && (
            <div className="form-group-item">
              <div className="form-container">
                <h3>Rating Management</h3>
                <form className="rating-form">
                  <div className="form-group">
                    <label>College Code:</label>
                    <input type="text" value={collegeCode} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Overall Rating:</label>
                    <input type="number" min="1" max="5" placeholder="1-5" />
                  </div>
                  <div className="form-group">
                    <label>Rating Categories:</label>
                    <div className="rating-categories">
                      <div>
                        <label>Teaching:</label>
                        <input type="number" min="1" max="5" />
                      </div>
                      <div>
                        <label>Facilities:</label>
                        <input type="number" min="1" max="5" />
                      </div>
                      <div>
                        <label>Placements:</label>
                        <input type="number" min="1" max="5" />
                      </div>
                    </div>
                  </div>
                  <div className="button-group">
                    <button 
                      type="button" 
                      className="submit-button"
                      onClick={() => {
                        setShowRatingForm(false);
                        setShowContactForm(true);
                      }}
                    >
                      Save & Continue
                    </button>
                    <button 
                      type="button" 
                      className="back-button"
                      onClick={() => {
                        setShowRatingForm(false);
                        setShowFacilitiesForm(true);
                      }}
                    >
                      Back
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <ContactForm 
            collegeCode={collegeCode} 
            onContactAdded={() => { 
              setShowContactForm(false); 
              setShowImageUploadForm(true); 
            }} 
            onBack={() => { 
              setShowContactForm(false);  
              // Go back to whichever form was shown before
              if (showAdmissionForm) setShowAdmissionForm(true);
              if (showReviewForm) setShowReviewForm(true);
              if (showRatingForm) setShowRatingForm(true);
            }} 
          />
        )}

        {/* Image Upload Form */}
        {showImageUploadForm && (
          <ImageUploadForm 
            collegeCode={collegeCode} 
            onImageUploadComplete={() => { 
              setShowImageUploadForm(false); 
              setShowPhotosUploadForm(true); 
            }} 
            onBack={() => { 
              setShowImageUploadForm(false);  
              setShowContactForm(true);  
            }} 
          />
        )}

        {/* Photos Upload Form */}
        {showPhotosUploadForm && (
          <PhotosUploadForm 
            collegeCode={collegeCode} 
            onUploadComplete={() => { 
              setShowPhotosUploadForm(false);
              resetForms();
            }} 
          />
        )}
      </main>
    </div>
  );
};

export default Home;