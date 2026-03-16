import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import { ShoppingBag, ArrowRight, User, Mail, Lock } from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

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
        role: 'customer'
      })
      
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      console.error('Registration error:', err)
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-8">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-xl border-2 border-green-200 rounded-3xl shadow-2xl p-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-green-800 mb-4">Registration Successful!</h2>
          <p className="text-lg text-gray-700 mb-3">
            Your account has been created successfully.
          </p>
          <p className="text-base text-gray-600 mb-4">
            Please login to continue shopping.
          </p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-8">
      {/* Single Box Container */}
      <div className="w-full max-w-5xl rounded-3xl border border-blue-100 bg-white/90 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Image */}
          <div className="relative h-64 md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop"
              alt="Join Shopping"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-indigo-600/30 to-transparent" />
            
            {/* Overlay Text */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="inline-flex items-center gap-2 mb-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-lg">
                <ShoppingBag className="h-5 w-5" />
                <span className="text-sm font-bold">Join Us Today</span>
              </div>
              <h2 className="text-3xl font-black mb-2 drop-shadow-lg">Start Shopping</h2>
              <p className="text-base text-white/90 drop-shadow">
                Create your account and discover amazing deals
              </p>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-white to-blue-50/30">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-800 mb-1">Create Account</h1>
              <p className="text-sm text-gray-600">Join us and start your shopping journey</p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border-2 border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700 shadow-sm">
                <span className="font-semibold">⚠️ </span>{error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                    required
                    minLength="6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                Create Account
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t-2 border-gray-100">
              <p className="text-center text-xs text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Login here
                </Link>
              </p>
              
              <div className="mt-4 text-center">
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

export default Register
