import express from 'express'
import Category from '../models/Category.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all categories (public)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ active: true }).sort({ createdAt: -1 })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single category (public)
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, active: true })
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.json(category)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Create category (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { name, description, image } = req.body
    
    // Create slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    const category = new Category({
      name,
      slug,
      description,
      image
    })
    
    await category.save()
    res.status(201).json(category)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category already exists' })
    }
    res.status(500).json({ message: 'Server error' })
  }
})

// Update category (admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { name, description, image, active } = req.body
    
    const updateData = { description, image, active }
    if (name) {
      updateData.name = name
      updateData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }
    
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    
    res.json(category)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete category (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    
    res.json({ message: 'Category deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
