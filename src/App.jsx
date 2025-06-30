import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './Login.jsx'
import LoginCompany from './LoginCompany.jsx'
import CustomerSignUp from './CustomerSignUp.jsx'
import CompanySignUp from './CompanySignUp.jsx'
import CustomerTrashType from './customer/CustomerTrashType.jsx'
import CustomerLocationPin from './customer/CustomerLocationPin.jsx'
import CustomerPickupSummary from './customer/CustomerPickupSummary.jsx'
import CompanyWastePrefer from './company/CompanyWastePrefer.jsx'
import RouteActivation from './company/RouteAccess.jsx'
import RouteMap from './company/RouteMap.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import ManageCustomers from './admin/ManageCustomers.jsx'
import ManageCompanies from './admin/ManageCompanies.jsx'
import ReportsAnalytics from './admin/Reports.jsx'
import FeedbackRatings from './admin/Feedback.jsx'
import PickupRequests from './admin/Requests.jsx'

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const circleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percent = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(percent);
      setVisible(scrollTop > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle progress
  const size = 56;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <button
      onClick={handleClick}
      className={fixed z-50 bottom-8 right-8 w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-lg border-2 border-[#3a5f46] transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}}
      aria-label="Scroll to top"
      style={{ outline: 'none' }}
    >
      <svg width={size} height={size} className="absolute top-0 left-0" style={{ pointerEvents: 'none' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3a5f46"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.2s linear' }}
        />
      </svg>
      <span className="relative z-10 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3a5f46" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
          <path d="M12 19V5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </span>
    </button>
  );
}

function HomePage() {
  const [userType, setUserType] = useState('customer')
  const [showFeature1Info, setShowFeature1Info] = useState(false)
  const [showFeature2Info, setShowFeature2Info] = useState(false)
  const [showFeature3Info, setShowFeature3Info] = useState(false)
  const [showFeature4Info, setShowFeature4Info] = useState(false)
  const navigate = useNavigate()

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
          <div className="flex items-center space-x-2">
            <img src="/public/images/logo.png" alt="Logo" className="h-16 w-34" />
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
          <div className="flex justify-center w-full">
            <video
              src="/homevedio.mp4"
              className="w-full max-w-5xl h-80 object-cover object-center opacity-85"
              autoPlay
              loop
              muted
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-[#2e4d3a] text-3xl md:text-5xl font-extrabold drop-shadow-lg">Revolutionizing Waste Management</h1>
            <p className="text-black text-base md:text-lg mt-2 mb-6 drop-shadow">Connecting households with responsible waste processing companies for a cleaner, greener future.</p>
            <div className="flex gap-4">
              <button
                onClick={() => { setUserType('customer'); navigate('/login'); }}
                className={px-6 py-2 rounded-full font-semibold text-white ${userType==='customer' ? 'bg-blue-600' : 'bg-white text-gray-800'} shadow transition}
              >
                Sign In
              </button>
              <button
                onClick={() => { setUserType('company'); navigate('/signup'); }}
                className="px-6 py-2 rounded-full font-semibold text-white bg-blue-600 shadow transition"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto mt-16 px-4">
        <h2 className="text-xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Feature 1: Notify Trash Availability */}
          <div className="group bg-white rounded-xl p-0 flex flex-col items-center shadow transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden hover:bg-[#3a5f46]" style={{ minHeight: '270px', height: '270px' }}>
            <div className="w-full flex-shrink-0" style={{ height: '75%' }}>
              <img src="/public/images/feature1.jpg" alt="Notify Trash" className="w-full h-full object-cover object-center rounded-t-xl" />
            </div>
            <div className="flex flex-col items-center w-full justify-center flex-grow" style={{ height: '25%' }}>
              <div className="font-semibold text-[#618170] text-base drop-shadow mb-1">Notify Trash Availability</div>
              <button
                className="flex items-center gap-2 px-3 py-1 bg-[#3a5f46] text-white font-semibold rounded-full shadow transition group-hover:bg-[#2e4d3a] group/button mx-auto text-sm"
                onClick={() => setShowFeature1Info(true)}
              >
                Explore
                <span className="inline-block transition-transform duration-300 group-hover/button:translate-x-2 group-hover/button:drop-shadow-glow">➡</span>
              </button>
            </div>
          </div>
          {/* Feature 2: Route Optimization */}
          <div className="group bg-white rounded-xl p-0 flex flex-col items-center shadow transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden hover:bg-[#3a5f46]" style={{ minHeight: '270px', height: '270px' }}>
            <div className="w-full flex-shrink-0" style={{ height: '75%' }}>
              <img src="/public/images/feature2.jpg" alt="Route Optimization" className="w-full h-full object-cover object-center rounded-t-xl" />
            </div>
            <div className="flex flex-col items-center w-full justify-center flex-grow" style={{ height: '25%' }}>
              <div className="font-semibold text-[#618170] text-base drop-shadow mb-1">Route Optimization</div>
              <button
                className="flex items-center gap-2 px-3 py-1 bg-[#3a5f46] text-white font-semibold rounded-full shadow transition group-hover:bg-[#2e4d3a] group/button mx-auto text-sm"
                onClick={() => setShowFeature2Info(true)}
              >
                Explore
                <span className="inline-block transition-transform duration-300 group-hover/button:translate-x-2 group-hover/button:drop-shadow-glow">➡</span>
              </button>
            </div>
          </div>
          {/* Feature 3: Notify Industries */}
          <div className="group bg-white rounded-xl p-0 flex flex-col items-center shadow transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden hover:bg-[#3a5f46]" style={{ minHeight: '270px', height: '270px' }}>
            <div className="w-full flex-shrink-0" style={{ height: '75%' }}>
              <img src="/public/images/feature3.jpg" alt="Notify Industries" className="w-full h-full object-cover object-center rounded-t-xl" />
            </div>
            <div className="flex flex-col items-center w-full justify-center flex-grow" style={{ height: '25%' }}>
              <div className="font-semibold text-[#618170] text-base drop-shadow mb-1">Notify Industries</div>
              <button
                className="flex items-center gap-2 px-3 py-1 bg-[#3a5f46] text-white font-semibold rounded-full shadow transition group-hover:bg-[#2e4d3a] group/button mx-auto text-sm"
                onClick={() => setShowFeature3Info(true)}
              >
                Explore
                <span className="inline-block transition-transform duration-300 group-hover/button:translate-x-2 group-hover/button:drop-shadow-glow">➡</span>
              </button>
            </div>
          </div>
          {/* Feature 4: Industry Accepts Route */}
          <div className="group bg-white rounded-xl p-0 flex flex-col items-center shadow transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden hover:bg-[#3a5f46]" style={{ minHeight: '270px', height: '270px' }}>
            <div className="w-full flex-shrink-0" style={{ height: '75%' }}>
              <img src="/public/images/feature4.jpg" alt="Industry Accepts Route" className="w-full h-full object-cover object-center rounded-t-xl" />
            </div>
            <div className="flex flex-col items-center w-full justify-center flex-grow" style={{ height: '25%' }}>
              <div className="font-semibold text-[#618170] text-base drop-shadow mb-1">Industry Accepts Route</div>
              <button
                className="flex items-center gap-2 px-3 py-1 bg-[#3a5f46] text-white font-semibold rounded-full shadow transition group-hover:bg-[#2e4d3a] group/button mx-auto text-sm"
                onClick={() => setShowFeature4Info(true)}
              >
                Explore
                <span className="inline-block transition-transform duration-300 group-hover/button:translate-x-2 group-hover/button:drop-shadow-glow">➡</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modals for each feature, rendered outside the cards to prevent blinking/collapse */}
        {showFeature1Info && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative group bg-[#3a5f46] rounded-xl p-0 flex flex-col items-center shadow-2xl overflow-hidden" style={{ minHeight: '270px', width: '100%', maxWidth: '320px' }}>
              <button
                className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-black"
                onClick={() => setShowFeature1Info(false)}
              >
                &times;
              </button>
              <div className="text-white font-bold text-lg mb-2 mt-8">Notify Trash Availability</div>
              <div className="text-white text-base text-center px-4">Local users inform the system about available recyclable materials.</div>
            </div>
          </div>
        )}
        {showFeature2Info && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative group bg-[#3a5f46] rounded-xl p-0 flex flex-col items-center shadow-2xl overflow-hidden" style={{ minHeight: '270px', width: '100%', maxWidth: '320px' }}>
              <button
                className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-black"
                onClick={() => setShowFeature2Info(false)}
              >
                &times;
              </button>
              <div className="text-white font-bold text-lg mb-2 mt-8">Route Optimization</div>
              <div className="text-white text-base text-center px-4">TrashRoute analyzes and creates categorized, optimized pickup routes.</div>
            </div>
          </div>
        )}
        {showFeature3Info && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative group bg-[#3a5f46] rounded-xl p-0 flex flex-col items-center shadow-2xl overflow-hidden" style={{ minHeight: '270px', width: '100%', maxWidth: '320px' }}>
              <button
                className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-black"
                onClick={() => setShowFeature3Info(false)}
              >
                &times;
              </button>
              <div className="text-white font-bold text-lg mb-2 mt-8">Notify Industries</div>
              <div className="text-white text-base text-center px-4">Registered companies are notified with detailed route and material info.</div>
            </div>
          </div>
        )}
        {showFeature4Info && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative group bg-[#3a5f46] rounded-xl p-0 flex flex-col items-center shadow-2xl overflow-hidden" style={{ minHeight: '270px', width: '100%', maxWidth: '320px' }}>
              <button
                className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-black"
                onClick={() => setShowFeature4Info(false)}
              >
                &times;
              </button>
              <div className="text-white font-bold text-lg mb-2 mt-8">Industry Accepts Route</div>
              <div className="text-white text-base text-center px-4">Companies select and confirm routes they want to handle.</div>
            </div>
          </div>
        )}
      </section>

      {/* About Us */}
      <section id="about" className="max-w-4xl mx-auto mt-16 px-4">
        <h2 className="text-lg font-bold mb-2">About Us</h2>
        <p className="text-gray-700">TrashRoute is a platform dedicated to improving waste management by connecting households with waste processing companies. Our goal is to create a more efficient and sustainable system for waste disposal and recycling.</p>
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
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#contact" className="footer-link">Contact Us</a>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="social-blink"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 8.99 4.07 7.13 1.64 4.15c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6a4.28 4.28 0 0 1-1.94-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 24 4.59a8.5 8.5 0 0 1-2.54.7z"/></svg></a>
            <a href="#" className="social-blink"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.24 8.93.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.23-3.23-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.23 0 4.64-2.8 5.67-5.48 5.97.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C18.36 20.07 22 16.41 22 12c0-5.5-4.46-9.96-9.96-9.96z"/></svg></a>
            <a href="#" className="social-blink"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.54 7.2c-.13-.48-.52-.87-1-.99C19.13 6 12 6 12 6s-7.13 0-8.54.21c-.48.12-.87.51-1 .99C2 8.63 2 12 2 12s0 3.37.46 4.8c.13.48.52.87 1 .99C4.87 18 12 18 12 18s7.13 0 8.54-.21c.48-.12.87-.51 1-.99C22 15.37 22 12 22 12s0-3.37-.46-4.8zM10 15.5v-7l6 3.5-6 3.5z"/></svg></a>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-4">@2024 TrashRoute. All rights reserved.</div>
      </footer>
      <ScrollToTopButton />
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