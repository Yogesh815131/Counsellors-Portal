import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") > 0
  );

  const navigate = useNavigate(); // Redirect after logout

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            MyBrand
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Home
            </Link>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              About
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Services
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Contact
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-800" />}
            </button>

            {/* Login / Logout Button */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition">
                  Login
                </button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-800 dark:text-gray-300 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 p-4 space-y-2">
          <Link to="/" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">
            Home
          </Link>
          <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">
            About
          </a>
          <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">
            Services
          </a>
          <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">
            Contact
          </a>

          {/* Mobile Login / Logout Button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
