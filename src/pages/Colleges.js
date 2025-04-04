import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const backendURL = "https://api.lytortech.com/admin/get/colleges";

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = () => {
    axios
      .get(backendURL)
      .then((response) => {
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setColleges(response.data);
        } else if (response.data.colleges) {
          setColleges(response.data.colleges);
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const deleteCollege = async (collegeCode) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this college?");
    if (!confirmDelete) return;

    try {
      console.log(`Sending DELETE request to: http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/delete/college/${collegeCode}`);

      const response = await axios.delete(`https://api.lytortech.com/admin/delete/college/${collegeCode}`);

      if (response.status === 200 || response.status === 204) {
        setColleges(colleges.filter((college) => college.collegeCode !== collegeCode));
        alert("College deleted successfully!");
      } else {
        alert("Failed to delete the college from the database.");
      }
    } catch (error) {
      console.error("Error deleting college:", error);
      alert("Error: Unable to delete the college from the database.");
    }
  };

  const filteredColleges = colleges.filter(college => {
    const searchLower = searchTerm.toLowerCase();
    return (
      college.collegeCode?.toLowerCase().includes(searchLower) ||
      college.name?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Colleges List</h2>
      
      {/* Search Bar - New Addition */}
      <div className="mb-8">  
  <input
    type="text"
    placeholder="Filter by college code or college name..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-400 bg-white"
    style={{
      boxShadow: "none",
      border: "1px solid rgb(159, 159, 163)",
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      borderRadius: "10px",
      width: " 400px",
      marginBottom: "10px"
    }}
  />
</div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">College Code</th>
            <th className="border p-2">College Name</th>
            <th className="border p-2">Admission</th>
            <th className="border p-2">Contacts</th>
            <th className="border p-2">Seat Matrix</th>
            <th className="border p-2">Facilities</th>
            <th className="border p-2">Courses</th>
            <th className="border p-2">Placements</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredColleges.length > 0 ? (
            filteredColleges.map((college) => (
              <tr key={college.collegeCode} className="text-center">
                <td className="border p-2 font-bold">{college.collegeCode || "N/A"}</td>
                <td className="border p-2 font-bold">
                  <Link 
                    to={`/college/${college.collegeCode}`} 
                    state={{ college }} 
                    className="text-blue-500 underline"
                  >
                    {college.name || "N/A"}
                  </Link>
                </td>
                <td className="border p-2">
                  <Link 
                    to={`/admission/${college.collegeCode}`} 
                    state={{ college }} 
                    className="text-blue-500 underline"
                  >
                    View
                  </Link>
                </td>
                <td className="border p-2">
                  <Link 
                    to={`/contacts/${college.collegeCode}`} 
                    state={{ college }} 
                    className="text-blue-500 underline"
                  >
                    View
                  </Link>
                </td>
                <td className="border p-2">
                  <Link 
                    to={`/seatmatrix/${college.collegeCode}`} 
                    state={{ college }} 
                    className="text-blue-500 underline"
                  >
                    View
                  </Link>
                </td>
                <td className="border p-2">
                  <Link 
                    to={`/facilities/${college.collegeCode}`} 
                    state={{ college }} 
                    className="text-blue-500 underline"
                  >
                    View
                  </Link>
                </td>
                <td className="border p-2">
                  <Link 
                    to={`/courses/${college.collegeCode}`} 
                    state={{ college }} 
                    className="text-blue-500 underline"
                  >
                    View
                  </Link>
                </td>
                <td className="border p-2">
                  <Link 
                    to={`/placements/${college.collegeCode}`} 
                    state={{ college }} 
                    className="text-blue-500 underline"
                  >
                    View
                  </Link>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteCollege(college.collegeCode)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="border p-4 text-center">
                {searchTerm ? "No matching colleges found" : "No colleges found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Colleges;