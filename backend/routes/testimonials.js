import express from 'express'
import Testimonial from '../models/Testimonial.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Get all testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
    res.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    res.status(500).json({ message: 'Error fetching testimonials' })
  }
})

// Get all testimonials for admin
router.get('/admin', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    const testimonials = await Testimonial.find()
      .sort({ order: 1, createdAt: -1 })
    res.json(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    res.status(500).json({ message: 'Error fetching testimonials' })
  }
})

// Create testimonial
router.post('/', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }

    const { name, image, rating, review, location, isActive, order } = req.body

    const testimonial = new Testimonial({
      name,
      image,
      rating,
      review,
      location,
      isActive,
      order
    })

    await testimonial.save()
    res.status(201).json(testimonial)
  } catch (error) {
    console.error('Error creating testimonial:', error)
    res.status(500).json({ message: 'Error creating testimonial' })
  }
})

// Update testimonial
router.put('/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }

    const { name, image, rating, review, location, isActive, order } = req.body

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, image, rating, review, location, isActive, order },
      { new: true }
    )

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' })
    }

    res.json(testimonial)
  } catch (error) {
    console.error('Error updating testimonial:', error)
    res.status(500).json({ message: 'Error updating testimonial' })
  }
})

// Delete testimonial
router.delete('/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }

    const testimonial = await Testimonial.findByIdAndDelete(req.params.id)
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' })
    }

    res.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    res.status(500).json({ message: 'Error deleting testimonial' })
  }
})

export default router