import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../utils/axios'
import { Search } from 'lucide-react'

const BlogList = () => {
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categorySearch, setCategorySearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [selectedCategory])

  const fetchData = async () => {
    try {
      const [blogsRes, categoriesRes] = await Promise.all([
        axios.get(selectedCategory ? `/api/blogs?category=${selectedCategory}` : '/api/blogs'),
        axios.get('/api/categories')
      ])
      setBlogs(blogsRes.data)
      setCategories(categoriesRes.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Blog</h1>

        {/* Category Circles Section - Only 6 Categories */}
        <div className="mb-8 md:mb-12 py-4 md:py-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Blog Categories</h2>
            <p className="text-sm md:text-base text-gray-600">Explore articles by category</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-2 md:px-4">
            {categories.slice(0, 10).map((category, index) => {
              const gradients = [
                'from-blue-400 to-blue-500',
                'from-green-400 to-green-500',
                'from-purple-400 to-purple-500',
                'from-pink-400 to-pink-500',
                'from-orange-400 to-orange-500',
                'from-teal-400 to-teal-500',
                'from-red-400 to-red-500',
                'from-indigo-400 to-indigo-500',
                'from-yellow-400 to-yellow-500',
                'from-cyan-400 to-cyan-500'
              ]
              
              return (
                <button
                  key={category._id}
                  onClick={() => handleCategoryChange(category._id)}
                  className="group flex flex-col items-center w-[100px] md:w-[140px]"
                >
                  <div className="relative mb-3 md:mb-4">
                    {/* Category label on top */}
                    <div className="absolute -top-5 md:-top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold shadow-lg z-10 whitespace-nowrap">
                      <span className="block truncate max-w-[90px] md:max-w-none">
                        {category.name.length > (window.innerWidth < 768 ? 12 : 15) ? category.name.substring(0, window.innerWidth < 768 ? 12 : 15) + '...' : category.name}
                      </span>
                    </div>
                    
                    {/* Outer white border ring */}
                    <div className="relative p-0.5 md:p-1 bg-white rounded-full shadow-xl">
                      {/* Gradient glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-full blur-lg md:blur-xl opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                      
                      {/* Main circle with image or icon */}
                      <div className={`relative w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-full flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 overflow-hidden`}>
                        {category.image ? (
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.parentElement.innerHTML = `<span class="text-3xl md:text-5xl">${category.icon || '📝'}</span>`
                            }}
                          />
                        ) : (
                          <span className="text-3xl md:text-5xl">{category.icon || '📝'}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Category Filter */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-6">All Categories</h3>
              
              {/* Category Search */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Find a Category"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 placeholder-gray-400"
                />
                <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>

              {/* Categories List */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {/* All Categories Option */}
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all ${
                    selectedCategory === ''
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    📚
                  </div>
                  <span className={`font-medium text-left ${
                    selectedCategory === '' ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    All Blogs
                  </span>
                </button>

                {filteredCategories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryChange(category._id)}
                    className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all ${
                      selectedCategory === category._id
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0`}>
                      {category.icon || '📝'}
                    </div>
                    <span className={`font-medium text-left ${
                      selectedCategory === category._id ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory 
                  ? categories.find(c => c._id === selectedCategory)?.name || 'Blogs'
                  : 'All Blogs'}
              </h2>
              <p className="text-gray-600 mt-1">{blogs.length} articles found</p>
            </div>

            {blogs.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">No Blogs Found</h3>
                <p className="text-gray-600 mb-6">Try selecting a different category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {blogs.map(blog => (
                  <Link key={blog._id} to={`/blog/${blog.slug}`} className="group">
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300">
                      {blog.image && (
                        <div className="h-48 bg-gray-200">
                          <img 
                            src={blog.image} 
                            alt={blog.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                        </div>
                      )}
                      <div className="p-6">
                        {blog.category && (
                          <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                            {blog.category.name}
                          </span>
                        )}
                        <h2 className="text-xl font-bold mt-3 mb-2 group-hover:text-blue-600 transition line-clamp-2">
                          {blog.title}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                          <span>{blog.views} views</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  )
}

export default BlogList
