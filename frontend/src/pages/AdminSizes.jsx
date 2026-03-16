import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../utils/axios'

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Sizes</h1>
          <Link to="/admin/dashboard" className="text-primary hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingSize(null)
            setFormData({ name: '', description: '', order: 0 })
          }}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add Size'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingSize ? 'Edit Size' : 'Add New Size'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Size Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded px-4 py-2"
                placeholder="e.g., S, M, L, XL, XXL"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded px-4 py-2"
                placeholder="e.g., Small, Medium, Large"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Display Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full border rounded px-4 py-2"
                placeholder="0"
              />
              <p className="text-sm text-gray-600 mt-1">Lower numbers appear first</p>
            </div>

            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {editingSize ? 'Update Size' : 'Create Size'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">All Sizes ({sizes.length})</h2>
        {sizes.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No sizes yet. Click "Add Size" to create one.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sizes.map((size) => (
              <div key={size._id} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold">{size.name}</h3>
                    {size.description && (
                      <p className="text-sm text-gray-600">{size.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Order: {size.order}</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(size)}
                    className="flex-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(size._id)}
                    className="flex-1 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminSizes
