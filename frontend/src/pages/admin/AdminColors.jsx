import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios'
import { Plus, Edit2, Trash2, Palette, ArrowLeft, Pipette } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center">
              <Palette className="w-10 h-10 mr-3 text-pink-600" />
              Manage Colors
            </h1>
            <Link to="/admin/dashboard" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Dashboard
            </Link>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingColor(null)
              setFormData({ name: '', hexCode: '#000000', description: '' })
            }}
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-pink-700 font-semibold shadow-lg hover:shadow-xl transition-all flex items-center"
          >
            {showForm ? 'Cancel' : <><Plus className="w-5 h-5 mr-2" /> Add Color</>}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-pink-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <Pipette className="w-6 h-6 mr-2 text-pink-600" />
              {editingColor ? 'Edit Color' : 'Add New Color'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Color Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-pink-500 focus:outline-none transition"
                  placeholder="e.g., Red, Blue, Black, Navy"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Hex Code *</label>
                <div className="flex space-x-3">
                  <input
                    type="color"
                    value={formData.hexCode}
                    onChange={(e) => setFormData({ ...formData, hexCode: e.target.value })}
                    className="w-24 h-14 border-2 border-gray-300 rounded-xl cursor-pointer"
                    required
                  />
                  <input
                    type="text"
                    value={formData.hexCode}
                    onChange={(e) => setFormData({ ...formData, hexCode: e.target.value })}
                    className="flex-1 border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-pink-500 focus:outline-none transition font-mono"
                    placeholder="#000000"
                    pattern="^#[0-9A-Fa-f]{6}$"
                    required
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2 flex items-center">
                  <Pipette className="w-4 h-4 mr-1" />
                  Click the color box to pick a color or enter hex code manually
                </p>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-pink-500 focus:outline-none transition"
                  placeholder="e.g., Bright Red, Navy Blue, Charcoal Black"
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-3 rounded-xl hover:from-pink-600 hover:to-pink-700 font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {editingColor ? 'Update Color' : 'Create Color'}
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">All Colors ({colors.length})</h2>
          {colors.length === 0 ? (
            <div className="text-center py-16">
              <Palette className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No colors yet</p>
              <p className="text-gray-500 text-sm mt-2">Click "Add Color" to create your first color</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {colors.map((color) => (
                <div key={color._id} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all bg-gradient-to-br from-white to-gray-50">
                  <div className="flex items-start space-x-4 mb-4">
                    <div
                      className="w-20 h-20 rounded-xl border-4 border-white shadow-lg flex-shrink-0 ring-2 ring-gray-200"
                      style={{ backgroundColor: color.hexCode }}
                    ></div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold uppercase text-gray-800">{color.name}</h3>
                      <p className="text-sm text-gray-600 font-mono font-semibold">{color.hexCode}</p>
                      {color.description && (
                        <p className="text-xs text-gray-500 mt-1">{color.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(color)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(color._id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
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

export default AdminColors
