import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios'
import { Plus, Edit2, Trash2, Ruler, ArrowLeft, ArrowUpDown } from 'lucide-react'

const AdminSizes = () => {
  const [sizes, setSizes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingSize, setEditingSize] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    order: 0
  })

  useEffect(() => {
    fetchSizes()
  }, [])

  const fetchSizes = async () => {
    try {
      const res = await axios.get('/api/sizes')
      setSizes(res.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingSize) {
        await axios.put(`/api/sizes/${editingSize._id}`, formData)
        alert('Size updated successfully!')
      } else {
        await axios.post('/api/sizes', formData)
        alert('Size created successfully!')
      }
      setFormData({ name: '', description: '', order: 0 })
      setEditingSize(null)
      setShowForm(false)
      fetchSizes()
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving size')
    }
  }

  const handleEdit = (size) => {
    setEditingSize(size)
    setFormData({
      name: size.name,
      description: size.description || '',
      order: size.order || 0
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this size?')) return
    try {
      await axios.delete(`/api/sizes/${id}`)
      alert('Size deleted successfully!')
      fetchSizes()
    } catch (error) {
      alert('Error deleting size')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center">
              <Ruler className="w-10 h-10 mr-3 text-indigo-600" />
              Manage Sizes
            </h1>
            <Link to="/admin/dashboard" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Dashboard
            </Link>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingSize(null)
              setFormData({ name: '', description: '', order: 0 })
            }}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all flex items-center"
          >
            {showForm ? 'Cancel' : <><Plus className="w-5 h-5 mr-2" /> Add Size</>}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-indigo-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingSize ? 'Edit Size' : 'Add New Size'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Size Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none transition"
                  placeholder="e.g., S, M, L, XL, XXL, 32, 34, 36"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none transition"
                  placeholder="e.g., Small, Medium, Large, Extra Large"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 mb-2 flex items-center">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none transition"
                  placeholder="0"
                />
                <p className="text-sm text-gray-600 mt-2">Lower numbers appear first in the list</p>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-indigo-600 hover:to-indigo-700 font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {editingSize ? 'Update Size' : 'Create Size'}
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">All Sizes ({sizes.length})</h2>
          {sizes.length === 0 ? (
            <div className="text-center py-16">
              <Ruler className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No sizes yet</p>
              <p className="text-gray-500 text-sm mt-2">Click "Add Size" to create your first size</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sizes.map((size) => (
                <div key={size._id} className="border-2 border-gray-200 rounded-xl p-5 hover:shadow-xl transition-all bg-gradient-to-br from-white to-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {size.name}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{size.name}</h3>
                          {size.description && (
                            <p className="text-sm text-gray-600">{size.description}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center">
                        <ArrowUpDown className="w-3 h-3 mr-1" />
                        Order: {size.order}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handleEdit(size)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(size._id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminSizes
