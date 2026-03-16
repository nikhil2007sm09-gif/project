import express from 'express'
import Blog from '../models/Blog.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all published blogs (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query
    const filter = { published: true }
    
    if (category) {
      filter.category = category
    }
    
    const blogs = await Blog.find(filter)
      .populate('category', 'name slug')
      .populate('author', 'name')
      .sort({ createdAt: -1 })
    
    res.json(blogs)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single blog (public)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true })
      .populate('category', 'name slug')
      .populate('author', 'name')
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }
    
    // Increment views
    blog.views += 1
    await blog.save()
    
    res.json(blog)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Get all blogs for admin
router.get('/admin/all', authenticate, authorize('admin'), async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('category', 'name slug')
      .populate('author', 'name')
      .sort({ createdAt: -1 })
    
    res.json(blogs)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Create blog (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { title, content, excerpt, image, category, published, tags } = req.body
    
    console.log('Creating blog with data:', { title, content: content?.substring(0, 50), category, published })
    
    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' })
    }
    
    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Content is required' })
    }
    
    // Create slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug })
    if (existingBlog) {
      return res.status(400).json({ message: 'A blog with this title already exists' })
    }
    
    const blog = new Blog({
      title: title.trim(),
      slug,
      content: content.trim(),
      excerpt: excerpt?.trim() || '',
      image: image?.trim() || '',
      category: category || null,
      author: req.user._id,
      published: published || false,
      tags: tags || []
    })
    
    await blog.save()
    await blog.populate('category', 'name slug')
    await blog.populate('author', 'name')
    
    console.log('Blog created successfully:', blog._id)
    res.status(201).json(blog)
  } catch (error) {
    console.error('Error creating blog:', error)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Blog with this title already exists' })
    }
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Update blog (admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { title, content, excerpt, image, category, published, tags } = req.body
    
    console.log('Updating blog:', req.params.id)
    
    const updateData = {
      content: content?.trim() || '',
      excerpt: excerpt?.trim() || '',
      image: image?.trim() || '',
      category: category || null,
      published: published || false,
      tags: tags || []
    }
    
    if (title && title.trim()) {
      updateData.title = title.trim()
      updateData.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }
    
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('category', 'name slug')
      .populate('author', 'name')
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }
    
    console.log('Blog updated successfully')
    res.json(blog)
  } catch (error) {
    console.error('Error updating blog:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Delete blog (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }
    
    res.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
