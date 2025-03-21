import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Import Link if using React Router
import Navbar from "../components/Navbar";
import { UserService } from "../services/Service";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data Submitted:", formData);
    const res = await UserService.login(formData);
    console.log("Login Response:", res);
    sessionStorage.setItem("isLoggedIn", res.counsellorDetails.cid);
    sessionStorage.setItem("isLogin", "true");
    navigate("/home"); // Redirect to home page
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Login
          </h2>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Register Here Link */}
          <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>

  );
}
