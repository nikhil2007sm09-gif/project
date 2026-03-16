import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Store, ArrowRight } from 'lucide-react'

const VendorLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const result = await login(formData.email, formData.password, 'vendor')
      console.log('Vendor login result:', result)
      navigate('/vendor/dashboard')
    } catch (err) {
      console.error('Vendor login error:', err)
      if (err.response?.data?.pending) {
        setError('Your account is pending admin approval. Please wait for approval.')
      } else {
        setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center px-4 py-8">
      {/* Single Box Container */}
      <div className="w-full max-w-5xl rounded-3xl border border-purple-100 bg-white/90 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Image */}
          <div className="relative h-64 md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop"
              alt="Vendor Dashboard"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-indigo-600/30 to-transparent" />
            
            {/* Overlay Text */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="inline-flex items-center gap-2 mb-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-lg">
                <Store className="h-5 w-5" />
                <span className="text-sm font-bold">Vendor Portal</span>
              </div>
              <h2 className="text-3xl font-black mb-2 drop-shadow-lg">Grow Your Business</h2>
              <p className="text-base text-white/90 drop-shadow">
                Manage products and reach thousands of customers
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-white to-purple-50/30">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Store className="h-5 w-5 text-white" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-800 mb-1">Vendor Login</h1>
              <p className="text-sm text-gray-600">Access your vendor dashboard</p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border-2 border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700 shadow-sm">
                <span className="font-semibold">⚠️ </span>{error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="vendor@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                Login to Dashboard
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t-2 border-gray-100">
              <p className="text-center text-xs text-gray-600">
                New vendor?{' '}
                <Link
                  to="/vendor/register"
                  className="font-bold text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Register here
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

export default VendorLogin