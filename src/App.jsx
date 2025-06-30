import { Routes, Route } from 'react-router-dom'
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
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './HomePage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-company" element={<LoginCompany />} />
        <Route path="/signup" element={<CustomerSignUp />} />
        <Route path="/company-signup" element={<CompanySignUp />} />

        {/* Customer routes */}
        <Route path="/customer/trash-type" element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerTrashType />
          </ProtectedRoute>
        } />
        <Route path="/customer/location-pin" element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerLocationPin />
          </ProtectedRoute>
        } />
        <Route path="/customer/pickup-summary" element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerPickupSummary />
          </ProtectedRoute>
        } />

        {/* Company routes */}
        <Route path="/company-waste-prefer" element={
          <ProtectedRoute allowedRoles={['company']}>
            <CompanyWastePrefer />
          </ProtectedRoute>
        } />
        <Route path="/company/route-access" element={
          <ProtectedRoute allowedRoles={['company']}>
            <RouteActivation />
          </ProtectedRoute>
        } />
        <Route path="/company/route-map" element={
          <ProtectedRoute allowedRoles={['company']}>
            <RouteMap />
          </ProtectedRoute>
        } />

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageCustomers />
          </ProtectedRoute>
        } />
        <Route path="/admin/companies" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageCompanies />
          </ProtectedRoute>
        } />
        <Route path="/admin/requests" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PickupRequests />
          </ProtectedRoute>
        } />
        <Route path="/admin/feedback" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <FeedbackRatings />
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ReportsAnalytics />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App
