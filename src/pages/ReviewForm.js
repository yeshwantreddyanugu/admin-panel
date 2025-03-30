import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
//import "../style/ReviewForm.css";

const ReviewForm = () => {
  const { collegeCode } = useParams();
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({
    collegeCode: collegeCode || "",
    review: "",
    rating: 0,
  });

  useEffect(() => {
    if (collegeCode) {
      setReviewData(prev => ({ ...prev, collegeCode }));
    }
  }, [collegeCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.lytortech.com/admin/review", reviewData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.status === 200) {
        alert("Review submitted successfully!");
        // Navigate to brochure upload with collegeCode
        navigate(`/brochure-upload/${collegeCode}`);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page (PhotoUpload)
  };


  return (
    <div className="review-container">
      <div className="review-form">
        <h2>Submit Your Review</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>College Code:</label>
            <input
              type="text"
              name="collegeCode"
              placeholder="College Code"
              value={reviewData.collegeCode}
              onChange={handleChange}
              required
              readOnly={!!collegeCode} // Make readonly if coming from PhotoUpload
            />
          </div>
  
          <div className="form-group">
            <label>Review:</label>
            <textarea
              name="review"
              placeholder="Write your review here..."
              value={reviewData.review}
              onChange={handleChange}
              required
              rows="5"
            />
          </div>
  
          <div className="form-group">
            <label>Rating (1-5):</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={reviewData.rating}
              onChange={handleChange}
              required
            />
          </div>
  
          <button type="submit" className="submit-button">
            Submit Review
          </button>
          
        </form>
      </div>
    </div>
  );

  
};

export default ReviewForm;





