import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { UserService } from "../services/Service";

export default function Dashboard() {
  const [res, setRes] = useState({
    totalEn: 0,
    openEn: 0,
    enrolledEn: 0,
    lostEn: 0,
  });
  
  useEffect(() => {
    const fetchEnquiries = async () => {
      const res = await UserService.getDashboardData();
      setRes(res);
    }
    fetchEnquiries();
  }, []);

  return (
    <>

      <div>
        <Navbar />
      </div>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        {/* Welcome Message */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Welcome to Your Dashboard
        </h1>

        {/* Enquiry Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Total Enquiries */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Enquiries</h2>
            <p className="text-2xl font-bold text-blue-600">{res.totalEn}</p>
          </div>

          {/* Open Enquiries */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Open Enquiries</h2>
            <p className="text-2xl font-bold text-yellow-500">{res.openEn}</p>
          </div>

          {/* Enrolled Enquiries */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Enrolled Enquiries</h2>
            <p className="text-2xl font-bold text-green-500">{res.enrolledEn}</p>
          </div>

          {/* Lost Enquiries */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Lost Enquiries</h2>
            <p className="text-2xl font-bold text-red-500">{res.lostEn}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/add-enquiry">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition">
              Add New Enquiry
            </button>
          </Link>
          <Link to="/all-enquiries">
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition">
              View Enquiries
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
