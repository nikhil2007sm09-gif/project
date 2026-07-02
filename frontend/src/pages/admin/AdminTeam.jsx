import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react'

export default function AdminTeam() {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    email: '',
    phone: '',
    image: '',
    order: 0
  })
  const [imageFile, setImageFile] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/team')
      if (response.ok) {
        const data = await response.json()
        setTeam(data)
      }
    } catch (error) {
      console.error('Error fetching team:', error)
      setError('Failed to load team members')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Please login as admin')
        return
      }

      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('role', formData.role)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('order', formData.order)
      
      // Send image as base64 if it's a data URL
      if (formData.image && formData.image.startsWith('data:')) {
        const base64Data = formData.image.split(',')[1]
        formDataToSend.append('imageData', base64Data)
      } else if (imageFile) {
        formDataToSend.append('image', imageFile)
      } else if (formData.image && !formData.image.startsWith('data:')) {
        formDataToSend.append('image', formData.image)
      }

      const url = editingId 
        ? `http://localhost:5000/api/team/${editingId}`
        : 'http://localhost:5000/api/team'
      
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      })

      if (response.ok) {
        setSuccess(editingId ? 'Team member updated!' : 'Team member added!')
        setFormData({
          name: '',
          role: '',
          description: '',
          email: '',
          phone: '',
          image: '',
          order: 0
        })
        setImageFile(null)
        setEditingId(null)
        setShowForm(false)
        fetchTeam()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        const data = await response.json()
        setError(data.message || 'Error saving team member')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Error saving team member')
    }
  }

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      role: member.role,
      description: member.description,
      email: member.email || '',
      phone: member.phone || '',
      image: member.image,
      order: member.order || 0
    })
    setEditingId(member._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/team/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setSuccess('Team member deleted!')
        fetchTeam()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Error deleting team member')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Error deleting team member')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      name: '',
      role: '',
      description: '',
      email: '',
      phone: '',
      image: '',
      order: 0
    })
    setImageFile(null)
  }

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Team Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
          >
            <Plus className="w-5 h-5" />
            Add Team Member
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold">
                  {editingId ? 'Edit Team Member' : 'Add Team Member'}
                </h2>
                <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <div className="flex items-center gap-4">
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition">
                      <Upload className="w-5 h-5" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition font-medium"
                  >
                    {editingId ? 'Update' : 'Add'} Team Member
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Team List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map(member => (
            <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              {/* Image */}
              <div className="h-48 overflow-hidden bg-gray-200">
                <img
                  src={member.imageData ? `data:image/jpeg;base64,${member.imageData}` : member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=' + member.name
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
                <p className="text-indigo-600 font-medium text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{member.description}</p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {team.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No team members yet. Add one to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}
