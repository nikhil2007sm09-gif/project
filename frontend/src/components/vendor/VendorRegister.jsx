import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../utils/axios'
import { Store, ArrowRight, User, Mail, Lock, Building, MapPin, Phone, FileText } from 'lucide-react'

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessAddress: '',
    phone: '',
    gstNumber: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'vendor',
        businessDetails: {
          businessName: formData.businessName,
          businessAddress: formData.businessAddress,
          phone: formData.phone,
          gstNumber: formData.gstNumber
        }
      })
      
      setSuccess(true)
      setTimeout(() => {
        navigate('/login?type=vendor')
      }, 3000)
    } catch (err) {
      console.error('Vendor registration error:', err)
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center px-4 py-8">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-xl border-2 border-green-200 rounded-3xl shadow-2xl p-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-green-800 mb-4">Registration Successful!</h2>
          <p className="text-lg text-gray-700 mb-3">
            Your vendor account has been created successfully. 
            Your account is pending admin approval.
          </p>
          <p className="text-base text-gray-600 mb-4">
            You will be able to login once an admin approves your account.
          </p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl rounded-3xl border border-purple-100 bg-white/90 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Image */}
          <div className="relative h-64 md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop"
              alt="Vendor Business"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-indigo-600/30 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="inline-flex items-center gap-2 mb-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-lg">
                <Store className="h-5 w-5" />
                <span className="text-sm font-bold">Become a Vendor</span>
              </div>
              <h2 className="text-3xl font-black mb-2 drop-shadow-lg">Grow Your Business</h2>
              <p className="text-base text-white/90 drop-shadow">
                Join our platform and reach thousands of customers
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-white to-purple-50/30 max-h-[90vh] overflow-y-auto">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Store className="h-5 w-5 text-white" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-800 mb-1">Vendor Registration</h1>
              <p className="text-sm text-gray-600">Create your vendor account to start selling</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 mb-4">
              <p className="text-xs text-blue-800">
                <strong>📋 Note:</strong> Your account will be pending approval. An admin will review before you can start selling.
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border-2 border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700 shadow-sm">
                <span className="font-semibold">⚠️ </span>{error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border-2 border-gray-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border-2 border-gray-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Password *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded-lg border-2 border-gray-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                      required
                      minLength="6"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Confirm Password *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full rounded-lg border-2 border-gray-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-gray-100 pt-3 mt-2">
                <h3 className="text-sm font-black text-gray-800 mb-3">Business Details</h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Business Name *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Business Address *</label>
                    <div className="relative">
                      <div className="absolute top-2 left-0 pl-3 pointer-events-none">
                        <MapPin className="h-4 w-4 text-gray-400" />
                      </div>
                      <textarea
                        name="businessAddress"
                        value={formData.businessAddress}
                        onChange={handleChange}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                        rows="2"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phone *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-lg border-2 border-gray-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">GST (Optional)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FileText className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="gstNumber"
                          value={formData.gstNumber}
                          onChange={handleChange}
                          className="w-full rounded-lg border-2 border-gray-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                Register as Vendor
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-4 pt-4 border-t-2 border-gray-100">
              <p className="text-center text-xs text-gray-600">
                Already have an account?{' '}
                <Link to="/vendor/login" className="font-bold text-purple-600 hover:text-purple-700 transition-colors">
                  Login here
                </Link>
              </p>
              
              <div className="mt-3 text-center">
                <Link to="/" className="text-xs text-gray-500 hover:text-gray-700 inline-flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorRegister
