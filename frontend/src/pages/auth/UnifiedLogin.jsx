import { Link } from 'react-router-dom'
import { User, Store, Users, Shield, Smartphone } from 'lucide-react'

const UnifiedLogin = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-center mb-12">Choose Login Type</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Customer */}
          <Link
            to="/customer/login"
            className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-4">
              <User className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Customer</h2>
            <p className="text-gray-600 text-sm">Shop for products</p>
          </Link>

          {/* Vendor */}
          <Link
            to="/vendor/login"
            className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
              <Store className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Vendor</h2>
            <p className="text-gray-600 text-sm">Manage products</p>
          </Link>

          <Link
            to="/affiliate/login"
            className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-4">
              <Users className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Affiliate</h2>
            <p className="text-gray-600 text-sm">Earn commissions</p>
          </Link>

          {/* Admin */}
          <Link
            to="/admin/login"
            className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Admin</h2>
            <p className="text-gray-600 text-sm">Manage platform</p>
          </Link>
        </div>

        {/* Register Section */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">Don't have an account?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Register as Customer
            </Link>
            <Link
              to="/vendor/register"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Register as Vendor
            </Link>
            <Link
              to="/affiliate/register"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Register as Affiliate
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-10">
          <Link to="/" className="text-primary hover:underline inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UnifiedLogin
