import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { UserService } from "../services/Service";

function AddEnquiry() {
    const [response, setResponse] = useState("");
    
    const [formData, setFormData] = useState({
        name: "",
        phno: "",
        classMode: "",
        course: "",
        status: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        const res = await UserService.addEnquiry(formData);
        setResponse(res.data);
        console.log("Add Enquiry Response:", res.data);
        setFormData({
            name: "",
            phno: "",
            classMode: "",
            course: "",
            status: "",
        });
        handleResponse();
    };

    const handleResponse = () => {
        setInterval(() => {
            setResponse("");
        }, 2000);
    };

    return (
        <>
            <div className="fixed top-0 w-full z-50">
                <Navbar />
            </div>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-32">
                <h2 className="text-2xl font-bold mb-4 text-center">Add Enquiry</h2>
                <span className="text-green-500">{response}</span>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-gray-700 font-medium">Phone Number</label>
                        <input
                            type="tel"
                            name="phno"
                            value={formData.phno}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Class Mode */}
                    <div>
                        <label className="block text-gray-700 font-medium">Class Mode</label>
                        <select
                            name="classMode"
                            value={formData.classMode}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                            required
                        >
                            <option value="">Select Class Mode</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>

                    {/* Course */}
                    <div>
                        <label className="block text-gray-700 font-medium">Course</label>
                        <select
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                            required
                        >
                            <option value="">Select Course</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Graphic Design">React JS</option>
                            <option value="Graphic Design">Angular JS</option>
                            <option value="Graphic Design">Python Full Stack</option>
                            <option value="Graphic Design">Java Full Stack</option>
                            <option value="Graphic Design">Oracle</option>
                            <option value="Graphic Design">MySQL</option>
                            <option value="Graphic Design">DSA with Java</option>
                            <option value="Graphic Design">Spring boot Micreservises</option>
                            <option value="Graphic Design">DevOps</option>
                            <option value="Graphic Design">Testing</option>
                            <option value="Graphic Design">AWS</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-gray-700 font-medium">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Open">Open</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Lost">Lost</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Save
                    </button>
                </form>
                {/* Updated View All Enquiries Button using Link */}
                <Link 
                    to="/all-enquiries"
                    className="block w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition text-center"
                >
                    View All Enquiries
                </Link>
            </div>
        </>
    );
}

export default AddEnquiry;
