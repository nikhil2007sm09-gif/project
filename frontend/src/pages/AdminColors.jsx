import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../utils/axios'

const AdminColors = () => {
  const [colors, setColors] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingColor, setEditingColor] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    hexCode: '#000000',
    description: ''
  })

  useEffect(() => {
    fetchColors()
  }, [])

  const fetchColors = async () => {
    try {
      const res = await axios.get('/api/colors')
      setColors(res.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingColor) {
        await axios.put(`/api/colors/${editingColor._id}`, formData)
        alert('Color updated successfully!')
      } else {
        await axios.post('/api/colors', formData)
        alert('Color created successfully!')
      }
      setFormData({ name: '', hexCode: '#000000', description: '' })
      setEditingColor(null)
      setShowForm(false)
      fetchColors()
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving color')
    }
  }

  const handleEdit = (color) => {
    setEditingColor(color)
    setFormData({
      name: color.name,
      hexCode: color.hexCode,
      description: color.description || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this color?')) return
    try {
      await axios.delete(`/api/colors/${id}`)
      alert('Color deleted successfully!')
      fetchColors()
    } catch (error) {
      alert('Error deleting color')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Colors</h1>
          <Link to="/admin/dashboard" className="text-primary hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingColor(null)
            setFormData({ name: '', hexCode: '#000000', description: '' })
          }}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add Color'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingColor ? 'Edit Color' : 'Add New Color'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Color Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded px-4 py-2"
                placeholder="e.g., Red, Blue, Black"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Hex Code *</label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={formData.hexCode}
                  onChange={(e) => setFormData({ ...formData, hexCode: e.target.value })}
                  className="w-20 h-12 border rounded cursor-pointer"
                  required
                />
                <input
                  type="text"
                  value={formData.hexCode}
                  onChange={(e) => setFormData({ ...formData, hexCode: e.target.value })}
                  className="flex-1 border rounded px-4 py-2"
                  placeholder="#000000"
                  pattern="^#[0-9A-Fa-f]{6}$"
                  required
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">Click the color box or enter hex code</p>
            </div>

            <div>
              <label className="block font-semibold mb-2">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded px-4 py-2"
                placeholder="e.g., Bright Red, Navy Blue"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {editingColor ? 'Update Color' : 'Create Color'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">All Colors ({colors.length})</h2>
        {colors.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No colors yet. Click "Add Color" to create one.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.map((color) => (
              <div key={color._id} className="border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all">
                <div className="flex items-start space-x-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-lg border-2 border-gray-300 shadow-md flex-shrink-0"
                    style={{ backgroundColor: color.hexCode }}
                  ></div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold uppercase">{color.name}</h3>
                    <p className="text-sm text-gray-600 font-mono">{color.hexCode}</p>
                    {color.description && (
                      <p className="text-xs text-gray-500 mt-1">{color.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(color)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(color._id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all"
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

export default AdminColors
