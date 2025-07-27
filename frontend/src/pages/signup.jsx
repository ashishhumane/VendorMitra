import { useState } from "react"
import { Link, useNavigate } from "react-router"
import axios from 'axios'
const baseURL = import.meta.env.VITE_API_baseURL;

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
  })
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid"
    }

    if (!formData.role) {
      newErrors.role = "Please select a role"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real app, make API call to create account
      console.log("Signup data:", formData)

      // Redirect to login or dashboard
      alert("Account created successfully! Please login.")
    } catch (error) {
      console.error("Signup error:", error)
      alert("Failed to create account. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
    if (validateForm)
      try {
        const res = await axios.post(`${baseURL}/user/create`,
          formData,
          {
            withCredentials: true
          })
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            return res; // optionally return the response
          })
          .catch((err) => {
            console.error("Login failed:", err);
          });
        console.log(res);
        if (response.status === 201) {
          if (response.data.user.role === 'supplier') {
            navigate("/sdashboard");
          } else {
            navigate("/vdashboard");
          }
        }
      } catch (error) {
        console.error(error)
      }
  }



  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border-4 border-orange-200">
        <h2 className="text-3xl font-extrabold text-orange-700 text-center mb-6">🥙 Join VendorMitra Family!</h2>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-orange-700 font-semibold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 transition ${errors.name ? "border-red-300 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
                }`}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-orange-700 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 transition ${errors.email ? "border-red-300 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
                }`}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label className="block text-orange-700 font-semibold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 transition ${errors.phone ? "border-red-300 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
                }`}
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Role Field */}
          <div className="mb-4">
            <label className="block text-orange-700 font-semibold mb-2" htmlFor="role">
              I am a
            </label>
            <select
              className={`w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 transition bg-white ${errors.role ? "border-red-300 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
                }`}
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select your role</option>
              <option value="vendor">🍛 Vendor (Street Food Business)</option>
              <option value="supplier">📦 Supplier (Wholesale Provider)</option>
            </select>
            {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-orange-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 transition ${errors.password ? "border-red-300 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
                }`}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password"
              required
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-orange-700 font-semibold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 transition ${errors.confirmPassword ? "border-red-300 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
                }`}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white font-bold py-2 rounded-full hover:bg-orange-600 disabled:bg-orange-300 transition flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-orange-700">
          Already have an account?{" "}
          <Link to="/login" className="font-bold underline hover:text-pink-600">
            Login here
          </Link>
        </p>

        {/* Terms */}
        <p className="mt-4 text-center text-sm text-orange-600">
          By creating an account, you agree to our{" "}
          <a href="/terms" className="underline hover:text-orange-800">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-orange-800">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}

