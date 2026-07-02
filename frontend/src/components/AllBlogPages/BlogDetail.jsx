import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from '../../utils/axios'

const BlogDetail = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlog()
  }, [slug])

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`/api/blogs/${slug}`)
      setBlog(res.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
        <Link to="/blog" className="text-primary hover:underline">Back to blogs</Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="text-primary hover:underline mb-4 inline-block">&larr; Back to blogs</Link>
        
        {blog.image && (
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden mb-6">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        {blog.category && (
          <span className="text-sm text-primary font-semibold">{blog.category.name}</span>
        )}
        
        <h1 className="text-4xl font-bold mt-2 mb-4">{blog.title}</h1>
        
        <div className="flex items-center space-x-4 text-gray-600 text-sm mb-8">
          <span>By {blog.author?.name || 'Admin'}</span>
          <span>•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{blog.views} views</span>
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }} />
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
