import express from 'express'
import Slider from '../models/Slider.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Get all sliders (public)
router.get('/', async (req, res) => {
  try {
    const { type } = req.query
    const filter = { isActive: true }
    
    if (type) {
      filter.type = type
    }
    
    const sliders = await Slider.find(filter)
      .sort({ order: 1, createdAt: -1 })
    res.json(sliders)
  } catch (error) {
    console.error('Error fetching sliders:', error)
    res.status(500).json({ message: 'Error fetching sliders' })
  }
})

// Get all sliders for admin
router.get('/admin', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    const sliders = await Slider.find()
      .sort({ type: 1, order: 1, createdAt: -1 })
    res.json(sliders)
  } catch (error) {
    console.error('Error fetching sliders:', error)
    res.status(500).json({ message: 'Error fetching sliders' })
  }
})

// Create slider
router.post('/', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }

    const { title, subtitle, image, buttonText, buttonLink, isActive, order, type } = req.body

    const slider = new Slider({
      title,
      subtitle,
      image,
      buttonText,
      buttonLink,
      isActive,
      order,
      type
    })

    await slider.save()
    res.status(201).json(slider)
  } catch (error) {
    console.error('Error creating slider:', error)
    res.status(500).json({ message: 'Error creating slider' })
  }
})

// Update slider
router.put('/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }

    const { title, subtitle, image, buttonText, buttonLink, isActive, order, type } = req.body

    const slider = await Slider.findByIdAndUpdate(
      req.params.id,
      { title, subtitle, image, buttonText, buttonLink, isActive, order, type },
      { new: true }
    )

    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' })
    }

    res.json(slider)
  } catch (error) {
    console.error('Error updating slider:', error)
    res.status(500).json({ message: 'Error updating slider' })
  }
})

// Delete slider
router.delete('/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }

    const slider = await Slider.findByIdAndDelete(req.params.id)
    
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' })
    }

    res.json({ message: 'Slider deleted successfully' })
  } catch (error) {
    console.error('Error deleting slider:', error)
    res.status(500).json({ message: 'Error deleting slider' })
  }
})

export default router