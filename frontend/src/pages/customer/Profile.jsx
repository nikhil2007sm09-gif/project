import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { User, Mail, Phone, MapPin, Edit2, Save, X, CheckCircle, AlertCircle } from 'lucide-react'

const Profile = () => {
  const { user, setUser } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <p className="text-2xl font-bold text-gray-800">Please login to view your profile</p>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Error updating profile')
        return
      }

      // Update context with new user data
      if (setUser) {
        setUser(data.user)
      }
      
      setIsEditing(false)
      setSuccessMessage('Profile updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Error saving profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    const confirmText = 'DELETE'
    const userInput = prompt(
      `⚠️ WARNING: This will permanently delete your account and ALL your data!\n\n` +
      `Type "${confirmText}" to confirm deletion:`
    )
    
    if (userInput !== confirmText) {
      if (userInput !== null) {
        alert('Account deletion cancelled. Text did not match.')
      }
      return
    }
    
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Error deleting account')
        return
      }

      alert('Your account has been permanently deleted.')
      // Logout and redirect
      localStorage.removeItem('token')
      window.location.href = '/'
    } catch (error) {
      console.error('Error deleting account:', error)
      alert('Error deleting account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 sticky top-4 md:top-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl md:text-5xl font-bold text-white shadow-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl md:text-2xl font-bold mt-4 md:mt-6 text-center text-gray-800">{user.name}</h2>
                <p className="text-gray-500 text-xs md:text-sm text-center mt-1 md:mt-2 break-all">{user.email}</p>
                <div className="mt-3 md:mt-4 px-3 md:px-4 py-1 md:py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                  <span className="text-purple-700 font-semibold text-xs md:text-sm capitalize">{user.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">Account Information</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-all text-sm md:text-base whitespace-nowrap ${
                    isEditing
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                  }`}
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>

              {!isEditing ? (
                // View Mode
                <div className="space-y-3 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <User className="w-5 md:w-6 h-5 md:h-6 text-purple-600 flex-shrink-0 mt-0.5 md:mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-gray-600 font-medium">Full Name</p>
                      <p className="text-base md:text-lg font-semibold text-gray-800 mt-0.5 md:mt-1 break-words">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                    <Mail className="w-5 md:w-6 h-5 md:h-6 text-blue-600 flex-shrink-0 mt-0.5 md:mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-gray-600 font-medium">Email Address</p>
                      <p className="text-base md:text-lg font-semibold text-gray-800 mt-0.5 md:mt-1 break-all">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <Phone className="w-5 md:w-6 h-5 md:h-6 text-green-600 flex-shrink-0 mt-0.5 md:mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-gray-600 font-medium">Phone Number</p>
                      <p className="text-base md:text-lg font-semibold text-gray-800 mt-0.5 md:mt-1">{user.phone || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                    <MapPin className="w-5 md:w-6 h-5 md:h-6 text-orange-600 flex-shrink-0 mt-0.5 md:mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-gray-600 font-medium">Address</p>
                      <p className="text-base md:text-lg font-semibold text-gray-800 mt-0.5 md:mt-1 break-words">{user.address || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <form className="space-y-6">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition text-sm md:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition text-sm md:text-base"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition text-sm md:text-base"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition resize-none text-sm md:text-base"
                      placeholder="Enter your address"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 md:py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    <Save className="w-4 md:w-5 h-4 md:h-5" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="mt-8 md:mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border-2 border-red-200">
            <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-4">
              <div className="flex-shrink-0">
                <svg className="w-10 md:w-12 h-10 md:h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-xl font-bold text-red-600 mb-2">⚠️ Danger Zone</h3>
                <p className="text-gray-700 text-sm md:text-base mb-3 md:mb-4">
                  Once you delete your account, there is no going back. This action will:
                </p>
                <ul className="list-disc list-inside text-gray-700 text-sm md:text-base mb-4 md:mb-6 space-y-1 md:space-y-2">
                  <li>Permanently delete your customer account</li>
                  <li>Remove all your order history</li>
                  <li>Delete your wishlist and saved items</li>
                  <li>Remove your personal information</li>
                  <li>This action <strong>CANNOT be undone</strong></li>
                </ul>
                <button
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="bg-red-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-red-700 font-semibold transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>{loading ? 'Deleting...' : 'Delete My Account'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
