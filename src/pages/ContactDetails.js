import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ContactDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { college } = location.state || {};

  const [contacts, setContacts] = useState({
    collegeCode: college?.collegeCode || "",
    phone: "",
    email: "",
    googleMapsLink: "", // Changed from 'address' to match ContactForm
    address: "" // Keep both if needed
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (college?.collegeCode) {
      fetchContactDetails();
    }
  }, [college]);

  const fetchContactDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.lytortech.com/admin/contacts/${college.collegeCode}`
      );
  
      if (response.data) {
        setContacts({
          collegeCode: college.collegeCode,
          phone: response.data.phone || "",
          email: response.data.email || "",
          googleMapsLink: response.data.googleMapsLink || "",
          address: response.data.address || ""
        });
      } else {
        // Initialize empty form if no data (but response was successful)
        setContacts({
          collegeCode: college.collegeCode,
          phone: "",
          email: "",
          googleMapsLink: "",
          address: ""
        });
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      if (error.response?.status === 404) {
        // College contact doesn't exist yet - initialize empty form
        setContacts({
          collegeCode: college.collegeCode,
          phone: "",
          email: "",
          googleMapsLink: "",
          address: ""
        });
      } else {
        alert("Failed to load contact details. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Use PUT for updates to match your API
      const response = await axios.put(
        "https://api.lytortech.com/admin/update/contact",
        contacts
      );
      
      if (response.status === 200) {
        alert("Contacts saved successfully!");
      }
    } catch (error) {
      console.error("Error saving contacts:", error);
      alert("Failed to save contact details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Details - {college?.name}</h2>
  
      {loading ? (
        <p>⏳ Loading contact details...</p>
      ) : contacts ? (
        <div className="border p-4 rounded shadow">
          <form onSubmit={handleSubmit}>
            {Object.keys(contacts).length > 0 ? (
              <>
                {Object.entries(contacts).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <label className="font-bold block capitalize">{key.replace(/([A-Z])/g, ' $1')}:</label>
                    {key === 'collegeCode' ? (
                      <span className="ml-2 block p-2 bg-gray-100 rounded">{value}</span>
                    ) : (
                      <input
                        type={key === 'email' ? 'email' : 'text'}
                        name={key}
                        value={value || ''}
                        onChange={(e) => setContacts({...contacts, [key]: e.target.value})}
                        className="border p-2 w-full rounded"
                        required={key !== 'googleMapsLink'}
                      />
                    )}
                  </div>
                ))}
              </>
            ) : (
              <p>No contact data available.</p>
            )}
  
            <div className="flex mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>❌ No contact data available.</p>
      )}
    </div>
  );
};

export default ContactDetails;