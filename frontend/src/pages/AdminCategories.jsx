import { useState, useEffect } from 'react'
import axios from '../utils/axios'

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingCategory(null)
            setFormData({ name: '', description: '', image: '', active: true })
          }}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Category Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded px-4 py-2"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border rounded px-4 py-2"
              rows="3"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full border rounded px-4 py-2"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              />
              <span>Active</span>
            </label>
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700">
              {editingCategory ? 'Update Category' : 'Create Category'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">All Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map(category => (
            <div key={category._id} className="border rounded-lg p-4">
              {category.image && (
                <div className="h-32 bg-gray-200 rounded mb-3">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded" />
                </div>
              )}
              <h3 className="font-bold text-lg mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{category.description}</p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${category.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {category.active ? 'Active' : 'Inactive'}
                </span>
                <div>
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-600 hover:underline mr-2 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminCategories
