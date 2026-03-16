import express from 'express'
import upload from '../middleware/upload.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Upload single image
router.post('/image', authenticate, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    
    res.json({
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      filename: req.file.filename
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ message: 'Error uploading image' })
  }
})

// Upload multiple images (up to 5)
router.post('/images', authenticate, upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' })
    }

    const imageUrls = req.files.map(file => 
      `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
    )
    
    res.json({
      message: 'Images uploaded successfully',
      imageUrls: imageUrls,
      count: req.files.length
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ message: 'Error uploading images' })
  }
})

export default router
