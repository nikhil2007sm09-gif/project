import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios'
import { Plus, Edit2, Trash2, Eye, EyeOff, Grid, ArrowLeft } from 'lucide-react'

const AdminCategories = () => {
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    active: true
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories')
      setCategories(res.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingCategory) {
        await axios.put(`/api/categories/${editingCategory._id}`, formData)
        alert('Category updated successfully!')
      } else {
        await axios.post('/api/categories', formData)
        alert('Category created successfully!')
      }
      
      setShowForm(false)
      setEditingCategory(null)
      setFormData({ name: '', description: '', image: '', active: true })
      fetchCategories()
    } catch (error) {
      alert('Error saving category')
    }
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || '',
      active: category.active
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    
    try {
      await axios.delete(`/api/categories/${id}`)
      alert('Category deleted successfully!')
      fetchCategories()
    } catch (error) {
      alert('Error deleting category')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center">
              <Grid className="w-10 h-10 mr-3 text-purple-600" />
              Manage Categories
            </h1>
            <Link to="/admin/dashboard" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Dashboard
            </Link>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingCategory(null)
              setFormData({ name: '', description: '', image: '', active: true })
            }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 font-semibold shadow-lg hover:shadow-xl transition-all flex items-center"
          >
            {showForm ? <><EyeOff className="w-5 h-5 mr-2" /> Cancel</> : <><Plus className="w-5 h-5 mr-2" /> Add Category</>}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Category Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Electronics, Fashion, Home & Garden"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Brief description of this category"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none transition"
                  rows="3"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/category-image.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-purple-500 focus:outline-none transition"
                />
                {formData.image && (
                  <div className="mt-3">
                    <img src={formData.image} alt="Preview" className="w-full max-w-md h-48 object-cover rounded-xl border-2 border-gray-200" />
                  </div>
                )}
              </div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="font-semibold text-gray-700">Active (visible to customers)</span>
              </label>
              <button type="submit" className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 font-bold shadow-lg hover:shadow-xl transition-all">
                {editingCategory ? 'Update Category' : 'Create Category'}
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">All Categories ({categories.length})</h2>
          {categories.length === 0 ? (
            <div className="text-center py-16">
              <Grid className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No categories yet</p>
              <p className="text-gray-500 text-sm mt-2">Click "Add Category" to create your first category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => (
                <div key={category._id} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all bg-gradient-to-br from-white to-gray-50">
                  {category.image && (
                    <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 overflow-hidden">
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description || 'No description'}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-bold flex items-center ${category.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {category.active ? <><Eye className="w-4 h-4 mr-1" /> Active</> : <><EyeOff className="w-4 h-4 mr-1" /> Inactive</>}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center"
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

export default AdminCategories
