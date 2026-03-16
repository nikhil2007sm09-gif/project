import express from 'express'
import Size from '../models/Size.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all sizes
router.get('/', async (req, res) => {
  try {
    const sizes = await Size.find().sort({ order: 1, name: 1 })
    res.json(sizes)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Create size (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { name, description, order } = req.body
    
    const existingSize = await Size.findOne({ name })
    if (existingSize) {
      return res.status(400).json({ message: 'Size already exists' })
    }
    
    const size = new Size({ name, description, order })
    await size.save()
    
    res.status(201).json(size)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Update size (admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { name, description, order } = req.body
    
    const size = await Size.findByIdAndUpdate(
      req.params.id,
      { name, description, order },
      { new: true }
    )
    
    if (!size) {
      return res.status(404).json({ message: 'Size not found' })
    }
    
    res.json(size)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete size (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const size = await Size.findByIdAndDelete(req.params.id)
    
    if (!size) {
      return res.status(404).json({ message: 'Size not found' })
    }
    
    res.json({ message: 'Size deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
