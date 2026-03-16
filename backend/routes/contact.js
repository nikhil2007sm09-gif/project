import express from 'express'
import Contact from '../models/Contact.js'
import { authenticate, authorize } from '../middleware/auth.js'
import { sendContactNotificationEmail, sendContactReplyEmail } from '../services/emailService.js'

const router = express.Router()

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill all required fields' })
    }

    // Create contact message
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    })

    await contact.save()

    // Send notification email to admin
    await sendContactNotificationEmail(name, email, subject, message)

    res.status(201).json({
      message: 'Thank you for contacting us! We will get back to you soon.',
      success: true
    })
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({ message: 'Server error. Please try again later.' })
  }
})

// Get all contact messages (admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.query
    
    const filter = status ? { status } : {}
    
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .populate('repliedBy', 'name email')
    
    res.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single contact message (admin only)
router.get('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('repliedBy', 'name email')
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' })
    }
    
    // Mark as read if it's new
    if (contact.status === 'new') {
      contact.status = 'read'
      await contact.save()
    }
    
    res.json(contact)
  } catch (error) {
    console.error('Error fetching contact:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update contact status (admin only)
router.patch('/:id/status', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.body
    
    if (!['new', 'read', 'replied', 'resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' })
    }
    
    res.json({ message: 'Status updated successfully', contact })
  } catch (error) {
    console.error('Error updating status:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Reply to contact message (admin only)
router.post('/:id/reply', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { reply } = req.body
    
    if (!reply) {
      return res.status(400).json({ message: 'Reply message is required' })
    }
    
    const contact = await Contact.findById(req.params.id)
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' })
    }
    
    contact.reply = reply
    contact.status = 'replied'
    contact.repliedAt = new Date()
    contact.repliedBy = req.user._id
    
    await contact.save()
    
    // Send reply email to user
    await sendContactReplyEmail(contact.email, contact.name, contact.subject, reply)
    
    res.json({ message: 'Reply sent successfully', contact })
  } catch (error) {
    console.error('Error sending reply:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete contact message (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' })
    }
    
    res.json({ message: 'Contact message deleted successfully' })
  } catch (error) {
    console.error('Error deleting contact:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
