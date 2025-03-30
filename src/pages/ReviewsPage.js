import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCollegeCode, setFilterCollegeCode] = useState("");
  const [deletingId, setDeletingId] = useState(null); // Track which review is being deleted
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await axios.get(
      "https://api.lytortech.com/admin/get/reviews",
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        }
      }
    );
    
    if (!response.data) {
      throw new Error("Empty response from server");
    }

    const rawData = Array.isArray(response.data) ? response.data : response.data.data || [];
    
    if (!rawData.length) {
      setError("No reviews found in the database");
      return;
    }

    const cleanedReviews = rawData.map(item => ({
      id: item.id || Math.random().toString(36).substr(2, 9),
      collegeCode: item.collegeCode ? String(item.collegeCode).trim() : "UNKNOWN",
      review: item.review || "No review text provided",
      rating: Math.max(1, Math.min(5, Number(item.rating) || 3)), // Fixed parentheses here
      createdAt: item.createdAt || new Date().toISOString()
    }));

    setReviews(cleanedReviews);
    
  } catch (error) {
    console.error("Error:", error);
    setError(`Failed to load reviews: ${error.message}`);
    setReviews([]);
  } finally {
    setLoading(false);
  }
};

const handleDeleteReview = async (reviewId) => {
    try {
      setDeletingId(reviewId); // Show loading state for this specific review
      
      // Make DELETE request to your endpoint
      await axios.delete(
        `https://api.lytortech.com/admin/review/${reviewId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}` // Include if using authentication
          }
        }
      );
  
      // Update UI by removing the deleted review
      setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
      
      // Show success message (optional)
      setError(null);
      alert("Review deleted successfully!");
      
    } catch (error) {
      console.error("Delete error:", error);
      
      // Show specific error message from server if available
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Failed to delete review";
      setError(`Delete failed: ${errorMessage}`);
      
    } finally {
      setDeletingId(null); // Reset loading state
    }
  };

  const filteredReviews = reviews.filter(review => 
    review.collegeCode.toLowerCase().includes(filterCollegeCode.toLowerCase())
  );

  const handleAddReview = () => navigate("/review");
  const handleRetry = () => fetchReviews();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>College Reviews</h2>
        <button onClick={handleAddReview} style={styles.button}>
          + Add Review
        </button>
      </div>

      <input
        type="text"
        placeholder="Filter by college code..."
        value={filterCollegeCode}
        onChange={(e) => setFilterCollegeCode(e.target.value)}
        style={styles.filterInput}
      />

      {loading ? (
        <div style={styles.loading}>
          <p>Loading reviews...</p>
          <div style={styles.spinner}></div>
        </div>
      ) : error ? (
        <div style={styles.errorContainer}>
          <p>{error}</p>
          <button onClick={handleRetry} style={styles.retryButton}>
            Retry
          </button>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div style={styles.message}>
          {filterCollegeCode ? (
            <p>No reviews match "{filterCollegeCode}"</p>
          ) : (
            <p>No reviews available</p>
          )}
        </div>
      ) : (
        <div style={styles.reviewsList}>
          {filteredReviews.map((review) => (
            <div key={review.id} style={styles.reviewCard}>
              <div style={styles.reviewHeader}>
                <span style={styles.collegeCode}>{review.collegeCode}</span>
                <div style={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={i < review.rating ? {} : styles.starEmpty}>
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
              <p style={styles.reviewText}>{review.review}</p>
              <div style={styles.reviewFooter}>
                <span>
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  style={styles.deleteButton}
                  disabled={deletingId === review.id}
                >
                  {deletingId === review.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Updated styles with delete button
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  filterInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "4px"
  },
  loading: {
    textAlign: "center",
    padding: "20px"
  },
  spinner: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite",
    margin: "20px auto"
  },
  errorContainer: {
    padding: "20px",
    backgroundColor: "#ffebee",
    borderRadius: "4px",
    marginBottom: "20px",
    color: "#d32f2f"
  },
  retryButton: {
    padding: "8px 16px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px"
  },
  reviewsList: {
    display: "grid",
    gap: "15px"
  },
  reviewCard: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#fff",
    position: "relative"
  },
  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },
  collegeCode: {
    fontWeight: "bold"
  },
  rating: {
    color: "#FFD700"
  },
  starEmpty: {
    opacity: "0.3"
  },
  reviewText: {
    margin: "10px 0",
    lineHeight: "1.5"
  },
  reviewFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12px",
    color: "#757575"
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    ":hover": {
      backgroundColor: "#d32f2f"
    },
    ":disabled": {
      backgroundColor: "#cccccc",
      cursor: "not-allowed"
    }
  },
  message: {
    textAlign: "center",
    padding: "20px",
    color: "#666"
  }
};

// Add this to your global CSS or style tag
const globalStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default ReviewsPage;