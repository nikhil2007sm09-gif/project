import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ShoppingBag, ArrowRight, Mail, Phone } from 'lucide-react'

const Login = () => {
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(formData.emailOrPhone, formData.password, 'customer')
      navigate('/')
    } catch (err) {
      console.error('Login error:', err)
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image & Info */}
          <div className="hidden md:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop"
                alt="Shopping Experience"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/60 via-yellow-600/40 to-pink-600/60" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <div className="inline-flex items-center gap-2 mb-4 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 shadow-lg w-fit">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="text-sm font-bold">Customer Portal</span>
                </div>
                <h2 className="text-4xl font-black mb-3 drop-shadow-lg">Shop with Ease</h2>
                <p className="text-lg text-white/95 drop-shadow mb-6 max-w-md">
                  Discover amazing products, exclusive deals, and enjoy seamless shopping experience
                </p>
                
                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-semibold">Free Shipping on Orders ₹999+</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-semibold">30-Day Easy Returns</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-semibold">100% Secure Payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-orange-100">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                  <ShoppingBag className="h-7 w-7 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">Welcome Back!</h1>
              <p className="text-gray-600">Login to continue your shopping journey</p>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl border-2 border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
                <span className="font-semibold">⚠️ </span>{error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email or Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {formData.emailOrPhone.includes('@') ? (
                      <Mail className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Phone className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Email or 10-digit mobile"
                    value={formData.emailOrPhone}
                    onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white pl-12 pr-4 py-3.5 text-gray-800 outline-none placeholder:text-gray-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Example: user@email.com or 9876543210
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-gray-800 outline-none placeholder:text-gray-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-4 text-base font-bold text-white shadow-lg hover:from-orange-600 hover:to-yellow-600 hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                Login to Account
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t-2 border-gray-100">
              <p className="text-center text-sm text-gray-600 mb-6">
                New customer?{' '}
                <Link
                  to="/register"
                  className="font-bold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  Register here
                </Link>
              </p>

              <div className="mb-6">
                <p className="text-center text-sm text-gray-500 mb-3 font-semibold">Business Login:</p>
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    to="/vendor/login" 
                    className="text-center text-sm border-2 border-purple-300 text-purple-600 py-3 rounded-xl hover:bg-purple-50 font-bold transition-all hover:scale-105 shadow-sm"
                  >
                    Vendor
                  </Link>
                  <Link 
                    to="/affiliate/login" 
                    className="text-center text-sm border-2 border-green-300 text-green-600 py-3 rounded-xl hover:bg-green-50 font-bold transition-all hover:scale-105 shadow-sm"
                  >
                    Affiliate
                  </Link>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center gap-2 font-medium">
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

export default Login
