import { useState, useEffect } from 'react'
import axios from '../utils/axios'

const VendorDashboard = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [activeTab, setActiveTab] = useState('products')
  const [analytics, setAnalytics] = useState(null)
  const [loadingAnalytics, setLoadingAnalytics] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: ['', '', '', '', ''],
    sizes: [],
    colors: []
  })
  const [uploadingImages, setUploadingImages] = useState([false, false, false, false, false])

  useEffect(() => {
    fetchVendorProducts()
    fetchCategories()
    fetchSizes()
    fetchColors()
    if (activeTab === 'analytics') {
      fetchAnalytics()
    }
  }, [activeTab])

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories')
      setCategories(res.data)
      // Set default category if available
      if (res.data.length > 0 && !formData.category) {
        setFormData(prev => ({ ...prev, category: res.data[0].name }))
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchSizes = async () => {
    try {
      const res = await axios.get('/api/sizes')
      setSizes(res.data)
    } catch (error) {
      console.error('Error fetching sizes:', error)
    }
  }

  const fetchColors = async () => {
    try {
      const res = await axios.get('/api/colors')
      setColors(res.data)
    } catch (error) {
      console.error('Error fetching colors:', error)
    }
  }

  const fetchVendorProducts = async () => {
    try {
      const res = await axios.get('/api/products/vendor/my-products')
      setProducts(res.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchAnalytics = async () => {
    try {
      setLoadingAnalytics(true)
      const res = await axios.get('/api/products/vendor/analytics')
      setAnalytics(res.data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoadingAnalytics(false)
    }
  }

  const handleDeleteAccount = async () => {
    const confirmText = 'DELETE'
    const userInput = prompt(
      `⚠️ WARNING: This will permanently delete your account and ALL your products!\n\n` +
      `Type "${confirmText}" to confirm deletion:`
    )
    
    if (userInput !== confirmText) {
      if (userInput !== null) {
        alert('Account deletion cancelled. Text did not match.')
      }
      return
    }
    
    try {
      await axios.delete('/api/auth/delete-account')
      alert('Your account has been permanently deleted.')
      // Logout and redirect
      localStorage.removeItem('token')
      window.location.href = '/'
    } catch (error) {
      console.error('Error deleting account:', error)
      alert('Error deleting account. Please try again.')
    }
  }

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData({ ...formData, images: newImages })
  }

  const handleFileUpload = async (index, file) => {
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
      const newUploadingImages = [...uploadingImages]
      newUploadingImages[index] = true
      setUploadingImages(newUploadingImages)

      const formDataUpload = new FormData()
      formDataUpload.append('image', file)

      const res = await axios.post('/api/upload/image', formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const newImages = [...formData.images]
      newImages[index] = res.data.imageUrl
      setFormData({ ...formData, images: newImages })

      alert('Image uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error uploading image: ' + (error.response?.data?.message || error.message))
    } finally {
      const newUploadingImages = [...uploadingImages]
      newUploadingImages[index] = false
      setUploadingImages(newUploadingImages)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name.trim()) {
      alert('Product name is required')
      return
    }
    
    if (!formData.description.trim()) {
      alert('Product description is required')
      return
    }
    
    if (!formData.price || formData.price <= 0) {
      alert('Valid price is required')
      return
    }
    
    if (!formData.category) {
      alert('Please select a category')
      return
    }
    
    // Validate first 2 images are required
    if (!formData.images[0] || !formData.images[0].trim()) {
      alert('First product image is required')
      return
    }
    
    if (!formData.images[1] || !formData.images[1].trim()) {
      alert('Second product image is required')
      return
    }
    
    try {
      // Filter out empty image URLs
      const filteredImages = formData.images.filter(img => img.trim() !== '')
      
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        stock: formData.stock || 0, // Default to 0 if not provided
        images: filteredImages,
        image: filteredImages[0] || '', // Backward compatibility
        sizes: formData.sizes || [], // Optional
        colors: formData.colors || [] // Optional
      }

      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct._id}`, productData)
        alert('Product updated successfully!')
      } else {
        await axios.post('/api/products', productData)
        alert('Product added successfully!')
      }
      
      setShowForm(false)
      setEditingProduct(null)
      setFormData({ 
        name: '', 
        description: '', 
        price: '', 
        category: categories.length > 0 ? categories[0].name : '', 
        stock: '', 
        images: ['', '', '', '', ''],
        sizes: [],
        colors: []
      })
      fetchVendorProducts()
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Error saving product'
      alert(errorMessage)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    const productImages = product.images || []
    const images = [...productImages]
    // Fill remaining slots with empty strings
    while (images.length < 5) {
      images.push('')
    }
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      images: images.slice(0, 5),
      sizes: product.sizes || [],
      colors: product.colors || []
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      await axios.delete(`/api/products/${id}`)
      alert('Product deleted successfully!')
      fetchVendorProducts()
    } catch (error) {
      alert('Error deleting product')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'products' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          📦 My Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'analytics' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          📊 Analytics
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'settings' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          ⚙️ Settings
        </button>
      </div>

      {activeTab === 'products' && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Product Management</h2>
            <button
              onClick={() => {
                setShowForm(!showForm)
                setEditingProduct(null)
                setFormData({ 
                  name: '', 
                  description: '', 
                  price: '', 
                  category: categories.length > 0 ? categories[0].name : '', 
                  stock: '', 
                  images: ['', '', '', '', ''],
                  sizes: [],
                  colors: []
                })
              }}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {showForm ? 'Cancel' : 'Add Product'}
            </button>
          </div>

      {showForm && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl p-8 mb-8 border border-purple-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingProduct(null)
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white text-sm">1</span>
                Basic Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Describe your product..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                    rows="4"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white text-sm">2</span>
                Pricing & Stock
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Stock <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Product Images */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white text-sm">3</span>
                Product Images
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                <span className="text-red-500 font-bold">First 2 images are required.</span> Upload up to 5 images total. First image will be the main product image.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div key={index} className="border-2 border-dashed border-gray-300 rounded-2xl p-4 hover:border-purple-400 transition-colors">
                    <div className="text-center mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                        index < 2 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        Image {index + 1}
                        {index === 0 ? ' (Main) *' : index === 1 ? ' *' : ' (Optional)'}
                      </span>
                    </div>
                    
                    {formData.images[index] ? (
                      <div className="relative group">
                        <img 
                          src={formData.images[index]} 
                          alt={`Preview ${index + 1}`}
                          className="w-full h-40 object-cover rounded-xl"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400?text=Error'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleImageChange(index, '')}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="h-40 bg-gray-50 rounded-xl flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    <div className="mt-3 space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(index, e.target.files[0])}
                        className="w-full text-xs file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-purple-100 file:text-purple-700 file:font-semibold hover:file:bg-purple-200 file:cursor-pointer"
                        disabled={uploadingImages[index]}
                      />
                      {uploadingImages[index] && (
                        <div className="text-center">
                          <span className="text-xs text-purple-600 font-semibold">Uploading...</span>
                        </div>
                      )}
                      <input
                        type="url"
                        placeholder="Or paste image URL"
                        value={formData.images[index]}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes & Colors */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white text-sm">4</span>
                Sizes & Colors <span className="text-gray-400 text-base">(Optional)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sizes */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Available Sizes <span className="text-gray-400">(Optional)</span>
                  </label>
                  <select
                    multiple
                    value={formData.sizes}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
                      setFormData({ ...formData, sizes: selectedOptions })
                    }}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all bg-white"
                    style={{ minHeight: '120px' }}
                  >
                    {sizes.length > 0 ? (
                      sizes.map((size) => (
                        <option key={size._id} value={size.name} className="py-2">
                          {size.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No sizes available</option>
                    )}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">Hold Ctrl/Cmd to select multiple sizes</p>
                  {formData.sizes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formData.sizes.map((size, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold"
                        >
                          {size}
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, sizes: formData.sizes.filter(s => s !== size) })}
                            className="ml-1 text-purple-600 hover:text-purple-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Available Colors <span className="text-gray-400">(Optional)</span>
                  </label>
                  <select
                    multiple
                    value={formData.colors}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
                      setFormData({ ...formData, colors: selectedOptions })
                    }}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all bg-white"
                    style={{ minHeight: '120px' }}
                  >
                    {colors.length > 0 ? (
                      colors.map((color) => (
                        <option key={color._id} value={color.name} className="py-2">
                          {color.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No colors available</option>
                    )}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">Hold Ctrl/Cmd to select multiple colors</p>
                  {formData.colors.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formData.colors.map((colorName, index) => {
                        const colorObj = colors.find(c => c.name === colorName)
                        return (
                          <span 
                            key={index}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold"
                          >
                            {colorObj && (
                              <div
                                className="w-4 h-4 rounded-full border-2 border-gray-400"
                                style={{ backgroundColor: colorObj.hexCode }}
                              ></div>
                            )}
                            {colorName}
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, colors: formData.colors.filter(c => c !== colorName) })}
                              className="ml-1 text-purple-600 hover:text-purple-800"
                            >
                              ×
                            </button>
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-black text-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                {editingProduct ? '✓ Update Product' : '+ Add Product'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                }}
                className="px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">My Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:border-purple-300">
              <div className="h-48 bg-gray-200 relative">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                ) : product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                {product.images && product.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    +{product.images.length - 1} more
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-purple-600 font-black text-xl">₹{product.price}</span>
                  <span className="text-sm text-gray-600 font-semibold">Stock: {product.stock}</span>
                </div>
                
                <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold mb-3 capitalize">
                  {product.category}
                </span>

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-bold text-gray-700 mb-1">Sizes:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.sizes.map((size, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold border border-gray-300"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-bold text-gray-700 mb-1">Colors:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.colors.map((colorName, index) => {
                        const colorObj = colors.find(c => c.name === colorName)
                        return (
                          <div 
                            key={index}
                            className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded border border-gray-300"
                          >
                            {colorObj && (
                              <div
                                className="w-4 h-4 rounded-full border-2 border-gray-400"
                                style={{ backgroundColor: colorObj.hexCode }}
                              ></div>
                            )}
                            <span className="text-xs font-semibold text-gray-700">{colorName}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-xl text-sm font-bold hover:shadow-lg transition-all"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-xl text-sm font-bold hover:shadow-lg transition-all"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-12 text-gray-600">
            No products yet. Click "Add Product" to get started!
          </div>
        )}
      </div>
        </>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {loadingAnalytics ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto relative">
                    <div className="absolute inset-2 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Loading Analytics
                </h3>
                <p className="text-gray-600">Preparing your business insights...</p>
                <div className="flex items-center justify-center space-x-1 mt-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          ) : analytics ? (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold opacity-90">Total Revenue</h3>
                    <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold">₹{analytics.overview.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm mt-2 opacity-80">All time earnings</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold opacity-90">This Month</h3>
                    <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold">₹{analytics.overview.thisMonthRevenue.toLocaleString()}</p>
                  <p className="text-sm mt-2 opacity-80">{analytics.overview.recentOrders} orders this week</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold opacity-90">Total Products</h3>
                    <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold">{analytics.overview.totalProducts}</p>
                  <p className="text-sm mt-2 opacity-80">{analytics.overview.totalStock} total stock</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold opacity-90">Total Sales</h3>
                    <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-3xl font-bold">{analytics.overview.totalSales}</p>
                  <p className="text-sm mt-2 opacity-80">Units sold</p>
                </div>
              </div>

              {/* Low Stock Alert */}
              {analytics.overview.lowStockProducts > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-bold text-yellow-800 mb-2">⚠️ Low Stock Alert</h3>
                  <p className="text-yellow-700">
                    {analytics.overview.lowStockProducts} product{analytics.overview.lowStockProducts > 1 ? 's' : ''} have less than 10 units in stock.
                  </p>
                </div>
              )}

              {/* Sales Trend */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-6">Sales Trend (Last 7 Days)</h3>
                <div className="space-y-3">
                  {analytics.salesByDay.map((day, index) => {
                    const maxRevenue = Math.max(...analytics.salesByDay.map(d => d.revenue))
                    const percentage = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0
                    return (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                          <span className="text-gray-600">{day.sales} units • ₹{day.revenue.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Top Products & Category Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Products */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">🏆 Top Selling Products</h3>
                  {analytics.topProducts.length > 0 ? (
                    <div className="space-y-3">
                      {analytics.topProducts.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl font-bold text-gray-300">#{index + 1}</span>
                            <div>
                              <p className="font-semibold">{item.product.name}</p>
                              <p className="text-sm text-gray-600">{item.quantity} units sold</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">₹{item.revenue.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-8">No sales data yet</p>
                  )}
                </div>

                {/* Category Distribution */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">📦 Products by Category</h3>
                  <div className="space-y-3">
                    {analytics.categoryDistribution.map((cat, index) => {
                      const maxCount = Math.max(...analytics.categoryDistribution.map(c => c.count))
                      const percentage = (cat.count / maxCount) * 100
                      return (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{cat.category}</span>
                            <span className="text-gray-600">{cat.count} products • {cat.stock} stock</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-600">
              No analytics data available
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
            <p className="text-gray-600 mb-6">Manage your vendor account preferences and data.</p>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-red-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-600 mb-2">⚠️ Danger Zone</h3>
                <p className="text-gray-700 mb-4">
                  Once you delete your account, there is no going back. This action will:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Permanently delete your vendor account</li>
                  <li>Remove ALL your products from the platform</li>
                  <li>Delete all product images and data</li>
                  <li>Remove your business information</li>
                  <li>This action <strong>CANNOT be undone</strong></li>
                </ul>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold transition-all duration-200 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete My Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VendorDashboard
