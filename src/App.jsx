import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './Login.jsx'
import LoginCompany from './LoginCompany.jsx'
import CustomerSignUp from './CustomerSignUp.jsx'
import CompanySignUp from './CompanySignUp.jsx'
import CustomerTrashType from './customer/CustomerTrashType.jsx'
import CustomerLocationPin from './customer/CustomerLocationPin.jsx'
import CustomerPickupSummary from './customer/CustomerPickupSummary.jsx'
import CustomerTrackPickup from './customer/CustomerTrackPickup.jsx'
import CompanyWastePrefer from './company/CompanyWastePrefer.jsx'
import RouteActivation from './company/RouteAccess.jsx'
import RouteMap from './company/RouteMap.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import ManageCustomers from './admin/ManageCustomers.jsx'
import ManageCompanies from './admin/ManageCompanies.jsx'
import ReportsAnalytics from './admin/Reports.jsx'
import FeedbackRatings from './admin/Feedback.jsx'
import PickupRequests from './admin/Requests.jsx'

function HomePage() {
  const [userType, setUserType] = useState('customer')
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideCount = 4
  const sliderRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (idx) => setCurrentSlide(idx)

  // Unsplash or similar royalty-free images
  const heroImg = 'https://images.unsplash.com/photo-1508873699372-7aeab60b44c9?auto=format&fit=crop&w=900&q=80' // recycling bins
  const howItWorksImgs = [
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', // trash notification
    'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80', // garbage truck
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', // industry
    'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80', // truck accept
  ]

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col">
      {/* Navigation */}
      <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          <div className="flex items-center">
            <img src="/images/trashroutelogo.jpg" alt="TrashRoute Logo" className="h-10 w-auto" />
     
          </div>
          <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <a href="#about" className="hover:text-green-600">About</a>
            <a href="#services" className="hover:text-green-600">Services</a>
            <a href="#contact" className="hover:text-green-600">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex justify-center mt-10">
        <div className="w-full max-w-4xl rounded-2xl overflow-hidden relative" style={{background:'#cfe3d6'}}>
          <video
            src="/homevedio.mp4"
            className="w-full h-80 object-cover object-center opacity-80"
            autoPlay
            loop
            muted
            playsInline
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-black text-3xl md:text-5xl font-extrabold drop-shadow-lg">Revolutionizing Waste Management</h1>
            <p className="text-black text-base md:text-lg mt-2 mb-6 drop-shadow">Connecting households with responsible waste processing companies for a cleaner, greener future.</p>
            <div className="flex gap-4">
              <button
                onClick={() => { setUserType('customer'); navigate('/login'); }}
                className={`px-6 py-2 rounded-full font-semibold text-white ${userType==='customer' ? 'bg-blue-600' : 'bg-white text-gray-800'} shadow transition`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setUserType('company'); navigate('/signup'); }}
                className="px-6 py-2 rounded-full font-semibold text-black bg-white border border-blue-700 shadow transition"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto mt-16 px-4">
        <h2 className="text-xl font-bold mb-6">How It Works</h2>
        <div className="overflow-hidden relative w-[540px] mx-auto">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${currentSlide * 540}px)` }}
          >
            <div className="bg-white rounded-xl p-6 flex flex-col items-center shadow hover:shadow-md transition min-w-[540px] h-[420px]">
              <img src={howItWorksImgs[0]} alt="Notify Trash" className="h-60 w-full object-cover rounded mb-3" />
              <div className="font-semibold mb-1">Notify Trash Availability</div>
              <div className="text-gray-500 text-sm text-center">Local users inform the system about available recyclable materials.</div>
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col items-center shadow hover:shadow-md transition min-w-[540px] h-[420px]">
              <img src={howItWorksImgs[1]} alt="Route Optimization" className="h-60 w-full object-cover rounded mb-3" />
              <div className="font-semibold mb-1">Route Optimization</div>
              <div className="text-gray-500 text-sm text-center">TrashRoute analyzes and creates categorized, optimized pickup routes.</div>
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col items-center shadow hover:shadow-md transition min-w-[540px] h-[420px]">
              <img src={howItWorksImgs[2]} alt="Notify Industries" className="h-60 w-full object-cover rounded mb-3" />
              <div className="font-semibold mb-1">Notify Industries</div>
              <div className="text-gray-500 text-sm text-center">Registered companies are notified with detailed route and material info.</div>
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col items-center shadow hover:shadow-md transition min-w-[540px] h-[420px]">
              <img src={howItWorksImgs[3]} alt="Industry Accepts Route" className="h-60 w-full object-cover rounded mb-3" />
              <div className="font-semibold mb-1">Industry Accepts Route</div>
              <div className="text-gray-500 text-sm text-center">Companies select and confirm routes they want to handle.</div>
            </div>
          </div>
          <div className="flex justify-center mt-4 gap-2">
            {[...Array(slideCount)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full border border-gray-400 ${currentSlide === idx ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="max-w-7xl mx-auto mt-16 px-4">
        <h2 className="text-lg font-bold mb-2">About Us</h2>
        <p className="text-gray-700">TrashRoute is an innovative web-based platform built to improve how recyclable waste is managed and reused. We connect everyday people who have recyclable materials—like plastic, paper, glass, and metal—with industries that can reuse those materials in their production.<br></br>

        Instead of collecting and storing waste, our system allows local users to simply notify the platform when they have recyclable items. TrashRoute then creates an optimized and categorized route for these materials and offers it to registered industries. When an industry accepts a route, they collect the materials directly from the listed locations.<br></br>

        By removing the need for middle collection points, we reduce costs, save time, and contribute to a cleaner environment. TrashRoute empowers communities and industries to work together toward a sustainable future—turning everyday waste into valuable resources.</p>
      </section>

      {/* Our Features */}
      <section className="max-w-7xl mx-auto mt-16 px-4">
        <h2 className="text-lg font-bold mb-6">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border flex flex-col items-start">
            <div className="flex items-center mb-3">
              <span className="material-icons text-2xl mr-2">category</span>
              <span className="font-semibold">Smart Waste Categorization</span>
            </div>
            <div className="text-gray-500 text-sm">Our system intelligently categorizes waste to ensure proper handling and recycling.</div>
          </div>
          <div className="bg-white rounded-xl p-6 border flex flex-col items-start">
            <div className="flex items-center mb-3">
              <span className="material-icons text-2xl mr-2">local_shipping</span>
              <span className="font-semibold">Efficient Pickup Service</span>
            </div>
            <div className="text-gray-500 text-sm">We provide a reliable and efficient pickup service, optimizing routes for timely collection.</div>
          </div>
          <div className="bg-white rounded-xl p-6 border flex flex-col items-start">
            <div className="flex items-center mb-3">
              <span className="material-icons text-2xl mr-2">location_on</span>
              <span className="font-semibold">Real-time Tracking</span>
            </div>
            <div className="text-gray-500 text-sm">Track your waste pickup in real-time, from notification to collection.</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 bg-white border-t py-8 text-gray-500">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
            <a href="#contact" className="hover:text-gray-900">Contact Us</a>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 8.99 4.07 7.13 1.64 4.15c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6a4.28 4.28 0 0 1-1.94-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 24 4.59a8.5 8.5 0 0 1-2.54.7z"/></svg></a>
            <a href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.24 8.93.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.23-3.23-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.23 0 4.64-2.8 5.67-5.48 5.97.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C18.36 20.07 22 16.41 22 12c0-5.5-4.46-9.96-9.96-9.96z"/></svg></a>
            <a href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.54 7.2c-.13-.48-.52-.87-1-.99C19.13 6 12 6 12 6s-7.13 0-8.54.21c-.48.12-.87.51-1 .99C2 8.63 2 12 2 12s0 3.37.46 4.8c.13.48.52.87 1 .99C4.87 18 12 18 12 18s7.13 0 8.54-.21c.48-.12.87-.51 1-.99C22 15.37 22 12 22 12s0-3.37-.46-4.8zM10 15.5v-7l6 3.5-6 3.5z"/></svg></a>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-4">@2024 TrashRoute. All rights reserved.</div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-company" element={<LoginCompany />} />
      <Route path="/signup" element={<CustomerSignUp />} />
      <Route path="/company-signup" element={<CompanySignUp />} />
      <Route path="/customer/trash-type" element={<CustomerTrashType />} />
      <Route path="/customer/location-pin" element={<CustomerLocationPin />} />
      <Route path="/customer/pickup-summary" element={<CustomerPickupSummary />} />
      <Route path="/customer/track-pickup" element={<CustomerTrackPickup />} />
      <Route path="/company-waste-prefer" element={<CompanyWastePrefer />} />
      <Route path="/company/route-access" element={<RouteActivation />} />
      <Route path="/company/route-map" element={<RouteMap />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<ManageCustomers />} />
      <Route path="/admin/companies" element={<ManageCompanies />} />
      <Route path="/admin/requests" element={<PickupRequests />} />
      <Route path="/admin/feedback" element={<FeedbackRatings />} />
      <Route path="/admin/reports" element={<ReportsAnalytics />} />
    </Routes>
  )
}

export default App
