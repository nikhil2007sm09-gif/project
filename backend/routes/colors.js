import express from 'express'
import Color from '../models/Color.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

// Get all colors
router.get('/', async (req, res) => {
  try {
    const colors = await Color.find().sort({ name: 1 })
    res.json(colors)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Create color (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { name, hexCode, description } = req.body
    
    const existingColor = await Color.findOne({ name })
    if (existingColor) {
      return res.status(400).json({ message: 'Color already exists' })
    }
    
    const color = new Color({ name, hexCode, description })
    await color.save()
    
    res.status(201).json(color)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Update color (admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { name, hexCode, description } = req.body
    
    const color = await Color.findByIdAndUpdate(
      req.params.id,
      { name, hexCode, description },
      { new: true }
    )
    
    if (!color) {
      return res.status(404).json({ message: 'Color not found' })
    }
    
    res.json(color)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete color (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id)
    
    if (!color) {
      return res.status(404).json({ message: 'Color not found' })
    }
    
    res.json({ message: 'Color deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
