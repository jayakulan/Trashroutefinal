import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Recycle, Bell, Minus, Plus } from "lucide-react"

const RequestPickup = () => {
  const [wasteTypes, setWasteTypes] = useState({
    plastics: { quantity: 3, selected: true },
    paper: { quantity: 3, selected: true },
    glass: { quantity: 3, selected: true },
    metals: { quantity: 3, selected: true },
  })

  const navigate = useNavigate()

  const updateQuantity = (type, newQuantity) => {
    if (newQuantity >= 0 && newQuantity <= 50) {
      setWasteTypes((prev) => ({
        ...prev,
        [type]: { ...prev[type], quantity: newQuantity },
      }))
    }
  }

  const handleSliderChange = (type, value) => {
    updateQuantity(type, Number.parseInt(value))
  }

  const wasteTypeData = [
    {
      id: "plastics",
      name: "Plastics",
      emoji: "🧴",
      description: "Plastic bottles, containers, and packaging",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
        </div>
      ),
    },
    {
      id: "paper",
      name: "Paper",
      emoji: "📄",
      description: "Newspapers, magazines, cardboard, and paper packaging",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600">
            <path
              fill="currentColor"
              d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
            />
          </svg>
        </div>
      ),
    },
    {
      id: "glass",
      name: "Glass",
      emoji: "🫙",
      description: "Glass bottles and jars",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
        </div>
      ),
    },
    {
      id: "metals",
      name: "Metals",
      emoji: "🥫",
      description: "Aluminum and steel cans",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Recycle className="w-6 h-6 text-green-600" />
              <span className="text-xl font-bold text-gray-900">TrashRoute</span>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link to="/request-pickup" className="text-blue-600 font-medium">
                Request Pickup
              </Link>
              <Link to="/track-pickup" className="text-gray-700 hover:text-gray-900 font-medium">
                Track Pickup
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <img
                  src="https://via.placeholder.com/32"
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/request-pickup" className="text-blue-600 hover:text-blue-700">
            Request Pickup
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Select Waste Types</span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">Step 1 of 3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "33.33%" }}></div>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Select Waste Types</h1>
          <p className="text-gray-600 text-lg">
            Choose the types of waste you want to have picked up and indicate the approximate quantity for each.
          </p>
        </div>

        {/* Recyclables Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recyclables</h2>

          <div className="space-y-6">
            {wasteTypeData.map((wasteType) => (
              <div key={wasteType.id} className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Waste Type Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {wasteType.icon}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900">{wasteType.name}</h3>
                        <span className="text-lg">{wasteType.emoji}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{wasteType.description}</p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(wasteType.id, wasteTypes[wasteType.id].quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-semibold text-gray-900 w-8 text-center">
                      {wasteTypes[wasteType.id].quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(wasteType.id, wasteTypes[wasteType.id].quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Quantity Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Quantity (kg)</span>
                    <span className="text-sm font-semibold text-gray-900">{wasteTypes[wasteType.id].quantity}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={wasteTypes[wasteType.id].quantity}
                      onChange={(e) => handleSliderChange(wasteType.id, e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(wasteTypes[wasteType.id].quantity / 50) * 100}%, #e5e7eb ${(wasteTypes[wasteType.id].quantity / 50) * 100}%, #e5e7eb 100%)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-center">
          <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-3 px-8 rounded-lg transition-colors" onClick={() => navigate('/customer/location-pin')}>
            Next
          </button>
        </div>
      </main>
    </div>
  )
}

export default RequestPickup