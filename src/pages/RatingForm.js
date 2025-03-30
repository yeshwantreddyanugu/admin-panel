import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/RatingForm.css";

const RatingForm = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState({
    collegeCode: "",
    teaching: 0,
    faculty: 0,
    campus: 0,
    extracurricular: 0,
    comment: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRating({ ...rating, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.lytortech.com/admin/rating",
        rating,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Explicitly check for status code 200
      if (response.status === 200) {
        alert("Review successfully submitted!");
        navigate('/login');
      } else {
        alert("Submission received but with unexpected status: " + response.status);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(`Failed to submit rating. Server responded with: ${error.response.status} `);
      } else if (error.request) {
        // The request was made but no response was received
        alert("Failed to submit rating. No response from server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        alert("Failed to submit rating. Please check your connection.");
      }
    }
  };

  return (
    <div className="rating-container">
      <h2>Submit Your College Rating</h2>
      <form onSubmit={handleSubmit} className="rating-form">
        <div className="form-group">
          <label>College Code:</label>
          <input
            type="text"
            name="collegeCode"
            placeholder="Enter college code"
            value={rating.collegeCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Teaching Quality (1-5):</label>
          <input
            type="number"
            name="teaching"
            min="1"
            max="5"
            value={rating.teaching}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Faculty Support (1-5):</label>
          <input
            type="number"
            name="faculty"
            min="1"
            max="5"
            value={rating.faculty}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Campus Facilities (1-5):</label>
          <input
            type="number"
            name="campus"
            min="1"
            max="5"
            value={rating.campus}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Extracurricular Activities (1-5):</label>
          <input
            type="number"
            name="extracurricular"
            min="1"
            max="5"
            value={rating.extracurricular}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Additional Comments:</label>
          <textarea
            name="comment"
            placeholder="Share your experience..."
            value={rating.comment}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">
          Submit Rating
        </button>
      </form>
    </div>
  );
};

export default RatingForm;