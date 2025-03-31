import React, { useEffect, useState } from "react";
import axios from "axios";

const RatingsPage = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCollegeCode, setFilterCollegeCode] = useState("");

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.lytortech.com/admin/get/ratings",
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Transform data if needed
      const formattedRatings = response.data.map(rating => ({
        ...rating,
        teaching: Math.min(5, Math.max(1, rating.teaching || 0)),
        faculty: Math.min(5, Math.max(1, rating.faculty || 0)),
        campus: Math.min(5, Math.max(1, rating.campus || 0)),
        extracurricular: Math.min(5, Math.max(1, rating.extracurricular || 0))
      }));

      setRatings(formattedRatings);
      setError(null);
    } catch (error) {
      console.error("Error fetching ratings:", error);
      setError(error.response?.data?.message || "Failed to load ratings");
    } finally {
      setLoading(false);
    }
  };

  const filteredRatings = ratings.filter(rating =>
    rating.collegeCode?.toLowerCase().includes(filterCollegeCode.toLowerCase())
  );

  const renderStars = (count) => {
    return '⭐'.repeat(Math.max(0, Math.min(5, count)));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>College Ratings</h1>
      
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Filter by college code..."
          value={filterCollegeCode}
          onChange={(e) => setFilterCollegeCode(e.target.value)}
          style={styles.filterInput}
        />
      </div>

      {loading ? (
        <div style={styles.loading}>Loading ratings...</div>
      ) : error ? (
        <div style={styles.error}>
          {error}
          <button onClick={fetchRatings} style={styles.retryButton}>
            Retry
          </button>
        </div>
      ) : filteredRatings.length === 0 ? (
        <div style={styles.message}>
          {filterCollegeCode ? (
            <p>No ratings found for "{filterCollegeCode}"</p>
          ) : (
            <p>No ratings available</p>
          )}
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>College Code</th>
                <th style={styles.th}>Teaching</th>
                <th style={styles.th}>Faculty</th>
                <th style={styles.th}>Campus</th>
                <th style={styles.th}>Extracurricular</th>
                <th style={styles.th}>Comment</th>
              </tr>
            </thead>
            <tbody>
              {filteredRatings.map((rating) => (
                <tr key={rating.id} style={styles.tr}>
                  <td style={styles.td}>{rating.collegeCode}</td>
                  <td style={styles.td}>
                    {rating.teaching} {renderStars(rating.teaching)}
                  </td>
                  <td style={styles.td}>
                    {rating.faculty} {renderStars(rating.faculty)}
                  </td>
                  <td style={styles.td}>
                    {rating.campus} {renderStars(rating.campus)}
                  </td>
                  <td style={styles.td}>
                    {rating.extracurricular} {renderStars(rating.extracurricular)}
                  </td>
                  <td style={styles.td}>{rating.comment || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "30px"
  },
  filterContainer: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center"
  },
  filterInput: {
    padding: "10px",
    width: "300px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px"
  },
  tableContainer: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  th: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #2980b9"
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    verticalAlign: "top"
  },
  tr: {
    "&:hover": {
      backgroundColor: "#f5f5f5"
    }
  },
  loading: {
    textAlign: "center",
    padding: "20px",
    color: "#7f8c8d"
  },
  error: {
    textAlign: "center",
    padding: "20px",
    color: "#e74c3c",
    backgroundColor: "#fdecea",
    borderRadius: "4px",
    margin: "20px 0"
  },
  retryButton: {
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  message: {
    textAlign: "center",
    padding: "20px",
    color: "#7f8c8d"
  }
};

export default RatingsPage;