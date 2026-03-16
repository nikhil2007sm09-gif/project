import { useState, useEffect } from 'react'
import axios from '../utils/axios'

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    category: '',
    published: false,
    tags: ''
  })
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      console.log('Fetching blogs and categories...')
      const [blogsRes, categoriesRes] = await Promise.all([
        axios.get('/api/blogs/admin/all'),
        axios.get('/api/categories')
      ])
      console.log('Blogs fetched:', blogsRes.data.length)
      console.log('Categories fetched:', categoriesRes.data.length)
      setBlogs(blogsRes.data)
      setCategories(categoriesRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      console.error('Error response:', error.response?.data)
      alert(`Error loading data: ${error.response?.data?.message || error.message}`)
    }
  }

  const handleImageUpload = async (file) => {
    if (!file) return

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB')
      return
    }

    try {
      setUploadingImage(true)

      const formDataUpload = new FormData()
      formDataUpload.append('image', file)

      const res = await axios.post('/api/upload/image', formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setFormData({ ...formData, image: res.data.imageUrl })
      alert('Image uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error uploading image: ' + (error.response?.data?.message || error.message))
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title.trim()) {
      alert('Please enter a title')
      return
    }
    
    if (!formData.content.trim()) {
      alert('Please enter content')
      return
    }
    
    try {
      const blogData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim(),
        image: formData.image.trim(),
        category: formData.category || null,
        published: formData.published,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }

      console.log('Submitting blog data:', blogData)

      if (editingBlog) {
        const res = await axios.put(`/api/blogs/${editingBlog._id}`, blogData)
        console.log('Update response:', res.data)
        alert('Blog updated successfully!')
      } else {
        const res = await axios.post('/api/blogs', blogData)
        console.log('Create response:', res.data)
        alert('Blog created successfully!')
      }
      
      setShowForm(false)
      setEditingBlog(null)
      setFormData({ title: '', content: '', excerpt: '', image: '', category: '', published: false, tags: '' })
      fetchData()
    } catch (error) {
      console.error('Error saving blog:', error)
      console.error('Error response:', error.response?.data)
      alert(`Error saving blog: ${error.response?.data?.message || error.message}`)
    }
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || '',
      image: blog.image || '',
      category: blog.category?._id || '',
      published: blog.published,
      tags: blog.tags?.join(', ') || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    
    try {
      await axios.delete(`/api/blogs/${id}`)
      alert('Blog deleted successfully!')
      fetchData()
    } catch (error) {
      alert('Error deleting blog')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingBlog(null)
            setFormData({ title: '', content: '', excerpt: '', image: '', category: '', published: false, tags: '' })
          }}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add Blog'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Blog Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border rounded px-4 py-2"
              required
            />
            <textarea
              placeholder="Excerpt (short description)"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full border rounded px-4 py-2"
              rows="2"
            />
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full border rounded px-4 py-2"
              rows="10"
              required
            />
            
            <div className="border rounded p-4 bg-gray-50">
              <h3 className="font-semibold mb-3">Blog Image</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Upload from Computer:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    className="w-full text-sm"
                    disabled={uploadingImage}
                  />
                  {uploadingImage && (
                    <p className="text-sm text-blue-600 mt-1">Uploading image...</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Or paste Image URL:</label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full border rounded px-4 py-2"
                  />
                </div>
                {formData.image && (
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <img 
                      src={formData.image} 
                      alt="Blog preview" 
                      className="w-full max-w-md h-48 object-cover rounded border"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border rounded px-4 py-2"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full border rounded px-4 py-2"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              />
              <span>Published</span>
            </label>
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700">
              {editingBlog ? 'Update Blog' : 'Create Blog'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">All Blogs</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Title</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Views</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog._id} className="border-b">
                  <td className="py-2">{blog.title}</td>
                  <td className="py-2">{blog.category?.name || 'N/A'}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs ${blog.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-2">{blog.views}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminBlogs
