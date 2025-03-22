import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ContactDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { college } = location.state || {}; // Extract college details from navigation state

  const [contacts, setContacts] = useState({
    collegeCode: college?.collegeCode || "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (college?.collegeCode) {
      fetchContactDetails();
    }
  }, [college]);

  const fetchContactDetails = async () => {
    if (!college?.collegeCode) {
      alert("College code is missing!");
      return;
    }
  
    try {
      const response = await axios.get(`http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/get/contact/${college.collegeCode}`);
  
      if (response.status === 200 && response.data) {
        setContacts(prev => ({
          ...prev,
          ...response.data,
          collegeCode: college.collegeCode, // Ensure collegeCode remains unchanged
        }));
      } else {
        alert("No contact details found for this college.");
      }
    } catch (error) {
      console.error("Error fetching contact details:", error);
      alert("Failed to fetch contact details. Please try again later.");
    }
  };
  

  const handleChange = (e) => {
    setContacts({ ...contacts, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/update/contact", contacts);
      alert("Contact details updated successfully!");
    } catch (error) {
      console.error("Error updating contact details:", error);
      alert("Failed to update contact details.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Contact Details - {college?.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* College Code (Read-Only) */}
        <div>
          <label className="block font-semibold">College Code:</label>
          <input
            type="text"
            name="collegeCode"
            value={contacts.collegeCode}
            className="border p-2 w-full bg-gray-200 cursor-not-allowed"
            readOnly
          />
        </div>
        
        <div>
          <label className="block font-semibold">Phone:</label>
          <input
            type="text"
            name="phone"
            value={contacts.phone}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={contacts.email}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Address:</label>
          <textarea
            name="address"
            value={contacts.address}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save Changes
          </button>
          <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactDetails;
