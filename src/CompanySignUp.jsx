"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Recycle } from "lucide-react"

const CompanySignUp = () => {
  const [selectedRole, setSelectedRole] = useState("company")
  const [formData, setFormData] = useState({
    companyName: "",
    companyRegistrationNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
  })
  const [error, setError] = useState("")
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState("")
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const CORRECT_OTP = "123456" // Simulated correct OTP

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("") // Clear error on change
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    // Instead of registration, show OTP modal
    setShowOtpModal(true)
  }

  const handleOtpChange = (e) => {
    setOtp(e.target.value)
    setOtpError("")
  }

  const handleOtpVerify = (e) => {
    e.preventDefault()
    if (otp === CORRECT_OTP) {
      setShowOtpModal(false)
      setSuccess(true)
      setTimeout(() => {
        navigate("/login")
      }, 1500)
    } else {
      setOtpError("Invalid OTP. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Recycle className="w-6 h-6 text-green-600" />
              <span className="text-xl font-bold text-gray-900">TrashRoute</span>
            </Link>
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-gray-900 font-medium">
                Services
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900 font-medium">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900 font-medium">
                Contact
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-gray-900 font-medium">
                Login
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
          </div>

          {/* Role Selection Tabs */}
          <div className="flex mb-8 bg-gray-200 rounded-lg p-1">
            <Link
              to="/signup"
              className="flex-1 py-2 px-4 rounded-md font-medium transition-colors text-gray-600 hover:text-gray-900 text-center"
            >
              Customer
            </Link>
            <button
              type="button"
              className="flex-1 py-2 px-4 rounded-md font-medium transition-colors bg-white text-gray-900 shadow-sm"
            >
              Company
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center mb-2">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-600 text-sm mb-2 text-center font-semibold">Successfully registered!</div>
            )}

            {/* Company Name Field */}
            <div>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                className="w-full px-4 py-3 bg-blue-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            {/* Company Registration Number Field */}
            <div>
              <input
                id="companyRegistrationNumber"
                name="companyRegistrationNumber"
                type="text"
                required
                className="w-full px-4 py-3 bg-blue-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                placeholder="Company Registration Number"
                value={formData.companyRegistrationNumber}
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-blue-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-blue-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full px-4 py-3 bg-blue-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Address Field */}
            <div>
              <input
                id="address"
                name="address"
                type="text"
                required
                className="w-full px-4 py-3 bg-blue-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                className="w-full px-4 py-3 bg-blue-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 mt-6"
            >
              Register
            </button>

            {/* Login Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600 text-sm">Already have an account? </span>
              <Link to="/login" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Login
              </Link>
            </div>
          </form>

          {/* OTP Modal */}
          {showOtpModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative">
                <h2 className="text-xl font-bold mb-4 text-center">OTP Verification</h2>
                <p className="mb-2 text-gray-700 text-center">Enter the OTP sent to your email/phone.</p>
                <form onSubmit={handleOtpVerify} className="space-y-4">
                  <input
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    maxLength={6}
                    className="w-full px-4 py-3 bg-blue-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors text-center tracking-widest text-lg"
                    placeholder="Enter OTP"
                    autoFocus
                  />
                  {otpError && <div className="text-red-600 text-sm text-center">{otpError}</div>}
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Verify OTP
                  </button>
                  <button
                    type="button"
                    className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
                    onClick={() => setShowOtpModal(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompanySignUp
