import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import { Users, ArrowRight, User, Mail, Lock, Phone, Globe, Share2 } from 'lucide-react'

const AffiliateRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    website: '',
    socialMedia: ''
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
        role: 'affiliate',
        businessDetails: {
          phone: formData.phone,
          website: formData.website,
          socialMedia: formData.socialMedia
        }
      })
      
      setSuccess(true)
      setTimeout(() => {
        navigate('/login?type=affiliate')
      }, 3000)
    } catch (err) {
      console.error('Affiliate registration error:', err)
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 py-8">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-xl border-2 border-green-200 rounded-3xl shadow-2xl p-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-green-800 mb-4">Registration Successful!</h2>
          <p className="text-lg text-gray-700 mb-3">
            Your affiliate account has been created successfully. 
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl rounded-3xl border border-green-100 bg-white/90 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Image */}
          <div className="relative h-64 md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop"
              alt="Affiliate Partnership"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/40 via-emerald-600/30 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="inline-flex items-center gap-2 mb-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-lg">
                <Users className="h-5 w-5" />
                <span className="text-sm font-bold">Become an Affiliate</span>
              </div>
              <h2 className="text-3xl font-black mb-2 drop-shadow-lg">Earn with Us</h2>
              <p className="text-base text-white/90 drop-shadow">
                Join our affiliate program and start earning commissions
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-white to-green-50/30">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-black text-gray-800 mb-2">Affiliate Registration</h1>
              <p className="text-base text-gray-600">Create your affiliate account to start earning</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>📋 Note:</strong> Your account will be pending approval. An admin will review before you can start earning.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
                <span className="font-semibold">⚠️ </span>{error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white pl-12 pr-4 py-3 text-base outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white pl-12 pr-4 py-3 text-base outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Password *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white pl-12 pr-4 py-3 text-base outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all"
                      required
                      minLength="6"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white pl-12 pr-4 py-3 text-base outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-gray-100 pt-4 mt-2">
                <h3 className="text-lg font-black text-gray-800 mb-4">Affiliate Details</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-xl border-2 border-gray-200 bg-white pl-12 pr-4 py-3 text-base outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Website/Blog URL (Optional)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className="w-full rounded-xl border-2 border-gray-200 bg-white pl-12 pr-4 py-3 text-base outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Social Media Profile (Optional)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Share2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="socialMedia"
                        value={formData.socialMedia}
                        onChange={handleChange}
                        placeholder="Instagram, YouTube, etc."
                        className="w-full rounded-xl border-2 border-gray-200 bg-white pl-12 pr-4 py-3 text-base outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-base font-bold text-white shadow-lg hover:from-green-700 hover:to-emerald-700 hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                Register as Affiliate
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t-2 border-gray-100">
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/affiliate/login" className="font-bold text-green-600 hover:text-green-700 transition-colors">
                  Login here
                </Link>
              </p>
              
              <div className="mt-6 text-center">
                <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default AffiliateRegister
