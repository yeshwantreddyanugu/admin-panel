import React, { useState } from "react";

const SeatMatrixForm = ({ collegeCode, onSeatMatrixAdded, onBack }) => {
  const [formData, setFormData] = useState({
    collegeCode: collegeCode || "",
    category: "General",
    seatsAvailable: "",
  });

  const [message, setMessage] = useState(""); // State for messages
  const [loading, setLoading] = useState(false); // State for button loading

  const categories = ["General", "SC", "ST", "OBC", "EWS"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear message before submitting

    try {
      const response = await fetch("https://api.lytortech.com/admin/seat-matrix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("✅ Seat Matrix entry added successfully!");
        setFormData({ collegeCode, category: "General", seatsAvailable: "" }); // Reset form
        onSeatMatrixAdded(); // Notify parent to switch form
      } else {
        setMessage("❌ Error adding entry. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Server error. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Seat Matrix</h2>
      {message && <p style={{ color: message.includes("✅") ? "green" : "red" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="collegeCode" value={formData.collegeCode} readOnly />
        <select name="category" value={formData.category} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input type="number" name="seatsAvailable" placeholder="Seats Available" value={formData.seatsAvailable} onChange={handleChange} required />
        
        {/* Button container to ensure same size */}
        <div style={{ display: "flex", gap: "10px" }}>
        <button type="button" onClick={onBack} style={{ flex: 1, padding: "10px", backgroundColor: "gray", color: "white", border: "none", cursor: "pointer" }}>
            Back
          </button>
          <button type="submit" disabled={loading} style={{ flex: 1, padding: "10px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SeatMatrixForm;
