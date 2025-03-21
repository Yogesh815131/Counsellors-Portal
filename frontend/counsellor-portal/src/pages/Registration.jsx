import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Import Link if using React Router
import Navbar from "../components/Navbar";
import { UserService } from "../services/Service";

export default function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phno: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const registerUser = async() => {
    const res = await UserService.register(formData);
    setInterval(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Register
          </h2>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring focus:ring-blue-300 outline-none"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring focus:ring-blue-300 outline-none"
                placeholder="johndoe@example.com"
              />
            </div>

            {/* Password Field with Toggle */}
            <div className="relative">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring focus:ring-blue-300 outline-none pr-10"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                name="phno"
                value={formData.phno}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring focus:ring-blue-300 outline-none"
                placeholder="+1234567890"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
              onClick={registerUser}
            >
              Register
            </button>
          </form>

          {/* Register Here Link */}
          <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
