import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserService } from "../services/Service";

function EditEnquiry() {
    const { eid } = useParams(); // Get enquiry ID from URL params

    const navigate = useNavigate();

    // ✅ Ensure `formData` has default values to avoid "uncontrolled input" warnings
    const [formData, setFormData] = useState({
        eid: 0,
        ename: "",
        phno: "",
        classMode: "",
        course: "",
        status: "",
    });

    const [response, setResponse] = useState("");

    // ✅ Fetch enquiry data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await UserService.getEnquiryById(eid);
                setFormData({...res, eid}); // ✅ Set form data with API response
                console.log("Enquiry Data:", res);
            } catch (error) {
                console.error("Error fetching enquiry data:", error);
            }
        };

        if (eid) fetchData(); // ✅ Only fetch if eid is present
    }, [eid]);

    // ✅ Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);

        // Simulate API call or handle submission logic
        try {
            console.log("formData before update:", formData);
            const res = await UserService.updateEnquiry(formData);
            setResponse(res);
        } catch (error) {
            setResponse("Error updating enquiry!");
        }

        // Reset form after submission
        setTimeout(() => {
            setResponse(""); // Clear success message after 2 seconds
            navigate("/all-enquiries"); // Redirect to all enquiries page
        }, 1000);
    };

    return (
        <>
            <div className="fixed top-0 w-full z-50">
                <Navbar />
            </div>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-32">
                <h2 className="text-2xl font-bold mb-4 text-center">Edit Enquiry</h2>
                <span className="text-green-500">{response}</span>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            name="ename"
                            value={formData.ename} // ✅ Fixed incorrect key
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
                        >
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
                        >
                            <option value="Web Development">Web Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="React JS">React JS</option>
                            <option value="Angular JS">Angular JS</option>
                            <option value="Python Full Stack">Python Full Stack</option>
                            <option value="Java Full Stack">Java Full Stack</option>
                            <option value="Oracle">Oracle</option>
                            <option value="MySQL">MySQL</option>
                            <option value="DSA with Java">DSA with Java</option>
                            <option value="Spring Boot Microservices">Spring Boot Microservices</option>
                            <option value="DevOps">DevOps</option>
                            <option value="Testing">Testing</option>
                            <option value="AWS">AWS</option>
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
                        >
                            <option value="Open">Open</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Lost">Lost</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Save
                    </button>
                </form>

                {/* View All Enquiries Button */}
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

export default EditEnquiry;
