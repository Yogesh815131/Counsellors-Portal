import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { UserService } from "../services/Service";
import { Link } from "react-router-dom";

function ViewEnquiries() {
    // Sample data - replace with your actual data source
    const [enquiries, setEnquiries] = useState([
        // Add more sample data as needed
    ]);

    useEffect(() => {
        // Fetch data from your API or database here
        const fetchData = async () =>{
            const res = await UserService.getAllEnquiries();
            setEnquiries(res);
            console.log("Enquiries Data:", res);
        }
        fetchData();
    }, []);

    // Filter states
    const [filters, setFilters] = useState({
        classMode: "all",
        course: "all",
        status: "all"
    });

    // Handle filter changes
    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    // Filter the enquiries
    const filteredEnquiries = enquiries.filter(enquiry => {
        return (filters.classMode === "all" || enquiry.classMode === filters.classMode) &&
            (filters.course === "all" || enquiry.course === filters.course) &&
            (filters.status === "all" || enquiry.status === filters.status);
    });


    return (
        <>
            <div>
                <div className="fixed top-0 w-full z-50">
                    <Navbar />
                </div>
                {enquiries.length !== 0 &&
                    <div className="container mx-auto mt-32 p-6">
                        <h2 className="text-2xl font-bold mb-6 text-center">All Enquiries</h2>

                        {/* Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {/* Class Mode Filter */}
                            <select
                                name="classMode"
                                value={filters.classMode}
                                onChange={handleFilterChange}
                                className="p-2 border rounded-lg focus:ring focus:ring-blue-300"
                            >
                                <option value="all">All Class Modes</option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                            </select>

                            {/* Course Filter */}
                            <select
                                name="course"
                                value={filters.course}
                                onChange={handleFilterChange}
                                className="p-2 border rounded-lg focus:ring focus:ring-blue-300"
                            >
                                <option value="all">All Courses</option>
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

                            {/* Status Filter */}
                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className="p-2 border rounded-lg focus:ring focus:ring-blue-300"
                            >
                                <option value="all">All Status</option>
                                <option value="Opne">Open</option>
                                <option value="Enrolled">Enrolled</option>
                                <option value="Lost">Lost</option>
                            </select>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-gray-700">Name</th>
                                        <th className="px-6 py-3 text-left text-gray-700">Phone Number</th>
                                        <th className="px-6 py-3 text-left text-gray-700">Course</th>
                                        <th className="px-6 py-3 text-left text-gray-700">Class Mode</th>
                                        <th className="px-6 py-3 text-left text-gray-700">Status</th>
                                        <th className="px-6 py-3 text-left text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEnquiries.map((enquiry) => (
                                        <tr key={enquiry.eid} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-4">{enquiry.ename}</td>
                                            <td className="px-6 py-4">{enquiry.phno}</td>
                                            <td className="px-6 py-4">{enquiry.course}</td>
                                            <td className="px-6 py-4">{enquiry.classMode}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-sm ${enquiry.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                                    enquiry.status === 'Enrolled' ? 'bg-green-100 text-green-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {enquiry.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link to = {`/edit-enquiry/${enquiry.eid}`}
                                                    className="text-blue-600 hover:text-blue-800">
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                {enquiries.length === 0 &&
                    <div className="container mx-auto mt-32 p-6">
                        <h2 className="text-2xl font-bold mb-6 text-center">No Enquiries Found</h2>
                    </div>
                }

            </div>

        </>
    );
}

export default ViewEnquiries;
