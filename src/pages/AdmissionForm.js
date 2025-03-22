import { useState } from "react";
import ContactForm from "./ContactForm";

export default function AdmissionForm({ collegeCode, onAdmissionAdded, onBack }) {
    const [formData, setFormData] = useState({
        collegeCode: collegeCode || "", 
        criteria: "EAMCET",
        cutoffRank: "",
        roundNumber: "",
        managementFees: ""
    });
    
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://collegeproject-env.eba-ybgbtz3k.ap-south-1.elasticbeanstalk.com/admin/admissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Admission data submitted successfully!");
                setIsSubmitted(true);
            } else {
                alert("Failed to submit admission data");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    if (isSubmitted) {
        return <ContactForm collegeCode={collegeCode} />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4 text-center">Admission Form</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">College Code:</label>
                    <input type="text" name="collegeCode" value={formData.collegeCode} className="w-full p-2 border rounded mb-3" disabled />
                    
                    <label className="block mb-2">Criteria:</label>
                    <select name="criteria" value={formData.criteria} onChange={handleChange} className="w-full p-2 border rounded mb-3">
                        <option value="EAMCET">EAMCET</option>
                        <option value="Management Quota">Management Quota</option>
                    </select>
                    
                    <label className="block mb-2">Cutoff Rank:</label>
                    <input type="number" name="cutoffRank" value={formData.cutoffRank} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
                    
                    <label className="block mb-2">Round Number:</label>
                    <input type="number" name="roundNumber" value={formData.roundNumber} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
                    
                    <label className="block mb-2">Management Fees:</label>
                    <input type="number" name="managementFees" value={formData.managementFees} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
                    
                    <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                    <button type="button" onClick={onBack} style={{ flex: 1, padding: "10px", backgroundColor: "gray", color: "white", border: "none", cursor: "pointer" }}>Back</button>
                        <button type="submit" style={{ flex: 1, padding: "10px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}>Submit</button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
    
}
